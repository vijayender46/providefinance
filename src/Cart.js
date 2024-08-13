
import React from 'react';
import {
    Button,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearCart } from './redux/cartSlice';

function Cart({ text='Browse the items in your cart and then click Checkout', mode='browse' }) {
    const products = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleConfirmOrder = () => {
        dispatch(clearCart());
        alert('Order confirmed! Your cart is now empty.');
        navigate(-1);
      };

    const originalTotalPrice = products.reduce((total, product) => {
        return total + product.price * product.quantity;
    }, 0);

    const discountedTotalPrice = products.reduce((total, product) => {
        const discountAmount = (product.price * product.discountPercentage) / 100;
        const discountedPrice = product.price - discountAmount;
        return total + discountedPrice * product.quantity;
    }, 0);
    
    return (
        <div>
            <h1>Shopping Cart</h1>
            <p>{text}</p>
            <List>
                {
                    products
                        .map(product =>
                            <ListItem key={product.id}>
                                <ListItemText primary={product.title} secondary={'Quantity: ' + product.quantity}/>
                            </ListItem>
                        )
                }
            </List>
            <div>
                Total Price: <strike>{originalTotalPrice}</strike><br />
                Total Price after Discount : {(discountedTotalPrice).toFixed(2)}
            </div>
            {mode === 'browse' ? (
                <Link style={{marginBottom: 10}} to={'/checkout'} variant={'contained'}><Button>Checkout</Button></Link>
            ) : (
               <Button onClick={()=>handleConfirmOrder()}>confirm Order</Button>
            )}
        </div>
    )
}

export default Cart;