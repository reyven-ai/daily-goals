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
  DateTime: { input: any; output: any; }
};

export type CreateJournalInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Journal = {
  __typename?: 'Journal';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authUser: User;
  createJournal: Journal;
  removeJournal: Scalars['Boolean']['output'];
  updateJournal: Journal;
};


export type MutationAuthUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateJournalArgs = {
  input: CreateJournalInput;
};


export type MutationRemoveJournalArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateJournalArgs = {
  id: Scalars['String']['input'];
  input: UpdateJournalInput;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getJournal?: Maybe<Journal>;
  getJournals?: Maybe<Array<Journal>>;
};


export type QueryGetJournalArgs = {
  id: Scalars['String']['input'];
};

export type UpdateJournalInput = {
  content: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  authId: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type AuthUserMutationVariables = Exact<{
  token: Scalars['String']['input'];
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
}>;


export type AuthUserMutation = { __typename?: 'Mutation', authUser: { __typename?: 'User', email: string, name: string } };

export type GetJournalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJournalsQuery = { __typename?: 'Query', getJournals?: Array<{ __typename?: 'Journal', id: string, title: string, content?: string | null, createdAt: any, updatedAt: any }> | null };

export type GetJournalQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetJournalQuery = { __typename?: 'Query', getJournal?: { __typename?: 'Journal', id: string, title: string, content?: string | null, createdAt: any, updatedAt: any } | null };

export type CreateJournalMutationVariables = Exact<{
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateJournalMutation = { __typename?: 'Mutation', createJournal: { __typename?: 'Journal', id: string, title: string, content?: string | null, createdAt: any, updatedAt: any } };

export type UpdateJournalMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type UpdateJournalMutation = { __typename?: 'Mutation', updateJournal: { __typename?: 'Journal', id: string, userId: string, title: string, content?: string | null, createdAt: any, updatedAt: any } };

export type RemoveJournalMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveJournalMutation = { __typename?: 'Mutation', removeJournal: boolean };


export const AuthUserDocument = gql`
    mutation AuthUser($token: String!, $email: String!, $name: String!) {
  authUser(token: $token, email: $email, name: $name) {
    email
    name
  }
}
    `;
export type AuthUserMutationFn = Apollo.MutationFunction<AuthUserMutation, AuthUserMutationVariables>;

/**
 * __useAuthUserMutation__
 *
 * To run a mutation, you first call `useAuthUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authUserMutation, { data, loading, error }] = useAuthUserMutation({
 *   variables: {
 *      token: // value for 'token'
 *      email: // value for 'email'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAuthUserMutation(baseOptions?: Apollo.MutationHookOptions<AuthUserMutation, AuthUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AuthUserMutation, AuthUserMutationVariables>(AuthUserDocument, options);
      }
export type AuthUserMutationHookResult = ReturnType<typeof useAuthUserMutation>;
export type AuthUserMutationResult = Apollo.MutationResult<AuthUserMutation>;
export type AuthUserMutationOptions = Apollo.BaseMutationOptions<AuthUserMutation, AuthUserMutationVariables>;
export const GetJournalsDocument = gql`
    query GetJournals {
  getJournals {
    id
    title
    content
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetJournalsQuery__
 *
 * To run a query within a React component, call `useGetJournalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetJournalsQuery(baseOptions?: Apollo.QueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
      }
export function useGetJournalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
        }
export function useGetJournalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetJournalsQuery, GetJournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJournalsQuery, GetJournalsQueryVariables>(GetJournalsDocument, options);
        }
export type GetJournalsQueryHookResult = ReturnType<typeof useGetJournalsQuery>;
export type GetJournalsLazyQueryHookResult = ReturnType<typeof useGetJournalsLazyQuery>;
export type GetJournalsSuspenseQueryHookResult = ReturnType<typeof useGetJournalsSuspenseQuery>;
export type GetJournalsQueryResult = Apollo.QueryResult<GetJournalsQuery, GetJournalsQueryVariables>;
export const GetJournalDocument = gql`
    query GetJournal($id: String!) {
  getJournal(id: $id) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetJournalQuery__
 *
 * To run a query within a React component, call `useGetJournalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetJournalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetJournalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetJournalQuery(baseOptions: Apollo.QueryHookOptions<GetJournalQuery, GetJournalQueryVariables> & ({ variables: GetJournalQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetJournalQuery, GetJournalQueryVariables>(GetJournalDocument, options);
      }
export function useGetJournalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetJournalQuery, GetJournalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetJournalQuery, GetJournalQueryVariables>(GetJournalDocument, options);
        }
export function useGetJournalSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetJournalQuery, GetJournalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetJournalQuery, GetJournalQueryVariables>(GetJournalDocument, options);
        }
export type GetJournalQueryHookResult = ReturnType<typeof useGetJournalQuery>;
export type GetJournalLazyQueryHookResult = ReturnType<typeof useGetJournalLazyQuery>;
export type GetJournalSuspenseQueryHookResult = ReturnType<typeof useGetJournalSuspenseQuery>;
export type GetJournalQueryResult = Apollo.QueryResult<GetJournalQuery, GetJournalQueryVariables>;
export const CreateJournalDocument = gql`
    mutation CreateJournal($title: String!, $content: String!) {
  createJournal(input: {title: $title, content: $content}) {
    id
    title
    content
    createdAt
    updatedAt
  }
}
    `;
export type CreateJournalMutationFn = Apollo.MutationFunction<CreateJournalMutation, CreateJournalMutationVariables>;

/**
 * __useCreateJournalMutation__
 *
 * To run a mutation, you first call `useCreateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createJournalMutation, { data, loading, error }] = useCreateJournalMutation({
 *   variables: {
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateJournalMutation(baseOptions?: Apollo.MutationHookOptions<CreateJournalMutation, CreateJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateJournalMutation, CreateJournalMutationVariables>(CreateJournalDocument, options);
      }
export type CreateJournalMutationHookResult = ReturnType<typeof useCreateJournalMutation>;
export type CreateJournalMutationResult = Apollo.MutationResult<CreateJournalMutation>;
export type CreateJournalMutationOptions = Apollo.BaseMutationOptions<CreateJournalMutation, CreateJournalMutationVariables>;
export const UpdateJournalDocument = gql`
    mutation UpdateJournal($id: String!, $title: String!, $content: String!) {
  updateJournal(id: $id, input: {title: $title, content: $content}) {
    id
    userId
    title
    content
    createdAt
    updatedAt
  }
}
    `;
export type UpdateJournalMutationFn = Apollo.MutationFunction<UpdateJournalMutation, UpdateJournalMutationVariables>;

/**
 * __useUpdateJournalMutation__
 *
 * To run a mutation, you first call `useUpdateJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateJournalMutation, { data, loading, error }] = useUpdateJournalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useUpdateJournalMutation(baseOptions?: Apollo.MutationHookOptions<UpdateJournalMutation, UpdateJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateJournalMutation, UpdateJournalMutationVariables>(UpdateJournalDocument, options);
      }
export type UpdateJournalMutationHookResult = ReturnType<typeof useUpdateJournalMutation>;
export type UpdateJournalMutationResult = Apollo.MutationResult<UpdateJournalMutation>;
export type UpdateJournalMutationOptions = Apollo.BaseMutationOptions<UpdateJournalMutation, UpdateJournalMutationVariables>;
export const RemoveJournalDocument = gql`
    mutation RemoveJournal($id: String!) {
  removeJournal(id: $id)
}
    `;
export type RemoveJournalMutationFn = Apollo.MutationFunction<RemoveJournalMutation, RemoveJournalMutationVariables>;

/**
 * __useRemoveJournalMutation__
 *
 * To run a mutation, you first call `useRemoveJournalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveJournalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeJournalMutation, { data, loading, error }] = useRemoveJournalMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveJournalMutation(baseOptions?: Apollo.MutationHookOptions<RemoveJournalMutation, RemoveJournalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveJournalMutation, RemoveJournalMutationVariables>(RemoveJournalDocument, options);
      }
export type RemoveJournalMutationHookResult = ReturnType<typeof useRemoveJournalMutation>;
export type RemoveJournalMutationResult = Apollo.MutationResult<RemoveJournalMutation>;
export type RemoveJournalMutationOptions = Apollo.BaseMutationOptions<RemoveJournalMutation, RemoveJournalMutationVariables>;