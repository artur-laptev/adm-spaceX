import React from 'react';
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

function useItemDetails() {
  const { id } = useParams()
  const item = useSelector(state => state.shipments.items.find(i => i.id === id));
  const notFound = !item && <h1>404 NOT FOUND</h1>;

  return {
    item,
    notFound
  }
}

export default useItemDetails;
