import { PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { GenerateSlice } from "../sliceGenerator";

const initialStateData = {
  gender: "",
  name: {
    title: "",
    first: "",
    last: "",
  },
  location: {
    street: {
      number: 0,
      name: "",
    },
    city: "",
    state: "",
    country: "",
    postcode: 0,
    coordinates: {
      latitude: "",
      longitude: "",
    },
    timezone: {
      offset: "",
      description: "",
    },
  },
  email: "",
  login: {
    uuid: "",
    username: "",
    password: "",
    salt: "",
    md5: "",
    sha1: "",
    sha256: "",
  },
  dob: {
    date: "",
    age: 0,
  },
  registered: {
    date: "",
    age: 0,
  },
  phone: "",
  cell: "",
  id: {
    name: "",
    value: "",
  },
  picture: {
    large: "",
    medium: "",
    thumbnail: "",
  },
  nat: "",
};

const slice = GenerateSlice<User, SliceCaseReducers<User>>({
  initialState: initialStateData,
  name: "user-client",
  reducers: {
    loginUser: (state, { payload }: PayloadAction<User>) => {
      state.gender = payload.gender;
      state.name = payload.name;
      state.location = payload.location;
      state.email = payload.email;
      state.login = payload.login;
      state.dob = payload.dob;
      state.registered = payload.registered;
      state.phone = payload.phone;
      state.cell = payload.cell;
      state.id = payload.id;
      state.picture = payload.picture;
      state.nat = payload.nat;
    },
    updateUser: (state, { payload }: PayloadAction<Partial<User>>) => {
      return { ...state, ...payload };
    },
    logoutUser: (state) => {
      state = initialStateData;
    },
  },
});

export const { loginUser, logoutUser, updateUser } = slice.actions;
export const UserReducer = slice.reducer;
