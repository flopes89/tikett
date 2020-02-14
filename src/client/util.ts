import { FilesDocument, GqlFilesQueryVariables, GqlTagGroup } from "../generated/graphql";
import { DEFAULT_TAG_COLOR } from "../shared/interface-types";
import { useEffect } from "react";
import { useFileBrowserState } from "./state/fileBrowser";

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

export const useRefetchFilesQuery = () => {
    const variables = useFilesVariables();
    return {
        query: FilesDocument,
        variables,
    };
};

export const useFilesVariables = () => {
    const state = useFileBrowserState();
    return <GqlFilesQueryVariables>{
        current: state.currentFolder,
        filters: state.filters,
        showDescendants: state.showDescendants,
    };
};
