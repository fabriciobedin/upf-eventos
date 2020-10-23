import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import MUIDataTable from 'mui-datatables';
import { useConfirm } from 'material-ui-confirm';
import * as ParticipantesService from '../../services/participantes';
import options from '../../utils/tableOptions';
import { deleteOptions } from '../../utils/confirmationOptions';
import { useToast } from '../../hooks/toast';
import NoRecords from '../../components/NoRecords';
import CustomToolbar from './CustomToolbar';

function SelecaoParticipantes({ idEvento, idSubevento, statusModal }) {
  const history = useHistory();
  const confirmation = useConfirm();
  const [participantes, setParticipantes] = useState([]);
  const { addToast } = useToast();
  const tableOptions = {
    ...options,
    selectableRows: 'multiple',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbar selectedRows={selectedRows} displayData={displayData} setSelectedRows={setSelectedRows} statusModal={statusModal} />
    ),
  };
  const deleteOptionsParticipante = {
    ...deleteOptions,
    description: 'Você confirma a exclusão do participante?'
  };

  const handleEdit = useCallback(
    idParticipante => {
      history.push(`/eventos/${idEvento}/participantes/${idParticipante}`);
    },
    [history, idEvento]
  );

  const verificaFrequencia = useCallback(async idParticipante => {
    return ParticipantesService.possuiFrequencia(idParticipante).then(data => {
      return data.size;
    });
  }, []);

  const handleDelete = useCallback(
    async idParticipante => {
      const frequencia = await verificaFrequencia(idParticipante);
      if (frequencia > 0) {
        window.scrollTo({ top: 0, behavior: 'auto' });
        addToast({
          type: 'error',
          title: 'Atenão!',
          description:
            'Participante possui registro de frequência. Não será possível remove-lo.'
        });
        return;
      }
      confirmation(deleteOptionsParticipante)
        .then(() => {
          ParticipantesService.remove(idEvento, idParticipante).then(() => {});
        })
        .catch(() => {});
    },
    [addToast, confirmation, idEvento, verificaFrequencia, deleteOptionsParticipante]
  );

  useEffect(() => {
    const unsubscribe = ParticipantesService.getParticipantesByEvento(idEvento, idSubevento).onSnapshot(
      participantesSnapshot => {
        setParticipantes(
          participantesSnapshot.docs.map(doc => ({
            ...doc.data(),
            uuid: doc.id
          }))
        );
      }
    );
    return () => unsubscribe();
  }, [idEvento]);

  const columns = useMemo(
    () => [
      {
        label: 'Código',
        name: 'codigo',
        options: {
          filter: true
        }
      },
      {
        label: 'Nome',
        name: 'nome',
        options: {
          filter: true
        }
      },
      {
        label: 'E-mail',
        name: 'email',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Telefone',
        name: 'telefone',
        options: {
          filter: true,
          sort: false
        }
      },
      {
        label: 'Tipo',
        name: 'tipo',
        options: {
          filter: true,
          sort: false
        }
      },
    ],
    [handleDelete, handleEdit]
  );

  if (participantes.length > 0) {
    return (
      <MUIDataTable
        title="Participantes Não Inscritos"
        data={participantes}
        columns={columns}
        options={tableOptions}
      />
    );
  }

  return <NoRecords />;
}

export default SelecaoParticipantes;
