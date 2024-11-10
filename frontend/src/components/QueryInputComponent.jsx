import { Box, Button, TextField } from "@mui/material";
import PropTypes from "prop-types";

const QueryComponent = ({ userQuery, setUserQuery, handleQuerySubmit, loading }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      flexDirection={{ xs: "column", sm: "row" }}
      sx={{ marginBottom: 2 }}
    >
      <TextField
        fullWidth
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        variant="outlined"
        placeholder="Ask a question about the PDF..."
        disabled={loading}
        sx={{
          marginBottom: { xs: 1, sm: 0 }, // Reduced margin for mobile
          marginRight: { sm: 2 },
          height: 40, // Reduced height of input field
          "& .MuiInputBase-root": {
            height: "100%", // Ensure the input field height matches
          },
        }}
      />
      <Button
        onClick={handleQuerySubmit}
        variant="contained"
        color="secondary"
        disabled={loading}
        sx={{
          height: "40px", // Reduced button height
          minWidth: "120px",
          whiteSpace: "nowrap",
          fontSize: "0.875rem", // Adjust font size if needed
        }}
      >
        {loading ? "Thinking..." : "Ask AI"}
      </Button>
    </Box>
  );
};

// Define prop types
QueryComponent.propTypes = {
  userQuery: PropTypes.string.isRequired,
  setUserQuery: PropTypes.func.isRequired,
  handleQuerySubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default QueryComponent;