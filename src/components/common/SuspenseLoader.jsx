
import { CircularProgress, Typography, Box } from '@mui/material';

const SuspenseLoader = () => {

    return (
        <Box style={{
            width: '100vh',
            height: '100vh',
            alignItems: 'baseline',
            justifyContent: 'center',
            margin: 'auto',
            position: 'absolute',
            top: '50%',
            left: '29%'
        }}>
            <CircularProgress />
            <Typography>Loading...</Typography>
        </Box>
    )
}

export default SuspenseLoader;