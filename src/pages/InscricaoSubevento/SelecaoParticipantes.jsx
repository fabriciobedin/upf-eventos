import React, { useState, useEffect, useMemo } from 'react';
import MUIDataTable from 'mui-datatables';
import * as ParticipantesService from '../../services/participantes';
import options from '../../utils/tableOptions';
import NoRecords from '../../components/NoRecords';
import CustomToolbar from './CustomToolbar';

function SelecaoParticipantes({ idEvento, idSubevento, statusModal }) {
  const [participantes, setParticipantes] = useState([]);
  const tableOptions = {
    ...options,
    selectableRows: 'multiple',
    customToolbarSelect: (selectedRows, displayData, setSelectedRows) => (
      <CustomToolbar
        selectedRows={selectedRows}
        displayData={displayData}
        setSelectedRows={setSelectedRows}
        statusModal={statusModal}
      />
    )
  };

  useEffect(() => {
    const unsubscribe = ParticipantesService.getParticipantesByEvento(
      idEvento,
      idSubevento
    ).onSnapshot(participantesSnapshot => {
      setParticipantes(
        participantesSnapshot.docs.map(doc => ({
          ...doc.data(),
          uuid: doc.id
        }))
      );
    });
    return () => unsubscribe();
  }, [idEvento, idSubevento]);

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
      }
    ],
    []
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
