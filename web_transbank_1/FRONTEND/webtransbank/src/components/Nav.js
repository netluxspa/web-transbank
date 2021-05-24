import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import history from '../history'


import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuMenu from './Menu'

import { logout } from '../actions/userPagina'
import { logoutAdmin } from '../actions/adminPagina'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function Nav({productosCarrito, userPagina, adminPagina, logout, logoutAdmin }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElAdmin, setAnchorElAdmin] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);



  const isMenuOpen = Boolean(anchorEl);
  const isMenuAdminOpen = Boolean(anchorElAdmin);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);



  const handleProfileMenuOpen = (event) => {
    if (userPagina){
      setAnchorEl(event.currentTarget);
    }

  };


  const handleAdminMenuOpen = (event) => {
    if (adminPagina){
      setAnchorElAdmin(event.currentTarget);
    }

  };



  

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };


  const handleMenuAdminClose = () => {
    setAnchorElAdmin(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const menuIdAdmin = 'primary-search-account-menu-admin';
  const renderMenu =  (

        <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={menuId}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={handleMenuClose}
            >
                { userPagina ?  <MenuItem>{ userPagina.nombre}</MenuItem> : null}
                { userPagina ? <MenuItem onClick={()=>logout()}> Cerrar sesión</MenuItem> : null}

            </Menu>
      );

    
  
      const renderAdminMenu =  (

        <Menu
              anchorEl={anchorElAdmin}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              id={menuIdAdmin}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuAdminOpen}
              onClose={handleMenuAdminClose}
            >
                { adminPagina ?  <MenuItem>{ adminPagina.nombre}</MenuItem> : null}
                { adminPagina ? <MenuItem onClick={()=>logoutAdmin()}> Cerrar sesión admin</MenuItem> : null}

            </Menu>
      );

    

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
            <MenuMenu />
          <Typography className={classes.title} variant="h6" noWrap>
            CanabikTools 
          </Typography>
          {adminPagina ?
           <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleAdminMenuOpen}
              color="inherit"
            >
              <AccountCircle style={{color: 'black'}} />
          </IconButton>
          :
          null  
        }

          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={()=>history.push('/tienda/caja')} aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={Object.values(productosCarrito).length} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            {/* <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
          <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={0} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      { renderMobileMenu}
      {renderMenu}
      {renderAdminMenu}
    </div>
  );
}


// export default Nav();

const mapStateToProps = state => {
  return { 
    productosCarrito: state.carrito,
    userPagina: state.userPagina,
    adminPagina: state.adminPagina
  };
};


export default connect(
  mapStateToProps,
  { logout, logoutAdmin }
)(Nav);