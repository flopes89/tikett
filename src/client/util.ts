import { GqlTagGroup } from "../generated/graphql";
import { DEFAULT_TAG_COLOR } from "../shared/interface-types";
import { useEffect } from "react";

export const useHeightAdjust = (elementSelector: string) => {
    const handleResize = () => {
        const element = document.querySelector<HTMLElement>(elementSelector);

        if (!element) {
            return;
        }

        const remainingHeight = window.innerHeight - element.getBoundingClientRect().top;
        element.style.height = remainingHeight - 25 + "px";
    };

    useEffect(() => {
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    });
};

export const getColorOfTag = (groups: GqlTagGroup[], name: string): string => {
    let result = DEFAULT_TAG_COLOR;

    groups.forEach(group => {
        if (group.tags.findIndex(tag => tag === name) !== -1) {
            result = group.color;
        }
    });

    return result;
};
