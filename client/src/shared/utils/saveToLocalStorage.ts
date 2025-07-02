export const saveToLocalStorage = (key: string, data: any) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
        window.dispatchEvent(new Event(`${key}-changed`));
    } catch (e) {
        console.error("Помилка при збереженні в localStorage:", e);
    }
};
