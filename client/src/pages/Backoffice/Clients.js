import React from "react";
import UpperBar from "../../components/UpperBar";
import config from "../../config/config";
import Toolbar from "@material-ui/core/Toolbar";
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {Box} from "@material-ui/core";
import SearchFilter from "../../components/SearchFilter";
import Paper from "@material-ui/core/Paper";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
import withStyles from "@material-ui/core/styles/withStyles";

//const server_url = config.server_url;
class Clients extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            clients: [],
            search: '',

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

    handleTextChange= name => event => {
        this.setState({ search : event.target.value });
    };



    render() {
        const { classes } = this.props;
        return(
            <div className={classes.root}>
                <UpperBar/>
                <Box className={classes.screenSize}>
                    <Toolbar />
                    <Box className={classes.container}>
                        <SearchFilter
                            stateKey="search"
                            search={this.state.search}
                            onTextChange={this.handleTextChange.bind(this)}
                        />
                        <Paper elevation={3} >
                            <List>
                                {this.state.clients.map((client, i )=> {
                                    if((client.name.toLowerCase().includes(this.state.search.toLowerCase())) ||
                                        (client.lastName.toLowerCase().includes(this.state.search.toLowerCase())) ||
                                        (client.businessName.toLowerCase().includes(this.state.search.toLowerCase())))

                                        return(
                                        <div key={i}>
                                            <ListItem alignItems='center' >
                                                <ListItemAvatar>
                                                    <Avatar className={classes.avatar}/>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={client.name + ' '+ client.lastName}
                                                    secondary={
                                                        <React.Fragment>
                                                            {client.businessName}
                                                        </React.Fragment>
                                                    }
                                                />
                                                <ListItemSecondaryAction>
                                                    <IconButton edge="end" aria-label="see">
                                                        <ZoomInIcon />
                                                    </IconButton>
                                                </ListItemSecondaryAction>
                                            </ListItem>
                                            <Divider variant="inset" component="li" />
                                        </div>
                                    )
                                })}
                            </List>
                        </Paper>
                    </Box>
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
    container: {
        width:'75%',
        margin: 'auto',
        marginTop: '3%',
        alignItems: 'center',
        [theme.breakpoints.down("sm")]: {
            width: '100%',
        }
    },
    avatar: {
        color: theme.palette.getContrastText(theme.palette.primary.main),
        backgroundColor: theme.palette.primary.main,
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
});


export default withStyles(styles)(Clients);
