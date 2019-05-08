import { ADD_PLACE, DELETE_PLACE } from '../actions/actionTypes';

const initialState = {
  places: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = {
        name: action.placeName,
        key: Math.random().toString(),
        image: {
          uri: action.image.uri
        },
        location: action.location
        // Setting key toString prevents an error message saying that keys are expected to be strings, not numbers. This came from FlatList found in PlaceList.js
      };
      return { ...state, places: [...state.places, newPlace] };
    }
    case DELETE_PLACE:
      return {
        places: state.places.filter(p => p.key !== action.placeKey)
      };
    default:
      return state;
  }
};

export default reducer;
