import React, { Component } from 'react'

import Layout from '../components/layout'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

import api from '../api'

class Manage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: []
        }

        this.createList = this.createList.bind(this);
    }
    
    componentDidMount(){
        api.get('/users/?inactive=0')
        .then(response => {
            this.createList(response.data)
        })
    }

    createList = (data) => {
        this.setState({
            users: data
        })
    }

    render(){
        return(
            <Layout>
                <h2 className="mb-5 text-center">Gerenciamento de usuários</h2>
    
                <ListGroup id="list" className="mt-2 text-dark">
                    {this.state.users.map((item) => (
                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                            <Badge className="mr-2 px-2" variant="secondary">#{item.id}</Badge>
                            {item.name}
                            <Button className="ml-auto" variant="danger">Excluir</Button>
                        </ListGroup.Item>
                    ))}
                    
                </ListGroup>
                
            </Layout>
        )
    }
    
}

export default Manage;