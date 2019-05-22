import { ADD_PLACE, DELETE_PLACE } from './actionTypes';

export const addPlace = (placeName, location, image) => {
  return dispatch => {
    fetch(
      'https://us-central1-learningrn-40203.cloudfunctions.net/storeImage',
      {
        method: 'POST',
        body: JSON.stringify({
          image: image.base64
        })
      }
    )
      .catch(err => console.log(err))
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
      .catch(err => console.log(err))
      .then(res => res.json())
      .then(parsedRes => {
        console.log('parsed response: ', parsedRes);
      });
  };
};

export const deletePlace = placeKey => ({
  type: DELETE_PLACE,
  placeKey
});
