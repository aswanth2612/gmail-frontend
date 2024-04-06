import React from 'react'
import { useState, Suspense } from 'react';
import Header from "../components/Header";
import SideBar from "../components/SideBar";
import { Outlet, useParams } from 'react-router';
import SuspenseLoader from '../components/common/SuspenseLoader';
import { Box } from '@mui/material';
import Emails from '../components/Emails';
import { useLocation } from 'react-router-dom';

const Main = () => {
    const [openDrawer, setOpenDrawer] = useState(true);
    const location = useLocation();
    const props = useParams();
    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }


    return (
        <>
            <Header toggleDrawer={toggleDrawer} email={"email"} />
            <Box>
                <SideBar openDrawer={openDrawer} />
                <Suspense fallback={<SuspenseLoader />}>
                    <Outlet context={{ openDrawer }} />
                </Suspense>
            </Box>
        </>
    )
}

export default Main
