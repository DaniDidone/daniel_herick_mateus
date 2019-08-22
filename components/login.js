import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";

import api from '../api'

class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: "",
            password: "",
        }
    }

    validateData = () => {
        if(this.validateForm()){
            api.get('/users?'+'name='+this.state.user+'&pass='+this.state.password)
            .then(response => {
                this.validateUser(response.data)
            })
        }
    }

    validateUser = (data) => {
        if(data.length){
            if(!data[0].inactive){
                console.log(data[0])
                localStorage.setItem('@dhm/token', data[0].id)
                window.location.reload();
            }else{
                console.log('User not found');
            }
        }else{
            console.log('User not found');
        }
    }

    validateForm = () => {
        return this.state.user.length > 0 && this.state.password.length > 0
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
            <div className="appLogin">
                <img className="appLogin-brand" src="/static/logo.png" alt="DataWare" />
                <form className="appLogin-form" onSubmit={this.handleSubmit}>
                    <FormGroup controlId="user">
                        <FormLabel>Nome</FormLabel>
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
                    <Button
                        block
                        disabled={!this.validateForm()}
                        type="submit"
                        >
                        Entrar
                    </Button>
                </form>
            </div>
        );
    }
}

export default Login;