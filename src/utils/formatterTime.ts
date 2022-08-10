export const formatterTime = (date_time: any): string => {
    const h = (date_time.getHours() >= 10 ? date_time.getHours() : '0' + date_time.getHours());
    const m = (date_time.getMinutes() >= 10 ? date_time.getMinutes() : '0' + date_time.getMinutes());
    return h + ':' + m;
};
