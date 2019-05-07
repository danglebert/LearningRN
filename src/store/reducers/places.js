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
          uri:
            'https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Fannabel%2Ffiles%2F2018%2F02%2FLouisville_Skyline-1200x801.jpg'
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
