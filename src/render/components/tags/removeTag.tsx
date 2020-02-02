import React from "react";
import Octicon, { Trashcan } from "@primer/octicons-react";
import { useFileBrowserState } from "../../state/fileBrowser";
import { removeTag } from "../../operations/files";

type RemoveTagProps = {
    name: string;
    path: string;
};

export const RemoveTag: React.FC<RemoveTagProps> = (props) => {
    const { selectFile, updateRefetch } = useFileBrowserState();

    const remove = async() => {
        await removeTag(props.name, props.path);
        updateRefetch();
        selectFile("");
    };

    return (
        <a className="remove_tag ml-2" href="#" onClick={() => remove()} tabIndex={-1}>
            <Octicon icon={Trashcan} size={12} verticalAlign="middle" />
        </a>
    );
};
