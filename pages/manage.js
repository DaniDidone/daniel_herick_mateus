import React, { Component } from 'react'

import Layout from '../components/layout'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

import api from '../api'

class Manage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: [],
            password: '',
            name: ''
        }

        this.createList = this.createList.bind(this);
    }
    
    componentDidMount(){
        var objeto = this

        api.get('/users/?inactive=0')
        .then(response => {
            this.createList(response.data)
        })

        api.get('/users/'+localStorage.getItem('@dhm/token'))
        .then(response => {
            console.log()
            objeto.setState({
                pass: response.data.pass
            })
        })
    }

    createList = (data) => {
        console.log(data)
        this.setState({
            users: data
        })
    }

    excludeUser = (id) => {
        console.log(id)
        
        api.patch('/users/'+id, {
            pass: this.state.new
        })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    handleChange = event => {
        console.log(event.target.value)
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        var badgeStyle = {
            width: '50px'
        };

        return(
            <Layout>
                <h2 className="mb-5 text-center">Gerenciamento de usuários</h2>
    
                <ListGroup id="list" className="mt-2 text-dark">
                    {this.state.users.map((item, index) => (
                        <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                            <Badge className="mr-2 px-2" style={badgeStyle} variant="secondary">#{item.id}</Badge>
                            <InputGroup className="">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>Nome:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                value={item.name}
                                onChange={this.handleChange}
                                name="name"
                                type="text"/>
                            </InputGroup>
                            <InputGroup className="">
                                <InputGroup.Prepend className="ml-2">
                                    <InputGroup.Text>Sua senha:</InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl 
                                onChange={this.handleChange}
                                name="password"
                                type="password"/>
                            </InputGroup>
                            <Button className="ml-2" onClick={() => this.excludeUser(item.id)} variant="success">Salvar</Button>
                            <Button className="ml-2" onClick={() => this.excludeUser(item.id)} variant="danger">Excluir</Button>
                        </ListGroup.Item>
                    ))}
                    
                </ListGroup>
                
            </Layout>
        )
    }
    
}

export default Manage;