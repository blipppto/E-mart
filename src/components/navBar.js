import React, { useRef } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Badge from '@mui/material/Badge'
import { styled, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import MenuItem from '@mui/material/MenuItem';
import { StyledEngineProvider } from '@mui/material';

const pages = ['Login', 'Sign Up'];

export function findNoOfItems(obj) {
  let number = 0
  for (const keys in obj) {
    number += obj[keys].qty
  }
  return number
}

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  // const [searchTerm, setSearchTerm] = useState('')
  const searchBar = useRef()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };


  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const makeRequestToSearchForProduct = () => {
    const searchTerm = document.querySelector('.MuiInputBase-input').value
    navigate(`/search/?name=${searchTerm}`)

  }

  const cart = useSelector(({ cart }) => {
    return cart
  })

  const user = useSelector(({ user }) => {
    return user
  })
  const noOfCartItem = findNoOfItems(cart)

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 2,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 1),
      // vertical padding + font size from searchIcon
      // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.down('sm')]: {
        width: '13ch',
        '&:focus': {
          width: '18ch',
        },
      },
      [theme.breakpoints.up('sm')]: {
        width: '30ch',
        '&:focus': {
          width: '34ch',
        },
      },
    },
  }));

  return (
    <StyledEngineProvider injectFirst>
      <AppBar position="fixed">
        <Container maxWidth="xl" sx={{bgcolor: '#040a24'}}>
          <Toolbar disableGutters >
            <Link to='/' style={{ padding: '6px 0px' }}>
              <Typography
                variant="h5"
                noWrap
                sx={{
                  display: { xs: 'none', md: 'flex' },
                  fontFamily: 'varela round',
                  fontWeight: 700,
                  color: 'white',
                  textDecoration: 'none',
                  fontSize: '30px'
                }}
              >
                eMART.
              </Typography>
            </Link>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {
                  (!user.isLoggedIn) ?
                     pages.map((page) => (
                      <MenuItem key={page} >
                        
                        <Typography textAlign="center">{page}</Typography>
                      </MenuItem>
                    ))
                    :
                    <>
                      <MenuItem >
                        <Typography textAlign="center" sx={{color:'black'}}>{user.firstName}</Typography>
                      </MenuItem>
                      <MenuItem >
                        <Link to='/logout'>
                        <Typography textAlign="center" sx={{color:'black'}}>Logout</Typography>
                        </Link>
                      </MenuItem>
                    </>
                }
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap

              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'varela round',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              eMART.
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {
                (!user.isLoggedIn) ?
                  <>
                    <Link to='/signIn'>
                      <Button
                        sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none', fontSize: '16px' }}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to='/signUp'>
                      <Button
                        sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none', fontSize: '16px' }}
                      >
                        Sign Up
                      </Button>
                    </Link>
                  </>
                  :
                  <>
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none' }}
                    >
                      {user.firstName}
                    </Button>
                    <Link to='/logout'>
                    <Button
                      sx={{ my: 2, color: 'white', display: 'block', textTransform: 'none', fontSize: '16px'  }}
                    >
                      Logout
                    </Button>
                    </Link>
                  </>
              }
            </Box>

            <Box sx={{ display: 'flex', flexGrow: 0 }}>
              <Link to='/cart' style={{ paddingTop: '6px', marginRight: '8px' }}>
                <Badge badgeContent={noOfCartItem} color="primary" >
                  <ShoppingCartOutlinedIcon style={{ color: 'white' }} />
                </Badge>
              </Link>

              <IconButton onClick={makeRequestToSearchForProduct}>
                <SearchIcon style={{ color: '#FF3366' }} />
              </IconButton>
              <Search>
                <StyledInputBase
                  ref={searchBar}
                  // value={searchTerm}
                  // onChange={inputChange} 
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                />

              </Search>

            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </StyledEngineProvider>
  );
};
export default ResponsiveAppBar;
