import  React,{useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import CardMedia from '@mui/material/CardMedia'
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import Container from '@mui/material/Container';
import Button from '../components/Button';
import {Link} from 'react-router-dom'
import Typography from '../components/Typography';
import fetchFeaturedProducts from '../../../actions/action_fetchFeaturedProducts';
import fetchProductsUnderCategory from '../../../actions/action_fetchProductsUnderCategory';
import _ from 'lodash'
import { convertToValidPrice } from '../../../components/getProductsUnderCategory';

const item = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  px: 5,
};

const number = {
  fontSize: 24,
  fontFamily: 'default',
  color: 'secondary.main',
  fontWeight: 'medium',
};

const image = {
  height: 55,
  my: 4,
};

function ProductHowItWorks() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchFeaturedProducts())
  }, [dispatch])

  const products = useSelector(({ products }) => {
    return products
  })

  return (
    <Box
      component="section"
      sx={{ display: 'flex', bgcolor: 'secondary.light', overflow: 'hidden'}}
    >
      <Container
        sx={{
          mt: 5,
          mb: 5,
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          component="img"
          src="/static/themes/onepirate/productCurvyLines.png"
          alt="curvy lines"
          sx={{
            pointerEvents: 'none',
            position: 'absolute',
            top: -180,
            opacity: 0.7,
          }}
        />
        <Typography variant="h4" marked="center" component="h2" sx={{ mb: 5}}>
          Top Deals
        </Typography>
        <div>
          <Grid container spacing={1}>
            {
              _.map(products, (product) => {
                return <Grid item xs={6} md={2.4} key={product._id}>
                  <Card
                    sx={{ borderRadius: 2,padding: '5px'}}
                  >
                    <CardActionArea
                      sx={{objectFit: 'contain'}}
                    >
                      <Link to={`/${product._id}`}>
                        <CardMedia
                          component='img'
                          src={product.images[0]}
                        />
                      </Link>
                      <Typography sx={{overflow: 'hidden', whiteSpace: 'nowrap',textOverflow: 'ellipsis'}} >
                        {product.name}
                      </Typography>
                      <Typography
                        variant='h5'>
                        {convertToValidPrice(product.price)}
                      </Typography>
                    </CardActionArea>

                  </Card>

                </Grid>
              })
            }
          </Grid>
        </div>

      </Container>
    </Box>
  );
}

export default ProductHowItWorks;
