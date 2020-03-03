import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import RefreshIcon from '@material-ui/icons/Refresh';
import IconButton from '@material-ui/core/IconButton';

import { useSelector, useDispatch } from 'react-redux'
import { getShipments, saveShipments } from "../store/actions/shipmentsActions";
import { Link } from 'react-router-dom';

const styles = theme => ({
  categoryHeader: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  filterField: {
    color: theme.palette.common.white,
  },
  item: {
    paddingTop: 1,
    paddingBottom: 1,
    color: 'rgba(255, 255, 255, 0.7)',
    '&:hover,&:focus': {
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
  },
  itemCategory: {
    backgroundColor: '#232f3e',
    boxShadow: '0 -1px 0 #404854 inset',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  firebase: {
    fontSize: 24,
    color: theme.palette.common.white,
  },
  itemActiveItem: {
    color: '#4fc3f7',
  },
  itemPrimary: {
    fontSize: 'inherit',
  },
  itemIcon: {
    color: 'green',
    minWidth: 'auto',
    marginRight: theme.spacing(2),
  },
  loadDataWrap: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '20px',
  }
});

function Navigator(props) {
  const { classes, ...other } = props;
  const [filterValue, setFilterValue ] = useState('');
  const { items, hasData } = useSelector(state => {
    const arr = state.shipments.items
    const items =  arr.length > 0 && filterValue
      ? arr.filter(item => item.name.toLowerCase().indexOf(filterValue) !== -1)
      : arr

    return {
      items: items,
      hasData: arr.length > 0
    }
  })
  const dispatch = useDispatch();

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem component={Link} to="/" className={clsx(classes.firebase, classes.item, classes.itemCategory)}>  
          <ListItemText classes={{ primary: classes.itemPrimary }}>
            Cargo Planner
          </ListItemText>
          {hasData && (<>
            <IconButton className={classes.itemIcon} onClick={event => {
              event.preventDefault()
              dispatch(saveShipments())
            }}>
              <SaveIcon /> 
            </IconButton>
            <IconButton className={classes.itemIcon} style={{ color: 'red' }} onClick={event => {
              event.preventDefault()
              dispatch(getShipments())
            }}>
              <RefreshIcon /> 
            </IconButton>
          </>)}
        </ListItem>
        <ListItem className={clsx(classes.item, classes.itemCategory)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <SearchIcon className={classes.block} color="inherit" />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by company"
                InputProps={{
                  disableUnderline: true,
                  className: classes.filterField,
                }}
                value={filterValue}
                onChange={event => setFilterValue(event.target.value)}
              />
            </Grid>
          </Grid>
        </ListItem>

        {hasData
          ? items.map(({ id, name, active = false }) => (
              <ListItem
                key={id}
                component={Link}
                to={`/${id}`}
                className={clsx(classes.item, active && classes.itemActiveItem)}
              >
                <ListItemText
                  classes={{
                    primary: classes.itemPrimary,
                  }}
                >
                  {name}
                </ListItemText>
              </ListItem>
            ))
          : <div className={classes.loadDataWrap}>
              <Button variant="contained" color="primary" className={classes.loadData}
                onClick={() => dispatch(getShipments())}
              >Load</Button>
            </div>
        }
        
      </List>
    </Drawer>
  );
}

Navigator.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navigator);