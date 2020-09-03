import { format } from 'date-fns';

function formatDate(data) {
  return data ? format(new Date(data), 'dd/MM/yyyy') : '';
}

export { formatDate };
