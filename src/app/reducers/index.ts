import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { paginateReducer } from './paginate/paginate.reducer';
import { loadingReducer } from './loading/loading.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  paginate: paginateReducer,
  loading: loadingReducer,
};


export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
