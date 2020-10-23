import React from "react";
import { withRouter } from "react-router-dom";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@material-ui/core";
import HomeIcon from '@material-ui/icons/Home'
import { useStyles } from "./styles";

const Breadcrumb = props => {
  const { history, crumbs } = props;
  const classes = useStyles();

  const handleClick = (path) => {
    if (path.length > 0) {
      history.push(path);
    } else {
      history.goBack();
    }
  };

  return (
    <MUIBreadcrumbs separator="›" aria-label="breadcrumb" className={classes.root}>
      {crumbs.length > 0 ? (
        <Typography className={classes.link}>
          <HomeIcon className={classes.icon} />
          Home
        </Typography>
      ) : (
          null
        )}
      {crumbs.map(({ routeTo, name }, index) => {
        const isLast = index === crumbs.length - 1;
        return isLast ? (
          <Typography key={name} className={classes.current}>{name}</Typography>
        ) : (
            <Link className={classes.linkCrumb} key={name} onClick={() => handleClick(routeTo)}>
              {name}
            </Link>
          );
      })}
    </MUIBreadcrumbs>
  );
};

export default withRouter(Breadcrumb);
