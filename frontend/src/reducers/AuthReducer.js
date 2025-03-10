const authReducer = (state = { authData: null, loading: false, error: false, updateLoading: false }, action) => {
  switch (action.type) {
    case "AUTH_START":
      return { ...state, loading: true, error: false }; // spinning up
    case "AUTH_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, loading: false, error: false }; // logged in yo
    case "AUTH_FAIL":
      return { ...state, loading: false, error: true }; // oops
    case "UPDATING_START":
      return { ...state, updateLoading: true, error: false }; // tweaking stuff
    case "UPDATING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      return { ...state, authData: action.data, updateLoading: false, error: false }; // updated hell yeah
    case "UPDATING_FAIL":
      return { ...state, updateLoading: false, error: true }; // update tanked
    case "LOG_OUT":
      localStorage.clear();
      return { ...state, authData: null, loading: false, error: false, updateLoading: false }; // peace out
    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.data],
          },
        },
      }; // stalkin someone new
    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: state.authData.user.following.filter((id) => id !== action.data),
          },
        },
      }; // ditchin em
    default:
      return state; // meh whatever
  }
};

export default authReducer;