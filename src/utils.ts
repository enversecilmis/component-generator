export const capitalize = (val: string): string => {
    const lower = val.toLowerCase()
    return lower.charAt(0).toUpperCase() + lower.slice(1)
}