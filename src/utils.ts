export function parseNumber(str?: string): number | undefined {
    const parsed = Number(str);

    return !isNaN(parsed) ? parsed : undefined;
}

export function _throw(msg: string): never {
    throw msg;
}
