import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
    "@global": {
        html: {
            fontSize: 16,
            [theme.breakpoints.up("sm")]: {
                fontSize: 14
            },
            [theme.breakpoints.up("md")]: {
                fontSize: 16
            },
            [theme.breakpoints.up("lg")]: {
                fontSize: 18
            }
        }
    }
});

const Application = withStyles(styles)(App);

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
