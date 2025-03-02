import * as UserApi from "../api/UserRequests";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPDATING_START" });
  try {
    const { data } = await UserApi.updateUser(id, formData);
    console.log("user updated yo check it: ", data);
    dispatch({ type: "UPDATING_SUCCESS", data: data });
  } catch (error) {
    console.log("update sad face", error);
    dispatch({ type: "UPDATING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER", data: id });
  try {
    await UserApi.followUser(id, data);
    console.log("followed that dude", id);
  } catch (error) {
    console.log("following that dude failed", error);
  }
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER", data: id });
  try {
    await UserApi.unfollowUser(id, data);
    console.log("unfollowed cya", id);
  } catch (error) {
    console.log("unfollow borked", error);
  }
};