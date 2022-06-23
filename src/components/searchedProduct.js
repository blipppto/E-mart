import React, { useEffect, useState } from 'react'
import searchForProduct from '../actions/actions_searchForProduct'
import { useSearchParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import ShoppingCartRounded from '@mui/icons-material/ShoppingCart'

import _ from 'lodash'



const SearchedProduct = () => {
   const dispatch = useDispatch()
   const [searchParams] = useSearchParams()
   const name = searchParams.get('name')


   useEffect(() => {
      dispatch(searchForProduct(name))
   }, [dispatch, name])

   const products = useSelector(({ products }) => {
      return products
   })

   if (!products) return <div>loading...</div>

   return (
      <>
         <AppAppBar />
         <Box sx={{ background: '#f5f5f5', marginTop: '75px' }} >

            <Container>
               <Grid container spacing={1}>
                  {
                     _.map(products, (product) => {
                        return <Grid item xs={6} md={3} key={product._id}>
                           <Card
                              sx={{ borderRadius: 2, height: '65vh', padding: '5px' }}
                           >
                              <CardActionArea href={`/${product._id}`}>
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
                              </CardActionArea>
                              <Button
                                 variant="contained" startIcon={<ShoppingCartRounded />} sx={{ my: 3, width: '100%' }}>
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

export default SearchedProduct