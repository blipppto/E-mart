import React from 'react'
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const SimilarProducts = (props) => {

    return (
        <Box>
            <Typography variant="h6" sx={{ mt: 3,mb:0.5, padding: '8px', bgcolor: 'white', paddingLeft: '15px'}}>
                Customers also viewed these
            </Typography>
            
                <Grid container spacing={1}>
                    {
                        props.similarProducts.map( (product) => {
                            return <Grid item xs={6} md={3} key={product._id}>
                                <Card
                                    sx={{ borderRadius: 2, padding: '5px' }}
                                >
                                    <CardActionArea
                                        sx={{ height: '90%' }}
                                        href={`/${product._id}`}>
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
                                </Card>

                            </Grid>
                        })
                    }
                </Grid>
            
        </Box>
    )
}

export default SimilarProducts