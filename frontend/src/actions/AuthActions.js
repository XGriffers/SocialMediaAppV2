import * as AuthApi from "../api/AuthRequests";

export const logIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.logIn(formData);
    console.log("login worked woo", data); // lil victory log
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/home", { replace: true }); // absolute path ftw
  } catch (error) {
    console.log("login broke rip", error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthApi.signUp(formData);
    console.log("signup done lets gooo", data);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/home", { replace: true });
  } catch (error) {
    console.log("signup failed oof", error);
    dispatch({ type: "AUTH_FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
  console.log("peace out yo");
};