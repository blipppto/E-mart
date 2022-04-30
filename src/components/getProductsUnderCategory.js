import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import { useSelector, useDispatch } from 'react-redux'
import fetchProductsUnderCategory from '../actions/action_fetchProductsUnderCategory'



const GetProductsUnderCategory = () => {
   const dispatch = useDispatch()
   const [searchParams] = useSearchParams()
   const category = encodeURIComponent(searchParams.get('category'))


   useEffect(() => {
      dispatch(fetchProductsUnderCategory(category))
      console.log("dispatched")
   },[])

   const products = useSelector(({ productsUnderCategory }) => {
      return productsUnderCategory[category]
   })

   if(!products) return <div>loading...</div>

   return (
      <>
         <AppAppBar />
         <Box
            component="section"
            sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'lightgray' }}
         >
            <Container sx={{ mt: 5 }} >
               <Grid container spacing={2}>
                  {
                     products.map((product) => {
                        return <Grid item xs={6} md={3} key={product.id}>
                           <CardActionArea
                              href={`/${product._id}`}
                           >
                              <CardMedia
                                 component='img'
                                 src={product.images[0]}
                              />
                              <Typography >
                                 {product.name}
                              </Typography>
                              <Typography
                                 variant='h5'>
                                 {`N ${(product.price).toString()}`}
                              </Typography>
                              <Button
                                 variant='outlined'
                                 href='/cart/add'
                              >Add to Cart</Button>
                           </CardActionArea>
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