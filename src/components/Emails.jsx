import { useEffect, useState, useContext } from 'react';
import { useOutletContext, useParams, useNavigate, useLocation } from 'react-router-dom';
import { API_URLS } from "../services/api.urls";
import useApi from '../hooks/useApi';
import { Checkbox, Box, List, ListItem } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import Email from "./Email";
import NoMails from '../components/common/NoMails';
import { EMPTY_TABS } from '../constants/constant';
import { useUser } from '../provider/UserProvider';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Emails = ({ state }) => {
    const currentUser = useUser();
    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['username', 'email', 'token']);
    const [selectedEmails, setSelectedEmails] = useState([]);
    const [refreshScreen, setRefreshScreen] = useState(false);
    const { openDrawer } = useOutletContext();
    const params = useParams();
    const type = params.type;

    const getEmailServices = useApi(API_URLS.getEmailFromType);
    const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
    const deleteEmailService = useApi(API_URLS.deleteEmail);

    useEffect(() => {
        getEmailServices.call({ to: cookies.email }, type);
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + cookies.token;
        axios.get(import.meta.env.VITE_BACKEND_PATH + '/auth/verify', {
            params: { token: cookies.token },
            data: { token: cookies.token },
        }).then(res => {
            if (res.data.status) {
            } else {
                removeCookie("username", response.data.username);
                removeCookie("email", response.data.email);
                removeCookie("token", response.data.token);
                navigate('/login')
            }
        }).catch(() => {
            navigate("/error");
        });
    }, [type, refreshScreen])

    const selectAllEmails = (e) => {
        if (e.target.checked) {
            const emails = getEmailServices ?.response ?.map(email => email._id);
            setSelectedEmails(emails);
        } else {
            setSelectedEmails([]);
        }
    }

    const deleteSelectedEmails = (e) => {
        if (type === 'bin') {
            deleteEmailService.call(selectedEmails);
        } else {
            moveEmailsToBinService.call(selectedEmails);
        }
        setRefreshScreen(prevState => !prevState)
    }

    return (
        <Box style={openDrawer ? { marginLeft: 250, width: 'calc(100% - 250px)' } : { width: '100%' }}>

            <Box style={{ padding: '20px 10px 0 10px', display: 'flex', alignItems: 'center' }}>
                <Checkbox size="small" onChange={(e) => selectAllEmails(e)} />
                <DeleteOutlined onClick={(e) => deleteSelectedEmails(e)} />
            </Box>
            <List>
                {
                    getEmailServices ?.response ?.map(email => (
                        <Email
                            key={email._id}
                            email={email}
                            selectedEmails={selectedEmails}
                            setRefreshScreen={setRefreshScreen}
                            setSelectedEmails={setSelectedEmails}
                        />
                    ))
                 }
            </List>
            {
                getEmailServices ?.response ?.length === 0 &&
                    <NoMails message={EMPTY_TABS[type]} />
             }
        </Box>
    )
}

export default Emails;