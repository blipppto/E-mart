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
import ResponsiveAppBar from './navBar';

export function convertToValidPrice(num){
   const Arr = (num.toString()).split('')
    for(let i = Arr.length - 3;i > 0; i -= 3 ){
       Arr.splice(i,0,',')
    }
    return 'N' + Arr.join('')
   }

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
         <ResponsiveAppBar />
         <Box sx={{ background: '#f5f5f5', marginTop: '72px', padding: '10px' }} >
            <Link to='/'><span>Home</span></Link> {'> '} <span>{decodedCategory}</span>
            <Container sx={{ paddingTop: '20px' }}>
               <Grid container spacing={1.5}>
                  <Grid item xs={6} md={3}>
                  <Box >
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
                  <Grid item xs={6} md={9}>
                     <Grid container spacing={1}>
                        {
                           products.map((product) => {
                              return <Grid item xs={6} md={3} key={product._id}>
                                 <Card
                                    sx={{ borderRadius: 2, padding: '5px' }}
                                 >
                                    <Link to={`/${product._id}`}>
                                       <CardActionArea
                                          sx={{ height: '90%' }}
                                       >
                                          <CardMedia
                                             component='img'
                                             src={product.images[0]}
                                          />
                                          <Typography sx={{ textDecoration: 'none', color: 'black', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                                             {product.name}
                                          </Typography>
                                          <Typography
                                             sx={{ textDecoration: 'none', color: 'black' }}
                                             variant='h5'>
                                             {convertToValidPrice(product.price)}
                                          </Typography>
                                       </CardActionArea>
                                    </Link>

                                    <Button
                                       variant="contained" startIcon={<ShoppingCartRounded />} sx={{ width: '100%' }}>
                                       Add to Cart
                                    </Button>
                                 </Card>

                              </Grid>
                           })
                        }
                     </Grid>
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </>
   )
}

export default GetProductsUnderCategory