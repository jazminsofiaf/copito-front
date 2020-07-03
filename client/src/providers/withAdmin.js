import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

var authToken = require('../providers/authToken');

export default function withAdmin(ComponentToProtect) {
    return class extends Component {
        constructor() {
            super();
            this.state = {
                loading: true,
                redirect: false,
            };
        }
        componentDidMount() {
            if(authToken.getToken() === 'admin')
                this.setState({ loading: false });
            else
                this.setState({ loading: false, redirect: true });
            {/*
            fetch('localhost:10010/api/checkToken',{
               headers: {
               'Authorization': authToken.getToken(),
             },
             })
               .then(res => {
                 if (res.status === 200) {
                   this.setState({ loading: false });
                 } else {
                   const error = new Error(res.error);
                   throw error;
                 }
               })
               .catch(err => {
                 console.error(err);
                 this.setState({ loading: false, redirect: true });
               });
              */}
        }

        render() {
            const { loading, redirect } = this.state;
            if (loading) {
                return null;
            }
            if (redirect) {
                return <Redirect to="/login" />;
            }
            return (
                <React.Fragment>
                    <ComponentToProtect {...this.props} />
                </React.Fragment>
            );
        }
    }
}