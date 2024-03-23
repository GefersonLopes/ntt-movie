import { createReducer, on } from "@ngrx/store";
import { decrementPage, incrementPage, setPage } from "./paginate.actions";

export const initialState = 1;

export const paginateReducer = createReducer(
  initialState,
  on(incrementPage, state => state + 1),
  on(decrementPage, state => state - 1),
  on(setPage, (state, { page }) => page),
);
