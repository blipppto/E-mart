import React, { useState, useEffect} from 'react'
import AppAppBar from '../onepirate/modules/views/AppAppBar'
import { Link,useNavigate } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './cartItem'
import deleteCartItem from '../actions/action_deleteCartItem';
import updateCartItem from '../actions/action_updateCartItem'
import { findNoOfItems } from '../onepirate/modules/views/AppAppBar'
import { convertToValidPrice } from './getProductsUnderCategory';
import checkoutCart from '../actions/action_cartCheckout'
import ResponsiveAppBar from './navBar'
import { usePaystackPayment } from 'react-paystack';
import withRoot from '../onepirate/modules/withRoot'

import _ from 'lodash'




const Cart = () => {
    const dispatch = useDispatch()
    const [subtotal, setSubtotal] = useState(0)
    const navigate = useNavigate()

  
    const cart = useSelector(({ cart }) => {
        return cart
    })

    const user = useSelector(({ user }) => {
        return user
    })

    const config = {
        reference: (new Date()).getTime().toString(),
        email: 'user@example.com',
        amount: subtotal,
        publicKey: 'pk_test_9d7b698bcdd1df2ec4aa09fbd7bf111be937b333',
      };

      const onSuccess = (reference) => {
        // Implementation for whatever you want to do with reference and after success call.
        console.log(reference);
      };
    
      // you can call this function anything
      const onClose = () => {
        // implementation for  whatever you want to do when the Paystack dialog closed.
        console.log('closed')
      }
    
      const PaystackHookExample = () => {
          const initializePayment = usePaystackPayment(config);
          return (
            <div>
                <button onClick={() => {
                    initializePayment(onSuccess, onClose)
                }}>Paystack Hooks Implementation</button>
            </div>
          );
      };

    useEffect(() => {
        let total = 0
        _.map(cart, cartItem => {
        total += (cartItem.price * cartItem.qty)

        })
        setSubtotal(total)
    },[cart])


    const cartCheckingOut = () => {
        if(!user.isLoggedIn)return navigate('/signIn')
        const {email, firstName, lastName} = user
        dispatch(checkoutCart(email, firstName, lastName, subtotal))
    }

    const deleteItem = (id) => {
        dispatch(deleteCartItem(id))
    }

    const updateItem = (cartItem, qty) => {
        dispatch(updateCartItem(cartItem, qty))
    }

    if (Object.keys(cart).length === 0) return (
        <div>
            <AppAppBar />
            <Box sx={{ display: 'flex', marginTop: '10%',  alignItems: 'center', }}>
                <Container sx={{ paddingTop: '10px', width: '50%' }}>
                    <Typography variant="h6" sx={{ padding: '8px', bgcolor: 'white',background: '#f5f5f5' }}>
                        There is no item in the cart at the moment.
                    </Typography>
                    <Link to='/'>
                    <Button variant="contained"
                        sx={{ width: '100%', bgcolor: '#FF3366','&: hover':{bgcolor: '#FF3366'}}}>
                        Start shopping
                    </Button>
                    </Link>
                </Container>
            </Box>
        </div>
    )

    return (
        <div>
            <ResponsiveAppBar />
        
            <Box sx={{ marginTop: '72px', background: '#f5f5f5' }}>
                <Container sx={{ paddingTop: '10px' }}>
                    <Typography sx={{ padding: '10px', }}>
                        {`Cart(${findNoOfItems(cart)})`}
                    </Typography>

                    <Grid container spacing={2} sx={{dispaly: 'flex'}}>
                        <Grid item sm={12} md={9} >

                            {
                                _.map(cart, (cartItem) => {
                                    return <CartItem key={cartItem.name} cartDetail={cartItem}
                                        subtotal={subtotal} setSubtotal={setSubtotal}
                                        deleteItem={deleteItem} updateItem={updateItem} />
                                })
                            }

                        </Grid>
                        <Grid item xs={12} md={3} sx={{ padding: '4px', marginTop: '10px',order: {xs: '-1',md:'0'},}} >
                            <Box >
                                <Typography variant="h6" sx={{ padding: '8px', bgcolor: 'white', border: '1px solid #f5f5f5' }}>
                                    Cart Summary
                                </Typography>
                                <Typography variant="h6" sx={{ padding: '8px', bgcolor: 'white', border: '1px solid #f5f5f5' }}>
                                    Subtotal
                                    <span style={{ float: 'right' }}>
                                    {convertToValidPrice(subtotal)}
                                    </span>
                                </Typography>
                                <Button variant="contained"
                                    onClick={cartCheckingOut}
                                    sx={{ width: '100%', bgcolor: '#FF3366','&: hover':{bgcolor: '#FF3366'}, position:{xs: 'fixed',md: 'static'},bottom:'2px',right:'5px'}}>
                                    CHECKOUT
                                </Button>
                            </Box>
                            
                            
                        </Grid>

                    </Grid>
                </Container>
            </Box>
        </div>
    )
}

export default Cart


