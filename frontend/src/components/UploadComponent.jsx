import {
  Box,
  Button,
  TextField,
  Typography,
  Collapse,
  IconButton,
  useMediaQuery,
  Grid2,
} from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";
import { ExpandMore, ExpandLess } from "@mui/icons-material";

const UploadComponent = ({ file, setFile, handleUpload }) => {
  const [open, setOpen] = useState(false); // State to manage visibility of upload section
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm")); // Detect if screen is small (xs or sm)

  return (
    <Box sx={{ marginBottom: 2 }}>
      {/* Title with collapsible icon on mobile only */}
      {isMobile && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Upload PDF & Ask Question
          </Typography>
          <IconButton onClick={() => setOpen(!open)}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </Box>
      )}

      {/* Collapsible section for upload on mobile */}
      <Collapse in={isMobile ? open : true}>
        {/* Always expanded on larger screens */}
        <Box
          display="flex"
          alignItems="center"
          flexDirection={{ xs: "column", sm: "row" }}
          sx={{ marginTop: 2 }}
        >
          {/* Layout for larger screens */}
          <Grid2 container spacing={2} alignItems="center">
            <Grid2 item xs={12} sm={6}>
              <Typography variant="h6" align="center" gutterBottom>
                Upload PDF
              </Typography>
              <Typography variant="body2" align="center">
                & Ask Questions
              </Typography>
            </Grid2>

            <Grid2 item xs={12} sm={6} display="flex" justifyContent="flex-end">
              <TextField
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                variant="outlined"
                fullWidth
                slotProps={{
                  htmlInput: { accept: ".pdf" },
                }}
              />
            </Grid2>
          </Grid2>

          <Button
            onClick={handleUpload}
            variant="contained"
            color="primary"
            sx={{
              marginTop: { xs: 2, sm: 0 },
              marginLeft: { sm: 2 },
            }}
          >
            Upload PDF
          </Button>

          {file && (
            <Typography
              variant="body2"
              sx={{
                marginLeft: { sm: 2 },
                marginTop: { xs: 2, sm: 0 },
              }}
            >
              {file.name}
            </Typography>
          )}
        </Box>
      </Collapse>
    </Box>
  );
};

// Define prop types
UploadComponent.propTypes = {
  file: PropTypes.object,
  setFile: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
};

export default UploadComponent;
