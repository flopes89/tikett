import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "reactstrap";
import { RemoveTag } from "./removeTag";
import { DEFAULT_TAG_COLOR } from "../../state/tags";

const HEX_COLOR_PATTERN = new RegExp(/#?(\w{2})(\w{2})(\w{2})/);

const getContrastColor = (background: string): "black"|"white" => {
    const rgb = HEX_COLOR_PATTERN.exec(background);
    let brightness = 255;

    if (rgb) {
        brightness = Math.round((
            (parseInt(rgb[1], 16) * 299) +
            (parseInt(rgb[2], 16) * 587) +
            (parseInt(rgb[3], 16) * 114)) / 1000);
    }

    return (brightness > 125) ? "black" : "white";
};

type TagProps = {
    children: React.ReactNode;
    color: string;
};

export const Tag: React.FC<TagProps> = (props) => (
    <Badge style={{
        backgroundColor: props.color,
        color: getContrastColor(props.color)
    }}>
        {props.children}
    </Badge>
);

type TagsProps = {
    path?: string;
    tags: string[];
};

export const Tags: React.FC<TagsProps> = (props) => (
    <>
        {props.tags.map((tag, index) => {
            let color = DEFAULT_TAG_COLOR;
            let path = props.path;
            let name = tag;

            if (tag.indexOf("#") !== -1) {
                const split = tag.split("#");
                name = split[0];
                color = split[1];
            }

            const id = `${name}|${color}|${path}`;

            return (
                <Draggable draggableId={id} index={index} key={index}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="tag"
                        >
                            <Tag color={color}>
                                {name}
                                {path && (<RemoveTag name={name} path={path} />)}
                            </Tag>
                        </div>
                    )}
                </Draggable>
            );
        })}
    </>
);
