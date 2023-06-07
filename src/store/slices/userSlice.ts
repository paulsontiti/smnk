import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { signUpDetails } from "@/lib/types/signUp";
import { User } from "@/lib/types/userInfo";
import { userJSON } from "@/lib/utils/user";

export const fetchUser = createAsyncThunk("users/getUser", async (thunkApi) => {
  const res = await axios("");
  const data = await res.data;
  return data;
});

export const signUp = createAsyncThunk(
  "users/signUp",
  async (values: signUpDetails) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/users/signup`,
        data: values,
      });
      const data = await res.data;
      return data
    } catch (err: any) {
      return {successful:false,message:err.response.data.message,user:{} as User}
    }
  }
);

export const login = createAsyncThunk("users/login", async (values: any) => {
  try {
    const res = await axios({
      method: "POST",
      url: `${process.env.SMNK_URL}api/users/login`,
      data: values,
    });
    const data = await res.data;
    return data
  } catch (err: any) {
    console.log(err)
    return {successful:false,response:err.response.data.message,user:{} as User}
  }
});

export const changePassword = createAsyncThunk(
  "users/changePassword",
  async (values: any) => {
    try {
      const res = await axios({
        method: "POST",
        url: `${process.env.SMNK_URL}api/sw-dashboard/change-password`,
        data: values,
      });
      const data = await res.data;
return data
    } catch (err: any) {
      console.log(err);
      return {successful:false,response:err.response.data.message,user:{} as User}
    }
  }
);

const initialState = {
  user: userJSON() ? userJSON() : ({} as User),
  loading: false,
  response: "",
  successful:false
};
const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {} as User;
      localStorage.removeItem("user");
    },
    updateUser: (state) => {
      state.user = userJSON();
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(fetchUser.fulfilled, (state, action) => {
    //   state.loading = false;

    //   state.user = action.payload;
    // });
    // builder.addCase(fetchUser.pending, (state) => {
    //   state.loading = true;
    // });

    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.response = action.payload.message;
      state.successful = action.payload.successful
    });
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.successful = action.payload.successful
      state.user = action.payload.user;
      state.response = action.payload.message;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.response = action.payload.message;
      state.successful = action.payload.successful
      state.user = action.payload.user;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
  },
});

export const { logout, updateUser } = userSlice.actions;

export default userSlice.reducer;
