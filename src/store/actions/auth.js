import { TRY_AUTH } from './actionTypes';
import { uiStartLoading, uiStopLoading } from './index';
import startMainTabs from '../../screens/MainTabs/startMainTabs';
import { aKey } from '../../../secrets';

export const tryAuth = (authData, loginMode) => {
  return dispatch => {
    dispatch(uiStartLoading());

    let url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=${aKey}`;
    if (!loginMode) {
      url = `https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=${aKey}`;
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .catch(err => {
        dispatch(uiStopLoading());
        console.log(err);
        alert('Authentication failed, please try again!');
      })
      .then(res => res.json())
      .then(parsedRes => {
        dispatch(uiStopLoading());
        if (parsedRes.error) {
          alert('Auth failed, try again');
        } else {
          startMainTabs();
        }
        console.log(parsedRes);
      });
  };
};
