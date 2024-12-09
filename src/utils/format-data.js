export const formatDate = (date) => {
    // date in DD.MM.YYYY format
    const strToDate = new Date(date);
    const dateLocalized = `${strToDate.getDate()}.${strToDate.getMonth() + 1}.${strToDate.getFullYear()}.`;
    return dateLocalized;
}