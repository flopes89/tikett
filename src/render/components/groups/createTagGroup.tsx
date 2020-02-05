import React, { useState, KeyboardEvent, useRef, useEffect } from "react";
import { Button, Input } from "reactstrap";
import Octicon, { Plus } from "@primer/octicons-react";
import { useTagsState } from "../../state/tags";

export const CreateTagGroup: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const { addGroup } = useTagsState();
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isOpen]);

    const onKeyDown = (event: KeyboardEvent) => {
        if (name.length > 0 && event.key === "Enter") {
            addGroup(name);
            setIsOpen(false);
        }

        if (event.key === "Escape") {
            setName("");
            setIsOpen(false);
        }
    };

    return (
        <div id="create_new_tag_group">
            {isOpen && (
                <Input
                    innerRef={inputRef}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onBlur={() => setIsOpen(false)}
                    onKeyDown={onKeyDown}
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
