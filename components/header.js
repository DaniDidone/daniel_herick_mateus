import React, { Component } from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import Link from 'next/link'

class AppHeader extends Component {
    constructor(props) {
        super(props)
    }

    logout = () => {
        localStorage.setItem('@dhm/token', "")
        window.location.reload()
    }

    render(){
        return(
            <nav key="" className="appHeader p-0 navbar navbar-expand navbar-dark" variant="dark">
                <Container>
                    <Navbar.Brand className="p-0"><Link href='/'><a className="appHeader-brand-link" key="appHeader-brand-link"><img width="190" className="appHeader-brand-img" key="appHeader-brand-img" src="/static/logo.png" alt="DataWare" /></a></Link></Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="mr-auto">
                                <Link href='/manage'><a className="nav-link">Gerenciar usuarios</a></Link>
                                <Link href='/register'><a className="nav-link">Cadastrar usuarios</a></Link>
                            </Nav>
                            <Nav className="ml-auto">
                                <Link href='/change'><a className="nav-link">Alterar senha</a></Link>
                                <Link href=''><a onClick={this.logout} className="nav-link">Sair</a></Link>
                            </Nav>
                        </Navbar.Collapse>
                </Container>
            </nav>
        )
    }
}

export default AppHeader;