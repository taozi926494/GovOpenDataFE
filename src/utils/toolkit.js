/**
 * 时间戳转时间
 * @param {String} tm 毫秒级时间
 */
export const stampToTime = tm => {
    return new Date(parseInt(tm)).toLocaleString().replace(/:\d{1,2}$/, ' ');
}