import React, { Component } from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid';


const styles = { boxShadow: '5px 5px 3px lightgray', border: '1px solid gray', marginTop: '10px' ,
 borderRadius: '3px', background: 'white' }

class CartItem extends Component {
    constructor(props) {
        super(props)

        this.state = { qty: this.props.cartDetail.qty }
        this.increaseQuantity = this.increaseQuantity.bind(this)
        this.decreaseQuantity = this.decreaseQuantity.bind(this)

    }

  
    componentDidMount() {
    this.props.setSubtotal(this.props.subtotal +(this.props.cartDetail.price * this.state.qty))
    console.log(this.props.subtotal)
    }
    increaseQuantity(values) {
        this.setState(prevState => ({ qty: prevState.qty + 1 }))
        this.props.setSubtotal(this.props.subtotal + this.props.cartDetail.price  )
        this.props.updateItem(values, this.state.qty + 1)
    }
    decreaseQuantity(values) {
        this.setState((prevState) => ({ qty: prevState.qty - 1 }))
        this.props.setSubtotal(this.props.subtotal - this.props.cartDetail.price  )
        this.props.updateItem(values, this.state.qty - 1)

    }
    render() {
        const {_id,name, image, size, price} = this.props.cartDetail
        return (
            <Grid container spacing={1} key={name} sx={styles} >
                <Grid item xs={12} md={2} >
                    <img src={image} style={{ margin: '0', width: '90%', height: '100%' }} alt='selectedImage' />


                </Grid>
                <Grid item xs={12} md={10} sx={{ display: 'flex', justifyContent: 'space-between', padding: '4px', position: 'relative' }}>
                    <Box sx={{}} >
                        <Typography variant="h6" marked="center" sx={{ fontSize: '18px' }} >
                            {name}
                        </Typography>
                        {size && <Typography variant="h6" marked="center" sx={{ fontSize: '18px' }}>
                            {`SIZE: ${size}`}
                        </Typography>
                        }
                        <Button
                            variant="filled" startIcon={<DeleteOutlinedIcon />}
                            onClick={() => this.props.deleteItem(_id)}
                            sx={{ color: '#FF3366', padding: '2px 6px', position: 'absolute', bottom: '10px' }}>
                            Remove
                        </Button>
                    </Box>
                    <span style={{ marginRight: '5px' }}>
                        <Typography variant="h6" marked="center"
                            sx={{ float: 'right' }} >
                            {`N${price}`}
                        </Typography>
                        <div style={{ marginTop: '70%' }}>
                            <ButtonGroup size='small' aria-label='small outlined button group'>
                               
                               
                               <Button
                                    variant="filled"
                                    onClick={() => this.decreaseQuantity(this.props.cartDetail)}
                                    sx={{ color: '#FF3366', padding: '2px 2px', border: '1px solid #FF3366' }}>
                                    -
                                </Button>
                               
                                <Button disabled
                                    variant="filled"
                                    sx={{ color: '#FF3366', padding: '2px 2px', border: '1px solid #FF3366' }}
                                >
                                    {this.state.qty}
                                </Button>
                                <Button
                                    variant="filled"
                                    onClick={() => this.increaseQuantity(this.props.cartDetail)}
                                    sx={{ color: '#FF3366', padding: '2px 2px', border: '1px solid #FF3366' }}>
                                    +
                                </Button>
                            </ButtonGroup>
                        </div>

                    </span>
                </Grid>
            </Grid>
        )
    }

}

export default CartItem