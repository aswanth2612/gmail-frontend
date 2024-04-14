
import { Box, Typography, styled, Divider } from '@mui/material';

const Component = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 'auto',
    opacity: '0.8',
    width: '100%',
    height: '100%'
});

const StyledDivider = styled(Divider)({
    width: '100%',
    marginTop: 10
})

const NoMails = ({ message }) => {
    return (
        <Component>
            <Typography>{message && message.heading}</Typography>
            <Typography>{message && message.subHeading}</Typography>
            <StyledDivider />
        </Component>
    )
}

export default NoMails;