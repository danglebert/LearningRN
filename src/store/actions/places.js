import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = placeName => ({
  type: ADD_PLACE,
  placeName
});

export const deletePlace = placeKey => ({
  type: DELETE_PLACE,
  placeKey
});
