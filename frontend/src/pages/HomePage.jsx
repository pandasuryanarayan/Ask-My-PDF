import PdfChat from "../components/PdfChat";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

const HomePage = () => {
  return (
    <ThemeProvider theme={theme}>
      <PdfChat /> {/* Your main component */}
    </ThemeProvider>
  );
};

export default HomePage;
