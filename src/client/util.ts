import { useState, useEffect } from "react";
import { GqlTagGroup } from "../generated/graphql";
import { DEFAULT_TAG_COLOR } from "../shared/interface-types";

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

export const getColorOfTag = (groups: GqlTagGroup[], name: string): string => {
    let result = DEFAULT_TAG_COLOR;

    groups.forEach(group => {
        if (group.tags.findIndex(tag => tag === name) !== -1) {
            result = group.color;
        }
    });

    return result;
};
