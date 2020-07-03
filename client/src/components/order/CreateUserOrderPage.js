import React, { useState, useEffect } from 'react';
import CartDrawer from '../cart/CartDrawer';
import ProductFilter from '../product/ProductFilter';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Autocomplete from '@material-ui/lab/Autocomplete';
import UpperBar from "../UpperBar";
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Loader from '../shared/Loader'


const orderEnpoint = '/orders';
const priceListEndpoint = '/price-list';

function getUserSelectionBox(props) {
    return (
        <Autocomplete
            id="users-box"
            options={props.profiles}
            getOptionLabel={(option) => option.name_summary + " - " + option.contact_summary}
            disabled={props.cartHasItems}
            onChange={(event, newValue) => {
                props.setUser(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Seleccionar cliente" variant="outlined" />}
        />
    )
}


async function uploadOrder(props) {
    props.setLoading(true);
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    props.cartItems.forEach((item) => item.name = undefined);
    const orderProducts = props.cartItems;
    const order = {
        order: {
            owner_id: props.user.id,
            products: orderProducts
        }
    }
    console.log(order);
    try {
        await axios.post(orderEnpoint, order, options);
        props.setSuccess(true);
        props.timer.current = setTimeout(() => {
            props.cleanPage();
            props.setLoading(false);
            props.setSuccess(false);
        }, 1500);
    } catch (error) {
        alert("Error, algo fallo al crear la orden.");
    }
}

async function getProductsForUser(props) {
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        await axios.get(priceListEndpoint + "/" + props.userId, options)
            .then(function (response) {
                props.setProducts(response.data.price_list);
            })
            .catch(function (error) {
                console.log(error);
            })
    } catch (error) {
        alert("Error, al buscar productos");
    }
}

async function loadProfiles(props) {
    const options = {
        headers: { 'Content-Type': 'application/json' }
    };
    try {
        return await axios.get("/profiles/summary", options)
            .then(function (response) {
                props.setProfiles(response.data.customers_summary);
            })
            .catch(function (error) {
                console.log(error);
            })
    } catch (error) {
        alert("Error, al buscar productos");
    }
}

function UserOrderPage() {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [profiles, setProfiles] = useState([{ 'name_summary': "No hay clientes disponibles" }]);
    useEffect(() => { loadProfiles({ setProfiles }) }, [])

    const timer = React.useRef();
    useEffect(() => {
        return () => {
            clearTimeout(timer.current);
        };
    }, []);

    const [user, setUser] = useState();
    const [products, setProducts] = useState();
    useEffect(() => {
        if (user && user.id) {
            const userId = user.id;
            getProductsForUser({ userId, setProducts });
        }
    }, [user]);

    const [cartItems, updateCart] = useState([]);

    function removeItem(itemToRemove) {
        updateCart(cartItems.filter(item => item.id !== itemToRemove.id));
    };

    function addItemToCart(props) {
        var added = false;
        cartItems.forEach((item) => {
            if (item.id == props.item.id && props.amount) {
                item.amount = parseInt(item.amount) + parseInt(props.amount);
                added = true;
            }
        });
        if (!added && props.amount && props.item.price) {
            updateCart(cartItems.concat([{ "id": props.item.id, "name": props.item.name, "amount": props.amount, "price": props.item.price }]));
        } else {
            updateCart([].concat(cartItems));
        }
    }

    var cartHasItems = cartItems.length > 0;

    function cleanPage() {
        setLoading(false);
        setSuccess(false);
        setUser(null);
        updateCart([]);
    }

    function createOrder() {
        if (cartHasItems)
            uploadOrder({ user, cartItems, setLoading, setSuccess, timer, cleanPage })
    }

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" style={{ marginTop: "6em" }}>
                <Typography variant="h3">Pedido de cliente</Typography>
                <Grid container spacing={1}>
                    <Grid item container style={{ backgroundColor: "#FDF0D5", borderRadius: '20px 20px 20px 20px', padding: '10px' }}>
                        <Grid item xs={12} sm={2}></Grid>
                        <Grid item xs={12} sm={8}>
                            <Paper>
                                {getUserSelectionBox({ setUser, cartHasItems, profiles })}
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {user ? <ProductFilter products={products} onClick={addItemToCart} /> : null}
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {user ? <CartDrawer elements={cartItems} onClick={{ createOrder, removeItem }} /> : null}
                    </Grid>
                </Grid>
                <Loader isLoading={loading} isSuccess={success}/>
            </Container>
        </>
    )
}

export default UserOrderPage;