// PdfChat.js
import { useState } from "react";
import { Container, Paper, Snackbar, Alert } from "@mui/material";
import UploadComponent from "./UploadComponent";
import QueryInputComponent from "./QueryInputComponent";
import ChatDisplayComponent from "./ChatDisplayComponent";

const PdfChat = () => {
  const [file, setFile] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userQuery, setUserQuery] = useState("");
  const [loading, setLoading] = useState(false);

  // Snackbar for messages
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      setSnackbarMessage("Please select a PDF file to upload.");
      setOpenSnackbar(true);
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:8000/upload_pdf", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        setSnackbarMessage("PDF uploaded successfully!");
      } else {
        setSnackbarMessage("Failed to upload PDF. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setSnackbarMessage("Error uploading PDF. Please check the console.");
    }
    setOpenSnackbar(true);
  };

  // Handle user input and AI response
  const handleQuerySubmit = async () => {
    if (!file) {
      setSnackbarMessage("Upload PDF to ask.");
      setOpenSnackbar(true);
      return;
    }

    if (!userQuery) {
      setSnackbarMessage("Ask about PDF.");
      setOpenSnackbar(true);
      return;
    }

    setChatMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setUserQuery("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/query_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await response.json();
      if (data.status === "success") {
        setChatMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.content },
        ]);
      } else {
        setChatMessages((prev) => [
          ...prev,
          { sender: "ai", text: "Sorry, I couldn't answer that." },
        ]);
      }
    } catch (error) {
      console.error("Error communicating with AI:", error);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          text: "Error communicating with AI. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return (
    <Container sx={{ marginTop: 2 }}>
      <Paper
        elevation={3}
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          height: "90vh",
        }}
      >
        {/* PDF Upload Component */}
        <UploadComponent
          file={file}
          setFile={setFile}
          handleUpload={handleUpload}
        />

        {/* Chat Display Component */}
        <ChatDisplayComponent chatMessages={chatMessages} />

        {/* Query Input Component */}
        <QueryInputComponent
          userQuery={userQuery}
          setUserQuery={setUserQuery}
          handleQuerySubmit={handleQuerySubmit}
          loading={loading}
        />
      </Paper>

      {/* Snackbar for alerts */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity="info"
          sx={{
            backgroundColor: "black",
            color: "yellow",
            fontWeight: "bold",
            padding: "6px 16px",
            borderRadius: "4px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default PdfChat;
