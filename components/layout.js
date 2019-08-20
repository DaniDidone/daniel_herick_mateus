import React, { Component } from 'react'

import '../assets/styles/main.scss'

import AppHeader from "./header"
import AppFooter from "./footer"

import AppLogin from "./login"

class Layout extends Component {

    constructor(props){
        super(props)

        this.state = {
            hasToken: null,
        }
    }
    componentDidMount(){
        const appToken = localStorage.getItem('@dhm/token')
        if(appToken !== null){
            this.setState({
                hasToken: appToken
            });
        }else{
            this.setState({
                hasToken: false
            });
        }
    }
    render(){
        if( this.state.hasToken != false ){
            return (
                <>
                    <AppHeader />
                    <main className="py-5">
                        <div className="container">
                            {this.props.children}
                        </div>
                    </main>
                    <AppFooter />
                </>
            )
        }else{
            return (
                <>
                    <AppLogin  />
                </>
            )
        }
    }

}

export default Layout
