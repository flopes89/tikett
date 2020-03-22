import React from "react";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useFileBrowserState } from "../../state/fileBrowser";
import { TagGroupsDocument, useMoveTagMutation, useRemoveTagMutation } from "../../../generated/graphql";
import { Loading } from "../util";
import { useRefetchFilesQuery } from "../../util";

type RemoveTagProps = {
    name: string;
    path?: string;
};

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
    const [moveTag, { loading: moveTagLoading }] = useMoveTagMutation();
    const [removeTag, { loading: removeTagLoading }] = useRemoveTagMutation();
    const { selectFile } = useFileBrowserState();
    const refetchFilesQuery = useRefetchFilesQuery();

    const remove = async() => {
        if (props.path) {
            await removeTag({
                variables: {
                    path: props.path,
                    tag: props.name,
                },
                refetchQueries: [refetchFilesQuery]
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
        <a className="remove_tag ml-2" href="#" onClick={() => remove()}>
            <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
        </a>
    );
};
