import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import UpperBar from "../components/UpperBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

class Faq extends React.Component{

    componentDidMount(){
        //TODO buscar preguntas?
    }

    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <Toolbar />
                <Typography variant="h3" className={classes.mainTitle}>
                    Aca respuesta a : Como comprar? Como pagar? Hacen envios?
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


export default withStyles(styles)(Faq);