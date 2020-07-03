import React from "react";
import UpperBar from "../../components/UpperBar";
import withStyles from "@material-ui/core/styles/withStyles";
import config from "../../config/config";
import Toolbar from "@material-ui/core/Toolbar";
import {Box} from "@material-ui/core";
import OptionsSelector from "../../components/OptionsSelector";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import ShopProducts from "../../components/ShopProducts";

//const server_url = config.server_url;


class ClientOrder extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            selectedClient: undefined,
        }
    }

    getClients() {
        fetch('https://my-json-server.typicode.com/jazminsofiaf/fake-client-endpoint/db', {
            method: 'get',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
            .then(data => {
                this.setState({
                    clients : data.clients,
                });
            })
            .catch((err) => {
                console.log(err)
            });
    }

    componentDidMount(){
        this.getClients();
    }

    handleClientSelected = (event, value) => {
        const client = value[0];

        this.setState({
            selectedClient: client,
        })

    }

    renderShopProducts(){
        const { classes } = this.props;
        if(this.state.selectedClient !== undefined){
            return (
                <div>
                    <Box className={classes.clientContainer} >
                    <Box m={3} className={classes.clientSelected} >
                        <Paper elevation={3}>
                            <ListItem alignItems='center' >
                                <ListItemAvatar>
                                    <Avatar className={classes.avatar}/>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={this.state.selectedClient.name + ' '+ this.state.selectedClient.lastName}
                                    secondary={
                                        <React.Fragment>
                                            {this.state.selectedClient.businessName}
                                        </React.Fragment>
                                    }
                                />
                            </ListItem>
                        </Paper>
                    </Box>
                    </Box>
                    <ShopProducts/>
                </div>
            );
        }


    }


    render() {
        const { classes } = this.props;

        const inputFilterFunc = (option) => (option.name +' '+option.lastName + ' ' +option.businessName);
        const renderClientOption = (client) => (
            <React.Fragment>
                <ListItemText primary={client.name + ' '+ client.lastName} secondary={client.businessName}/>
            </React.Fragment>
        )
        return(
            <div className={classes.root}>
                <UpperBar/>
                <Box className={classes.screenSize}>
                    <Toolbar />
                    {
                        (this.state.selectedClient === undefined)  && (<Box className={classes.selectClient}>

                        <Toolbar />
                        <OptionsSelector options={this.state.clients}
                                         filterFunc={inputFilterFunc}
                                         label={"Cliente"}
                                         handleOptionSelected={this.handleClientSelected.bind(this)}
                                         renderOption={renderClientOption}>
                        </OptionsSelector>
                    </Box>)
                    }
                    {this.renderShopProducts()}
                </Box>
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
    },
    screenSize: {
        width: '100vw',
        height:'100vh',
    },

    clientContainer:{
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.up("md")]: {
            //Tamano del drower
            marginRight: '25%',
        },
    },
    clientSelected:{
        width:'50%',
        [theme.breakpoints.down("sm")]: {
            width: '80%',
        }
    },
    selectClient: {
        width:'60%',
        alignItems: 'center',
        margin:'auto',
        [theme.breakpoints.down("sm")]: {
            width: '90%',
        }
    },
});


export default withStyles(styles)(ClientOrder);
