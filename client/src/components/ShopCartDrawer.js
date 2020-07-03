import React from "react";
import clsx from "clsx";
import { makeStyles} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import useTheme from "@material-ui/core/styles/useTheme";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import MuiAlert from '@material-ui/lab/Alert';

var authToken = require('../providers/authToken');



export default function ShopCartDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();
    const isLogged =  !(authToken.getToken() === null);
    const isDesktop = window.innerWidth > 900;
    const [open, setOpen] = React.useState(isDesktop);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        if(isDesktop){
            //si es desktop no se puede cerrar
            return;
        }
        setOpen(false);
    };

    const getSum = () => {
        return Object.entries(props.cart).map( ([productId, cant]) =>{
            const p = props.products.filter(product => product.id == productId).map(prod => prod.price);
            return cant * p;
        }).reduce((price1, price2) => price1 + price2, 0) + '$'
    }

    const renderCartIcons = () => {
        return (<div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="caption table">
                    <TableBody>
                        {props.products.map(product => {
                            if (props.cart[product.id] !== undefined)
                                return (
                                    <TableRow key={product.name}>

                                        <TableCell align="right">{props.cart[product.id] + 'x'}</TableCell>
                                        <TableCell align="right">{product.name}</TableCell>
                                        <TableCell align="right"> {product.price + '$' }</TableCell>
                                        <TableCell align="right">{product.price * props.cart[product.id] + '$' }</TableCell>
                                    </TableRow>)
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            { Object.keys(props.cart).length > 0 &&
            (<ListItem key={'total'}>
                <ListItemText style={{flexGrow:1}}>
                    TOTAL
                </ListItemText>
                <ListItemText style={{flexGrow:0}}>
                    {
                        getSum()
                    }
                </ListItemText>
            </ListItem>)}
        </div>)

    }

    const renderMustLogInMessage = () =>{
        return (
            <Box p={4} m={4}>
                <MuiAlert elevation={6} variant="filled" severity="info"> {'\u2728'} Hola! {'\u270b'}  Si quieres agregar productos a tu carrito inicia sesion primero {'\u{1f60a}'}  </MuiAlert>
            </Box>)
    }

    const renderDrawerContent = () =>{
        if( isLogged){
            return renderCartIcons();
        }
        return renderMustLogInMessage();
    }

    return (

        <div className={classes.root}>
            <div style={{flexGrow:1}}>
                <main className={clsx(classes.content, {[classes.contentShift]: open})} >
                    {props.children}
                </main>
            </div>
            <div>
                <Box  mr={0} bgcolor={theme.palette.secondary.main} style={{borderRadius: '25px 0px 0px 25px'}} >
                    <IconButton
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(open && classes.hide)}
                    >
                        <ShoppingCartIcon/>
                    </IconButton>
                </Box>
            </div>
            {(
                open &&
                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="right"
                    open={open}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <Toolbar  className={classes.drawerHeader}/>
                    <div className={classes.drawerHeader}>
                        {!isDesktop &&
                        (<IconButton onClick={handleDrawerClose} className={classes.icon}>
                            <ChevronRightIcon />
                        </IconButton>)
                        }
                        <Typography  variant="h6" className={classes.drawerTitle}>
                            Carrito de compras
                            <ShoppingCartIcon/>
                        </Typography>

                    </div>
                    <Divider />
                    {
                        renderDrawerContent()
                    }
                </Drawer>
            )}
        </div>

    );
}


const drawerWidth = '25%';
const drawerWidthMobile = '100vw'
const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        width:'100vw',
    },
    shopIconBarContent:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginRight: 0,
        paddingRight: 0,
    },
    icon: {
        color:'white',
    },
    hide: {
        display: "none"
    },
    drawer: {
        flexShrink: 0,
        [theme.breakpoints.down("sm")]: {
            width: drawerWidthMobile,
            marginTop: theme.spacing(3),
        }
    },
    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.down("sm")]: {
            width: drawerWidthMobile,
        }

    },
    drawerHeader: {
        backgroundColor: theme.palette.secondary.main,
        display: "flex",
        alignItems: "center",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: "flex-start"
    },
    drawerTitle: {
        backgroundColor: theme.palette.secondary.main,
        flexGrow:1,
    },

    content: {
        //cuando esta cerrado el drower (solo en mobile)
        [theme.breakpoints.down("sm")]: {
            marginLeft: '7%',
        }

    },
    contentShift: {
        //cuando esta abierto el drower
        marginRight: '25%',
        [theme.breakpoints.down("sm")]: {
            display: 'none',
        }
    }
}));
