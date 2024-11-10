import { useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Box,
  Container,
  Paper,
  Stack,
  Snackbar,
  Alert,
} from "@mui/material";

const PdfChat = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
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
    console.log("Uploading file:", file.name);

    try {
      const response = await fetch("http://localhost:8000/upload_pdf", {
        method: "POST",
        body: formData,
      });

      // Log response status and handle response
      if (response.ok) {
        const data = await response.json();
        console.log("Upload response data:", data);
        if (data.status === "success") {
          setUploadStatus("PDF uploaded successfully!");
          setSnackbarMessage("PDF uploaded successfully!");
        } else {
          setSnackbarMessage(data.message);
        }
      } else {
        const errorText = await response.text();
        console.error("Upload failed:", errorText);
        setSnackbarMessage("Failed to upload PDF. Please try again.");
      }
    } catch (error) {
      console.error("Error uploading PDF:", error);
      setSnackbarMessage("Error uploading PDF. Please check the console.");
    }
    setOpenSnackbar(true); // Show the snackbar
  };

  // Handle user input and AI response
  const handleQuerySubmit = async () => {
    if (!file) {
      setSnackbarMessage("Upload PDF to ask.");
      setOpenSnackbar(true); // Show alert if PDF is not uploaded
      return;
    }

    if (!userQuery) {
      setSnackbarMessage("Ask about PDF.");
      setOpenSnackbar(true); // Show alert if query is empty
      return;
    }

    console.log("User query:", userQuery);
    setChatMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setUserQuery(""); // Reset input field
    setLoading(true);

    try {
      // Here you can send the user query to the AI for processing
      console.log("Sending query to AI:", userQuery);
      const response = await fetch("http://localhost:8000/query_pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery }),
      });

      const data = await response.json();
      console.log("AI response data:", data);

      // Add AI's response to the chat
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
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <Typography variant="h5" gutterBottom align="center">
          Upload Your PDF & Ask Questions
        </Typography>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{ marginBottom: 3 }}
        >
          <TextField
            type="file"
            onChange={(e) => {
              console.log("File selected:", e.target.files[0].name);
              setFile(e.target.files[0]);
            }}
            fullWidth
            variant="outlined"
            sx={{ marginBottom: 2 }}
            slotProps={{
              htmlInput: { accept: ".pdf" },
            }}
          />
          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2 }}
          >
            Upload PDF
          </Button>
          {uploadStatus && (
            <Typography
              variant="body2"
              color={
                uploadStatus.includes("success") ? "success.main" : "error.main"
              }
              align="center"
            >
              {uploadStatus}
            </Typography>
          )}
        </Box>

        {/* Chat interface */}
        <Stack
          sx={{
            maxHeight: "300px",
            overflowY: "auto",
            marginBottom: 3,
            paddingRight: 2,
          }}
        >
          {chatMessages.map((message, index) => (
            <Box
              key={index}
              sx={{
                alignSelf:
                  message.sender === "user" ? "flex-end" : "flex-start",
                backgroundColor:
                  message.sender === "user" ? "primary.main" : "grey.200",
                color: message.sender === "user" ? "white" : "black",
                borderRadius: 2,
                padding: "8px 16px",
                marginBottom: 1,
                maxWidth: "80%",
              }}
            >
              <Typography variant="body2">{message.text}</Typography>
            </Box>
          ))}
        </Stack>

        {/* Input area for user's query */}
        <Box display="flex" alignItems="center" sx={{ marginBottom: 3 }}>
          <TextField
            fullWidth
            value={userQuery}
            onChange={(e) => {
              console.log("User is typing:", e.target.value);
              setUserQuery(e.target.value);
            }}
            variant="outlined"
            placeholder="Ask a question about the PDF..."
            disabled={loading}
            sx={{ marginRight: 2 }}
          />
          <Button
            onClick={handleQuerySubmit}
            variant="contained"
            color="secondary"
            disabled={loading}
            sx={{
              height: "56px",
              minWidth: "120px",
              whiteSpace: "nowrap",
            }}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </Button>
        </Box>
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
