import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    dispatch(uiStartLoading());
    fetch(
      'https://us-central1-learningrn-40203.cloudfunctions.net/storeImage',
      {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        const placeData = {
          placeName,
          location,
          image: parsedRes.imageUrl
        };

        return fetch('https://learningrn-40203.firebaseio.com/places.json', {
          method: 'POST',
          body: JSON.stringify(placeData)
        });
      })
      .catch(err => {
        console.log(err);
        dispatch(uiStopLoading());
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('parsed response: ', parsedRes);
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    fetch('https://learningrn-40203.firebaseio.com/places.json')
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
        console.log('here: ', parsedRes);
        for (let key in parsedRes) {
          places.push({
            ...parsedRes[key],
            key: key,
            image: {
              uri: parsedRes[key].image
            }
          });
        }
        dispatch(setPlaces(places));
      });
  };
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = placeKey => {
  return dispatch => {
    fetch(`https://learningrn-40203.firebaseio.com/places/${placeKey}.json`, {
      method: 'DELETE'
    })
      .catch(err => {
        console.log(err);
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Successfully Deleted');
        dispatch(removePlace(placeKey));
      });
  };
};

export const removePlace = key => ({
  type: REMOVE_PLACE,
  key
});
