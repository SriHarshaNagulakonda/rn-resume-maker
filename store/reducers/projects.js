import {
  DELETE_PROJECT,
  CREATE_PROJECT,
  UPDATE_PROJECT,
  SET_PROJECTS
} from '../actions/projects';
import Project from '../../models/Projects';

const initialState = {
  availableProjects: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROJECTS:
      return {
        availableProjects: action.projects,
      };
    case CREATE_PROJECT:
      const newProject = new Project(
        action.projectData.id,
        action.projectData.name,        
        action.projectData.description,
        action.projectData.live_url,
        action.projectData.code_url,
        action.projectData.start,
        action.projectData.end
      );
      return {
        ...state,
        availableProjects: state.availableProjects.concat(newProject),
      };
    case UPDATE_PROJECT:
      const updatedProject = new Project(
        action.pid,
        action.projectData.name,        
        action.projectData.description,
        action.projectData.live_url,
        action.projectData.code_url,
        action.projectData.start,
        action.projectData.end
      )
      const availableProjectIndex = state.availableProjects.findIndex(
        project => project.id === action.pid
      );
      const updatedAvailableProjects = [...state.availableProjects];
      updatedAvailableProjects[availableProjectIndex] = updatedProject;
      return {
        ...state,
        availableProjects: updatedAvailableProjects,
      };
    case DELETE_PROJECT:
      return {
        ...state,
        availableProjects: state.availableProjects.filter(
          project => project.id !== action.pid
        )
      };
  }
  return state;
};
