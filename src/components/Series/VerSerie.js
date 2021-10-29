import axios from 'axios';
import React, { Component } from 'react'
import Global from '../../Global';
import { NavLink } from 'react-router-dom';

export default class VerSerie extends Component {

    state = {
        serie: {},
        status: false
    }

    cargarSerie = () => {
        var request = "/api/series/" + this.props.idSerie;
        var url = Global.url + request;
        axios.get(url).then(response => {
            this.setState({
                serie: response.data,
                status: true
            });
        });
    }

    componentDidMount = () => {
        this.cargarSerie();
    }

    componentDidUpdate = (oldProps) => {
        if (oldProps.idSerie != this.props.idSerie) {
            this.cargarSerie();
        }
    }

    render() {
        return (
            <div className="row m-3 justify-content-center">
                <div className="col-6 text-center">
                    <h1>Ver serie</h1>
                    {this.state.status ? 
                        <div class="card text-center">
                            <img src={this.state.serie.imagen} style={{height:"400px",width:"400px"}} class="card-img-top mx-auto" />
                            <div class="card-body">
                                <h3 class="card-text">{this.state.serie.nombre}</h3>
                                <p class="card-text">{"Puntuación IMDB: " + this.state.serie.puntuacion}</p>
                                <NavLink to={"/serie/"+this.state.serie.idSerie+"/personajes/"} class="btn btn-success">Ver personajes</NavLink>
                            </div>
                        </div> :
                        <h2>Cargando datos...</h2>
                    }
                </div>
            </div>
        )
    }
}
