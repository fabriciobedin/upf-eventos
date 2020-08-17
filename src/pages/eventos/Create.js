import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

class EventoCreate extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('eventos');
    this.state = {
      titulo: '',
      descricao: '',
      dataInicial: '',
      dataFinal: ''
    };
  }

  onChange = e => {
    const { state } = this;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { titulo, descricao, dataInicial, dataFinal } = this.state;

    this.ref
      .add({
        titulo,
        descricao,
        dataInicial,
        dataFinal
      })
      .then(docRef => {
        this.setState({
          titulo: '',
          descricao: '',
          dataFinal: '',
          dataInicial: ''
        });
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error adding document: ', error);
      });
  };

  render() {
    const { titulo, descricao, dataFinal, dataInicial } = this.state;
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Adicionar Eventos</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="/eventos" class="btn btn-primary">
                Lista de Eventos
              </Link>
            </h4>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="titulo">Titulo:</label>
                <input
                  type="text"
                  className="form-control"
                  name="titulo"
                  value={this.titulo}
                  onChange={this.onChange}
                  placeholder="Titulo"
                />
              </div>
              <div className="form-group">
                <label htmlFor="descricao">Descrição:</label>
                <textArea
                  className="form-control"
                  name="descricao"
                  onChange={this.onChange}
                  placeholder="Descrição"
                  cols="80"
                  rows="3"
                >
                  {descricao}
                </textArea>
              </div>
              <div className="form-group">
                <label htmlFor="dataInicial">Data Inicial:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dataInicial"
                  onChange={this.onChange}
                  placeholder="Data Inicial"
                />
              </div>
              <div className="form-group">
                <label htmlFor="dataFinal">Data Final:</label>
                <input
                  type="date"
                  className="form-control"
                  name="dataFinal"
                  onChange={this.onChange}
                  placeholder="Data Final"
                />
              </div>
              <button type="submit" className="btn btn-success">
                Salvar
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default EventoCreate;
