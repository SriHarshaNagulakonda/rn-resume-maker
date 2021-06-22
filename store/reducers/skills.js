import {
  DELETE_SKILL,
  CREATE_SKILL,
  UPDATE_SKILL,
  SET_SKILLS
} from '../actions/skills';
import Skill from '../../models/Skills';

const initialState = {
  availableSkills: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_SKILLS:
      return {
        availableSkills: action.skills,
      };
    case CREATE_SKILL:
      const newSkill = new Skill(
        action.skillData.id,
        action.skillData.name,        
        action.skillData.value
      );
      return {
        ...state,
        availableSkills: state.availableSkills.concat(newSkill),
      };
    case UPDATE_SKILL:
      const updatedSkill = new Skill(action.pid, action.skillData.name, action.skillData.value)
      const availableSkillIndex = state.availableSkills.findIndex(
        skill => skill.id === action.pid
      );
      const updatedAvailableSkills = [...state.availableSkills];
      updatedAvailableSkills[availableSkillIndex] = updatedSkill;
      return {
        ...state,
        availableSkills: updatedAvailableSkills,
      };
    case DELETE_SKILL:
      return {
        ...state,
        availableSkills: state.availableSkills.filter(
          skill => skill.id !== action.pid
        )
      };
  }
  return state;
};
