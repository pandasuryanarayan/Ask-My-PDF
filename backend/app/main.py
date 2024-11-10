from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.databases.db_setup import create_tables
from app.api import routes

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change to specific domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables on startup
create_tables()

app.include_router(routes.router)
