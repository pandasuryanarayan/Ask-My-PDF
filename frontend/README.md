# AskMyPDF

**AskMyPDF** is a full-stack web application that allows users to upload PDF documents and ask questions about the content of those documents. The backend processes the PDF, extracts text, and utilizes natural language processing (NLP) to answer questions posed by users.

This project uses **React.js** for the frontend and a Python-based backend with NLP for text processing.

---

## Features

- **PDF Upload**: Upload PDF documents to the platform.
- **Ask Questions**: Ask questions based on the uploaded document's content.
- **Natural Language Processing (NLP)**: Backend processes the document and provides relevant answers using NLP.
- **Feedback Mechanism**: Provides real-time feedback during the upload and question-answering process (e.g., loading, error, success).

---

## Technologies

- **Frontend**:
  - **React.js**: JavaScript library for building user interfaces.
  - **React Router**: For navigation within the app.
  - **Material UI**: For Styled Components.
  
- **Backend**:
  - **Python** (FastAPI for API routing)
  - **PyMuPDF**: For PDF text extraction.
  - **Gemini API**: For NLP processing, to answer questions based on the PDF content.

- **Others**:
  - **Node.js & npm**: For managing the React frontend.
  - **CORS**: For handling cross-origin requests.

---

## Installation

### 1. **Clone the Repository**

```bash
git clone https://github.com/pandasuryanarayan/Ask-My-PDF.git
cd Ask-My-PDF
```

### 2. **Set Up the Backend**

- **Install Python dependencies**:
  - Create a virtual environment:
    ```bash
    python -m venv venv
    ```
  - Activate the virtual environment:
    - On **Windows**:
      ```bash
      .\venv\Scripts\activate
      ```
    - On **macOS/Linux**:
      ```bash
      source venv/bin/activate
      ```

- Install the required Python packages:
  ```bash
  pip install -r requirements.txt
  ```

  **`requirements.txt`** should include necessary dependencies such as:
  - `FastAPI`
  - `PyMuPDF`
  - `Gemini`

### 3. **Set Up the Frontend**

- **Navigate to the frontend directory**:
  ```bash
  cd frontend
  ```

- **Install the frontend dependencies**:
  ```bash
  npm install
  ```

- **Run the React app**:
  ```bash
  npm run dev
  ```

  This will start the React development server, typically running at `http://localhost:5173`.

## Usage

1. **Upload a PDF**: On the homepage of **AskMyPDF**, click the "Upload" button and select a PDF file. The file will be processed in the backend.
2. **Ask Questions**: After uploading the PDF, type your question in the input box and click "Ask Question". The backend will use NLP to analyze the PDF and provide an answer.
3. **View the Answer**: The answer will be displayed below the question input area.

## Development

### Running the Application Locally

To run the app locally:

1. **Start the backend**:
   - Make sure you're in the `backend/` directory, then run:
     ```bash
     uvicorn app.main:app --reload
     ```

2. **Start the frontend**:
   - In the `frontend/` directory, run:
     ```bash
     npm run dev
     ```

This will start both the backend (typically running on `http://localhost:5000`) and the frontend (typically running on `http://localhost:3000`).


## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

---
