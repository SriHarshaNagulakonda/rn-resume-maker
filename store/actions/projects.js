import Project from '../../models/Projects';

export const DELETE_PROJECT = 'DELETE_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const UPDATE_PROJECT = 'UPDATE_PROJECT';
export const SET_PROJECTS = 'SET_PROJECTS';

export const fetchProjects = () => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    try {
      const response = await fetch(
        `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/projects.json`
      );

      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      const resData = await response.json();
      const loadedProjects = [];
   

      // console.log(resData,'res data');
      for (const key in resData) {
        console.log(resData[key].value)
        loadedProjects.push(
          new Project(
            key,
            resData[key].name,
            resData[key].description,
            resData[key].live_url,
            resData[key].code_url,
            resData[key].start,
            resData[key].end
          )
        );
      }

      // console.log(loadedProjects,'loaded projects')
      dispatch({
        type: SET_PROJECTS,
        projects: loadedProjects,
      });
    } catch (err) {
      // send to custom analytics server
      console.log(err)
      throw err;
    }
  };
};

export const deleteProject = projectId => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/projects/${projectId}.json`,
      {
        method: 'DELETE'
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    dispatch({ type: DELETE_PROJECT, pid: projectId });
  };
};

export const createProject = (name, description, live_url, code_url, start, end) => {
  return async (dispatch, getState) => {
    // any async code you want!
    const userId = getState().auth.userId;
    // console.log(userId,'user id')
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/projects.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          live_url,
          code_url,
          start,
          end
        })
      }
    );

    const resData = await response.json();

    dispatch({
      type: CREATE_PROJECT,
      projectData: {
        id: resData.name,
        name,
        description,
        live_url,
        code_url,
        start,
        end
      }
    });
  };
};

export const updateProject = (id, name, description, live_url, code_url, start, end) => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await fetch(
      `https://resume-maker-143-default-rtdb.firebaseio.com/${userId}/projects/${id}.json`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          description,
          live_url,
          code_url,
          start,
          end
        })
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    dispatch({
      type: UPDATE_PROJECT,
      pid: id,
      projectData: {
        name,
        description,
        live_url,
        code_url,
        start,
        end
      }
    });
  };
};
