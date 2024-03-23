import { createAction } from "@ngrx/store";

export const incrementPage = createAction('[Paginate Component] Increment');
export const decrementPage = createAction('[Paginate Component] Decrement');
export const setPage = createAction('[Paginate Component] Set', (page: number) => ({ page }));
