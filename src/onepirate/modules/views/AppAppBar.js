import * as React from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import AppBar from '../components/AppBar';
import Toolbar from '../components/Toolbar';

const rightLink = {
  fontSize: 18,
  ml: 3,
  color:'lightgray'
};

function AppAppBar() {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: 'black' }}>
          <Box >
            <Link
              variant="h6"
              underline="none"
              color="inherit"
              href="/"
              sx={{ ml: 0, fontSize: 24 }}
            >
              {'E-MART'}
            </Link>
          </Box>
          <Box>
            <Link
              color="inherit"
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-in/"
              sx={rightLink}
            >
              {'SIGN IN'}
            </Link>
            <Link
              color="inherit" 
              variant="h6"
              underline="none"
              href="/premium-themes/onepirate/sign-up/"
              sx={{ ...rightLink }}
            >
              {'SIGN UP'}
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default AppAppBar;
