import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Dummy = {
  __typename?: 'Dummy';
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  dummy: Dummy;
  findAll: Array<Dummy>;
};


export type QueryDummyArgs = {
  id: Scalars['Int']['input'];
};

export type GetDummyQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDummyQuery = { __typename?: 'Query', dummy: { __typename?: 'Dummy', id: number, title: string, description: string } };


export const GetDummyDocument = gql`
    query GetDummy {
  dummy(id: 1) {
    id
    title
    description
  }
}
    `;

/**
 * __useGetDummyQuery__
 *
 * To run a query within a React component, call `useGetDummyQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDummyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDummyQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDummyQuery(baseOptions?: Apollo.QueryHookOptions<GetDummyQuery, GetDummyQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDummyQuery, GetDummyQueryVariables>(GetDummyDocument, options);
      }
export function useGetDummyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDummyQuery, GetDummyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDummyQuery, GetDummyQueryVariables>(GetDummyDocument, options);
        }
export function useGetDummySuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetDummyQuery, GetDummyQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetDummyQuery, GetDummyQueryVariables>(GetDummyDocument, options);
        }
export type GetDummyQueryHookResult = ReturnType<typeof useGetDummyQuery>;
export type GetDummyLazyQueryHookResult = ReturnType<typeof useGetDummyLazyQuery>;
export type GetDummySuspenseQueryHookResult = ReturnType<typeof useGetDummySuspenseQuery>;
export type GetDummyQueryResult = Apollo.QueryResult<GetDummyQuery, GetDummyQueryVariables>;