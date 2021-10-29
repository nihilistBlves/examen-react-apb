import React, { Component } from 'react'
import Global from '../../Global';
import axios from 'axios';
import { NavLink, Redirect } from 'react-router-dom';

export default class CrearPersonaje extends Component {

    state = {
        status: false,
        series: [],
        cargaSeries: false
    }

    cajaNombre = React.createRef();
    cajaImagen = React.createRef();
    selectSeries = React.createRef();


    crearPersonaje = (e) => {
        e.preventDefault();
        var request = "/api/personajes";
        var url = Global.url + request;
        console.log(this.selectSeries.current.value);
        var personaje = {
            idSerie: 1,
            nombre: this.cajaNombre.current.value,
            imagen: this.cajaImagen.current.value,
            idSerie: parseInt(this.selectSeries.current.value)
        }
        axios.post(url, personaje).then(response => {
            this.setState({
                status: true
            });
        });
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

    componentDidMount = () => {
        this.cargarSeries();
    }

    render() {
        if (this.state.status) {
            return(<Redirect to="/"/>);
        }
        return (
            <div className="row m-3 justify-content-center">
                <div className="col-6 text-center">
                    <h1>Crear nuevo personaje</h1>
                    <form onSubmit={this.crearPersonaje}>
                        <div className="mb-3">
                            <label for="nombre" className="form-label">Nombre</label>
                            <input type="text" required className="form-control text-center" id="nombre" placeholder="Introduzca un nombre de personaje" ref={this.cajaNombre}/>
                        </div>
                        <div className="mb-3">
                            <label for="imagen" className="form-label">Imagen</label>
                            <input type="text" required className="form-control text-center" id="imagen" placeholder="Introduzca el enlace de una imagen" ref={this.cajaImagen}/>
                        </div>
                        <div className="mb-3">
                            <label for="series" className="form-label">Serie</label>
                            <select className="form-select" id="series" ref={this.selectSeries}>
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
                        <div className="row justify-content-center">
                            <div className="col-5">
                                <button type="submit" className="btn btn-success">Crear personaje</button>
                            </div>
                            <div className="col-4">
                                <NavLink to="/" className="btn btn-secondary">Volver</NavLink>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
