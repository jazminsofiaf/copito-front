import React, { useState, useEffect } from 'react';
import CustomersList from './CustomersList'
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import UpperBar from "../UpperBar";
import axios from 'axios';
import CommonModal from '../shared/CommonModal'
import PaymentForm from '../payment/PaymentForm'

async function loadCustomers(props) {
    const options = {
        headers: {'Content-Type': 'application/json'}
    };
    try {
        return await axios.get("/profiles/summary", options)
        .then(function (response) {
            props.setCustomers(response.data.customers_summary);
          })
          .catch(function (error) {
            console.log(error);
          })
    } catch (error) {
        alert("Error, al buscar clientes");
    }  
}


function CustomerPage(props) {
    const { classes } = props;
    const [customers, setCustomers] = useState([]);
    const [selected, setSelected] = useState({})

    useEffect(() => { loadCustomers({ setCustomers }) }, [])

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    function clickPayment(customer) {
        setSelected(customer);
        setOpen(true);
    };

    const paymentForm = PaymentForm(selected.id);

    return (
        <>
            <UpperBar />
            <Container maxWidth="lg" className={classes.container}>
                <Typography variant="h3">Clientes</Typography>
                <CustomersList customers={customers} onClick={clickPayment}/>
            </Container>
            <CommonModal render={paymentForm} state={open} handleClose={handleClose} />
        </>
    )

}

const styles = theme => ({
    container: {
        marginTop: theme.spacing(16),
    },
});


export default withStyles(styles)(CustomerPage);