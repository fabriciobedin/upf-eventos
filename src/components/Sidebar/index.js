import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Container, ProfileImg, MenuHeader, MenuList } from './styles';
import {
  Event,
  Person
} from '@material-ui/icons';

function Sidebar() {
  const items = [
    { name: '/eventos', label: 'Eventos', Icon: Event },
    { name: '/usuarios', label: 'Usuários', Icon: Person }
  ];
  return (
    <Container>
      <MenuHeader>
        <RouterLink to="/perfil">
          <ProfileImg />
        </RouterLink>
      </MenuHeader>
      <MenuList>
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
      </MenuList>
    </Container>
  );
}

export default Sidebar;
