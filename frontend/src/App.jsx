import { Routes, Route } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import HomePage from './pages/HomePage';

const App = () => {
    return (
        <Container>
            <Typography variant="h5" align="center" gutterBottom>
                AskMyPDF
            </Typography>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </Container>
    );
};

export default App;
