import React from "react";
import UpperBar from "../../components/UpperBar";
import withStyles from "@material-ui/core/styles/withStyles";
import config from "../../config/config";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
const server_url = config.server_url;

class Providers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            providers: [],
        }
    }

    getProviders() {
        fetch(server_url +'/fake_providers/db', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                console.log(data.products);
                this.setState({
                    products : data.products,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    componentDidMount(){
        this.getProviders();
    }


    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <Toolbar />
                <Typography variant="h3" noWrap className={classes.mainTitle}>
                    Lista de proveedores
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


export default withStyles(styles)(Providers);
