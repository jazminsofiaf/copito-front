import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom';
import './App.css';
import { MuiThemeProvider, createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Home from "./pages/Home";
import Products from "./pages/Products";
import SignIn from "./pages/SignIn";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ContactUs from "./pages/ContactUs";
import Faq from "./pages/Faq";
import Clients from "./pages/Backoffice/Clients";
import AdminProducts from "./pages/Backoffice/AdminProducts";
import Providers from "./pages/Backoffice/Providers";
import ClientOrder from "./pages/Backoffice/ClientOrder";
import CssBaseline from "@material-ui/core/CssBaseline";
import withAdmin from "./providers/withAdmin";
import Presentation from "./pages/Presentation"
import CreateUserOrderPage from './components/order/CreateUserOrderPage';
import UserOrdersPage from './components/order/UserOrdersPage';
import SupplierOrderPage from './components/supplierOrder/SupplierOrderPage';
import SupplierOrders from './components/supplier/SupplierOrders';
import NewCustomer from './pages/NewCustomer'
import CustomerPage from './components/customer/CustomersPage';
import { AuthProvider } from "./providers/Auth";
import PrivateRoute from './providers/PrivateRoute'

let theme = createMuiTheme({
    palette: {
        type: 'light',
        background: {
            default: '#FFFAF0',
        },
        primary: {
            main: '#f2513f',
        },
        secondary: {
            main: '#25a1ba',
        },
        text: {
            // primary: '#424B54',
        }
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    spacing: 5,
    typography: {
        useNextVariants: true,
        h3: {
            fontWeight: 2000,
        },
        subtitle1: {
            fontSize: 20,
            fontWeight: 500,
            fontStyle: 'italic',
        },
    },
});
theme = responsiveFontSizes(theme);

export default class App extends Component {


    componentDidMount() {
        document.title = "Florida productos veterinarios"
    }


    render() {

        return (
            <div className="App">
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <AuthProvider>
                        <Router>
                            <div>
                                <Switch>
                                    <Route exact path="/" component={Presentation} />
                                    <Route exact path="/faq" component={Faq} />
                                    <Route exact path="/home" component={Home} />
                                    <Route exact path="/login-deperec" component={SignIn} />
                                    <Route exact path="/sign-up" component={SignUp} />
                                    <Route exact path="/login" component={Login} />
                                    <Route exact path="/new-customer" component={NewCustomer} />
                                    <Route exact path="/customers" component={CustomerPage} />
                                    <Route exact path="/products" component={Products} />
                                    <Route exact path="/new-order" component={CreateUserOrderPage} />
                                    <PrivateRoute exact path="/users-orders" component={UserOrdersPage} />
                                    <Route exact path="/supplier-order" component={SupplierOrderPage} />
                                    <Route exact path="/supplier-orders" component={SupplierOrders} />
                                    <Route exact path="/contact-us" component={ContactUs} />
                                    <Route exact path="/backoffice/clients" component={withAdmin(Clients)} />
                                    <Route exact path="/backoffice/products" component={withAdmin(AdminProducts)} />
                                    <Route exact path="/backoffice/providers" component={withAdmin(Providers)} />
                                    <Route exact path="/backoffice/client-order" component={withAdmin(ClientOrder)} />
                                    <Route component={Home} />
                                </Switch>
                            </div>
                        </Router>
                    </AuthProvider>
                </MuiThemeProvider>
            </div>
        );
    }
}

