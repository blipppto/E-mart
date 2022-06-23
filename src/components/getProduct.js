import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import fetchProduct from '../actions/action_fetchProduct'
import Box from '@mui/material/Box'
import styled from "styled-components"
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import AppAppBar from '../onepirate/modules/views/AppAppBar';
import Rating from '@mui/material/Rating';
import RecentlyViewed from './recentlyViewed'
import SimilarProducts from './similarProducts'
import createCartItem from '../actions/action_createCartItem'
import updateCartItem from '../actions/action_updateCartItem'



const item = {
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   px: 5,
   background: 'white'
};

const Hr = styled.hr`
width:100%;
background-color:#f5f5f5;
&:hover {
   border: 2px solid red,
   background: 'black'
   }
`
const Span = styled.span`
:hover {
   cursor: pointer
 border: 2px solid red,
 background: 'black'
 }
`


const GetProduct = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [displayedImageUrl, setDisplayedImageUrl] = useState('')
   const [selectedSize, setSelectedSize] = useState(null)
   const [qty, setQty] = useState(1)
   const [clicked, setClicked] = useState(false)
   const [isPicAvailable, setIsPicAvailable] = useState(false)


   useEffect(() => {
      dispatch(fetchProduct(id))
   }, [dispatch, id])

   
   const product = useSelector(({ fetchedProducts }) => {
      return fetchedProducts[id]
   })


   const increaseQuantity = () => {
      setQty(qty + 1)
      const values = {name, _id, price, size:selectedSize,image: displayedImageUrl }
      dispatch(updateCartItem(values, qty + 1))
   }

   const decreaseQuantity = () => {
      setQty(qty - 1)
      const values = {name, _id, price, size:selectedSize,image: displayedImageUrl }
      dispatch(updateCartItem(values, qty - 1))
   }

   useEffect(() => {
      if (!product) return
      setIsPicAvailable(true)
   }, [product])

   useEffect(() => {
      if (!isPicAvailable) return
      setDisplayedImageUrl(product.images[0])
   }, [isPicAvailable])


   if (!product) return <div>loading...</div>

   const { name, price, _id } = product

   return (
      <>
         <AppAppBar />
         <Box sx={{ background: '#f5f5f5', marginTop: '72px',padding: '3px' }}>
         <Link to='/'><span>Home</span></Link> {'>'} <Link to={`/${product._id}`}><span>{product.category}</span></Link> {'> '}  
           <span>{product.name}</span>

            <Container sx={{ paddingTop: '20px' }}>
               <Grid container spacing={1.5}>
                  <Grid item xs={12} md={9} >
                     <Grid container >
                        <Grid item xs={12} md={4} >
                           <img src={displayedImageUrl} style={{ height: '70%', width: '100%' }} alt='selectedImage' />
                           {
                              product.images.map((imageUrl) => {
                                 return <span key={imageUrl} >
                                    <img onClick={() => setDisplayedImageUrl(imageUrl)} src={imageUrl} style={{ width: '33%', height: '29%' }} alt='other images' />
                                 </span>
                              })
                           }

                        </Grid>
                        <Grid item xs={12} md={8} sx={{ padding: '10px', bgcolor: 'white' }}>
                           <Typography variant="h5" marked="center" >
                              {product.name}
                           </Typography>
                           <Rating name="read-only" value={2} size='small' readOnly />
                           <Hr />
                           <Typography
                              variant='h5'>
                              {`N ${(product.price).toString()}`}
                           </Typography>
                           <p
                              style={{ textDecoration: 'line-through', color: 'gray', marginTop: '0px' }}>
                              {`N ${(product.price * 2).toString()}`}
                           </p>
                           <p>
                              {'+ free shipping to Nigeria'}
                           </p>
                     
                           <Hr />
                           {
                              (product.sizes.length > 1) && <Typography
                                 variant='h6'
                                 sx={{ marginBottom: '7px' }}>
                                 {'SIZES AVAILABLE'}
                              </Typography>

                           }
                           <Box>
                              {
                                 product.sizes.map((size) => {
                                    return <Span key={size}
                                       onClick={(e) => setSelectedSize(e.target.textContent)}
                                       style={{ border: '1px solid lightgray', margin: '4px', padding: '4px' }}>
                                       {size}
                                    </Span>
                                 })
                              }
                              
                           </Box>

                           {clicked ?
                              <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                                 <Button variant="contained"
                                    onClick={decreaseQuantity}
                                    sx={{ width: '30%', bgcolor: '#FF3366', mt: 3 }}>
                                    -
                                 </Button>
                                 <Button>
                                    {qty}
                                 </Button>
                                 <Button variant="contained"
                                    onClick={increaseQuantity}
                                    sx={{ width: '30%', bgcolor: '#FF3366', mt: 3 }}>
                                    +
                                 </Button>
                              </div>
                              :
                              <Button variant="contained"
                                 onClick={() => {
                                    setClicked(true)
                                    dispatch(createCartItem(product, selectedSize, displayedImageUrl, qty))
                                 }}
                                 sx={{ width: '100%', bgcolor: '#FF3366', mt: 3 }}>
                                 Add to Cart
                              </Button>
                           }
                        </Grid>
                     </Grid>
                     <Box
                        sx={{ marginTop: '20px' }}
                     >
                        <Typography variant='h5' sx={{ padding: '8px', bgcolor: 'white', paddingLeft: '15px' }}>
                           Product details
                        </Typography>
                        <Typography variant="h6" sx={{ padding: '5px', bgcolor: 'white', paddingLeft: '15px', marginTop: '3px', fontSize: '18px'}}>
                           {product.description}
                        </Typography>
                     </Box>
                     <RecentlyViewed />

                  </Grid>
                  <Grid item xs={12} md={3} >
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

               </Grid>
            </Container>
         </Box>
      </>
   )
}



export default GetProduct