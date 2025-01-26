import Box from '@mui/joy/Box';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';

function NotFoundPage() {

  return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 2
        }}
      >
        <Typography level="h1" style={{ color: 'black' }}>
          404
        </Typography>
        <Typography level="h4" style={{ color: 'black' }}>
          The page you’re looking for doesn’t exist.
        </Typography>
        <Button component={Link} to={'/'}>Домой</Button>
      </Box>
    );
}

export default NotFoundPage
