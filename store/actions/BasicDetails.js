import Basic from '../../models/Basic'

export const DELETE_BASIC = 'DELETE_BASIC';
export const CREATE_BASIC = 'CREATE_BASIC';
export const UPDATE_BASIC = 'UPDATE_BASIC';
export const SET_BASICS = 'SET_BASICS';

export const fetchBasics = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/basics.json`
      );

      if (!response.ok) {
        
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedBasics = [];

      for (const key in resData) {
        loadedBasics.push(
          new Basic(
            key,
            resData[key].name,
            resData[key].email,
            resData[key].phone,
            resData[key].career_objective
          )
        );
      }

      dispatch({
        type: SET_BASICS,
        basics: loadedBasics[0],
      });
    } catch (err) {
      // send to custom analytics server
      throw err;
    }
  };
};

export const deleteBasic = basicId => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shopping-app-c8e5b-default-rtdb.firebaseio.com/basics/${basicId}.json?auth=${token}`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_BASIC, pid: basicId });
  };
};

export const createBasic = (name, email, phone, career_objective) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/basics.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name, email, phone, career_objective
        })
      }
    );

    const resData = await response.json();

    console.log(resData)
    dispatch({
      type: CREATE_BASIC,
      basicData: {
        id: resData.name,
        name,
        email,
        phone,
        career_objective
      }
    });
  };
};

export const updateBasic = (id, title, description, imageUrl) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://rn-shopping-app-c8e5b-default-rtdb.firebaseio.com/basics/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
          imageUrl
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_BASIC,
      pid: id,
      basicData: {
        title,
        description,
        imageUrl
      }
    });
  };
};
