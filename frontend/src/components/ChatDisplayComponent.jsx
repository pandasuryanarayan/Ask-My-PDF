// ChatDisplayComponent.js
import { Box, Typography, Stack } from "@mui/material";
import PropTypes from "prop-types";

const ChatDisplayComponent = ({ chatMessages }) => {
  return (
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
            alignSelf: message.sender === "user" ? "flex-end" : "flex-start",
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
  );
};

// Define prop types
ChatDisplayComponent.propTypes = {
  chatMessages: PropTypes.arrayOf(
    PropTypes.shape({
      sender: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ChatDisplayComponent;
