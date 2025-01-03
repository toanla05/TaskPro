import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      bgcolor: 'background.default',
      color: 'black',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1
    }}>
      <Typography variant="h1" sx={{ fontSize: '3.5rem', fontWeight: 800, color: 'text.primary' }}>Oops 404!</Typography>

      <Link to="/" style={{ textDecoration: 'none' }}>
        <Button
          startIcon={<KeyboardReturnIcon />}
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontSize: '1.25rem'
          }}
        >TaskPro </Button>
      </Link>
    </Box>
  );
}

export default NotFound;
