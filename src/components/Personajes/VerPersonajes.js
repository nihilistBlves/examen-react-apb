import axios from 'axios';
import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import Global from '../../Global';

export default class VerPersonajes extends Component {

    state = {
        personajes: [],
        status: false
    }

    cargarPersonajes = () => {
        var request = "/api/Series/PersonajesSerie/" + this.props.idSerie;
        var url = Global.url + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                status: true
            });
        });
    }

    componentDidMount = () =>{
        this.cargarPersonajes();
    }

    render() {
        return (
            <div className="row m-3 justify-content-center">
                <div className="col-6 text-center">
                    <div className="row mb-3">
                        <div className="col-6">
                            <h1>Ver personajes</h1>
                        </div>
                        <div className="col-6 mt-3">
                            <NavLink to={"/series/" + this.props.idSerie} className="btn btn-secondary">Volver</NavLink>
                        </div>
                    </div>
                    { this.state.status ? 
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NOMBRE</th>
                                    <th>IMAGEN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.personajes.map((personaje, index) => {
                                    return(
                                        <tr key={index}>
                                            <td>{personaje.idPersonaje}</td>
                                            <td>{personaje.nombre}</td>
                                            <td><img src={personaje.imagen} height="100px"/></td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table> :
                        <h2>Cargando datos...</h2>
                    }
                </div>
            </div>
        )
    }
}
