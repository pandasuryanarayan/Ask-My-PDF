import fitz  # PyMuPDF

def extract_text_from_pdf(file_path):
    # Open the saved PDF file using fitz
    text = ""
    pdf_document = fitz.open(file_path)

    for page_num in range(pdf_document.page_count):
        page = pdf_document.load_page(page_num)
        text += page.get_text()

    return text
