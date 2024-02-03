import {Photo, StarBorderOutlined, SendOutlined, InsertDriveFileOutlined, DeleteOutlineOutlined, MailOutlineOutlined } from '@mui/icons-material';


export const SIDEBAR_DATA = [
    {
        name: 'inbox',
        title: 'Inbox',
        icon: Photo
    },
    {
        name: 'starred',
        title: 'Starred',
        icon: StarBorderOutlined
    },
    {
        name: 'sent',
        title: 'Sent',
        icon: SendOutlined
    },
    {
        name: 'drafts',
        title: 'Drafts',
        icon: InsertDriveFileOutlined
    },
    {
        name: 'bin',
        title: 'Bin',
        icon: DeleteOutlineOutlined
    },
    {
        name: 'allmail',
        title: 'All Mail',
        icon: MailOutlineOutlined
    }
];

