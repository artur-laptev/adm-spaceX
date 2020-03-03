import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import BusIcon from '@material-ui/icons/DirectionsBus';

import useItemDetails from '../hooks/useItemDetails'
import { useDispatch } from 'react-redux'
import { updateShipment } from "../store/actions/shipmentsActions";


const styles = theme => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
  },
  searchBar: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
  },
  searchInput: {
    fontSize: theme.typography.fontSize,
  },
  block: {
    display: 'block',
  },
  addUser: {
    marginRight: theme.spacing(1),
  },
  contentWrapper: {
    margin: '40px 16px',
  },
});

function Details(props) {
  const { classes } = props
  const { item, notFound } = useItemDetails()
  const [boxesValue, setBoxesValue] = useState('')
  const dispatch = useDispatch();

  function calculateUnits () {
    if (!boxesValue)
      return 0

    const values = boxesValue.split(',')
    return values.reduce((a, b) => (+a) + (+b))
  }

  function calculateBays() {
    const units = calculateUnits()
    return Math.ceil(units/10)
  }
  
  useEffect(() => {
    if (item) {
      setBoxesValue(item.boxes || '')
    }
  }, [item])

  return notFound 
    ? notFound
    : (
      <React.Fragment>
        <AppBar className={classes.searchBar} position="static" color="default" elevation={0}>
          <Toolbar>
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <BusIcon className={classes.block} color="inherit" />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  placeholder="Cargo boxes"
                  InputProps={{
                    disableUnderline: true,
                    className: classes.searchInput,
                  }}
                  value={boxesValue}
                  onChange={event => {
                    setBoxesValue(event.target.value)
                    dispatch(updateShipment({ ...item, boxes: event.target.value }))
                  }}
                />
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <div className={classes.contentWrapper}>
          <Typography color="textSecondary" align="center">
            Number of required cargo bays: { calculateBays() }
          </Typography>
        </div>
      </React.Fragment>
    );
}

Details.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Details);