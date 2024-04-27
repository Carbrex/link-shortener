import { createSlice, Dispatch } from "@reduxjs/toolkit";
import { SignInType, SignUpType } from "../../types";
import { getDetails, login, register } from "../../api";
import { toast } from "react-toastify";

export interface LoginState {
  loadingUser: Boolean;
  token?: string;
  isDarkMode: Boolean;
  name?: string;
  isAdministrator?: Boolean;
}

const initialState: LoginState = {
  loadingUser: true,
  token: localStorage.getItem("token") || "",
  isDarkMode:
    localStorage.getItem("isDarkMode") === "true" ||
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  name: "",
  isAdministrator: false,
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
      state.token = token;
      state.name = name;
      state.isAdministrator = isAdministrator;
      console.log(state.token, state.name, state.isAdministrator);
    },
    LOGOUT(state) {
      localStorage.removeItem("token");
      state.token = "";
      state.name = "";
      state.isAdministrator = false;
    },
    SET_LOADING_USER_TRUE(state) {
      state.loadingUser = true;
    },
    SET_LOADING_USER_FALSE(state) {
      state.loadingUser = false;
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
      const data: any = await login(signInData);
      if (data.token) {
        dispatch(SET_USER_DATA(data));
      }
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
      const data: any = await register(signUpData);
      console.log(data);
      if (data.token) {
        dispatch(SET_USER_DATA(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getUserData = () => async (dispatch: Dispatch) => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(SET_LOADING_USER_FALSE());
      return;
    }
    const data: any = await getDetails();
    if (data.token) {
      dispatch(SET_USER_DATA(data));
    }
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(SET_LOADING_USER_FALSE());
  }
};

export const { TOGGLE_DARK_MODE, SET_USER_DATA, LOGOUT, SET_LOADING_USER_TRUE, SET_LOADING_USER_FALSE } = userSlice.actions;
export default userSlice.reducer;
// export const { setDarkMode } = userSlice.actions;
