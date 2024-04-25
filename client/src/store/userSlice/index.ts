import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignInType, SignUpType } from "../../types";
import { login } from "../../api";
import { toast } from "react-toastify";

export interface LoginState {
  token?: string;
  isDarkMode: boolean;
  name?: string;
  isAdministrator?: boolean;
}

const initialState: LoginState = {
  token: localStorage.getItem("token") || "",
  isDarkMode: localStorage.getItem("isDarkMode") === "true",
  name: localStorage.getItem("name") || "",
  isAdministrator: localStorage.getItem("isAdministrator") === "true",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    TOGGLE_DARK_MODE(state) {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem("isDarkMode", state.isDarkMode.toString());
    },
    SET_USER_DATA(state, action) {
      const { token, name, isAdministrator } = action.payload;
      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      localStorage.setItem("isAdministrator", isAdministrator);
      state.token = token;
      state.name = name;
      state.isAdministrator = isAdministrator;
    },
    LOGOUT(state) {
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("isAdministrator");
      state.token = "";
      state.name = "";
      state.isAdministrator = false;
    },
  },
});

export const signIn =
  (signInData: SignInType) => async (dispatch: Dispatch) => {
    console.log(signInData);
    if (!signInData.email || !signInData.password) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data = await login(signInData);
      console.log(data);
      dispatch(SET_USER_DATA(data));
    } catch (error) {
      console.log(error);
    }
  };

export const signUp = 
  (signUpData: SignUpType) => async (dispatch: Dispatch) => {
    console.log(signUpData);
    if (!signUpData.email || !signUpData.password || !signUpData.name) {
      toast.error("Please fill all the fields");
      return;
    }
    try {
      const data = await signUp(signUpData);
      console.log(data);
      dispatch(SET_USER_DATA(data));
    } catch (error) {
      console.log(error);
    }
  }

export const { TOGGLE_DARK_MODE, SET_USER_DATA, LOGOUT } = userSlice.actions;
export default userSlice.reducer;
// export const { setDarkMode } = userSlice.actions;
