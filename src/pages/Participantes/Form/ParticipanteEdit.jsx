import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import 'firebase/firestore';

import Button from '../../../components/Button';
import Input from '../../../components/Input';
import getValidationErrors from '../../../utils/getValidationErrors';
import firebase from '../../../services/firebase';
import { useToast } from '../../../hooks/toast';
import { Container, Content, ButtonContainer } from './styles';
import Select from '../../../components/Select';

function ParticipanteEdit() {
  const history = useHistory();
  const formRef = useRef(null);
  const { addToast } = useToast();
  const participanteRef = firebase.firestore().collection('participantes');
  const { id } = useParams();
  const tiposParticipantes = [
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' },
    { value: 'funcionario', label: 'Funcionário' },
    { value: 'externo', label: 'Externo' }
  ];

  useEffect(() => {
    participanteRef
      .doc(id)
      .get()
      .then(docSnapshot => {
        if (docSnapshot.exists) {
          formRef.current.setData(docSnapshot.data());
        }
      });
  }, [id, participanteRef]);

  const redirect = useCallback(() => {
    history.push('/participantes');
  }, [history]);

  const handleSubmit = useCallback(
    async data => {
      try {
        formRef.current.setErrors({});
        const schema = Yup.object().shape({
          codigo: Yup.string().required('Código obrigatório!'),
          nome: Yup.string().required('Nome obrigatório!'),
          telefone: Yup.string().required('Telefone obrigatório!'),
          email: Yup.string()
            .required('Email obrigatório!')
            .email('Digite um email válido!')
        });
        await schema.validate(data, {
          abortEarly: false
        });

        if (data.idEstrangeiro === '' && data.documento === '') {
          addToast({
            type: 'error',
            title: 'Atenção!',
            description: 'Informe o CPF ou o ID do estrangeiro.'
          });
          return;
        }

        data.nome = data.nome.toUpperCase();
        participanteRef
          .doc(id)
          .update(data)
          .then(() => {
            redirect();
          });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [addToast, id, participanteRef, redirect]
  );

  return (
    <Container>
      <h1>Edição de participante:</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="nome" placeholder="Nome" />
          <Input name="telefone" placeholder="Telefone" maxLength="11" />
          <Input name="documento" placeholder="CPF" maxLength="11" />
          <Input name="idEstrangeiro" placeholder="ID estrangeiro" />
          <Input name="email" placeholder="E-mail" />
          <Select name="tipo">
            {tiposParticipantes.map(tipo => (
              <option value={tipo.value} key={tipo.value}>
                {tipo.label}
              </option>
            ))}
          </Select>
          <hr />
          <ButtonContainer>
            <Button type="submit">Salvar</Button>
            <Button onClick={redirect}>Cancelar</Button>
          </ButtonContainer>
        </Form>
      </Content>
    </Container>
  );
}

export default ParticipanteEdit;
