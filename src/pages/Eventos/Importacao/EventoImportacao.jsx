import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import firebase from '../../../services/firebase';
import { Container, Content } from './styles';
import 'firebase/firestore';
import BreadCrumb from '../../../components/BreadCrumb';

const db = firebase.firestore();
const buttonRef = React.createRef()

export default class EventoImportacao extends Component {

  handleOpenDialog = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.open(e)
    }
  }

  handleOnFileLoad = async (data) => {



    console.log('------------ Carregado ---------------')
    console.log(data)
    console.log('---------------------------')
    let linha = 0;
    let evento = {};
    evento.participantes = [];
    evento.subeventos = [];
    evento.dados = {}
    evento.organizadores = [];
    evento.dados.organizadores = [];

    data.forEach(element => {
      let dado = element.data
      console.log(dado)
      if (element.data.length > 20 && linha !== 0) {
        evento.dados.codigo = dado[5]
        evento.dados.titulo = dado[6]
        evento.dados.descricao = dado[7]

        let organizador = {};

        organizador.codigo = dado[21]
        organizador.name = dado[22]
        organizador.email = dado[23]
        organizador.password = '123456'
       
        evento.organizadores[dado[21]]=organizador //adição do organizador por codigo para não duplicar
        

        let subevento = {};
        subevento.dados = {};
        subevento.dados.codigo = dado[8]
        subevento.dados.descricao = dado[9]
        subevento.dados.dataInicial = dado[10]
        subevento.dados.horaInicial = dado[10]
        subevento.dados.horaFinal = dado[11]
        subevento.dados.turno = dado[12]
        subevento.participantes = []

        evento.subeventos[subevento.dados.codigo] = subevento
      }
      linha++
    }
    );
    //ORGANIZAR ARRAY DE ORGANIZADORES PARA INSERÇÃO
    evento.organizadores.forEach(async organizador => 
    {
      evento.dados.organizadores.push(organizador.codigo)  
      db.collection('Users')
          .doc(organizador.codigo)
          .set({ email: organizador.email, nome:organizador.name })    

      firebase
      .auth()
      .createUserWithEmailAndPassword(organizador.email, organizador.password)
      .then(
        console.log('Usuario criado')
      )
      .catch((error) => {
        console.log(error)
      });
    });
    //FOREACH PARA PARTICIPANTES 
    linha = 0;
    data.forEach(element => {
      let dado = element.data
      console.log(dado)
      if (element.data.length > 20 && linha !== 0) {
        let participante = {};
        participante.codigo = dado[0]
        participante.nome = dado[1]
        participante.documento = dado[2]
        participante.email = dado[4]
        participante.tipo = dado[3]

        evento.subeventos[dado[8]].participantes.push(participante)  
        evento.participantes.push(participante)
      }      
      linha++
    }
    );


    //ADICIONANDO EVENTO
    console.log("------------------------------------")
    console.log("Adicionando Evento")
    console.log(evento.dados)
    db.collection('Eventos').doc(evento.dados.codigo).set(evento.dados);
    //const retornoEvento = await eventosRef.set(evento.dados);
    const subEventosRef =  db.collection('Eventos').doc(evento.dados.codigo).collection('Subeventos')
    
    //ADICIONAR TODOS OS PARTICIPANTES
    let participanteEventoRef = db.collection('Eventos').doc(evento.dados.codigo).collection('Participantes')

    evento.participantes.forEach(participante => {
      participanteEventoRef.doc(participante.codigo).set(participante)
    });

    //PARA CADA EVENTO ADICIONA AO EVENTO
    evento.subeventos.forEach(async subevento => {
      console.log("------------------------------------")
      console.log('Adicionando subevento ')
      console.log(subevento.dados)

      subEventosRef.doc(subevento.dados.codigo).set(subevento.dados);
      const participantesRef = db.collection('Eventos').doc(evento.dados.codigo)
      .collection('Subeventos').doc(subevento.dados.codigo).collection('SubeventoParticipantes')

      console.log('Parcipantes do subevento')
      subevento.participantes.forEach(participante => 
        {
        console.log(participante)        
        participantesRef.doc(participante.codigo).set(participante)
      });
    });




  }

  handleOnError = (err, file, inputElem, reason) => {
    console.log(err)
  }

  handleRemoveFile = (e) => {
    // Note that the ref is set async, so it might be null at some point
    if (buttonRef.current) {
      buttonRef.current.removeFile(e)
    }
  }

  render() {
    const crumbs = [
      {
        routeTo: '/eventos',
        name: 'Eventos'
      },
      {
        routeTo: '/eventos/importacao',
        name: 'Importação'
      }
    ];

    return (
      <>
        <BreadCrumb crumbs={crumbs} />
        <Container>
          <h1>Importação de Evento:</h1>
          <Content>
            <CSVReader
              ref={buttonRef}
              onFileLoad={this.handleOnFileLoad}
              onError={this.handleOnError}
              noClick
              noDrag
            >
              {({ file }) => (
                <aside
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginBottom: 10
                  }}
                >
                  <button
                    type='button'
                    onClick={this.handleOpenDialog}
                    style={{
                      borderRadius: 0,
                      marginLeft: 0,
                      marginRight: 0,
                      width: '40%',
                      paddingLeft: 0,
                      paddingRight: 0
                    }}
                  >
                    Buscar CSV
              </button>
                  <div
                    style={{
                      borderWidth: 1,
                      borderStyle: 'solid',
                      borderColor: '#ccc',
                      height: 45,
                      lineHeight: 2.5,
                      marginTop: 5,
                      marginBottom: 5,
                      paddingLeft: 13,
                      paddingTop: 3,
                      width: '60%'
                    }}
                  >
                    {file && file.name}
                  </div>
                </aside>
              )}
            </CSVReader>
          </Content>
        </Container>
      </>
    )
  }
}