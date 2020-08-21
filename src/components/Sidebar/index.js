import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Container, MenuHeader } from './styles';

import GroupIcon from '@material-ui/icons/Group';

import HomeIcon from '@material-ui/icons/Home';

function Sidebar() {
  const items = [
    { name: '/dashboard', label: 'Dashboard', Icon: HomeIcon },
    // { name: 'participantes', label: 'Participantes Cadastro', Icon: GroupIcon },
    { name: '/participantes', label: 'Participantes', Icon: GroupIcon }
  ];
  return (
    <Container>
      <MenuHeader>
        <span>UPF Eventos</span>
      </MenuHeader>
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
