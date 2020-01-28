import React from "react";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useTagsState } from "../../state/tags";
import { useFileBrowserState } from "../../state/fileBrowser";

type RemoveTagProps = {
    name: string;
    path: string;
};

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
    const { removeTag } = useTagsState();
    const { selectFile } = useFileBrowserState();

    const remove = () => {
        removeTag(props.name, props.path);
        selectFile("");
    };

    return (
        <a className="remove_tag ml-2" href="#" onClick={() => remove()} tabIndex={-1}>
            <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
        </a>
    );
};
