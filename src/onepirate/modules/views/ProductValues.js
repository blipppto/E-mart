import * as React from 'react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '../components/Typography';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

function ProductValues() {
  return (
    <Box
      component="section"
      sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'secondary.light' }}
    >
      <Container sx={{ mt: 10, mb: 10, display: 'flex', position: 'relative' , textAlign: 'center'}}>
       
        <Grid container spacing={5}>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <LocalShippingIcon />
            
              <Typography variant="h6" sx={{ my: 5 }}>
                Fast Delivery of Orders
              </Typography>
              <Typography variant="h5">
                {
                  'We ship over 4 million products around the world'
                }

                {
                  ' and you get your orders delivered in due time.'
                }
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <Typography variant="h6" sx={{ my: 5 }}>
                New experiences
              </Typography>
              <Typography variant="h5">
                {
                  'Privatize a pool, take a Japanese bath or wake up in 900m2 of garden… '
                }

                {'your Sundays will not be alike.'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={item}>
              <MoneyOffIcon />
              <Typography variant="h6" sx={{ my: 5 }}>
                Discount Offers
              </Typography>
              <Typography variant="h5">
                {'By registering, you will get access to periodic discount rates. '}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ProductValues;
