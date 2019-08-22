import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

import Layout from '../components/layout'
import api from '../api'

class Change extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: "",
            password: "",
            new: ""
        }

        this.validateData = this.validateData.bind(this);
    }

    validateData = () => {
        
        api.patch('/users/'+localStorage.getItem('@dhm/token'), {
            pass: this.state.new
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    validateForm = () => {
        return this.state.user.length > 0 && this.state.password.length > 0 && this.state.new.length > 0
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
                <h2 className="text-center">Alterar senha</h2>
                <div className="appLogin auto-height">
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
                            <FormLabel>Senha atual</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup controlId="new">
                            <FormLabel>Nova senha</FormLabel>
                            <FormControl
                                value={this.state.new}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <Button
                            block
                            disabled={!this.validateForm()}
                            type="submit"
                            >
                            Alterar
                        </Button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Change;