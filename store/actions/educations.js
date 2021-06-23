import Education from '../../models/Education';

export const DELETE_EDUCATION = 'DELETE_EDUCATION';
export const CREATE_EDUCATION = 'CREATE_EDUCATION';
export const UPDATE_EDUCATION = 'UPDATE_EDUCATION';
export const SET_EDUCATIONS = 'SET_EDUCATIONS';

export const fetchEducations = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/educations.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedEducations = [];
   
      
      // console.log(resData,'res data');
      for (const key in resData) {
        console.log(resData[key].value)
        loadedEducations.push(
          new Education(
            key,
            resData[key].name,
            resData[key].institution,
            resData[key].place,
            resData[key].score,
            resData[key].start,
            resData[key].end
          )
        );
      }

      // console.log(loadedEducations,'loaded educations')
      dispatch({
        type: SET_EDUCATIONS,
        educations: loadedEducations,
      });
    } catch (err) {
      // send to custom analytics server
      console.log(err)
      throw err;
    }
  };
};

export const deleteEducation = educationId => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/educations/${educationId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_EDUCATION, pid: educationId });
  };
};

export const createEducation = (name, institution, place, score, start, end) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    // console.log(userId,'user id')
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/educations.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          institution,
          place,
          score,
          start,
          end
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_EDUCATION,
      educationData: {
        id: resData.name,
        name,
        institution,
        place,
        score,
        start,
        end
      }
    });
  };
};

export const updateEducation = (id, name, institution, place, score, start, end) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/educations/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          institution,
          place,
          score,
          start,
          end
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_EDUCATION,
      pid: id,
      educationData: {
        name,
        institution,
        place,
        score,
        start,
        end
      }
    });
  };
};
