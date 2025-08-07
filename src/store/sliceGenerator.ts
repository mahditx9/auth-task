import {
  Slice,
  SliceCaseReducers,
  ValidateSliceCaseReducers,
  createSlice,
} from "@reduxjs/toolkit";

export const GenerateSlice = <T, Reducers extends SliceCaseReducers<T>>({
  name = "",
  initialState,
  reducers,
}: {
  name: string;
  initialState: T;
  reducers: ValidateSliceCaseReducers<T, Reducers>;
}): Slice<T> => {
  const slice = createSlice({
    name: name,
    initialState: initialState,
    reducers: reducers,
  });

  return slice;
};
