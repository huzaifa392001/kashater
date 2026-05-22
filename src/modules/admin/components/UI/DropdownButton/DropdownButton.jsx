import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Image from '../Img/Img';
import Dropdownimg from '../../assets/SVG/Manage Users/Down Arrow.svg';
import classes from './DropdownButton.module.css';

const StyledMenu = styled((props) => (
    <Menu elevation={0} {...props} />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 4,
        marginTop: theme.spacing(1),
        minWidth: 141,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function CustomizedMenus({ buttonLabel, menuItems, onMenuItemClick }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (item) => {
        handleClose();
        if (onMenuItemClick) {
            onMenuItemClick(item); // Invoke the callback function with the clicked item
        }
    };




    return (
        <div className={classes.dropdown_btn_set}>
            <Button
                id="demo-positioned-buttons"
                aria-controls={open ? 'demo-positioned-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                endIcon={<Image src={Dropdownimg} alt="dropdownimg" className={classes.arrow} />}
            >
                {buttonLabel}
            </Button>
            <StyledMenu
                id="demo-customized-menus"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {menuItems.map((item, index) => (
                    <MenuItem
                        key={index}
                        onClick={() => handleMenuItemClick(item)}
                        disableRipple
                        className="drop_down_btn"
                    >
                        {item.render()}
                    </MenuItem>
                ))}
            </StyledMenu>
        </div>
    );
}


