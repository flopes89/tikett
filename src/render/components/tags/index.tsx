import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Badge } from "reactstrap";
import { RemoveTag } from "./removeTag";
import { getColorOfTag } from "../../util";
import { useTagsState } from "../../state/tags";

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

export const Tags: React.FC<TagsProps> = (props) => {
    const { groups } = useTagsState();

    return (
        <>
            {props.tags.map((tag, index) => {
                const color = getColorOfTag(groups, tag);

                return (
                    <Draggable draggableId={tag + "|" + props.path} index={index} key={index}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className="tag"
                            >
                                <Tag color={color}>
                                    {tag}
                                    <RemoveTag name={tag} path={props.path} />
                                </Tag>
                            </div>
                        )}
                    </Draggable>
                );
            })}
        </>
    );
};
