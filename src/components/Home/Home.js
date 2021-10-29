import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="row m-3 justify-content-center">
                <div className="col-6 text-center">
                    <h1>Home</h1>
                    <hr/>
                    <h2>Bienvenido al examen de Alejo Pérez en REACT</h2>
                    <hr/>
                    <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/netflix-logo-rgb-1634125225.jpeg" width="600px"/>
                </div>
            </div>
        )
    }
}
