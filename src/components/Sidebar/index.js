import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Container } from './styles';
import {
  Home,
  Event,
  Person
} from '@material-ui/icons';

function Sidebar() {
  const items = [
    { name: '/dashboard', label: 'Home', Icon: Home },
    { name: '/eventos', label: 'Eventos', Icon: Event },
    { name: '/usuarios', label: 'Usuários', Icon: Person }
  ];
  return (
    <Container>
      <List disablePadding dense>
        {items.map(({ label, name, Icon, ...rest }) => (
          <ListItem
            component={RouterLink}
            key={name}
            button
            {...rest}
            to={name}
          >
            <Icon fontSize="small" style={{ paddingRight: 5 }} />
            <ListItemText>{label}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default Sidebar;
