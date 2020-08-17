import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

class EventoShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      evento: {},
      key: ''
    };
    console.log(this.props.match.params.id);
  }

  componentDidMount() {

    const ref = firebase
      .firestore()
      .collection('eventos')
      .doc(this.props.match.params.id);
    ref.get().then(doc => {
      if (doc.exists) {
        this.setState({
          evento: doc.data(),
          key: doc.id,
          isLoading: false
        });
      } else {
        console.log('No such document!');
      }
    });
  }

  delete(id) {
    firebase
      .firestore()
      .collection('eventos')
      .doc(id)
      .delete()
      .then(() => {
        console.log('Document successfully deleted!');
        this.props.history.push('/');
      })
      .catch(error => {
        console.error('Error removing document: ', error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h4>
              <Link to="../../eventos">Lista de Eventos</Link>
            </h4>
            <h3 className="panel-title">{this.state.evento.titulo}</h3>
          </div>
          <div className="panel-body">
            <dl>
              <dt>Descrição:</dt>
              <dd>{this.state.evento.descricao}</dd>
              <dt>Data Inicial:</dt>
              <dd>{this.state.evento.dataInicial}</dd>
              <dt>Data Final:</dt>
              <dd>{this.state.evento.dataFinal}</dd>
            </dl>
            <Link to={`../edit/${this.state.key}`} class="btn btn-success">
              Editar
            </Link>
            &nbsp;
            <button
              onClick={this.delete.bind(this, this.state.key)}
              className="btn btn-danger"
            >
              Deletar
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default EventoShow;
