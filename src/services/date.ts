export const dateToFormat = (date: Date, format: string = "dd/mm/yyyy"): string => {
    const options: Record<string, string> = {
        dd: date.getDate().toString().padStart(2, '0'),
        mm: (date.getMonth() + 1).toString().padStart(2, '0'),
        yyyy: date.getFullYear().toString(),
        hh: date.getHours().toString().padStart(2, '0'),
        nn: date.getMinutes().toString().padStart(2, '0'),
        ss: date.getSeconds().toString().padStart(2, '0'),
    };

    return format.replace(/(dd|mm|yyyy|hh|nn|ss)/g, (match) => options[match]);
}