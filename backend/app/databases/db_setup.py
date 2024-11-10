import mysql.connector
from mysql.connector import errorcode
import os
from dotenv import load_dotenv

load_dotenv()

DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_NAME = os.getenv('DB_NAME')

# Database connection details (To run in localhost Uncomment below and comment upper database details)
# DB_HOST = "localhost"  # MySQL host, e.g., localhost or an IP address
# DB_USER = "surya"  # Replace with your MySQL username
# DB_PASSWORD = "suryalocalhost"  # Replace with your MySQL password
# DB_NAME = "doc_metadata"  # Replace with your database name

# Function to create a MySQL connection
def create_connection(database=None):
    try:
        # If a database is specified, connect to it
        if database:
            connection = mysql.connector.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASSWORD,
                database=database
            )
        else:
            connection = mysql.connector.connect(
                host=DB_HOST,
                user=DB_USER,
                password=DB_PASSWORD
            )
        
        if connection.is_connected():
            print(f"Successfully connected to the database: {database if database else 'MySQL server'}")
            return connection
    except mysql.connector.Error as err:
        print(f"Error: {err}")
        return None

# Function to create the database if it doesn't exist
def create_database():
    connection = create_connection()  # Connect to MySQL server without a specific database
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            connection.commit()
            print(f"Database '{DB_NAME}' created or already exists.")
        except mysql.connector.Error as err:
            print(f"Error creating database: {err}")
        finally:
            cursor.close()
            connection.close()

# Create tables if they don't exist
def create_tables():
    create_database()  # Ensure the database exists before proceeding

    # Connect to the database
    connection = create_connection(DB_NAME)
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS documents (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    filename VARCHAR(255) NOT NULL,
                    upload_date DATETIME NOT NULL,
                    file_path VARCHAR(255) NOT NULL
                )
            """)
            connection.commit()
            print("Table 'documents' created or already exists.")
        except mysql.connector.Error as err:
            print(f"Error creating table: {err}")
        finally:
            cursor.close()
            connection.close()

# Function to insert a document into the database
def insert_document(filename, upload_date, file_path):
    connection = create_connection(DB_NAME)
    if connection:
        cursor = connection.cursor()
        try:
            cursor.execute("""
                INSERT INTO documents (filename, upload_date, file_path)
                VALUES (%s, %s, %s)
            """, (filename, upload_date, file_path))
            connection.commit()
            print(f"Document '{filename}' inserted successfully.")
        except mysql.connector.Error as err:
            print(f"Error inserting document: {err}")
        finally:
            cursor.close()
            connection.close()
