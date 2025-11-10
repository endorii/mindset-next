export const statuses = ["Активно", "Не активно"];
export const availables = ["Доступно", "Не доступно"];
export const priorities = ["low", "medium", "high"];

export function declOfNum(number: number, words: [string, string, string]) {
    const mod10 = number % 10;
    const mod100 = number % 100;

    if (mod100 >= 11 && mod100 <= 14) {
        return words[2];
    }
    if (mod10 === 1) {
        return words[0];
    }
    if (mod10 >= 2 && mod10 <= 4) {
        return words[1];
    }
    return words[2];
}
