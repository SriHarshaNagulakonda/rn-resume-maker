import Achievement from '../../models/Achievements';

export const DELETE_ACHIEVEMENT = 'DELETE_ACHIEVEMENT';
export const CREATE_ACHIEVEMENT = 'CREATE_ACHIEVEMENT';
export const UPDATE_ACHIEVEMENT = 'UPDATE_ACHIEVEMENT';
export const SET_ACHIEVEMENTS = 'SET_ACHIEVEMENTS';

export const fetchAchievements = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/achievements.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedAchievements = [];
   
      
      // console.log(resData,'res data');
      for (const key in resData) {
        console.log(resData[key].description)
        loadedAchievements.push(
          new Achievement(
            key,
            resData[key].title,
            resData[key].description
          )
        );
      }

      // console.log(loadedAchievements,'loaded achievements')
      dispatch({
        type: SET_ACHIEVEMENTS,
        achievements: loadedAchievements,
      });
    } catch (err) {
      // send to custom analytics server
      console.log(err)
      throw err;
    }
  };
};

export const deleteAchievement = achievementId => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/achievements/${achievementId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_ACHIEVEMENT, pid: achievementId });
  };
};

export const createAchievement = (title, description) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    // console.log(userId,'user id')
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/achievements.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description,
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_ACHIEVEMENT,
      achievementData: {
        id: resData.name,
        title,
        description,
      }
    });
  };
};

export const updateAchievement = (id, title, description) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/achievements/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          description
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_ACHIEVEMENT,
      pid: id,
      achievementData: {
        title,
        description
      }
    });
  };
};
