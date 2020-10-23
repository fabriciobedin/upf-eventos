import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 3,
    border: '1px solid #DCDCDC',
    padding: 10,
    marginBottom: 10,
    color: '#808080',

    '& a': {
      color: '#808080',
      cursor: 'pointer'
    }
  },

  current: {
    fontWeight: 'bold'
  },

  link: {
    display: 'flex',
  },

  icon: {
    marginRight: theme.spacing(0.3),
    width: 20,
    height: 20,
  },
}));