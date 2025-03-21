import toast from "react-hot-toast";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const createcourse = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "CreatecourseRequest" });
    const { data } = await axios.post(`${API_URL}/course/createcourse`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({ type: "CreatecourseSuccess", payload: data.lectures });
    console.log(data);
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "CreatecourseFailure", payload: error.response?.data?.message });
  }
};

export const deletecourse = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deletecourseRequest" });
    const { data } = await axios.delete(`${API_URL}/course/deletecourse/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "deletecourseSuccess", payload: data.message });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "deletecourseFailure", payload: error.response?.data?.message });
  }
};

export const addlectures = (formdata, id) => async (dispatch) => {
  try {
    dispatch({ type: "addlectureRequest" });
    const { data } = await axios.post(`${API_URL}/course/createlecture/${id}`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({ type: "addlectureSuccess", payload: data.course });
    toast.success(data.message);
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "addlectureFailure", payload: error.response?.data?.message });
  }
};

export const getallusers = () => async (dispatch) => {
  try {
    dispatch({ type: "getalluserRequest" });
    const { data } = await axios.get(`${API_URL}/user/admin/getalluser`, {
      withCredentials: true,
    });
    dispatch({ type: "getalluserSuccess", payload: data.users });
    console.log(data);
  } catch (error) {
    dispatch({ type: "getalluserFailure" });
    toast.error(error.response?.data?.message || "An error occurred");
  }
};

export const updaterole = (id) => async (dispatch) => {
  try {
    dispatch({ type: "updateroleRequest" });
    const { data } = await axios.put(`${API_URL}/user/admin/updaterole/${id}`, {}, {
      withCredentials: true,
    });
    dispatch({ type: "updateroleSuccess", payload: data.message });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "updateroleFailure", payload: error.response?.data?.message });
  }
};

export const deleteusers = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteuserRequest" });
    const { data } = await axios.delete(`${API_URL}/user/admin/deleteuser/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "deleteuserSuccess", payload: data.message });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "deleteuserFailure", payload: error.response?.data?.message });
  }
};

export const dashboard = () => async (dispatch) => {
  try {
    dispatch({ type: "getadminstatsRequest" });
    const { data } = await axios.get(`${API_URL}/other/admin/stats`, {
      withCredentials: true,
    });
    dispatch({ type: "getadminstatsSuccess", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "getadminstatsFailure", payload: error.response?.data?.message });
  }
};

export const deletelectures = (courseid, lectureid) => async (dispatch) => {
  try {
    dispatch({ type: "deletelectureRequest" });
    const { data } = await axios.delete(`${API_URL}/course/deletelecture?courseid=${courseid}&lectureid=${lectureid}`, {
      withCredentials: true,
    });
    dispatch({ type: "deletelectureSuccess", payload: data.message });
    toast.success(data.message);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "deletelectureFailure", payload: error.response?.data?.message });
  }
};
