import { ICollection } from "@/types/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const CollectionsApi = createApi({
    reducerPath: "collectionsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4000" }),
    endpoints: (builder) => ({
        getAllCollections: builder.query({
            query: () => "/api/collections",
        }),
        createCollection: builder.mutation<any, { name: string; path: string; banner: string }>({
            query: (newCollection) => ({
                url: "/api/collections",
                method: "POST",
                body: newCollection,
            }),
        }),
    }),
});

export const { useGetAllCollectionsQuery, useCreateCollectionMutation } = CollectionsApi;
