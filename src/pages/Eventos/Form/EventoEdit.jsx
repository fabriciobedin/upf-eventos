import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import {
  ButtonContainer,
  Container,
  Content,
  SubtitleContainer
} from './styles';
import { getEventoById, update } from '../../../services/eventos';
import { useToast } from '../../../hooks/toast';
import TextArea from '../../../components/TextArea';
import Subeventos from '../../Subeventos/Listagem';
import Participantes from '../../Participantes/Listagem';
import BreadCrumb from '../../../components/BreadCrumb';
import firebase from '../../../services/firebase';
import 'firebase/firestore';
import Organizadores from '../../Organizadores/Listagem';

const db = firebase.firestore();


const schema = Yup.object().shape({
  codigo: Yup.string().required('Código obrigatório!'),
  titulo: Yup.string().required('Título obrigatório!'),
  descricao: Yup.string().required('Descrição obrigatória!'),
  dataInicial: Yup.string().required('Data inicial obrigatória!'),
  dataFinal: Yup.string().required('Data Final obrigatória!')
});

function EventoForm() {
  const history = useHistory();
  const formRef = useRef(null);
  const { addToast } = useToast();
  const { idEvento } = useParams();


  useEffect(() => {
    getEventoById(idEvento).then(docSnapshot => {
      if (docSnapshot.exists) {
        formRef.current.setData(docSnapshot.data());
      }
    });
  }, [idEvento]);

  const exportarFrequencia = (async () => {

    let csvContent = "data:text/csv;charset=utf-8,";
    let array = ["TIPO", "COD PARTICIPANTE", "HORARIO", "COD EVENTO", "COD SUBEVENTO"]
            let row = array.join(",");
            csvContent += row + "\r\n";

    const subeventos = await db.doc('Eventos/' + idEvento).collection('Subeventos').get();

    for (let index = 0; index < subeventos.docs.length; index++) {
      const subevento = subeventos.docs[index];
      let participantes = await db.doc('Eventos/' + idEvento + '/Subeventos/' + subevento.id).collection('SubeventoParticipantes').get()
      for (let indexParticipante = 0; indexParticipante < participantes.docs.length; indexParticipante++) {
        const participante = participantes.docs[indexParticipante];
        let objeto = participante.data()
        let array = [];
         if (objeto.horaEntrada)
         {
            array = ["E", participante.id, objeto.horaEntrada.seconds, idEvento, subevento.id]
            let row = array.join(",");
            csvContent += row + "\r\n";
         }
         if (objeto.horaSaida) {
            array = ["S", participante.id, objeto.horaSaida.seconds, idEvento, subevento.id]
            let row = array.join(",");
            csvContent += row + "\r\n";
         }
      }
    }


    console.log('montando csv')
    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "frequencia.csv");
    document.body.appendChild(link); // Required for FF

    link.click();

  }
  );

  const redirect = useCallback(() => {
    history.push('/eventos');
  }, [history]);

  const handleSubevento = useCallback(() => {
    history.push(`/eventos/${idEvento}/subeventos/cadastro`);
  }, [history, idEvento]);

  const handleCadastroOrganizador = useCallback(() => {
    history.push(`/organizadores/eventos/${idEvento}`);
  }, [history, idEvento]);

  const handleAddParticipantesEvento = useCallback(() => {
    history.push(`/eventos/${idEvento}/participantes`);
  }, [history, idEvento]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});

        await schema.validate(data, {
          abortEarly: false
        });

        data.titulo = data.titulo.toUpperCase();
        update(idEvento, data).then(() => {
          addToast({
            type: 'success',
            description: 'Evento alterado com sucesso.'
          });
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [addToast, idEvento, redirect]
  );

  const crumbs = [
    {
      routeTo: '/eventos',
      name: 'Eventos'
    },
    {
      routeTo: '',
      name: 'Editar'
    },
  ];

  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <Container>
        <h1>Edição de Evento:</h1>
        <Content>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input name="codigo" placeholder="Código" type="number" disabled={true}/>
            <Input name="titulo" placeholder="Título" />
            <TextArea name="descricao" placeholder="Descricao" />
            <p>Data Inicial:</p>
            <Input type="date" name="dataInicial" placeholder="Data" />
            <p>Data Final:</p>
            <Input type="date" name="dataFinal" placeholder="Data" />

          <ButtonContainer>
            <Button type="submit">Salvar</Button>
            <Button onClick={redirect}>Cancelar</Button>
            <Button onClick={exportarFrequencia}>Exportar Frequência</Button>
          </ButtonContainer>
        </Form>
      </Content>
      <hr style={{ marginTop: 10, marginBottom: 10 }} />
      <SubtitleContainer>
        <h3>Subeventos:</h3>
        <button type="button" onClick={() => handleSubevento()}>
          Criar Subeventos
        </button>
        </SubtitleContainer>
        <Subeventos idEvento={idEvento} />
        <SubtitleContainer>
          <h3>Participantes do evento:</h3>
          <button type="button" onClick={() => handleAddParticipantesEvento()}>
            Inscrever participantes
        </button>
        </SubtitleContainer>
        <Participantes idEvento={idEvento} />
        <SubtitleContainer>
        <h3>Organizadores do evento:</h3>
        <button type="button" onClick={() => handleCadastroOrganizador()}>
          Inscrever organizadores
        </button>
      </SubtitleContainer>
      <Organizadores idEvento={idEvento} />
      </Container>
    </>
  );
}

export default EventoForm;
