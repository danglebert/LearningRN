import { SET_PLACES, REMOVE_PLACE } from './actionTypes';
import { uiStartLoading, uiStopLoading, authGetToken } from './index';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    let authToken;
    dispatch(uiStartLoading());
    dispatch(authGetToken())
      .catch(() => {
        alert('no token found');
      })
      .then(token => {
        authToken = token;
        return fetch(
          'https://us-central1-learningrn-40203.cloudfunctions.net/storeImage',
          {
            method: 'POST',
            body: JSON.stringify({
              image: image.base64
            }),
            headers: {
              authorization: 'Bearer ' + authToken
            }
          }
        );
      })
      .catch(err => {
        console.log('Err after cloud func: ', err);
        dispatch(uiStopLoading());
      })
      .then(res => {
        console.log('res HERE: ', res);
        return res.json();
      })
      .then(parsedRes => {
        const placeData = {
          placeName,
          location,
          image: parsedRes.imageUrl
        };

        return fetch(
          `https://learningrn-40203.firebaseio.com/places.json?auth=${authToken}`,
          {
            method: 'POST',
            body: JSON.stringify(placeData)
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('parsed response: ', parsedRes);
        dispatch(uiStopLoading());
      })
      .catch(err => {
        console.log('err after data fetch ', err);
        dispatch(uiStopLoading());
      });
  };
};

export const getPlaces = () => {
  return dispatch => {
    dispatch(authGetToken())
      .then(token =>
        fetch(
          `https://learningrn-40203.firebaseio.com/places.json?auth=${token}`
        )
      )
      .catch(() => {
        alert('no valid token found');
      })
      .then(res => res.json())
      .then(parsedRes => {
        const places = [];
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
      })
      .catch(err => {
        alert('There was an error, try again');
        console.log(err);
      });
  };
};

export const setPlaces = places => ({
  type: SET_PLACES,
  places
});

export const deletePlace = placeKey => {
  return dispatch => {
    dispatch(authGetToken())
      .catch(() => {
        alert('no valid token found');
      })
      .then(token => {
        fetch(
          `https://learningrn-40203.firebaseio.com/places/${placeKey}.json?auth=${token}`,
          {
            method: 'DELETE'
          }
        );
      })
      .then(res => res.json())
      .then(parsedRes => {
        console.log('Successfully Deleted');
        dispatch(removePlace(placeKey));
      })
      .catch(err => {
        console.log(err);
      });
  };
};

export const removePlace = key => ({
  type: REMOVE_PLACE,
  key
});
