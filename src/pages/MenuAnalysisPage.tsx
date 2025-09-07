import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Typography,
  Button,
  Alert,
  Card,
  CardMedia,
} from '@mui/material';
import { analyzeMenu } from '../services/menuService';
import { dataService } from '../services/dataService';

const MenuAnalysisPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    const image = location.state?.image as File;
    if (image) {
      const previewUrl = URL.createObjectURL(image);
      setImagePreview(previewUrl);
      startAnalysis(image);

      return () => URL.revokeObjectURL(previewUrl);
    } else {
      navigate('/');
    }
  }, [location.state?.image, navigate]);

  const startAnalysis = async (image: File) => {
    try {
      setIsAnalyzing(true);
      setError(null);

      const menuData = await analyzeMenu(image);
      await dataService.setMenuData(menuData);
      navigate('/menu');
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleRetry = () => {
    const image = location.state?.image as File;
    if (image) {
      startAnalysis(image);
    }
  };

  if (!location.state?.image) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        gap: 4,
      }}
    >
      {isAnalyzing ? (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <CircularProgress size={60} />
            <Typography variant="h6" sx={{ mt: 2 }}>
              Analyzing menu...
            </Typography>
          </Box>
          {imagePreview && (
            <Card
              sx={{
                maxWidth: 400,
                width: '100%',
                overflow: 'hidden',
                opacity: 0.8,
                transition: 'opacity 0.3s ease',
              }}
            >
              <CardMedia
                component="img"
                image={imagePreview}
                alt="Menu preview"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '60vh',
                  objectFit: 'contain',
                }}
              />
            </Card>
          )}
        </>
      ) : error ? (
        <Alert
          severity="error"
          action={
            <Button color="inherit" size="small" onClick={handleRetry}>
              Try Again
            </Button>
          }
        >
          {error}
        </Alert>
      ) : null}
    </Box>
  );
};

export default MenuAnalysisPage;