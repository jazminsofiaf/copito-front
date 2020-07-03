import Typography from "@material-ui/core/Typography";

import React from "react";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import withStyles from "@material-ui/core/styles/withStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CardMedia from "@material-ui/core/CardMedia";
import {Divider} from "@material-ui/core";
import Button from "@material-ui/core/Button";


class ProductModal extends React.Component {

    constructor(props){
        super(props);
        const { product } = props
        this.state = {
            product: product,
        }

    }


    render(){
        const { classes} = this.props;
        return (
            <Dialog
                onClose={this.props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={this.props.open}
                maxWidth="lg"

            >
                <DialogContent  overflow="hidden" >
                    <Card className={classes.root}>
                        <CardMedia
                            className={classes.cover}
                            image={this.props.product.image}
                            title="Live from space album cover"
                        />
                        <div className={classes.details}>
                            <CardContent className={classes.content}>
                                <Typography component="h4" variant="h5" className={classes.mainTitle}>
                                    {this.props.product.name}
                                </Typography>
                                <Divider/>
                                <Typography component="h5" variant="h5">
                                    Informacion del producto
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    {this.props.product.description}
                                </Typography>
                                <div >
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        className={classes.button}
                                        startIcon={<ShoppingCartIcon />}
                                    >
                                        Agregar al carrito
                                    </Button>
                                </div>
                            </CardContent>
                        </div>
                    </Card>
                </DialogContent>
            </Dialog>
        );

    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        [theme.breakpoints.up("sm")]: {
            height:'70vh',
        },

    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
        [theme.breakpoints.up("sm")]: {
            width: '30vw',
        },

    },
    mainTitle: {
        color: theme.palette.primary.main,
        fontWeight: 900,
    },
});

export default withStyles(styles)(ProductModal);