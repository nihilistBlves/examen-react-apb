import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Home from './Home/Home'
import Menu from './Menu/Menu'
import CrearPersonaje from './Personajes/CrearPersonaje'
import ModificarPersonaje from './Personajes/ModificarPersonaje'
import VerPersonajes from './Personajes/VerPersonajes'
import VerSerie from './Series/VerSerie'

export default class Router extends Component {
    render() {
        return (
            <BrowserRouter>
                <Menu />
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/series/:idSerie" render={props => {
                        var idSerie = props.match.params.idSerie;
                        return <VerSerie idSerie={idSerie}/>
                    }}
                    />
                    <Route exact path="/serie/:idSerie/personajes" render={props => {
                        var idSerie = props.match.params.idSerie;
                        return <VerPersonajes idSerie={idSerie} />
                    }} 
                    />
                    <Route exact path="/personajes/crear" component={CrearPersonaje}/>
                    <Route exact path="/personajes/modificar" component={ModificarPersonaje} />
                </Switch>
            </BrowserRouter>
        )
    }
}
