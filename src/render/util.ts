import { useState, useEffect } from "react";
import { TagGroup, DEFAULT_TAG_COLOR } from "./model";

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

export const getColorOfGroup = (group: TagGroup): string => {
    if (group.tags.length === 0) {
        return DEFAULT_TAG_COLOR;
    }

    return group.tags[0].color;
};