import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Grid, Button, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { addToCart } from './redux/cartSlice';
import axios from 'axios';

const ProductDetailPage = () => {
    const { id } = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProductDetails(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    const addItemToCart = () => {
        if (productDetails) {
            dispatch(addToCart(productDetails));
        }
    };

    if (loading) {
        return (
            <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
                <Typography variant="h5" color="text.secondary" align="center">
                    Loading product details...
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="md" sx={{ marginTop: '2rem' }}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Card>
                        <CardMedia
                            component="img"
                            height="400"
                            image={productDetails.thumbnail}
                            alt={productDetails.title}
                        />
                    </Card>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            {productDetails.title}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" paragraph>
                            {productDetails.description}
                        </Typography>
                        <Typography variant="h5" color="primary" paragraph>
                            ${productDetails.price}
                        </Typography>
                        <Button variant="contained" color="primary" onClick={addItemToCart}>
                            Add to Cart
                        </Button>
                    </CardContent>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ProductDetailPage;