import os
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

# Fetch the API key from environment variables
api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)

def split_text_into_chunks(text, chunk_size=1000, overlap=100):
    # Splits text into chunks of a specified size with overlap
    chunks = []
    for i in range(0, len(text), chunk_size - overlap):
        chunks.append(text[i:i + chunk_size])
    return chunks

def answer_question(document_text, question):
    # Step 1: Manually split the document text into chunks
    texts = split_text_into_chunks(document_text)
    
    # Step 2: Create a prompt based on the document text and question
    prompt = "Based on the following context from a document, provide an answer to the question:\n"
    for chunk in texts:
        prompt += f"- {chunk}\n"
    prompt += f"\nQuestion: {question}\nAnswer:"

    # Step 3: Generate content using the Gemini model
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    
    # Extract the generated text from the response
    answer = response.text.strip()
    
    return answer