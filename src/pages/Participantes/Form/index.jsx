import React, { useCallback, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import Select from '../../../components/Select';
import getValidationErrors from '../../../hooks';
import { useToast } from '../../../hooks/toast';
import { Container, Content, ButtonContainer } from './styles';
import * as ParticipantesService from '../../../services/participantes';

function ParticipanteForm({ participante, formTitle, idParticipante }) {
  const history = useHistory();
  const formRef = useRef();
  const { addToast } = useToast();
  const { idEvento } = useParams();
  const tiposParticipantes = [
    { value: 'aluno', label: 'Aluno' },
    { value: 'professor', label: 'Professor' },
    { value: 'funcionario', label: 'Funcionário' },
    { value: 'externo', label: 'Externo' }
  ];

  useEffect(() => {
    if (participante) {
      formRef.current.setData(participante);
    }
  }, [participante]);

  const redirect = useCallback(() => {
    history.goBack();
  }, [history]);

  const findByDoc = useCallback(
    async (codigo, documento) => {
      return ParticipantesService.buscaPorCodigoDocumento(
        idEvento,
        codigo,
        documento
      ).then(data => data.size);
    },
    [idEvento]
  );

  const findByIdEstrangeiro = useCallback(
    async (codigo, idEstrangeiro) => {
      return ParticipantesService.buscaPorIdEstrangeiro(
        idEvento,
        codigo,
        idEstrangeiro
      ).then(data => data.size);
    },
    [idEvento]
  );

  const submitNew = useCallback(
    async data => {
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
      ParticipantesService.submitParticipante(idEvento, data).then(() => {
        addToast({
          type: 'success',
          description: 'Participante cadastrado com sucesso.'
        });
        redirect();
      });
    },
    [addToast, findByDoc, findByIdEstrangeiro, idEvento, redirect]
  );

  const submitUpdate = useCallback(
    async data => {
      ParticipantesService.submitParticipante(
        idEvento,
        data,
        idParticipante
      ).then(() => {
        addToast({
          type: 'success',
          description: 'Participante alterado com sucesso.'
        });
        redirect();
      });
    },
    [addToast, idEvento, idParticipante, redirect]
  );

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
        if (participante) {
          submitUpdate(data);
          return;
        }
        submitNew(data);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          formRef.current.setErrors(getValidationErrors(err));
        }
      }
    },
    [addToast, participante, submitNew, submitUpdate]
  );

  return (
    <Container>
      <h1>{formTitle}</h1>
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

export default ParticipanteForm;
