import moment from 'moment';

function formatDate(data) {
  return data ? moment(data).format('DD/MM/YYYY') : '';
}

export { formatDate };
