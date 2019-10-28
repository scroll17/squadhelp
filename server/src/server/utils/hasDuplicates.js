export const hasDuplicates = arr => {
    const set = new Set(arr);

    return set.size !== arr.length;
};