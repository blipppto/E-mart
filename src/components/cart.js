import React, { useState } from 'react'
import AppAppBar from '../onepirate/modules/views/AppAppBar'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux'
import CartItem from './cartItem'
import deleteCartItem from '../actions/action_deleteCartItem';
import updateCartItem from '../actions/action_updateCartItem'
import { findNoOfItems } from '../onepirate/modules/views/AppAppBar'
import _ from 'lodash'




const Cart = () => {
    const dispatch = useDispatch()
    const [subtotal, setSubtotal] = useState(0)
    let cart

    const getCart = useSelector(({ cart }) => {
        return cart
    })

    if (Object.keys(getCart).length > 0) {
        cart = getCart
    } else {
        cart = JSON.parse(window.localStorage.getItem('cart'))

    }

    const deleteItem = (id) => {
        dispatch(deleteCartItem(id))
    }
    const updateItem = (cartItem, qty) => {
        dispatch(updateCartItem(cartItem, qty))
    }

    if (!cart) return (
        <div>
            <AppAppBar />
            <Box sx={{ display: 'flex', marginTop: '10%',  alignItems: 'center', }}>
                <Container sx={{ paddingTop: '10px', width: '50%' }}>
                    <Typography variant="h6" sx={{ padding: '8px', bgcolor: 'white',background: '#f5f5f5' }}>
                        There is no item in cart at the moment.
                    </Typography>
                    <Link to='/'>
                    <Button variant="contained"
                        sx={{ width: '100%', bgcolor: '#FF3366' }}>
                        Start shopping
                    </Button>
                    </Link>
                </Container>
            </Box>
        </div>
    )

    return (
        <div>
            <AppAppBar />
            <Box sx={{ marginTop: '72px', background: '#f5f5f5' }}>
                <Container sx={{ paddingTop: '10px' }}>
                    <Typography sx={{ padding: '10px', }}>
                        {`Cart(${findNoOfItems(cart)})`}
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12} md={9} >

                            {
                                _.map(cart, (cartItem) => {
                                    return <CartItem key={cartItem.name} cartDetail={cartItem}
                                        subtotal={subtotal} setSubtotal={setSubtotal}
                                        deleteItem={deleteItem} updateItem={updateItem} />
                                })
                            }

                        </Grid>
                        <Grid item xs={12} md={3} sx={{ padding: '4px', marginTop: '10px' }} >
                            <Box sx={{}}>
                                <Typography variant="h6" sx={{ padding: '8px', bgcolor: 'white', border: '1px solid #f5f5f5' }}>
                                    Cart Summary
                                </Typography>
                                <Typography variant="h6" sx={{ padding: '8px', bgcolor: 'white', border: '1px solid #f5f5f5' }}>
                                    Subtotal
                                    <span style={{ float: 'right' }}>
                                    {`N${subtotal}`}
                                    </span>
                                </Typography>
                                <Button variant="contained"
                                    sx={{ width: '100%', bgcolor: '#FF3366' }}>
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