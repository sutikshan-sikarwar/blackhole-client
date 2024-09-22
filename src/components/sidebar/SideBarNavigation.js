import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ListAltIcon from '@mui/icons-material/ListAlt';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

export const navigationMenu=[
    {
        title:"Home",
        icon:<HomeIcon/>,
        path:"/"
    },
    {
        title:"Reels",
        icon:<ExploreIcon/>,
        path:"/reels"
    },
    {
        title:"Create Reels",
        icon:<ControlPointIcon/>,
        path:"/create-reels"
    },
    {
        title:"Notifications",
        icon:<NotificationsIcon/>,
        path:"/notifications"
    },
    {
        title:"Message",
        icon:<MessageIcon/>,
        path:"/message"
    },
    {
        title:"Lists",
        icon:<SearchIcon/>,
        path:"/search"
    },
    {
        title:"Profile",
        icon:<AccountCircleIcon/>,
        path:"/profile"
    },
]