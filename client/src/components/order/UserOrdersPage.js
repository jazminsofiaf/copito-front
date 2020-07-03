import React, { useState, useEffect } from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../UpperBar";
import axios from 'axios';
import Orders from './Orders';
import BuildOrder from './BuildOrder'
import CommonModal from '../shared/CommonModal'

async function loadOrders(props) {
    // props.setOrders([{},{}]);
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        return await axios.get("/orders/users/complete", options)
        .then(function (response) {
            props.setOrders(response.data.order_list);
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar clientes");
    }  
}


function UserOrdersPage(props) {
    const { classes } = props;
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState()

    useEffect(() => { loadOrders({ setOrders }) }, [])

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };
    
    function handleBuild(order) {
        setSelectedOrder(order);
        setOpen(true);
    }

    const buildOrder = BuildOrder({selectedOrder, handleClose});

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Ordenes clientes</Typography>
                <Orders orders={orders} onClick={handleBuild}/>
            </Container>
            {selectedOrder ? <CommonModal render={buildOrder} state={open} handleClose={handleClose} /> : null}
        </>
    )

}

const styles = theme => ({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(UserOrdersPage);