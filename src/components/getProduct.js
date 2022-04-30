import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import fetchProduct from '../actions/action_fetchProduct'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import AppAppBar from '../onepirate/modules/views/AppAppBar';



const GetProduct = () => {
    const { id } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(fetchProduct(id))
    })

    const product = useSelector(({ products }) => {
        return products[id]
    })

    return (
        <>
            <AppAppBar />
            <Box
                component="section"
                sx={{ display: 'flex', overflow: 'hidden', bgcolor: 'lightgray' }}
            >
                <Container sx={{ mt: 5 }} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={3} >
                            <img
                                style={{ display: 'none' }}
                                src={product.images[0]}
                                alt="product"
                            />

                        </Grid> 
                        <Grid 
                            item xs={12} md={9}
                            sx={{padding:'5px'}}
                        >
                            <Typography >
                                {product.name}
                            </Typography>
                            <Typography
                                variant='h5'>
                                {`N ${(product.price).toString()}`}
                            </Typography>
                            {
                                product.sizes.map((size) => {
                                  return  <span style={{}} >{size}</span>
                              
                                })
                            }
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    )
}



export default GetProduct