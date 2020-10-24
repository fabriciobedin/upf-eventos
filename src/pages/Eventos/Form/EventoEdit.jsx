import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import {
  ButtonContainer,
  Container,
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

        if (objeto.horaEntrada) {
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

  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`
    };
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`scrollable-auto-tabpanel-${index}`}
        aria-labelledby={`scrollable-auto-tab-${index}`}
        {...other}
      >
        <Box p={3}>{children}</Box>
      </Typography>
    );
  }


  return (
    <>
      <BreadCrumb crumbs={crumbs} />
      <Container>
        <Tabs
          value={value}
          onChange={handleChange}
        >
          <Tab label="Evento" {...a11yProps(0)} />
          <Tab label="Subeventos" {...a11yProps(1)} />
          <Tab label="Participantes" {...a11yProps(2)} />
          <Tab label="Organizadores" {...a11yProps(3)} />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item sm={6} lg={2}>
                <p>Código:</p>
                <Input name="codigo" placeholder="Código" type="number" />
              </Grid>
              <Grid item sm={6} lg={10}>
                <p>Título:</p>
                <Input name="titulo" placeholder="Título" />
              </Grid>
              <Grid item xs={12}>
                <p>Descrição:</p>
                <TextArea name="descricao" placeholder="Descricao" />
              </Grid>
              <Grid item xs={6} lg={2}>
                <p>Data Inicial:</p>
                <Input type="date" name="dataInicial" placeholder="Data" />
              </Grid>
              <Grid item xs={6} lg={2}>
                <p>Data Final:</p>
                <Input type="date" name="dataFinal" placeholder="Data" />
              </Grid>
              <Grid item xs={12}>
                <ButtonContainer>
                  <Button type="submit" className="primary">Salvar</Button>
                  <Button onClick={redirect} className="secondary">Cancelar</Button>
                  <Button onClick={exportarFrequencia} className="success">
                    <ExitToAppIcon />
             &nbsp; Exportar Frequência
              </Button>
                </ButtonContainer>
              </Grid>
            </Grid>

          </Form>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <SubtitleContainer>
            <button type="button" className="primary" onClick={() => handleSubevento()}>
              Criar Subeventos
        </button>
          </SubtitleContainer>
          <Subeventos idEvento={idEvento} />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SubtitleContainer>
            <button type="button" className="primary" onClick={() => handleAddParticipantesEvento()}>
              Inscrever Participantes
        </button>
          </SubtitleContainer>
          <Participantes idEvento={idEvento} />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <SubtitleContainer>
            <button type="button" onClick={() => handleCadastroOrganizador()}>
              Inscrever organizadores
        </button>
          </SubtitleContainer>
          <Organizadores idEvento={idEvento} />
        </TabPanel>
      </Container>
    </>
  );
}

export default EventoForm;
