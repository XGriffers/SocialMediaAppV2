const postReducer = (
  state = { posts: [], loading: false, error: false, uploading: false },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, error: false, uploading: true }; // posting time
    case "UPLOAD_SUCCESS":
      return {
        ...state,
        posts: [action.data, ...state.posts],
        uploading: false,
        error: false,
      }; // new post yay
    case "UPLOAD_FAIL":
      return { ...state, uploading: false, error: true }; // post flopped
    case "RETRIEVING_START":
      return { ...state, loading: true, error: false }; // grabbin posts
    case "RETRIEVING_SUCCESS":
      return { ...state, posts: action.data, loading: false, error: false }; // got em
    case "RETRIEVING_FAIL":
      return { ...state, loading: false, error: true }; // no posts sadge
    default:
      return state; // whatever dude
  }
};

export default postReducer;