import { createAction } from "@ngrx/store";

export const setLoading = createAction('[Loading Component] Set', (loading: boolean) => ({ loading }));
