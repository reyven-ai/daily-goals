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

export type CreateFolderInput = {
  title: Scalars['String']['input'];
};

export type CreateJournalInput = {
  content: Scalars['String']['input'];
  folderId: Scalars['String']['input'];
  title: Scalars['String']['input'];
};

export type Folder = {
  __typename?: 'Folder';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  journals?: Maybe<Array<Journal>>;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Journal = {
  __typename?: 'Journal';
  content?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  folderId: Scalars['String']['output'];
  id: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  userId: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  authUser: User;
  createFolder: Folder;
  createJournal: Journal;
  removeFolder: Scalars['Boolean']['output'];
  removeJournal: Scalars['Boolean']['output'];
  updateFolder: Folder;
  updateJournal: Journal;
};


export type MutationAuthUserArgs = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  token: Scalars['String']['input'];
};


export type MutationCreateFolderArgs = {
  input: CreateFolderInput;
};


export type MutationCreateJournalArgs = {
  input: CreateJournalInput;
};


export type MutationRemoveFolderArgs = {
  id: Scalars['String']['input'];
};


export type MutationRemoveJournalArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateFolderArgs = {
  id: Scalars['String']['input'];
  input: UpdateFolderInput;
};


export type MutationUpdateJournalArgs = {
  id: Scalars['String']['input'];
  input: UpdateJournalInput;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers: Array<User>;
  getFolder?: Maybe<Folder>;
  getFolders: Array<Folder>;
  getJournal?: Maybe<Journal>;
  getJournals?: Maybe<Array<Journal>>;
  searchFolders: Array<Folder>;
  searchJournals: Array<Journal>;
};


export type QueryGetFolderArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetJournalArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchFoldersArgs = {
  searchQuery: Scalars['String']['input'];
};


export type QuerySearchJournalsArgs = {
  searchQuery: Scalars['String']['input'];
};

export type UpdateFolderInput = {
  title?: InputMaybe<Scalars['String']['input']>;
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


export type AuthUserMutation = { __typename?: 'Mutation', authUser: { __typename?: 'User', id: string, email: string, name: string } };

export type GetFoldersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFoldersQuery = { __typename?: 'Query', getFolders: Array<{ __typename?: 'Folder', id: string, userId: string, title: string, createdAt: any, updatedAt: any, journals?: Array<{ __typename?: 'Journal', id: string, userId: string, folderId: string, title: string, content?: string | null, createdAt: any, updatedAt: any }> | null }> };

export type GetFolderQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetFolderQuery = { __typename?: 'Query', getFolder?: { __typename?: 'Folder', id: string, userId: string, title: string, createdAt: any, updatedAt: any, journals?: Array<{ __typename?: 'Journal', id: string, userId: string, folderId: string, title: string, content?: string | null, createdAt: any, updatedAt: any }> | null } | null };

export type CreateFolderMutationVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type CreateFolderMutation = { __typename?: 'Mutation', createFolder: { __typename?: 'Folder', id: string, userId: string, title: string, createdAt: any, updatedAt: any } };

export type UpdateFolderMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
}>;


export type UpdateFolderMutation = { __typename?: 'Mutation', updateFolder: { __typename?: 'Folder', id: string, userId: string, title: string, createdAt: any, updatedAt: any } };

export type RemoveFolderMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveFolderMutation = { __typename?: 'Mutation', removeFolder: boolean };

export type GetJournalsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetJournalsQuery = { __typename?: 'Query', getJournals?: Array<{ __typename?: 'Journal', id: string, userId: string, folderId: string, title: string, content?: string | null, createdAt: any, updatedAt: any }> | null };

export type GetJournalQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetJournalQuery = { __typename?: 'Query', getJournal?: { __typename?: 'Journal', id: string, userId: string, folderId: string, title: string, content?: string | null, createdAt: any, updatedAt: any } | null };

export type CreateJournalMutationVariables = Exact<{
  folderId: Scalars['String']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type CreateJournalMutation = { __typename?: 'Mutation', createJournal: { __typename?: 'Journal', id: string, userId: string, folderId: string, title: string, content?: string | null, createdAt: any, updatedAt: any } };

export type UpdateJournalMutationVariables = Exact<{
  id: Scalars['String']['input'];
  title: Scalars['String']['input'];
  content: Scalars['String']['input'];
}>;


export type UpdateJournalMutation = { __typename?: 'Mutation', updateJournal: { __typename?: 'Journal', id: string, userId: string, folderId: string, title: string, content?: string | null, createdAt: any, updatedAt: any } };

export type RemoveJournalMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type RemoveJournalMutation = { __typename?: 'Mutation', removeJournal: boolean };

export type SearchFoldersQueryVariables = Exact<{
  searchQuery: Scalars['String']['input'];
}>;


export type SearchFoldersQuery = { __typename?: 'Query', searchFolders: Array<{ __typename?: 'Folder', id: string, userId: string, title: string, createdAt: any, updatedAt: any, journals?: Array<{ __typename?: 'Journal', id: string, folderId: string, userId: string, title: string, content?: string | null, createdAt: any, updatedAt: any }> | null }> };

export type SearchJournalsQueryVariables = Exact<{
  searchQuery: Scalars['String']['input'];
}>;


export type SearchJournalsQuery = { __typename?: 'Query', searchJournals: Array<{ __typename?: 'Journal', id: string, folderId: string, userId: string, title: string, content?: string | null, createdAt: any, updatedAt: any }> };


export const AuthUserDocument = gql`
    mutation AuthUser($token: String!, $email: String!, $name: String!) {
  authUser(token: $token, email: $email, name: $name) {
    id
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
export const GetFoldersDocument = gql`
    query GetFolders {
  getFolders {
    id
    userId
    title
    createdAt
    updatedAt
    journals {
      id
      userId
      folderId
      title
      content
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetFoldersQuery__
 *
 * To run a query within a React component, call `useGetFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFoldersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetFoldersQuery(baseOptions?: Apollo.QueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
      }
export function useGetFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
        }
export function useGetFoldersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFoldersQuery, GetFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFoldersQuery, GetFoldersQueryVariables>(GetFoldersDocument, options);
        }
export type GetFoldersQueryHookResult = ReturnType<typeof useGetFoldersQuery>;
export type GetFoldersLazyQueryHookResult = ReturnType<typeof useGetFoldersLazyQuery>;
export type GetFoldersSuspenseQueryHookResult = ReturnType<typeof useGetFoldersSuspenseQuery>;
export type GetFoldersQueryResult = Apollo.QueryResult<GetFoldersQuery, GetFoldersQueryVariables>;
export const GetFolderDocument = gql`
    query GetFolder($id: String!) {
  getFolder(id: $id) {
    id
    userId
    title
    createdAt
    updatedAt
    journals {
      id
      userId
      folderId
      title
      content
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useGetFolderQuery__
 *
 * To run a query within a React component, call `useGetFolderQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFolderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFolderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetFolderQuery(baseOptions: Apollo.QueryHookOptions<GetFolderQuery, GetFolderQueryVariables> & ({ variables: GetFolderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFolderQuery, GetFolderQueryVariables>(GetFolderDocument, options);
      }
export function useGetFolderLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFolderQuery, GetFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFolderQuery, GetFolderQueryVariables>(GetFolderDocument, options);
        }
export function useGetFolderSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFolderQuery, GetFolderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFolderQuery, GetFolderQueryVariables>(GetFolderDocument, options);
        }
export type GetFolderQueryHookResult = ReturnType<typeof useGetFolderQuery>;
export type GetFolderLazyQueryHookResult = ReturnType<typeof useGetFolderLazyQuery>;
export type GetFolderSuspenseQueryHookResult = ReturnType<typeof useGetFolderSuspenseQuery>;
export type GetFolderQueryResult = Apollo.QueryResult<GetFolderQuery, GetFolderQueryVariables>;
export const CreateFolderDocument = gql`
    mutation CreateFolder($title: String!) {
  createFolder(input: {title: $title}) {
    id
    userId
    title
    createdAt
    updatedAt
  }
}
    `;
export type CreateFolderMutationFn = Apollo.MutationFunction<CreateFolderMutation, CreateFolderMutationVariables>;

/**
 * __useCreateFolderMutation__
 *
 * To run a mutation, you first call `useCreateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createFolderMutation, { data, loading, error }] = useCreateFolderMutation({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useCreateFolderMutation(baseOptions?: Apollo.MutationHookOptions<CreateFolderMutation, CreateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateFolderMutation, CreateFolderMutationVariables>(CreateFolderDocument, options);
      }
export type CreateFolderMutationHookResult = ReturnType<typeof useCreateFolderMutation>;
export type CreateFolderMutationResult = Apollo.MutationResult<CreateFolderMutation>;
export type CreateFolderMutationOptions = Apollo.BaseMutationOptions<CreateFolderMutation, CreateFolderMutationVariables>;
export const UpdateFolderDocument = gql`
    mutation UpdateFolder($id: String!, $title: String!) {
  updateFolder(id: $id, input: {title: $title}) {
    id
    userId
    title
    createdAt
    updatedAt
  }
}
    `;
export type UpdateFolderMutationFn = Apollo.MutationFunction<UpdateFolderMutation, UpdateFolderMutationVariables>;

/**
 * __useUpdateFolderMutation__
 *
 * To run a mutation, you first call `useUpdateFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateFolderMutation, { data, loading, error }] = useUpdateFolderMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUpdateFolderMutation(baseOptions?: Apollo.MutationHookOptions<UpdateFolderMutation, UpdateFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateFolderMutation, UpdateFolderMutationVariables>(UpdateFolderDocument, options);
      }
export type UpdateFolderMutationHookResult = ReturnType<typeof useUpdateFolderMutation>;
export type UpdateFolderMutationResult = Apollo.MutationResult<UpdateFolderMutation>;
export type UpdateFolderMutationOptions = Apollo.BaseMutationOptions<UpdateFolderMutation, UpdateFolderMutationVariables>;
export const RemoveFolderDocument = gql`
    mutation RemoveFolder($id: String!) {
  removeFolder(id: $id)
}
    `;
export type RemoveFolderMutationFn = Apollo.MutationFunction<RemoveFolderMutation, RemoveFolderMutationVariables>;

/**
 * __useRemoveFolderMutation__
 *
 * To run a mutation, you first call `useRemoveFolderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFolderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFolderMutation, { data, loading, error }] = useRemoveFolderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRemoveFolderMutation(baseOptions?: Apollo.MutationHookOptions<RemoveFolderMutation, RemoveFolderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveFolderMutation, RemoveFolderMutationVariables>(RemoveFolderDocument, options);
      }
export type RemoveFolderMutationHookResult = ReturnType<typeof useRemoveFolderMutation>;
export type RemoveFolderMutationResult = Apollo.MutationResult<RemoveFolderMutation>;
export type RemoveFolderMutationOptions = Apollo.BaseMutationOptions<RemoveFolderMutation, RemoveFolderMutationVariables>;
export const GetJournalsDocument = gql`
    query GetJournals {
  getJournals {
    id
    userId
    folderId
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
    userId
    folderId
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
    mutation CreateJournal($folderId: String!, $title: String!, $content: String!) {
  createJournal(input: {folderId: $folderId, title: $title, content: $content}) {
    id
    userId
    folderId
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
 *      folderId: // value for 'folderId'
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
    folderId
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
export const SearchFoldersDocument = gql`
    query searchFolders($searchQuery: String!) {
  searchFolders(searchQuery: $searchQuery) {
    id
    userId
    title
    createdAt
    updatedAt
    journals {
      id
      folderId
      userId
      title
      content
      createdAt
      updatedAt
    }
  }
}
    `;

/**
 * __useSearchFoldersQuery__
 *
 * To run a query within a React component, call `useSearchFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFoldersQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useSearchFoldersQuery(baseOptions: Apollo.QueryHookOptions<SearchFoldersQuery, SearchFoldersQueryVariables> & ({ variables: SearchFoldersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchFoldersQuery, SearchFoldersQueryVariables>(SearchFoldersDocument, options);
      }
export function useSearchFoldersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchFoldersQuery, SearchFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchFoldersQuery, SearchFoldersQueryVariables>(SearchFoldersDocument, options);
        }
export function useSearchFoldersSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchFoldersQuery, SearchFoldersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchFoldersQuery, SearchFoldersQueryVariables>(SearchFoldersDocument, options);
        }
export type SearchFoldersQueryHookResult = ReturnType<typeof useSearchFoldersQuery>;
export type SearchFoldersLazyQueryHookResult = ReturnType<typeof useSearchFoldersLazyQuery>;
export type SearchFoldersSuspenseQueryHookResult = ReturnType<typeof useSearchFoldersSuspenseQuery>;
export type SearchFoldersQueryResult = Apollo.QueryResult<SearchFoldersQuery, SearchFoldersQueryVariables>;
export const SearchJournalsDocument = gql`
    query searchJournals($searchQuery: String!) {
  searchJournals(searchQuery: $searchQuery) {
    id
    folderId
    userId
    title
    content
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useSearchJournalsQuery__
 *
 * To run a query within a React component, call `useSearchJournalsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchJournalsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchJournalsQuery({
 *   variables: {
 *      searchQuery: // value for 'searchQuery'
 *   },
 * });
 */
export function useSearchJournalsQuery(baseOptions: Apollo.QueryHookOptions<SearchJournalsQuery, SearchJournalsQueryVariables> & ({ variables: SearchJournalsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchJournalsQuery, SearchJournalsQueryVariables>(SearchJournalsDocument, options);
      }
export function useSearchJournalsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchJournalsQuery, SearchJournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchJournalsQuery, SearchJournalsQueryVariables>(SearchJournalsDocument, options);
        }
export function useSearchJournalsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<SearchJournalsQuery, SearchJournalsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchJournalsQuery, SearchJournalsQueryVariables>(SearchJournalsDocument, options);
        }
export type SearchJournalsQueryHookResult = ReturnType<typeof useSearchJournalsQuery>;
export type SearchJournalsLazyQueryHookResult = ReturnType<typeof useSearchJournalsLazyQuery>;
export type SearchJournalsSuspenseQueryHookResult = ReturnType<typeof useSearchJournalsSuspenseQuery>;
export type SearchJournalsQueryResult = Apollo.QueryResult<SearchJournalsQuery, SearchJournalsQueryVariables>;