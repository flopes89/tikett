import React, { useState, KeyboardEvent } from "react";
import { Button, Input } from "reactstrap";
import Octicon, { Plus } from "@primer/octicons-react";
import { useTagsState } from "../../state/tags";

export const CreateTagGroup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const { addGroup } = useTagsState();

    const onKeyPress = (event: KeyboardEvent) => {
        if (event.which === 13) {
            addGroup(name);
            setIsOpen(false);
        }
    };

    return (
        <div id="create_new_tag_group">
            {isOpen && (
                <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={() => setIsOpen(false)}
                    onKeyPress={onKeyPress}
                    placeholder="Press enter to confirm"
                />
            )}
            {!isOpen && (
                <Button size="sm" color="primary" onClick={() => setIsOpen(true)}>
                    <Octicon icon={Plus} className="mr-1" />
                    Create tag group
                </Button>
            )}
        </div>
    );
};
