import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import { Container } from "./styles";

import GroupIcon from "@material-ui/icons/Group";
import EventIcon from "@material-ui/icons/Event";
import HomeIcon from "@material-ui/icons/Home";

function Sidebar() {
    const items = [
        { name: "/app", label: "Home", Icon: HomeIcon },
        { name: "/eventos", label: "Eventos", Icon: EventIcon },
        { name: "/participantes", label: "Participantes", Icon: GroupIcon },
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
