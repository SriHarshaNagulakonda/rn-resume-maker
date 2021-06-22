import Skill from '../../models/Skills';

export const DELETE_SKILL = 'DELETE_SKILL';
export const CREATE_SKILL = 'CREATE_SKILL';
export const UPDATE_SKILL = 'UPDATE_SKILL';
export const SET_SKILLS = 'SET_SKILLS';

export const fetchSkills = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/skills.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedSkills = [];
   
      
      // console.log(resData,'res data');
      for (const key in resData) {
        console.log(resData[key].value)
        loadedSkills.push(
          new Skill(
            key,
            resData[key].name,
            resData[key].value
          )
        );
      }

      // console.log(loadedSkills,'loaded skills')
      dispatch({
        type: SET_SKILLS,
        skills: loadedSkills,
      });
    } catch (err) {
      // send to custom analytics server
      console.log(err)
      throw err;
    }
  };
};

export const deleteSkill = skillId => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/skills/${skillId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_SKILL, pid: skillId });
  };
};

export const createSkill = (name, value) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    // console.log(userId,'user id')
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/skills.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          value,
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_SKILL,
      skillData: {
        id: resData.name,
        name,
        value,
      }
    });
  };
};

export const updateSkill = (id, name, value) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/skills/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          value
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_SKILL,
      pid: id,
      skillData: {
        name,
        value
      }
    });
  };
};
