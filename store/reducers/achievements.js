import {
  DELETE_ACHIEVEMENT,
  CREATE_ACHIEVEMENT,
  UPDATE_ACHIEVEMENT,
  SET_ACHIEVEMENTS
} from '../actions/achievements';
import Achievement from '../../models/Achievements';

const initialState = {
  availableAchievements: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ACHIEVEMENTS:
      return {
        availableAchievements: action.achievements,
      };
    case CREATE_ACHIEVEMENT:
      const newAchievement = new Achievement(
        action.achievementData.id,
        action.achievementData.title,        
        action.achievementData.description
      );
      return {
        ...state,
        availableAchievements: state.availableAchievements.concat(newAchievement),
      };
    case UPDATE_ACHIEVEMENT:
      const updatedAchievement = new Achievement(action.pid, action.achievementData.title, action.achievementData.description)
      const availableAchievementIndex = state.availableAchievements.findIndex(
        achievement => achievement.id === action.pid
      );
      const updatedAvailableAchievements = [...state.availableAchievements];
      updatedAvailableAchievements[availableAchievementIndex] = updatedAchievement;
      return {
        ...state,
        availableAchievements: updatedAvailableAchievements,
      };
    case DELETE_ACHIEVEMENT:
      return {
        ...state,
        availableAchievements: state.availableAchievements.filter(
          achievement => achievement.id !== action.pid
        )
      };
  }
  return state;
};
