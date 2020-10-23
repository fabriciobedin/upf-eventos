import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { Container, ProfileImg, MenuHeader, MenuList } from './styles';
import {
  Event,
  Person
} from '@material-ui/icons';

function Sidebar() {
  const { user } = useAuth();
  const items = [
    { name: '/eventos', label: 'Eventos', Icon: Event },
  ];
  const { REACT_APP_AVATAR_URL_DEFAULT } = process.env;
  
  if (user.nivelAcesso === 1) items.push({ name: '/usuarios', label: 'Usuários', Icon: Person });

  return (
    <Container>
      <MenuHeader>
        <RouterLink to="/perfil">
          <ProfileImg avatar={user.avatarUrl ? user.avatarUrl : REACT_APP_AVATAR_URL_DEFAULT} />
          <p>{user.name}</p>
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
