import { useState, useEffect } from "react";
import { TagGroup } from "./state/tags";

type HookableFunc<T, P> = (param: P) => Promise<T|null>; 
type HookedFuncResult<T> = {
    result: T|null;
    err: string|null;
    pending: boolean;
};

export const asHook = <T, P>(func: HookableFunc<T, P>, param: P): HookedFuncResult<T> => {
    const [result, setResult] = useState<T|null>(null);
    const [err, setErr] = useState<string|null>(null);
    const [pending, setPending] = useState<boolean>(false);

    useEffect(() => {
        setErr(null);
        setPending(true);
        func(param)
            .then(setResult)
            .catch(err => setErr(JSON.stringify(err)))
            .finally(() => setPending(false));
    }, [JSON.stringify(param)]);

    return {
        result,
        err,
        pending,
    };
};

// Get the color of a tag based on the given tag groups
export const getColorOfTag = (groups: TagGroup[], name: string): string => {
    let result = "";

    groups.forEach(group => {
        if (group.tags.find(tag => tag === name)) {
            result = group.color;
            return;
        }
    });

    return result;
};
