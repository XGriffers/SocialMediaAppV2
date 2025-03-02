const chatReducer = (state = { chatUsers: [], loading: false, error: false }, action) => {
    switch (action.type) {
      case "SAVE_USER":
        // don’t double up users
        const exists = state.chatUsers.some((u) => u._id === action.data._id);
        if (exists) return state; // nah already got em
        return { ...state, chatUsers: [...state.chatUsers, action.data] }; // new chat bud
      default:
        return state; // chill
    }
  };
  
  export default chatReducer;