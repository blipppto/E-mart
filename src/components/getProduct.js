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
import Rating from '@mui/material/Rating';
import RecentlyViewed from './recentlyViewed'
import SimilarProducts from './similarProducts'
import { useCreateCartItem } from '../actions/action_createCartItem'
import {useUpdateCartItem} from '../actions/action_updateCartItem'
import { convertToValidPrice } from './getProductsUnderCategory'
import ResponsiveAppBar from './navBar'
import Footer from './footer'
import { StyledEngineProvider } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import NaijaStates from 'naija-state-local-government'
import { useAlert } from 'react-alert'

const item = {
   display: 'flex',
   flexDirection: 'column',
   background: 'white',
   p: 2
};

const Hr = styled.hr`
width:100%;
background-color:#f5f5f5;

`
const sizeStyles = { border: '1px solid lightgray', margin: '4px', padding: '4px' }

const GetProduct = () => {
   const { id } = useParams()
   const dispatch = useDispatch()
   const [displayedImageUrl, setDisplayedImageUrl] = useState('')
   const [selectedSize, setSelectedSize] = useState(null)
   const [qty, setQty] = useState(1)
   const [similarProducts, setSimilarProducts] = useState(null)
   const [state, setState] = React.useState('');
   const [lga, setLga] = React.useState('');
   const alert = useAlert()
   const createCartItem = useCreateCartItem()
   const updateCartItem = useUpdateCartItem()


   const handleChange = (event) => {
      setState(event.target.value);
   };

   const handleLgaChange = (event) => {
      setLga(event.target.value);
   };


   useEffect(() => {
      dispatch(fetchProduct(id))

   }, [ dispatch, id])


   const product = useSelector(({ fetchedProducts }) => {
      return fetchedProducts[id]
   })
   const cartItem = useSelector(({ cart }) => {
      return cart[id]
   })

   const increaseQuantity = () => {
      setQty(qty + 1)
      dispatch(updateCartItem(cartItem, qty + 1))
   }

   const decreaseQuantity = () => {
      setQty(qty - 1)
      dispatch(updateCartItem(cartItem, qty - 1))
   }

   useEffect(() => {
      if (!product) return
      setDisplayedImageUrl(product.images[0])
      setSimilarProducts(product.similarProducts)    
   }, [product])




   if (!product) return <div>loading...</div>

   const { name, price, images, sizes, description } = product

   return (
      <StyledEngineProvider injectFirst>
         <ResponsiveAppBar />
         <Box sx={{ background: '#f5f5f5', marginTop: '72px', padding: '10px' }}>
            <Link to='/'><span>Home</span></Link> {'>'} <Link to={`/category/?category=${encodeURIComponent(product.category)}`}><span>{product.category}</span></Link> {'> '}
            <span>{name}</span>

            <Container sx={{ paddingTop: '20px' }}>
               <Grid container spacing={1.5}>
                  <Grid item xs={12} md={9} >
                     <Grid container >
                        <Grid item xs={12} md={4} sx={{ display: { md: 'block', xs: 'flex' }, height: { md: 'inherit', xs: '50vh' }, overflowX: { xs: 'scroll', md: 'unset' } }}>
                           <img src={displayedImageUrl} className='picture' alt='selectedImage' />
                           {
                              images.map((imageUrl) => {
                                 return <img key={imageUrl} onClick={() => setDisplayedImageUrl(imageUrl)} src={imageUrl} className='backup' alt='other images' />

                              })
                           }

                        </Grid>
                        <Grid item xs={12} md={8} sx={{ padding: '10px', bgcolor: 'white' }}>
                           <Typography variant="h5" marked="center" >
                              {name}
                           </Typography>
                           <Rating name="read-only" value={product.rating} precision={0.1} size='small' readOnly />
                           <Hr />
                           <Typography
                              variant='h5'>
                              {convertToValidPrice(price)}
                           </Typography>
                           <p
                              style={{ textDecoration: 'line-through', color: 'gray', marginTop: '0px' }}>
                              {convertToValidPrice(price * 2)}
                           </p>
                           <p>
                              {'+ free shipping to Nigeria'}
                           </p>

                           <Hr />
                           {
                              (sizes.length > 1) && <Typography
                                 variant='h6'
                                 sx={{ marginBottom: '7px' }}>
                                 {'SIZES AVAILABLE'}
                              </Typography>

                           }
                           <Box>
                              {
                                 sizes.map((size) => {
                                    return <span key={size}
                                    className='size'
                                       onClick={(e) => {
                                          alert.show('size selected')
                                          setSelectedSize(e.target.textContent)}}
                                       style={sizeStyles}>
                                       {size}
                                    </span>
                                 })
                              }

                           </Box>

                           {!cartItem ?
                              <Button variant="contained"
                                 onClick={() => {
                                    dispatch(createCartItem(product, selectedSize, displayedImageUrl, qty))
                                 }}
                                 sx={{ width: '100%', bgcolor: '#FF3366', mt: 3, '&:hover': { bgcolor: '#FF3366' } }}>
                                 Add to Cart
                              </Button>
                              :
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                 {(cartItem.qty > 1) && <Button variant="contained"
                                    onClick={decreaseQuantity}
                                    sx={{ width: '30%', bgcolor: '#FF3366', mt: 3, '&: hover': { bgcolor: '#FF3366' } }}>
                                    -
                                 </Button>
                                 }
                                 <Button variant="contained"
                                    sx={{ width: '30%', bgcolor: 'white', mt: 3, boxShadow: 'none', color: 'gray' }}>
                                    {cartItem.qty + ' item(s)'}
                                 </Button>
                                 <Button variant="contained"
                                    onClick={increaseQuantity}
                                    sx={{ width: '30%', bgcolor: '#FF3366', mt: 3, '&: hover': { bgcolor: '#FF3366' } }}>
                                    +
                                 </Button>
                              </div>

                           }
                        </Grid>
                     </Grid>
                     <Box
                        sx={{ marginTop: '20px' }}
                     >
                        <Typography variant='h5' sx={{ padding: '8px', bgcolor: 'white', paddingLeft: '15px' }}>
                           Product details
                        </Typography>
                        <Typography variant="h6" sx={{ padding: '5px', bgcolor: 'white', paddingLeft: '15px', marginTop: '3px', fontSize: '18px' }}>
                           {description}
                        </Typography>
                     </Box>


                  </Grid>
                  <Grid item xs={12} md={3} >
                     <Typography variant="h6" sx={{ mb: 0.5, padding: '8px', bgcolor: 'white', paddingLeft: '15px' }}>
                        DELIVERY & RETURNS
                     </Typography>
                     <Box sx={item}>
                        <Typography variant='h6' >Choose a location</Typography>
                        <FormControl fullWidth sx={{ my: 2 }}>
                           <InputLabel id="demo-simple-select-label">state</InputLabel>
                           <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={state}
                              label="state"
                              onChange={handleChange}
                           >
                              {
                                 NaijaStates.states().map((state) => {
                                    return <MenuItem key={state} value={state}>{state}</MenuItem>
                                 })
                              }
                           </Select>
                        </FormControl>
                        <FormControl fullWidth >
                           <InputLabel id="demo-simple-select-label-lga">LGA</InputLabel>
                           <Select
                              labelId="demo-simple-select-label-lga"
                              id="demo-simple-select"
                              value={lga}
                              label="lga"
                              onChange={handleLgaChange}
                           >
                              {
                                 state && NaijaStates.lgas(state).lgas.map((lga) => {
                                    return <MenuItem key={lga} value={lga}>{lga}</MenuItem>
                                 })
                              }

                           </Select>
                        </FormControl>

                     </Box>

                  </Grid>



               </Grid>
               <RecentlyViewed />
               <SimilarProducts products={similarProducts} />
            </Container>
         </Box>
         <Footer />
      </StyledEngineProvider>
   )
}



export default GetProduct