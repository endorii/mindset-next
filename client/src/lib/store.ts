import { configureStore } from "@reduxjs/toolkit";
import { CollectionsApi } from "./features/collections/collections.Slice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const makeStore = () => {
    return configureStore({
        reducer: {
            [CollectionsApi.reducerPath]: CollectionsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(CollectionsApi.middleware),
    });
};

const store = makeStore();

setupListeners(store.dispatch);

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
