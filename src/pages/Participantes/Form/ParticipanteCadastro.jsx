import React, { useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import getValidationErrors from '../../../utils/getValidationErrors';
import { useToast } from '../../../hooks/toast';

import 'firebase/firestore';
import firebase from '../../../services/firebase';

import { Container, Content } from './styles';

function ParticipanteCadastro() {
  const history = useHistory();
  const formRef = useRef(null);
  const { addToast } = useToast();
  const participanteRef = firebase.firestore().collection('participantes');

  const findByDoc = useCallback(
    async (codigo, documento) => {
      return participanteRef
        .where('codigo', '==', codigo)
        .where('documento', '==', documento)
        .get()
        .then(snapshot => {
          return snapshot.size;
        });
    },
    [participanteRef]
  );

  const findByIdEstrangeiro = useCallback(
    async (codigo, idEstrangeiro) => {
      return participanteRef
        .where('codigo', '==', codigo)
        .where('idEstrangeiro', '==', idEstrangeiro)
        .get()
        .then(snapshot => {
          return snapshot.size;
        });
    },
    [participanteRef]
  );

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

        const documento = await findByDoc(data.codigo, data.documento);

        const idEstrangeiro = await findByIdEstrangeiro(
          data.codigo,
          data.documento
        );

        if (documento > 0 || idEstrangeiro > 0) {
          addToast({
            type: 'error',
            title: 'Registro já cadastrado!',
            description:
              'Atenção, já existe um participante com esse código e documento.'
          });
          return;
        }

        data.nome = data.nome.toUpperCase();
        participanteRef.add(data).then(() => {
          redirect();
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação!',
          description:
            'Por favor, verifique se digitou suas credenciais corretamente.'
        });
      }
    },
    [addToast, findByDoc, findByIdEstrangeiro, participanteRef, redirect]
  );

  return (
    <Container>
      <h1>Cadastro de participantes:</h1>
      <Content>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="codigo" placeholder="Código" type="number" />
          <Input name="nome" placeholder="Nome" />
          <Input name="telefone" placeholder="Telefone" maxLength="11" />
          <Input name="documento" placeholder="CPF" maxLength="11" />
          <Input name="idEstrangeiro" placeholder="ID estrangeiro" />
          <Input name="email" placeholder="E-mail" />
          <select name="tipo">
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
            <option value="funcionario">Funcionário</option>
            <option value="externo">Externo</option>
          </select>

          <hr />

          <Button type="submit">Salvar</Button>
          <Button onClick={redirect}>Cancelar</Button>
        </Form>
      </Content>
    </Container>
  );
}

export default ParticipanteCadastro;
