import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { alpha } from "@material-ui/core/styles";
import { makeStyles, useTheme } from "@material-ui/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import { Grid, Tab } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Avatar from "@material-ui/core/Avatar";
import MenuItem from "@material-ui/core/MenuItem";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

import logo from "../../assets/logo.png";
import accountCircle from "../../assets/account_circle.jpg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { BootstrapInput } from "../UI/CustomInput";

const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: "0em",
    [theme.breakpoints.down("md")]: {
      marginBottom: "0.25em",
    },
    [theme.breakpoints.down("xs")]: {
      marginBottom: "0.25em",
    },
  },
  appbar: {
    zIndex: theme.zIndex.modal + 1,
  },
  logoContainer: {
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  logo: {
    height: "4em",
    [theme.breakpoints.down("sm")]: {
      height: "3em",
    },
  },
  tabContainer: {
    marginLeft: "auto",
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: "25px"
  },
  icon: {
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawerIconContainer: {
    marginLeft: "auto",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  drawer: {
    backgroundColor: theme.palette.common.white,
  },
  drawerIcon: {
    height: "40px",
    width: "40px",
  },
  drawerItem: {
    ...theme.typography.tab,
    color: "white",
    opacity: 0.7,
  },
  menu: {
    backgroundColor: theme.palette.common.white,
    color: "black",
    borderRadius: "0px",
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    "&:hover": {
      opacity: 1,
    },
  },
  search: {
    marginLeft: "auto",
    width: "100%"
  }
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

function Header(props) {
  const classes = useStyles();
  const theme = useTheme();

  const iOS =
    typeof navigator !== "undefined" &&
    /iPad|iPhone|iPod/.test(navigator.userAgent);
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const [auth, setAuth] = React.useState(true);
  const [openDrawer, setOpenDrawer] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpenMenu((prevOpen) => !prevOpen);
  };

  const handleCloseMenu = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpenMenu(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpenMenu(false);
    }
  }

  const prevOpen = React.useRef(openMenu);

  React.useEffect(() => {
    if (prevOpen.current === true && openMenu === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = openMenu;
  }, [openMenu]);

  const handleChange = (event, i) => {
    if (i === 0) {
    } else {
      setAuth(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    props.setValue(newValue);
  };

  const headers = [
    { name: "HOME", link: "/home", activeIndex: 0, selectedIndex: 0 },
    { name: "ABOUT US", link: "/about", activeIndex: 1, selectedIndex: 1 },
    { name: "SHOP", link: "/shop", activeIndex: 2, selectedIndex: 2 },
    { name: "CART", link: "/cart", activeIndex: 3, selectedIndex: 3 },
    { name: "ORDERS", link: "/orders", activeIndex: 4, selectedIndex: 4 },
  ];

  const menus = [
    { name: "Profile", link: "/profile", activeIndex: 0 },
    { name: "Signout", link: "/signout", activeIndex: 1 },
  ];

  useEffect(() => {
    [...headers].forEach((header) => {
      debugger;
      switch (window.location.pathname) {
        case `${header.link}`:
          if (props.value !== header.activeIndex) {
            props.setValue(header.activeIndex);
            if (
              header.selectedIndex &&
              header.selectedIndex !== props.selectedIndex
            ) {
              props.setSelectedIndex(header.selectedIndex);
            }
          }
          break;
        case "/profile":
          props.setValue(5);
          break;
        case "/logout":
          props.setValue(5);
          break;
        default:
          break;
      }
    });
  }, [props.value, props.selectedIndex, props]);

  const tabs = (
    <React.Fragment>
    
      <Tabs
        className={classes.tabContainer}
        value={props.value}
        onChange={handleTabChange}
        indicatorColor="primary"
      >
      <Grid container className={classes.search}>
          <BootstrapInput
            placeholder="Search..."
            id="search"
            
            inputProps={{
              name: "search",
              id: "search",
              style: { border: "3px solid black", width: "100%" },
            }}
            endAdornment={<SearchIcon />}
          />
          
        </Grid>
        
        {headers.map((header, i) =>
          header.activeIndex === 3 ? (<React.Fragment>
            
            <IconButton aria-label="cart" component={Link}  to={header.link} className={classes.tab}>
            <span>{header.name}</span>
              <StyledBadge  badgeContent={4} color="secondary">
                <ShoppingCartIcon  /> 
              </StyledBadge>
              
            </IconButton>
            </React.Fragment>
            
          ) : (
            <Tab
              key={`${header}${i}`}
              component={Link}
              to={header.link}
              className={classes.tab}
              label={header.name}
            />
          )
        )}
      </Tabs>

      {props.isLoggedIn === true ?
        <IconButton
        ref={anchorRef}
        aria-controls={openMenu ? "menu-list-grow" : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        aria-label="account of current user"
        disableRipple
        className={classes.icon}
        onMouseOver={handleToggle}
      >
        <Avatar alt="Remy Sharp" src={accountCircle} />
      </IconButton>
      : 
      <Tab
              key="login"
              component={Link}
              to="/login"
              className={classes.tab}
              label="LOGIN"
            />
    
    }
      

      <Popper
        open={openMenu}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleCloseMenu}>
                <MenuList
                  autoFocusItem={openMenu}
                  id="menu-list-grow"
                  onKeyDown={handleListKeyDown}
                  onMouseLeave={handleCloseMenu}
                >
                  {menus.map((menu, i) => (
                    <MenuItem
                      key={`${menu}${i}`}
                      component={Link}
                      to={menu.link}
                      classes={{ root: classes.menuItem }}
                      onClick={(event) => {
                        handleChange(event, menu.activeIndex);
                        handleCloseMenu();
                      }}
                    >
                      {menu.name}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );

  const drawer = (
    <React.Fragment>
      <SwipeableDrawer
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        onOpen={() => setOpenDrawer(true)}
        classes={{ paper: classes.drawer }}
      >
        <div className={classes.toolbarMargin} />
        <List disablePadding>
          {headers.map((header, i) => (
            <ListItem key={`${header}${i}`} divider button>
              <ListItemText disableTypography>{header.name}</ListItemText>
            </ListItem>
          ))}
          {menus.map((menu, i) => (
            <ListItem key={`${menu}${i}`} divider button>
              <ListItemText>{menu.name}</ListItemText>
            </ListItem>
          ))}
        </List>
      </SwipeableDrawer>
      <IconButton
        className={classes.drawerIconContainer}
        onClick={() => setOpenDrawer(!openDrawer)}
        disableRipple
      >
        <MenuIcon className={classes.drawerIcon} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <React.Fragment>
      <AppBar className={classes.appbar}>
        <Toolbar disableGutters>
          <Button disableRipple className={classes.logoContainer}>
            <img className={classes.logo} src={logo} alt="LOGO" />
          </Button>
          {matches ? drawer : tabs}
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
}

export default Header;
