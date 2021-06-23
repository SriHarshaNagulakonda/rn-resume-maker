import {
  DELETE_EDUCATION,
  CREATE_EDUCATION,
  UPDATE_EDUCATION,
  SET_EDUCATIONS
} from '../actions/educations';
import Education from '../../models/Education';

const initialState = {
  availableEducations: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_EDUCATIONS:
      return {
        availableEducations: action.educations,
      };
    case CREATE_EDUCATION:
      const newEducation = new Education(
        action.educationData.id,
        action.educationData.name,        
        action.educationData.institution,
        action.educationData.place,
        action.educationData.score,
        action.educationData.start,
        action.educationData.end
      );
      return {
        ...state,
        availableEducations: state.availableEducations.concat(newEducation),
      };
    case UPDATE_EDUCATION:
      const updatedEducation = new Education(
        action.pid,
        action.educationData.name,        
        action.educationData.institution,
        action.educationData.place,
        action.educationData.score,
        action.educationData.start,
        action.educationData.end
      )
      const availableEducationIndex = state.availableEducations.findIndex(
        education => education.id === action.pid
      );
      const updatedAvailableEducations = [...state.availableEducations];
      updatedAvailableEducations[availableEducationIndex] = updatedEducation;
      return {
        ...state,
        availableEducations: updatedAvailableEducations,
      };
    case DELETE_EDUCATION:
      return {
        ...state,
        availableEducations: state.availableEducations.filter(
          education => education.id !== action.pid
        )
      };
  }
  return state;
};
