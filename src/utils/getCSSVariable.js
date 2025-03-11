export const getCSSVariable = (variable) =>
    getComputedStyle(document.documentElement)
        .getPropertyValue(variable)
        .trim();
