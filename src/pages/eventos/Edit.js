import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../services/firebase';

class Edit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      key: '',
      title: '',
      description: '',
      author: ''
    };
  }

  componentDidMount() {
    const ref = firebase.firestore().collection('eventos').doc(this.props.match.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        const evento = doc.data();
        this.setState({
          key: doc.id,
          titulo: evento.titulo,
          descricao: evento.descricao,
          dataInicial: evento.dataInicial,
          dataFinal: evento.dataFinal
        });
      } else {
        console.log("No such document!");
      }
    });
  }

  onChange = (e) => {
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState({evento:state});
  }

  onSubmit = (e) => {
    e.preventDefault();

    const { titulo,descricao,dataInicial,dataFinal } = this.state;

    const updateRef = firebase.firestore().collection('eventos').doc(this.state.key);
    updateRef.set({
      titulo,
      descricao,
      dataInicial,
      dataFinal
    }).then((docRef) => {
      this.setState({
        key: '',
        titulo:'',
        descricao:'',
        dataInicial:'',
        dataFinal:''
      });
      this.props.history.push("eventos/show/"+this.props.match.params.id)
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
  }

  render() {
    return (
      <div class="container">
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">
              Editar Evento
            </h3>
          </div>
          <div class="panel-body">
            <h4><Link to={`../../eventos`} class="btn btn-primary">Lista de Eventos</Link></h4>
            <form onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="title">Título:</label>
                <input type="text" class="form-control" name="title" value={this.state.titulo} onChange={this.onChange} placeholder="Título" />
              </div>
              <div class="form-group">
                <label for="descricao">Descrição:</label>
                <input type="text" class="form-control" name="descricao" value={this.state.descricao} onChange={this.onChange} placeholder="Descrição" />
              </div>
              <div class="form-group">
                <label for="dataInicial">Data Inicial:</label>
                <input type="date" class="form-control" name="dataInicial" value={this.state.dataInicial} onChange={this.onChange}  />
              </div>
              <div class="form-group">
                <label for="dataFinal">Data Final:</label>
                <input type="date" class="form-control" name="dataInicial" value={this.state.dataInicial} onChange={this.onChange} />
              </div>
              <button type="submit" class="btn btn-success">Salvar</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Edit;
