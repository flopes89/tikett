import { GraphQLResolveInfo } from 'graphql';
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type GqlConfig = {
   __typename?: 'Config',
  dbPath: Scalars['String'],
  root: Scalars['String'],
};

export type GqlFile = {
   __typename?: 'File',
  name: Scalars['String'],
  tags: Array<Scalars['String']>,
  path: Scalars['String'],
  isFile: Scalars['Boolean'],
};

export type GqlFolder = {
   __typename?: 'Folder',
  name: Scalars['String'],
  path: Scalars['String'],
};

export type GqlMutation = {
   __typename?: 'Mutation',
  changeRoot: Scalars['Boolean'],
  createTagGroup: Scalars['Boolean'],
  renameTagGroup: Scalars['Boolean'],
  removeTagGroup: Scalars['Boolean'],
  moveTag: Scalars['Boolean'],
  changeColor: Scalars['Boolean'],
  addTag: Scalars['Boolean'],
  removeTag: Scalars['Boolean'],
  renameFile: Scalars['Boolean'],
  removeFile: Scalars['Boolean'],
};


export type GqlMutationChangeRootArgs = {
  folder: Scalars['String']
};


export type GqlMutationCreateTagGroupArgs = {
  name: Scalars['String']
};


export type GqlMutationRenameTagGroupArgs = {
  group: Scalars['String'],
  newName: Scalars['String']
};


export type GqlMutationRemoveTagGroupArgs = {
  group: Scalars['String']
};


export type GqlMutationMoveTagArgs = {
  tag: Scalars['String'],
  group: Maybe<Scalars['String']>
};


export type GqlMutationChangeColorArgs = {
  group: Scalars['String'],
  color: Scalars['String']
};


export type GqlMutationAddTagArgs = {
  path: Scalars['String'],
  tag: Scalars['String']
};


export type GqlMutationRemoveTagArgs = {
  path: Scalars['String'],
  tag: Scalars['String']
};


export type GqlMutationRenameFileArgs = {
  path: Scalars['String'],
  newName: Scalars['String']
};


export type GqlMutationRemoveFileArgs = {
  path: Scalars['String']
};

export type GqlQuery = {
   __typename?: 'Query',
  config: GqlConfig,
  tagGroups: Array<GqlTagGroup>,
  files: Array<GqlFile>,
  tags: Array<Scalars['String']>,
  folders: Array<GqlFolder>,
};


export type GqlQueryFilesArgs = {
  current: Scalars['String'],
  showDescendants: Scalars['Boolean'],
  filters: Array<Scalars['String']>
};


export type GqlQueryFoldersArgs = {
  current: Scalars['String']
};

export type GqlTagGroup = {
   __typename?: 'TagGroup',
  name: Scalars['String'],
  color: Scalars['String'],
  tags: Array<Scalars['String']>,
};

export type GqlAddTagMutationVariables = {
  path: Scalars['String'],
  tag: Scalars['String']
};


export type GqlAddTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'addTag'>
);

export type GqlChangeColorMutationVariables = {
  group: Scalars['String'],
  color: Scalars['String']
};


export type GqlChangeColorMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'changeColor'>
);

export type GqlChangeRootMutationVariables = {
  folder: Scalars['String']
};


export type GqlChangeRootMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'changeRoot'>
);

export type GqlCreateTagGroupMutationVariables = {
  name: Scalars['String']
};


export type GqlCreateTagGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'createTagGroup'>
);

export type GqlConfigQueryVariables = {};


export type GqlConfigQuery = (
  { __typename?: 'Query' }
  & { config: (
    { __typename?: 'Config' }
    & Pick<GqlConfig, 'dbPath' | 'root'>
  ) }
);

export type GqlFilesQueryVariables = {
  current: Scalars['String'],
  showDescendants: Scalars['Boolean'],
  filters: Array<Scalars['String']>
};


export type GqlFilesQuery = (
  { __typename?: 'Query' }
  & { files: Array<(
    { __typename?: 'File' }
    & Pick<GqlFile, 'name' | 'tags' | 'path' | 'isFile'>
  )> }
);

export type GqlFoldersQueryVariables = {
  current: Scalars['String']
};


export type GqlFoldersQuery = (
  { __typename?: 'Query' }
  & { folders: Array<(
    { __typename?: 'Folder' }
    & Pick<GqlFolder, 'name' | 'path'>
  )> }
);

export type GqlTagGroupsQueryVariables = {};


export type GqlTagGroupsQuery = (
  { __typename?: 'Query' }
  & { tagGroups: Array<(
    { __typename?: 'TagGroup' }
    & Pick<GqlTagGroup, 'name' | 'color' | 'tags'>
  )> }
);

export type GqlTagsQueryVariables = {};


export type GqlTagsQuery = (
  { __typename?: 'Query' }
  & Pick<GqlQuery, 'tags'>
);

export type GqlMoveTagMutationVariables = {
  tag: Scalars['String'],
  group: Maybe<Scalars['String']>
};


export type GqlMoveTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'moveTag'>
);

export type GqlRemoveFileMutationVariables = {
  path: Scalars['String']
};


export type GqlRemoveFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'removeFile'>
);

export type GqlRemoveTagMutationVariables = {
  path: Scalars['String'],
  tag: Scalars['String']
};


export type GqlRemoveTagMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'removeTag'>
);

export type GqlRemoveTagGroupMutationVariables = {
  group: Scalars['String']
};


export type GqlRemoveTagGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'removeTagGroup'>
);

export type GqlRenameFileMutationVariables = {
  path: Scalars['String'],
  newName: Scalars['String']
};


export type GqlRenameFileMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'renameFile'>
);

export type GqlRenameTagGroupMutationVariables = {
  group: Scalars['String'],
  newName: Scalars['String']
};


export type GqlRenameTagGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<GqlMutation, 'renameTagGroup'>
);


export const AddTagDocument = gql`
    mutation AddTag($path: String!, $tag: String!) {
  addTag(path: $path, tag: $tag)
}
    `;
export type GqlAddTagMutationFn = ApolloReactCommon.MutationFunction<GqlAddTagMutation, GqlAddTagMutationVariables>;

/**
 * __useAddTagMutation__
 *
 * To run a mutation, you first call `useAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addTagMutation, { data, loading, error }] = useAddTagMutation({
 *   variables: {
 *      path: // value for 'path'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useAddTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlAddTagMutation, GqlAddTagMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlAddTagMutation, GqlAddTagMutationVariables>(AddTagDocument, baseOptions);
      }
export type AddTagMutationHookResult = ReturnType<typeof useAddTagMutation>;
export type AddTagMutationResult = ApolloReactCommon.MutationResult<GqlAddTagMutation>;
export type AddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlAddTagMutation, GqlAddTagMutationVariables>;
export const ChangeColorDocument = gql`
    mutation ChangeColor($group: String!, $color: String!) {
  changeColor(group: $group, color: $color)
}
    `;
export type GqlChangeColorMutationFn = ApolloReactCommon.MutationFunction<GqlChangeColorMutation, GqlChangeColorMutationVariables>;

/**
 * __useChangeColorMutation__
 *
 * To run a mutation, you first call `useChangeColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeColorMutation, { data, loading, error }] = useChangeColorMutation({
 *   variables: {
 *      group: // value for 'group'
 *      color: // value for 'color'
 *   },
 * });
 */
export function useChangeColorMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlChangeColorMutation, GqlChangeColorMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlChangeColorMutation, GqlChangeColorMutationVariables>(ChangeColorDocument, baseOptions);
      }
export type ChangeColorMutationHookResult = ReturnType<typeof useChangeColorMutation>;
export type ChangeColorMutationResult = ApolloReactCommon.MutationResult<GqlChangeColorMutation>;
export type ChangeColorMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlChangeColorMutation, GqlChangeColorMutationVariables>;
export const ChangeRootDocument = gql`
    mutation ChangeRoot($folder: String!) {
  changeRoot(folder: $folder)
}
    `;
export type GqlChangeRootMutationFn = ApolloReactCommon.MutationFunction<GqlChangeRootMutation, GqlChangeRootMutationVariables>;

/**
 * __useChangeRootMutation__
 *
 * To run a mutation, you first call `useChangeRootMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeRootMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeRootMutation, { data, loading, error }] = useChangeRootMutation({
 *   variables: {
 *      folder: // value for 'folder'
 *   },
 * });
 */
export function useChangeRootMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlChangeRootMutation, GqlChangeRootMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlChangeRootMutation, GqlChangeRootMutationVariables>(ChangeRootDocument, baseOptions);
      }
export type ChangeRootMutationHookResult = ReturnType<typeof useChangeRootMutation>;
export type ChangeRootMutationResult = ApolloReactCommon.MutationResult<GqlChangeRootMutation>;
export type ChangeRootMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlChangeRootMutation, GqlChangeRootMutationVariables>;
export const CreateTagGroupDocument = gql`
    mutation CreateTagGroup($name: String!) {
  createTagGroup(name: $name)
}
    `;
export type GqlCreateTagGroupMutationFn = ApolloReactCommon.MutationFunction<GqlCreateTagGroupMutation, GqlCreateTagGroupMutationVariables>;

/**
 * __useCreateTagGroupMutation__
 *
 * To run a mutation, you first call `useCreateTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTagGroupMutation, { data, loading, error }] = useCreateTagGroupMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateTagGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlCreateTagGroupMutation, GqlCreateTagGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlCreateTagGroupMutation, GqlCreateTagGroupMutationVariables>(CreateTagGroupDocument, baseOptions);
      }
export type CreateTagGroupMutationHookResult = ReturnType<typeof useCreateTagGroupMutation>;
export type CreateTagGroupMutationResult = ApolloReactCommon.MutationResult<GqlCreateTagGroupMutation>;
export type CreateTagGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlCreateTagGroupMutation, GqlCreateTagGroupMutationVariables>;
export const ConfigDocument = gql`
    query Config {
  config {
    dbPath
    root
  }
}
    `;

/**
 * __useConfigQuery__
 *
 * To run a query within a React component, call `useConfigQuery` and pass it any options that fit your needs.
 * When your component renders, `useConfigQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useConfigQuery({
 *   variables: {
 *   },
 * });
 */
export function useConfigQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GqlConfigQuery, GqlConfigQueryVariables>) {
        return ApolloReactHooks.useQuery<GqlConfigQuery, GqlConfigQueryVariables>(ConfigDocument, baseOptions);
      }
export function useConfigLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GqlConfigQuery, GqlConfigQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GqlConfigQuery, GqlConfigQueryVariables>(ConfigDocument, baseOptions);
        }
export type ConfigQueryHookResult = ReturnType<typeof useConfigQuery>;
export type ConfigLazyQueryHookResult = ReturnType<typeof useConfigLazyQuery>;
export type ConfigQueryResult = ApolloReactCommon.QueryResult<GqlConfigQuery, GqlConfigQueryVariables>;
export const FilesDocument = gql`
    query Files($current: String!, $showDescendants: Boolean!, $filters: [String!]!) {
  files(current: $current, showDescendants: $showDescendants, filters: $filters) {
    name
    tags
    path
    isFile
  }
}
    `;

/**
 * __useFilesQuery__
 *
 * To run a query within a React component, call `useFilesQuery` and pass it any options that fit your needs.
 * When your component renders, `useFilesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFilesQuery({
 *   variables: {
 *      current: // value for 'current'
 *      showDescendants: // value for 'showDescendants'
 *      filters: // value for 'filters'
 *   },
 * });
 */
export function useFilesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GqlFilesQuery, GqlFilesQueryVariables>) {
        return ApolloReactHooks.useQuery<GqlFilesQuery, GqlFilesQueryVariables>(FilesDocument, baseOptions);
      }
export function useFilesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GqlFilesQuery, GqlFilesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GqlFilesQuery, GqlFilesQueryVariables>(FilesDocument, baseOptions);
        }
export type FilesQueryHookResult = ReturnType<typeof useFilesQuery>;
export type FilesLazyQueryHookResult = ReturnType<typeof useFilesLazyQuery>;
export type FilesQueryResult = ApolloReactCommon.QueryResult<GqlFilesQuery, GqlFilesQueryVariables>;
export const FoldersDocument = gql`
    query Folders($current: String!) {
  folders(current: $current) {
    name
    path
  }
}
    `;

/**
 * __useFoldersQuery__
 *
 * To run a query within a React component, call `useFoldersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFoldersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFoldersQuery({
 *   variables: {
 *      current: // value for 'current'
 *   },
 * });
 */
export function useFoldersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GqlFoldersQuery, GqlFoldersQueryVariables>) {
        return ApolloReactHooks.useQuery<GqlFoldersQuery, GqlFoldersQueryVariables>(FoldersDocument, baseOptions);
      }
export function useFoldersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GqlFoldersQuery, GqlFoldersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GqlFoldersQuery, GqlFoldersQueryVariables>(FoldersDocument, baseOptions);
        }
export type FoldersQueryHookResult = ReturnType<typeof useFoldersQuery>;
export type FoldersLazyQueryHookResult = ReturnType<typeof useFoldersLazyQuery>;
export type FoldersQueryResult = ApolloReactCommon.QueryResult<GqlFoldersQuery, GqlFoldersQueryVariables>;
export const TagGroupsDocument = gql`
    query TagGroups {
  tagGroups {
    name
    color
    tags
  }
}
    `;

/**
 * __useTagGroupsQuery__
 *
 * To run a query within a React component, call `useTagGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GqlTagGroupsQuery, GqlTagGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<GqlTagGroupsQuery, GqlTagGroupsQueryVariables>(TagGroupsDocument, baseOptions);
      }
export function useTagGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GqlTagGroupsQuery, GqlTagGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GqlTagGroupsQuery, GqlTagGroupsQueryVariables>(TagGroupsDocument, baseOptions);
        }
export type TagGroupsQueryHookResult = ReturnType<typeof useTagGroupsQuery>;
export type TagGroupsLazyQueryHookResult = ReturnType<typeof useTagGroupsLazyQuery>;
export type TagGroupsQueryResult = ApolloReactCommon.QueryResult<GqlTagGroupsQuery, GqlTagGroupsQueryVariables>;
export const TagsDocument = gql`
    query Tags {
  tags
}
    `;

/**
 * __useTagsQuery__
 *
 * To run a query within a React component, call `useTagsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTagsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTagsQuery({
 *   variables: {
 *   },
 * });
 */
export function useTagsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GqlTagsQuery, GqlTagsQueryVariables>) {
        return ApolloReactHooks.useQuery<GqlTagsQuery, GqlTagsQueryVariables>(TagsDocument, baseOptions);
      }
export function useTagsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GqlTagsQuery, GqlTagsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GqlTagsQuery, GqlTagsQueryVariables>(TagsDocument, baseOptions);
        }
export type TagsQueryHookResult = ReturnType<typeof useTagsQuery>;
export type TagsLazyQueryHookResult = ReturnType<typeof useTagsLazyQuery>;
export type TagsQueryResult = ApolloReactCommon.QueryResult<GqlTagsQuery, GqlTagsQueryVariables>;
export const MoveTagDocument = gql`
    mutation MoveTag($tag: String!, $group: String) {
  moveTag(tag: $tag, group: $group)
}
    `;
export type GqlMoveTagMutationFn = ApolloReactCommon.MutationFunction<GqlMoveTagMutation, GqlMoveTagMutationVariables>;

/**
 * __useMoveTagMutation__
 *
 * To run a mutation, you first call `useMoveTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveTagMutation, { data, loading, error }] = useMoveTagMutation({
 *   variables: {
 *      tag: // value for 'tag'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useMoveTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlMoveTagMutation, GqlMoveTagMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlMoveTagMutation, GqlMoveTagMutationVariables>(MoveTagDocument, baseOptions);
      }
export type MoveTagMutationHookResult = ReturnType<typeof useMoveTagMutation>;
export type MoveTagMutationResult = ApolloReactCommon.MutationResult<GqlMoveTagMutation>;
export type MoveTagMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlMoveTagMutation, GqlMoveTagMutationVariables>;
export const RemoveFileDocument = gql`
    mutation RemoveFile($path: String!) {
  removeFile(path: $path)
}
    `;
export type GqlRemoveFileMutationFn = ApolloReactCommon.MutationFunction<GqlRemoveFileMutation, GqlRemoveFileMutationVariables>;

/**
 * __useRemoveFileMutation__
 *
 * To run a mutation, you first call `useRemoveFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFileMutation, { data, loading, error }] = useRemoveFileMutation({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useRemoveFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlRemoveFileMutation, GqlRemoveFileMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlRemoveFileMutation, GqlRemoveFileMutationVariables>(RemoveFileDocument, baseOptions);
      }
export type RemoveFileMutationHookResult = ReturnType<typeof useRemoveFileMutation>;
export type RemoveFileMutationResult = ApolloReactCommon.MutationResult<GqlRemoveFileMutation>;
export type RemoveFileMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlRemoveFileMutation, GqlRemoveFileMutationVariables>;
export const RemoveTagDocument = gql`
    mutation RemoveTag($path: String!, $tag: String!) {
  removeTag(path: $path, tag: $tag)
}
    `;
export type GqlRemoveTagMutationFn = ApolloReactCommon.MutationFunction<GqlRemoveTagMutation, GqlRemoveTagMutationVariables>;

/**
 * __useRemoveTagMutation__
 *
 * To run a mutation, you first call `useRemoveTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagMutation, { data, loading, error }] = useRemoveTagMutation({
 *   variables: {
 *      path: // value for 'path'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useRemoveTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlRemoveTagMutation, GqlRemoveTagMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlRemoveTagMutation, GqlRemoveTagMutationVariables>(RemoveTagDocument, baseOptions);
      }
export type RemoveTagMutationHookResult = ReturnType<typeof useRemoveTagMutation>;
export type RemoveTagMutationResult = ApolloReactCommon.MutationResult<GqlRemoveTagMutation>;
export type RemoveTagMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlRemoveTagMutation, GqlRemoveTagMutationVariables>;
export const RemoveTagGroupDocument = gql`
    mutation RemoveTagGroup($group: String!) {
  removeTagGroup(group: $group)
}
    `;
export type GqlRemoveTagGroupMutationFn = ApolloReactCommon.MutationFunction<GqlRemoveTagGroupMutation, GqlRemoveTagGroupMutationVariables>;

/**
 * __useRemoveTagGroupMutation__
 *
 * To run a mutation, you first call `useRemoveTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeTagGroupMutation, { data, loading, error }] = useRemoveTagGroupMutation({
 *   variables: {
 *      group: // value for 'group'
 *   },
 * });
 */
export function useRemoveTagGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlRemoveTagGroupMutation, GqlRemoveTagGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlRemoveTagGroupMutation, GqlRemoveTagGroupMutationVariables>(RemoveTagGroupDocument, baseOptions);
      }
export type RemoveTagGroupMutationHookResult = ReturnType<typeof useRemoveTagGroupMutation>;
export type RemoveTagGroupMutationResult = ApolloReactCommon.MutationResult<GqlRemoveTagGroupMutation>;
export type RemoveTagGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlRemoveTagGroupMutation, GqlRemoveTagGroupMutationVariables>;
export const RenameFileDocument = gql`
    mutation RenameFile($path: String!, $newName: String!) {
  renameFile(path: $path, newName: $newName)
}
    `;
export type GqlRenameFileMutationFn = ApolloReactCommon.MutationFunction<GqlRenameFileMutation, GqlRenameFileMutationVariables>;

/**
 * __useRenameFileMutation__
 *
 * To run a mutation, you first call `useRenameFileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameFileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameFileMutation, { data, loading, error }] = useRenameFileMutation({
 *   variables: {
 *      path: // value for 'path'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useRenameFileMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlRenameFileMutation, GqlRenameFileMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlRenameFileMutation, GqlRenameFileMutationVariables>(RenameFileDocument, baseOptions);
      }
export type RenameFileMutationHookResult = ReturnType<typeof useRenameFileMutation>;
export type RenameFileMutationResult = ApolloReactCommon.MutationResult<GqlRenameFileMutation>;
export type RenameFileMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlRenameFileMutation, GqlRenameFileMutationVariables>;
export const RenameTagGroupDocument = gql`
    mutation RenameTagGroup($group: String!, $newName: String!) {
  renameTagGroup(group: $group, newName: $newName)
}
    `;
export type GqlRenameTagGroupMutationFn = ApolloReactCommon.MutationFunction<GqlRenameTagGroupMutation, GqlRenameTagGroupMutationVariables>;

/**
 * __useRenameTagGroupMutation__
 *
 * To run a mutation, you first call `useRenameTagGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameTagGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameTagGroupMutation, { data, loading, error }] = useRenameTagGroupMutation({
 *   variables: {
 *      group: // value for 'group'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useRenameTagGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GqlRenameTagGroupMutation, GqlRenameTagGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<GqlRenameTagGroupMutation, GqlRenameTagGroupMutationVariables>(RenameTagGroupDocument, baseOptions);
      }
export type RenameTagGroupMutationHookResult = ReturnType<typeof useRenameTagGroupMutation>;
export type RenameTagGroupMutationResult = ApolloReactCommon.MutationResult<GqlRenameTagGroupMutation>;
export type RenameTagGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<GqlRenameTagGroupMutation, GqlRenameTagGroupMutationVariables>;


export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type GqlResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Config: ResolverTypeWrapper<GqlConfig>,
  String: ResolverTypeWrapper<Scalars['String']>,
  TagGroup: ResolverTypeWrapper<GqlTagGroup>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  File: ResolverTypeWrapper<GqlFile>,
  Folder: ResolverTypeWrapper<GqlFolder>,
  Mutation: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type GqlResolversParentTypes = {
  Query: {},
  Config: GqlConfig,
  String: Scalars['String'],
  TagGroup: GqlTagGroup,
  Boolean: Scalars['Boolean'],
  File: GqlFile,
  Folder: GqlFolder,
  Mutation: {},
};

export type GqlConfigResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Config'] = GqlResolversParentTypes['Config']> = {
  dbPath: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  root: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GqlFileResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['File'] = GqlResolversParentTypes['File']> = {
  name: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  tags: Resolver<Array<GqlResolversTypes['String']>, ParentType, ContextType>,
  path: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  isFile: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GqlFolderResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Folder'] = GqlResolversParentTypes['Folder']> = {
  name: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  path: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GqlMutationResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Mutation'] = GqlResolversParentTypes['Mutation']> = {
  changeRoot: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationChangeRootArgs, 'folder'>>,
  createTagGroup: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationCreateTagGroupArgs, 'name'>>,
  renameTagGroup: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationRenameTagGroupArgs, 'group' | 'newName'>>,
  removeTagGroup: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationRemoveTagGroupArgs, 'group'>>,
  moveTag: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationMoveTagArgs, 'tag'>>,
  changeColor: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationChangeColorArgs, 'group' | 'color'>>,
  addTag: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationAddTagArgs, 'path' | 'tag'>>,
  removeTag: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationRemoveTagArgs, 'path' | 'tag'>>,
  renameFile: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationRenameFileArgs, 'path' | 'newName'>>,
  removeFile: Resolver<GqlResolversTypes['Boolean'], ParentType, ContextType, RequireFields<GqlMutationRemoveFileArgs, 'path'>>,
};

export type GqlQueryResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['Query'] = GqlResolversParentTypes['Query']> = {
  config: Resolver<GqlResolversTypes['Config'], ParentType, ContextType>,
  tagGroups: Resolver<Array<GqlResolversTypes['TagGroup']>, ParentType, ContextType>,
  files: Resolver<Array<GqlResolversTypes['File']>, ParentType, ContextType, RequireFields<GqlQueryFilesArgs, 'current' | 'showDescendants' | 'filters'>>,
  tags: Resolver<Array<GqlResolversTypes['String']>, ParentType, ContextType>,
  folders: Resolver<Array<GqlResolversTypes['Folder']>, ParentType, ContextType, RequireFields<GqlQueryFoldersArgs, 'current'>>,
};

export type GqlTagGroupResolvers<ContextType = any, ParentType extends GqlResolversParentTypes['TagGroup'] = GqlResolversParentTypes['TagGroup']> = {
  name: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  color: Resolver<GqlResolversTypes['String'], ParentType, ContextType>,
  tags: Resolver<Array<GqlResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GqlResolvers<ContextType = any> = {
  Config: GqlConfigResolvers<ContextType>,
  File: GqlFileResolvers<ContextType>,
  Folder: GqlFolderResolvers<ContextType>,
  Mutation: GqlMutationResolvers<ContextType>,
  Query: GqlQueryResolvers<ContextType>,
  TagGroup: GqlTagGroupResolvers<ContextType>,
};


