import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from datetime import datetime
from pydantic import BaseModel
from app.services.pdf_processor import extract_text_from_pdf
from app.databases.db_setup import insert_document  # Use the pure MySQL insert function
from app.services.nlp_engine import answer_question

router = APIRouter()

# Directory to store uploaded PDFs
UPLOAD_DIRECTORY = "uploads"
os.makedirs(UPLOAD_DIRECTORY, exist_ok=True)  # Create directory if it doesn't exist

# Global variable to store extracted text for querying
uploaded_pdf_text = ""


@router.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    global uploaded_pdf_text
    if file.content_type != 'application/pdf':
        return {"message": "Please upload a PDF file only.", "status": "error"}

    print("Received file:", file.filename)  # Debugging line

    # Define file path and upload date
    file_path = os.path.join(UPLOAD_DIRECTORY, file.filename)
    upload_date = datetime.now()

    try:
        # Insert document metadata into MySQL
        insert_document(file.filename, upload_date, file_path)

        # Save the PDF to the filesystem
        with open(file_path, "wb") as f:
            f.write(await file.read())
        print(f"PDF saved to {file_path}")  # Debugging line to confirm file save

        # Extract text from the PDF and store it for later queries
        uploaded_pdf_text = extract_text_from_pdf(file_path)
        print("Extracted text:", uploaded_pdf_text[:100])  # Preview the first 100 characters

        return {"message": "PDF uploaded successfully", "status": "success"}
    
    except Exception as e:
        print("Error processing PDF:", str(e))
        raise HTTPException(status_code=500, detail=f"Error processing PDF: {str(e)}")


# Model for question submission
class QueryRequest(BaseModel):
    query: str


@router.post("/query_pdf")
async def query_pdf(query_request: QueryRequest):
    global uploaded_pdf_text
    if not uploaded_pdf_text:
        raise HTTPException(status_code=400, detail="No PDF uploaded. Please upload a PDF first.")

    try:
        # Get the answer from the NLP engine
        answer = answer_question(uploaded_pdf_text, query_request.query)
        return {"status": "success", "content": answer}
    except Exception as e:
        print("Error querying PDF:", str(e))
        raise HTTPException(status_code=500, detail=f"Error querying PDF: {str(e)}")
