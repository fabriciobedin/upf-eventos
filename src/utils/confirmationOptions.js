import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';

export const deleteOptions = {
  description: 'Você confirma a exclusão do registro?',
  title: 'Exclusão de participante',
  confirmationButtonProps: {
    variant: 'contained',
    color: 'secondary',
    startIcon: <DeleteIcon />
  },
  confirmationText: 'Confirmar',
  cancellationText: 'Cancelar',
  dialogProps: { disableBackdropClick: true }
};



