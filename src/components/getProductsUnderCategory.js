import React, { useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import { useSelector, useDispatch } from 'react-redux'
import fetchProductsUnderCategory from '../actions/action_fetchProductsUnderCategory'
import ShoppingCartRounded from '@mui/icons-material/ShoppingCart'



const GetProductsUnderCategory = () => {
   const dispatch = useDispatch()
   const [searchParams] = useSearchParams()
   const category = encodeURIComponent(searchParams.get('category'))
   const decodedCategory = decodeURIComponent(category)

   useEffect(() => {
      dispatch(fetchProductsUnderCategory(category))
   }, [dispatch, category])

   const products = useSelector(({ productsUnderCategory }) => {
      return productsUnderCategory[decodedCategory]
   })
   if (!products) return <div>loading...</div>

   return (
      <>
         <AppAppBar />
         <Box sx={{ background: '#f5f5f5', marginTop: '75px',padding: '3px' }} >
            <Link to='/'><span>Home</span></Link> {'> '} <span>{decodedCategory}</span>
            <Container>
               <Grid container spacing={1}>
                  {
                     products.map((product) => {
                        return <Grid item xs={6} md={3} key={product._id}>
                           <Card
                              sx={{ borderRadius: 2, height: '62vh', padding: '5px' }}
                           >
                              <CardActionArea
                                 sx={{ height: '90%' }}
                              >
                                 <Link to={`/${product._id}`}>
                                    <CardMedia
                                       component='img'
                                       src={product.images[0]}
                                    />
                                 </Link>
                                 <Typography >
                                    {product.name}
                                 </Typography>
                                 <Typography
                                    variant='h5'>
                                    {`N ${(product.price).toString()}`}
                                 </Typography>
                              </CardActionArea>

                              <Button
                                 variant="contained" startIcon={<ShoppingCartRounded />} sx={{ width: '100%' }}>
                                 Add to Cart
                              </Button>
                           </Card>

                        </Grid>
                     })
                  }
               </Grid>
            </Container>
         </Box>
      </>
   )
}

export default GetProductsUnderCategory