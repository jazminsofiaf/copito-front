import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import ProductList from "../Products";

class AdminProducts extends React.Component{

    componentDidMount(){
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <ProductList/>
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
    },
    mainTitle:{
        marginTop: '300px',
    }

});


export default withStyles(styles)(AdminProducts);
