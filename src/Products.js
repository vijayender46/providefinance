import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Card, CardActions, CardContent, CardMedia, Grid, Typography} from "@mui/material";
import Divider from '@mui/material/Divider';
import Cart from "./Cart";
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';
import { getProductsSuccess } from './redux/productsSlice';

const ProductList = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([])
    useEffect( ()=> {
        axios.get(`https://dummyjson.com/products?limit=20&skip=20`)
            .then(res => {
                const products = res.data.products;
                console.log(products);
                setProducts(products);
                dispatch(getProductsSuccess(products))
            })
    }, [dispatch])

    const addItemToCart = (product) => {
        dispatch(addToCart(product));
    }
        return (
            <div>
                <Cart />
                <Divider />
                <h1>Products</h1>
                <Grid container
                      spacing={2}
                      direction="row"
                      justifyContent="space-evenly"
                      alignItems="center">
                    {
                        products.map(product =>
                            
                                <Grid item key={product.id}>
                                    <Card>
                                        <CardMedia
                                            component="img"
                                            height="120"
                                            image={product.thumbnail}
                                            alt={product.title}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="div">
                                                {product.title}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button size="small" onClick={() => addItemToCart(product)}>Add to Cart</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            )
                    }
                </Grid>
            </div>
        )
    }

export default ProductList;