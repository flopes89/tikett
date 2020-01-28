import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { Popover, PopoverBody, Button } from "reactstrap";
import Octicon, { Paintcan } from "@primer/octicons-react";
import { useTagsState } from "../../state/tags";

type ColorPickerProps = {
    group: string;
    color: string;
}

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const { changeColor } = useTagsState();
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(props.color);

    const changeComplete = (color: ColorResult) => {
        setColor(color.hex);
    };

    const confirm = () => {
        setIsOpen(false);
        changeColor(props.group, color);
    };

    return (
        <>
            <a href="#" onClick={() => setIsOpen(true)} id={"colorPicker_" + props.group}>
                <Octicon icon={Paintcan} verticalAlign="middle" />
            </a>
            <Popover isOpen={isOpen} target={"colorPicker_" + props.group} toggle={() => setIsOpen(!isOpen)}>
                <PopoverBody>
                    <SketchPicker disableAlpha={true} onChangeComplete={changeComplete} color={color} />
                    <Button onClick={confirm}>OK</Button>
                </PopoverBody>
            </Popover>
        </>
    );
}; 
