export function cc(...classes: (string | boolean | undefined | null)[]) {
    return classes.filter((c) => typeof c === 'string').join(' ');
}
