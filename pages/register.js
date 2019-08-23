import React, { Component } from 'react'
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap"

import Layout from '../components/layout'
import api from '../api'

class Register extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: "",
            password: "",
            id: "",
            validID: false,
            validNAME: false
        }

        this.validateData = this.validateData.bind(this);
        this.validateID = this.validateID.bind(this);
        this.validateName = this.validateName.bind(this);
    }

    componentDidUpdate(){
        if(this.state.validID && this.state.validNAME) this.writeData();
    }

    validateData = () => {
        this.setState({
            validID: false,
            validNAME: false
        });

        this.validateID()
        this.validateName()
    }

    validateID = () => {
        var objeto = this

        api.get('/users/?id='+this.state.id)
        .then(function (response) {
            if(!response.data.length){
                objeto.setState({
                    validID: true
                })
            }else{
                objeto.setState({
                    validID: false
                })
                console.log('ID já existente')
            }
        })
    }

    validateName = () => {
        var objeto = this

        api.get('/users/?name='+this.state.user)
        .then(function (response) {
            if(!response.data.length){
                objeto.setState({
                    validNAME: true
                })
            }else{
                objeto.setState({
                    validNAME: false
                })
                console.log('Nome já existente')
            }
        })
    }

    writeData = () => {
        api.post('/users', {
            name: this.state.user,
            pass: this.state.password,
            inactive: 0,
            id: this.state.id
        })
        .then(function (response) {
            console.log(response)
        })
    }

    validateForm = () => {
        return this.state.user.length > 0 && this.state.password.length > 0 && (parseInt(this.state.id) > 0  || this.state.id.length == 0 )
    }
    
    handleChange = event => {
        if(event.target.id == 'id'){
            this.setState({
                id: parseInt(event.target.value)
            });
        }else{
            this.setState({
                [event.target.id]: event.target.value
            });
        }
    }
    
    handleSubmit = event => {
        event.preventDefault()
        this.validateData()
    }
    
    render() {
        return (
            <Layout>
                <h2 className="text-center">Cadastrar novo usuário</h2>
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
                            <FormLabel>Senha</FormLabel>
                            <FormControl
                                value={this.state.password}
                                onChange={this.handleChange}
                                type="password"
                            />
                        </FormGroup>
                        <FormGroup controlId="id">
                            <FormLabel>ID</FormLabel>
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
                            Registrar
                        </Button>
                    </form>
                </div>
            </Layout>
        );
    }
}

export default Register;