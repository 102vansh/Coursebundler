import axios from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.REACT_APP_API_URL;

export const getallcourses = (category = "", keywoard = "") => async (dispatch) => {
  try {
    dispatch({ type: "allcourseRequest" });
    const { data } = await axios.get(`${API_URL}/course/allcourse?keywoard=${keywoard}&category=${category}`);
    dispatch({ type: "allcourseSuccess", payload: data.courses });
    console.log(data.courses);
  } catch (error) {
    console.log(error);
    toast.error(error.response?.data?.message || "An error occurred");
    dispatch({ type: "allcourseFailure" });
  }
};

export const getlectures = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getcourseRequest" });
    const { data } = await axios.get(`${API_URL}/course/getlectures/${id}`, {
      withCredentials: true,
    });
    dispatch({ type: "getcourseSuccess", payload: data.lectures });
    console.log(data);
  } catch (error) {
    console.log(error);
    dispatch({ type: "getcourseFailure" });
    toast.error(error.response?.data?.message || "An error occurred");
  }
};
