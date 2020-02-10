import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { Popover, PopoverBody, Button } from "reactstrap";
import Octicon, { Paintcan } from "@primer/octicons-react";
import { GqlTagGroup, useChangeColorMutation } from "../../../generated/graphql";
import { Loading } from "../util";

type ColorPickerProps = {
    group: GqlTagGroup;
}

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const [changeColor, { loading }] = useChangeColorMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(props.group.color);

    const targetId = "colorPicker_" + props.group.name.replace(/[^a-z0-9]/, "_");

    const changeComplete = (color: ColorResult) => {
        setColor(color.hex);
    };

    const confirm = async() => {
        setIsOpen(false);
        await changeColor({
            variables: {
                group: props.group.name,
                color
            }
        });
    };

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <a href="#" onClick={() => setIsOpen(true)} id={targetId}>
                <Octicon icon={Paintcan} verticalAlign="middle" />
            </a>
            <Popover isOpen={isOpen} target={targetId} toggle={() => setIsOpen(!isOpen)}>
                <PopoverBody>
                    <SketchPicker disableAlpha={true} onChangeComplete={changeComplete} color={color} />
                    <Button onClick={confirm}>OK</Button>
                </PopoverBody>
            </Popover>
        </>
    );
}; 
