import React from 'react';
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";


class CartItem extends React.Component {


    constructor(props) {
        super(props);
    }

    render() {
        const {
            classes,
            count,
            product
        }  = this.props;
        return (
            <div className={classes.root}>
                <Paper elevation={3} />
            </div>
        );
    }
}

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(35),
            height: theme.spacing(16),
        },
    },
    card: {
        width: '90%',
    },


});

export default withStyles(styles)(CartItem);