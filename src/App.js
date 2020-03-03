import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import './App.scss';
import MainLayout from './layout/MainLayout'
import { getLocalShipments } from "./store/actions/shipmentsActions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getLocalShipments())
  }, [dispatch])

  return (
    <MainLayout />
  );
}

export default App;
