import React, { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { AppBar, Toolbar, IconButton, styled, InputBase, Box, Popover, Button, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { gmailLogo } from "../constants/constant";
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
import { useUser } from '../provider/UserProvider';

const StyledAppBar = styled(AppBar)({
    background: "#F5F5F5",
    boxShadow: "none"
});

const SearchWrapper = styled(Box)({
    background: "#EAF1FB",
    marginLeft: 80,
    borderRadius: 8,
    minWidth: 690,
    maxWidth: 720,
    height: 48,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 20px',
    '& > div': {
        width: '100%',
        padding: '0 10px'
    }
});

const OptionWrapper = styled(Box)({
    width: '100%',
    display: 'flex',
    justifyContent: 'end',
    '& > svg': {
        marginLeft: 20
    }

})

const Header = ({ toggleDrawer }) => {
    const currentUser = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate()

    axios.defaults.withCrendentials = true;
    const handleLogout = (e) => {
        e.preventDefault()
        axios.get(import.meta.env.VITE_BACKEND_PATH + '/logout', {}).then(response => {
            navigate('/login')
        }).catch(err => {
        })
    }
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <StyledAppBar position="static">
            <Toolbar>
                <MenuIcon color="action" onClick={toggleDrawer} />
                <img src={gmailLogo} alt="logo" style={{ width: 110, marginLeft: 15 }} />
                <SearchWrapper>
                    <SearchIcon color="action" />
                    <InputBase
                        placeholder='Search mail'
                    />
                    <TuneIcon color="action" />
                </SearchWrapper>
                <OptionWrapper>
                    <HelpOutlineIcon color="action" />
                    <SettingsOutlinedIcon color="action" />
                    <AppsOutlinedIcon color="action" />
                    <IconButton
                        area-label="user"
                        onClick={handleClick}
                    >
                        <AccountCircleOutlinedIcon aria-describedby={"user"} color="action" />
                    </IconButton>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2 }}>{currentUser.username}</Typography>
                        <Button
                            component="label"
                            variant=""
                            startIcon={<LogoutIcon />}
                            fullWidth={true}
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </Popover>
                </OptionWrapper>
            </Toolbar>
        </StyledAppBar>
    )
}

const openUserDlg = () => {
    setOpenUser(true);
}

export default Header
