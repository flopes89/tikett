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
    }, [param]);

    return {
        result,
        err,
        pending,
    };
};

export const getColorOfTag = async(groups: TagGroup[], name: string): Promise<string> => {
    let result = null;

    groups.forEach(group => {
        if (group.tags.find(tag => tag === name)) {
            result = group.color;
            return;
        }
    });

    if (!result) {
        result = "#efefef";
    }

    return result;
};
