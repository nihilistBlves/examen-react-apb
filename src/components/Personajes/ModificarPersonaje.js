import React, { Component } from 'react'
import Global from '../../Global';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

export default class ModificarPersonaje extends Component {

    state = {
        series: [],
        serieSeleccionada: {},
        personajeSeleccionado: {},
        personajes: [],
        cargaSeries: false,
        cargaPersonajes: false,
        status: false
    }

    selectPersonajes = React.createRef();
    selectSeries = React.createRef();

    modificarPersonaje = (e) => {
        e.preventDefault();
        var request = "/api/Personajes/" + this.selectPersonajes.current.value + "/" + this.selectSeries.current.value;
        var url = Global.url + request;
        axios.put(url).then(response => {
            this.setState({
                status: true
            });
        });
    }

    cargarPersonajeSeleccionado = () => {
        var request = "/api/personajes/" + this.selectPersonajes.current.value;
        var url = Global.url + request;
        axios.get(url).then(response => {
            this.setState({
                personajeSeleccionado: response.data
            });
        })
    }

    cargarSerieSeleccionada = () => {
        var request = "/api/series/" + this.selectSeries.current.value;
        var url = Global.url + request;
        axios.get(url).then(response => {
            this.setState({
                serieSeleccionada: response.data
            });
        })
    }

    cargarSeries = () => {
        var request = "/api/series";
        var url = Global.url + request;
        axios.get(url).then(response => {
            this.setState({
                series: response.data,
                cargaSeries: true
            });
        });
    }

    cargarPersonajes = () => {
        var request = "/api/personajes";
        var url = Global.url + request;
        axios.get(url).then(response => {
            this.setState({
                personajes: response.data,
                cargaPersonajes: true
            });
        });
    }

    componentDidMount = () => {
        this.cargarSeries();
        this.cargarPersonajes();
    }

    render() {
        if (this.state.status) {
            return(<Redirect to="/"/>);
        }
        return (
            <div className="row m-3 justify-content-center">
                <div className="col-6 text-center">
                    <h1>Cambiar personaje de serie</h1>
                    <form onSubmit={this.modificarPersonaje}>
                            <div className="mb-3">
                                <label for="series" className="form-label">Seleccione una serie</label>
                                <select onChange={() => {this.cargarSerieSeleccionada()}} className="form-select" id="series" ref={this.selectSeries}>
                                    {this.state.cargaSeries ?
                                        this.state.series.map((serie, index) => {
                                            return(<option key={index} value={serie.idSerie}>
                                                {serie.nombre}
                                            </option>);
                                        }) :
                                        <option>Cargando series...</option>
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label for="personajes" className="form-label">Seleccione un personaje para insertar en dicha serie</label>
                                <select onChange={() => {this.cargarPersonajeSeleccionado()}} className="form-select" id="personajes" ref={this.selectPersonajes}>
                                    {this.state.cargaPersonajes ?
                                        this.state.personajes.map((personaje, index) => {
                                            return(<option key={index} value={personaje.idPersonaje}>
                                                {personaje.nombre}
                                            </option>);
                                        }) :
                                        <option>Cargando personajes...</option>
                                    }
                                </select>
                            </div>
                            <div className="row justify-content-center">
                                <div className="col-5">
                                    <button type="submit" className="btn btn-success">Guardar cambios</button>
                                </div>
                                <div className="col-4">
                                    <NavLink to="/" className="btn btn-secondary">Volver</NavLink>
                                </div>
                            </div>
                    </form>
                    <div className="row m-3 justify-content-center">
                        <div className="col-6 m-3">
                            <h3>Serie: {this.state.serieSeleccionada.nombre}</h3>
                            <img src={this.state.serieSeleccionada.imagen} height="200px"/>
                        </div>
                        <div className="col-6 m-3">
                            <h3>Personaje: {this.state.personajeSeleccionado.nombre}</h3>
                            <img src={this.state.personajeSeleccionado.imagen} height="200px"/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
