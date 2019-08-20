import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

import Layout from '../components/layout'
import api from '../api'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            id: "",
            user: "",
            password: "",
        }
    }

    validateData = () => {
        if(this.validateForm()){
        api.post('/users', {
            name: this.state.user,
            pass: this.state.password,
            inactive: 0
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
            
        }
    }
    
    validateForm = () => {
        return this.state.user.length > 0 && this.state.password.length > 0 && parseInt(this.state.id) >= 0
    }
    
    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }
    
    handleSubmit = event => {
        event.preventDefault()
        this.validateData()
    }
    
    render() {
        return (
            <Layout>
                <div className="appLogin">
                    <form className="appLogin-form" onSubmit={this.handleSubmit}>
                        <FormGroup controlId="user">
                            <FormLabel>Usuário</FormLabel>
                            <FormControl
                                autoFocus
                                type="user"
                                value={this.state.user}
                                onChange={this.handleChange}
                            />
                        </FormGroup>
                        <FormGroup controlId="password">
                            <FormLabel>Senha</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup controlId="id">
                            <FormLabel>ID de usuário</FormLabel>
                            <FormControl
                                value={this.state.id}
                                onChange={this.handleChange}
                                type="number"
                            />
                        </FormGroup>
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                            >
                            Entrar
                        </Button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Login;