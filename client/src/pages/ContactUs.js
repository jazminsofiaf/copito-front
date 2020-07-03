import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import UpperBar from "../components/UpperBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class ContactUs extends React.Component{


    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <Toolbar />
                <Typography variant="h3" noWrap className={classes.mainTitle}>
                    Aca un formulario que  nos envia un mail
                </Typography>
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


export default withStyles(styles)(ContactUs);