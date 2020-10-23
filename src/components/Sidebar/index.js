import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { useAuth } from '../../hooks/auth';
import { Container, ProfileImg, MenuHeader, MenuList, ProfileName } from './styles';
import {
  Event,
  Person
} from '@material-ui/icons';

function Sidebar() {
  const { user } = useAuth();
  const items = [
    { name: '/eventos', label: 'Eventos', Icon: Event },
  ];
  const AVATAR_URL_DEFAULT =
    'https://firebasestorage.googleapis.com/v0/b/upf-eventos.appspot.com/o/assets%2Fdefault_avatar.png?alt=media&token=fda493df-ce4f-4c71-bea6-b310c8b524ad';

  if (user.nivelAcesso === '1') items.push({ name: '/usuarios', label: 'Usuários', Icon: Person });

  return (
    <Container>
      <MenuHeader>
        <RouterLink to="/perfil">
          <ProfileImg avatar={user.avatarUrl ? user.avatarUrl : AVATAR_URL_DEFAULT} />
          <ProfileName>{user.name}</ProfileName>
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
