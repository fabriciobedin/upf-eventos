import React from 'react';
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import { Container } from './styles';
import {Group, Home, Event, EventNoteOutlined} from '@material-ui/icons';


function Sidebar() {
    const items = [
      { name: '/app', label: 'Home', Icon: Home },
      { name: '/eventos', label: 'Eventos', Icon: Event },
      { name: '/participantes', label: 'Participantes', Icon: Group },
      { name: '/subevento', label: 'Subeventos', Icon: EventNoteOutlined }
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
