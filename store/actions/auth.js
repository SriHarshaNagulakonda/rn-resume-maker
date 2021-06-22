import AsyncStorage from '@react-native-async-storage/async-storage';
export const AUTHENTICATE = 'AUTHENTICATE';
export const SIGNUP = 'SIGNUP';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const authenticate = (userId) => (dispatch) => {
    console.log(userId, 'actions')
    // return dispatch => {
      dispatch({ type: AUTHENTICATE, userId: userId });
    // };
};


export const signup = (name, email, password) => {
    return async dispatch => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBxgFPhUUiR2S4pp8jL9OwycQ1-T8HvP18',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_EXISTS') {
          message = 'This email exists already!';
        }
        throw new Error(message);
      }
  
      const resData = await response.json();
      // console.log(resData);
      dispatch(
        authenticate(
          resData.localId,
        )
      );
    //   saveDataToStorage(resData.localId);
    };
  };
  
  export const login = (email, password) => {
    return async dispatch => {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBxgFPhUUiR2S4pp8jL9OwycQ1-T8HvP18',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: email,
            password: password,
          })
        }
      );
  
      if (!response.ok) {
        const errorResData = await response.json();
        console.log(errorResData)
        const errorId = errorResData.error.message;
        let message = 'Something went wrong!';
        if (errorId === 'EMAIL_NOT_FOUND') {
          message = 'This email could not be found!';
        } else if (errorId === 'INVALID_PASSWORD') {
          message = 'This password is not valid!';
        }
        throw new Error(message);
      }
  
      const resData = await response.json();

      dispatch(
        authenticate(
          resData.localId,
        )
      );
      saveDataToStorage(resData.localId);
    };
  };

  export const logout = () => {
    AsyncStorage.removeItem('userData');
    return { type: LOGOUT };
  };
  

  const saveDataToStorage = ( userId ) => {
    AsyncStorage.setItem(
      'userData',
      JSON.stringify({
        userId: userId,
      })
    );
  };