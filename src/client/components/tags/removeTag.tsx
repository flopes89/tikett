import React from "react";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useFileBrowserState } from "../../state/fileBrowser";
import { useMoveTagMutation, useRemoveTagMutation, FilesDocument, TagGroupsDocument } from "../../../generated/graphql";
import { Loading } from "../util";

type RemoveTagProps = {
    name: string;
    path?: string;
};

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
    const [moveTag, { loading: moveTagLoading }] = useMoveTagMutation();
    const [removeTag, { loading: removeTagLoading }] = useRemoveTagMutation();
    const { selectFile, currentFolder, showDescendants, filters } = useFileBrowserState();

    const remove = async() => {
        if (props.path) {
            await removeTag({
                variables: {
                    path: props.path,
                    tag: props.name,
                },
                refetchQueries: [{
                    query: FilesDocument,
                    variables: {
                        current: currentFolder,
                        showDescendants,
                        filters
                    }
                }]
            });
            selectFile("");
        } else {
            await moveTag({
                variables: {
                    tag: props.name,
                    group: null,
                },
                refetchQueries: [{
                    query: TagGroupsDocument,
                }]
            });
        }
    };

    if (moveTagLoading || removeTagLoading) {
        return <Loading />;
    }

    return (
        <a className="remove_tag ml-2" href="#" onClick={() => remove()} tabIndex={-1}>
            <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
        </a>
    );
};
