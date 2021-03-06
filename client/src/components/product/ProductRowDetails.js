import React from 'react'
import './ProductRowDetails.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import bovinos from './resources/Bovinos.gif';
import caninos from './resources/Caninos.gif';
import felinos from './resources/Felinos.gif';
import caprinos from './resources/Caprinos.gif';
import equinos from './resources/Equinos.gif';
import ovinos from './resources/Ovinos.gif';
import porcinos from './resources/Porcinos.gif';
import AmountField from '../shared/AmountField'


function productHeader(props) {
    return (
        <>
            <div className="product-title">
                {props.product.presentation ?  props.product.name + " - " + props.product.presentation : props.product.name}
            </div>
            <div className="product-subtitle">
                {props.product.category ?  props.product.description + " - " + props.product.category : props.product.description}
            </div>
        </>
    )
}


function productPrice(price) {
    return (
        <div className="product-price">$ {price}</div>
    )
}

function getSpecies(species) {

    const row = species ? species : [] ;
    const images = row.map((specie) => {
        var imgSrc = specie == 'caninos'? caninos : specie == 'felinos' ? felinos : specie == 'bovinos' ? bovinos : specie == 'equinos' ? equinos : specie == 'ovinos' ? ovinos : specie == 'porcinos' ? porcinos : caprinos; 
        return <img key={imgSrc} src={imgSrc} alt={specie} title={specie}/>
    }
    )
    return (
        <div>
            {images}
        </div>
    )
}

function ProductRowDetails(props) {
    const product = props.product;
    const addToCart = props.onClick;

    return (
        <Paper className="product-box">
            <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                    <img src={props.product.thumbnail} className="product-img" />               
                </Grid>
                <Grid item xs={12} sm={9} style={{textAlign:"left"}} container >
                        <Grid item xs={12} sm={9}>{productHeader(props)}</Grid>
                        <Grid item xs={12} sm={3}>{productPrice(product.price)}</Grid>
                        <Grid item xs={12} sm={9}>{product.brand}</Grid>
                        <Grid item xs={12} sm={3}>{product.stock}</Grid>
                        <Grid item xs={6} sm={9}>{getSpecies(product.species)}</Grid>
                        <Grid item xs={6} sm={3}>{AmountField({product, addToCart})}</Grid>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ProductRowDetails;