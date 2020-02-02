import React, { useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import { Popover, PopoverBody, Button } from "reactstrap";
import Octicon, { Paintcan } from "@primer/octicons-react";
import { useTagsState } from "../../state/tags";
import { useFileBrowserState } from "../../state/fileBrowser";
import { TagGroup } from "../../model";

type ColorPickerProps = {
    group: TagGroup;
}

export const ColorPicker: React.FC<ColorPickerProps> = (props) => {
    const { changeColor } = useTagsState();
    const { updateRefetch } = useFileBrowserState();
    const [isOpen, setIsOpen] = useState(false);
    const [color, setColor] = useState(props.group.color);

    const changeComplete = (color: ColorResult) => {
        setColor(color.hex);
    };

    const confirm = () => {
        setIsOpen(false);
        changeColor(props.group.name, color);
        updateRefetch();
    };

    return (
        <>
            <a href="#" onClick={() => setIsOpen(true)} id={"colorPicker_" + props.group.name}>
                <Octicon icon={Paintcan} verticalAlign="middle" />
            </a>
            <Popover isOpen={isOpen} target={"colorPicker_" + props.group.name} toggle={() => setIsOpen(!isOpen)}>
                <PopoverBody>
                    <SketchPicker disableAlpha={true} onChangeComplete={changeComplete} color={color} />
                    <Button onClick={confirm}>OK</Button>
                </PopoverBody>
            </Popover>
        </>
    );
}; 
