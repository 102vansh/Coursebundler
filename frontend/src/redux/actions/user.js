import axios from "axios";
import toast from "react-hot-toast";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

const API_URL = process.env.REACT_APP_API_URL;

export const login = (email, password) => async (dispatch) => {
  console.log(email, password);
  try {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      `${API_URL}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(data);

    dispatch({ type: "loginSuccess", payload: data });
    toast.success(data.message);
  } catch (error) {
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({
      type: "loginFailure",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const getmyprofile = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUserRequest" });

    const { data } = await axios.get(`${API_URL}/user/myprofile`);
    console.log(data);
    dispatch({ type: "loadUserSuccess", payload: data.user });
    console.log(data.user);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "loadUserFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

export const logoutuser = () => async (dispatch) => {
  try {
    dispatch({ type: "logoutRequest" });

    // Clear all auth data
    localStorage.removeItem("token");

    // Remove any cookies that might be causing issues
    document.cookie.split(";").forEach((cookie) => {
      const [name] = cookie.trim().split("=");
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    });

    try {
      await axios.get(`${API_URL}/user/logout`);
    } catch (error) {
      console.log("Server logout failed, but continuing local logout:", error.message);
    }

    // Dispatch success action with clear message
    dispatch({ type: "logoutSuccess", payload: "Logged out successfully" });

    // Force reload the page after a short delay to ensure Redux state is updated
    setTimeout(() => {
      window.location.reload();
    }, 500);
  } catch (error) {
    dispatch({
      type: "logoutFail",
      payload: error.response?.data?.message || "Logout failed, but session cleared locally",
    });

    // Still remove token and reload
    localStorage.removeItem("token");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }
};

export const registeruser = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "RegisterRequest" });
    const { data } = await axios.post(`${API_URL}/user/register`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch({ type: "RegisterSuccess", payload: data.user });
    console.log(data.user);
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "RegisterFail",
      payload: error.response?.data?.message || "An error occurred",
    });
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

export const addtoPlaylist = (id) => async (dispatch) => {
  try {
    dispatch({ type: "addtoPlaylistRequest" });
    const { data } = await axios.post(
      `${API_URL}/user/addtoplaylist`,
      { id },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "addtoPlaylistSuccess", payload: data.message });
    console.log(data);
    toast.success(data.message);
  } catch (error) {
    dispatch({
      type: "addtoPlaylistFailure",
      payload: error.response?.data?.message || "An error occurred",
    });
    toast.error(error.response?.data?.message || "An error occurred");
    console.log(error);
  }
};

export const buysubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "buysubscribeRequest" });
    const { data } = await axios.get(`${API_URL}/payment/buy`);
    dispatch({ type: "buysubscribeSuccess", payload: data.subscriptionId });
    console.log(data);
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "buysubscribeFail",
      payload: error.response?.data?.message || "An error occurred",
    });
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

export const cancelsubscription = () => async (dispatch) => {
  try {
    dispatch({ type: "cancelsubscribeRequest" });

    const { data } = await axios.delete(`${API_URL}/payment/cancel`);
    dispatch({ type: "cancelsubscribeSuccess", payload: data.message });
    console.log(data);
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    dispatch({
      type: "cancelsubscribeFail",
      payload: error.response?.data?.message || "An error occurred",
    });
    toast.error(error.response?.data?.message || "An error occurred");
  }
};
