import React from 'react';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Avatar, Button, Menu, MenuItem, MenuList } from '@mui/material';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import CategoryIcon from '@mui/icons-material/Category';
import './navbar.scss'
import { serviceUrl } from '../../ultils';

export default function Navbar() {
    const history = useHistory();
    const categories = useSelector(state => state.postReducer.categories)
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleChooseCate = (cateId) => {
        history.push(`/category/${cateId}`)
        setAnchorEl(null);
    };
    const goLoginPage = () => {
        window.open(`${serviceUrl}`)
    }
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <div className="navbar-logo" onClick={e => { history.push('/') }}>
                    <Avatar src='./flag-vn.svg' sx={{ width: '40px', height: '40px' }} />
                    <span style={{ margin: '0 15px' }}>CHỮ QUỐC NGỮ</span>
                </div>
                <div className="navbar-btn">
                    <NavLink exact to="/" className="nav-link" activeClassName="selected" >
                        <Button startIcon={<HomeIcon />}>HOME</Button>
                    </NavLink>
                    <NavLink exact to="/post" className="nav-link" activeClassName="selected" >
                        <Button startIcon={<FavoriteIcon />}>Favorite</Button>
                    </NavLink>
                    <div className="dropdown nav-link">
                        <Button className="dropbtn" onClick={e => { setAnchorEl(e.currentTarget) }} startIcon={<CategoryIcon />}>Category</Button>
                        <Menu
                            PaperProps={{
                                sx: {
                                    width: '230px',
                                    background: 'var(--third-bg-color)',
                                    color: '#fff',
                                }
                            }}
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={e => { setAnchorEl(null) }}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {categories.map(cate => {
                                return (
                                    <MenuItem key={cate.id} 
                                    sx={{
                                       margin: '5px',
                                       padding: '10px'
                                    }}
                                    onClick={e => handleChooseCate(cate.id)}>{cate.name}</MenuItem>

                                );
                            })}

                        </Menu>
                    </div>
                    <NavLink to="/game" className="nav-link" activeClassName="selected" >
                        <Button startIcon={<SportsEsportsIcon />}>Game</Button>
                    </NavLink>
                </div>
            </div>
            <div className="navbar-end">
                <Button onClick={goLoginPage} startIcon={<LoginIcon />}>Admin Login</Button>
            </div>
        </nav >
    )
}
