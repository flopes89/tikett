import React from "react";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useFileBrowserState } from "../../state/fileBrowser";
import { removeTag } from "../../operations/files";
import { useTagsState } from "../../state/tags";

type RemoveTagProps = {
    name: string;
    path?: string;
};

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
    const { moveTag } = useTagsState();
    const { selectFile, updateRefetch } = useFileBrowserState();

    const remove = async() => {
        if (props.path) {
            await removeTag(props.name, props.path);
            updateRefetch();
            selectFile("");
        } else {
            moveTag(props.name);
        }
    };

    return (
        <a className="remove_tag ml-2" href="#" onClick={() => remove()} tabIndex={-1}>
            <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
        </a>
    );
};
