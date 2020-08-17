import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

class IndexEvento extends Component {
  constructor(props) {
    super(props);
    this.ref = firebase.firestore().collection('eventos');
    this.unsubscribe = null;
    this.state = {
      eventos: []
    };
  }

  onCollectionUpdate = querySnapshot => {
    const eventos = [];
    querySnapshot.forEach(doc => {
      const { titulo, descricao, dataInicial,
        dataFinal } = doc.data();
      eventos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        titulo,
        descricao,
        dataInicial,
        dataFinal
      });
    });
    this.setState({
      eventos
    });
  };

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Lista de Eventos</h3>
          </div>
          <div className="panel-body">
            <h4>
              <Link to="eventos/create">Adicionar Evento</Link>
            </h4>
            <table className="table table-stripe">
              <thead>
                <tr>
                  <th>Titulo</th>
                  <th>Descrição</th>
                  <th>Data Inicial</th>
                  <th>Data Final</th>
                </tr>
              </thead>
              <tbody>
                {this.state.eventos.map(evento => (
                  <tr>
                    <td>
                      <Link to={`eventos/show/${evento.key}`}>{evento.titulo}</Link>
                    </td>
                    <td>{evento.descricao}</td>
                    <td>{evento.dataInicial}</td>
                    <td>{evento.dataFinal}</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default IndexEvento;
