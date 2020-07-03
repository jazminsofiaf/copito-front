import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import UpperBar from "../components/UpperBar";
import withStyles from "@material-ui/core/styles/withStyles";
import ShopProducts from "../components/ShopProducts";



class Products extends React.Component{

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <div>
                    <Toolbar/>
                    <Toolbar/>
                    <ShopProducts/>
                </div>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
});


export default withStyles(styles)(Products);
