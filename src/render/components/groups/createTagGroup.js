import React, { useState } from "react";
import { Button, Input } from "reactstrap";
import Octicon, { Plus } from "@githubprimer/octicons-react";
import { Mutation } from "../util";
import queries from "../../queries";

const CreateTagGroup = (props) => {
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");

    const onKeyPress = (event) => {
        if (event.which === 13) {
            props.confirm({
                variables: {
                    name,
                },
            });
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

const CreateTagGroupContainer = () => (
    <Mutation
        mutation={queries.CREATE_TAG_GROUP}
        refetchQueries={[
            { query: queries.GET_TAG_GROUPS },
        ]}>
        {(mutate) => (<CreateTagGroup confirm={mutate} />)}
    </Mutation>
);

export default CreateTagGroupContainer;
