export function useLocalStorage() {

    const isJSON = (str) => {
        try {
            JSON.parse(str);
            return true;
        } catch (e) {
            return false;
        }
    };

    const getData = (key) => {
        const data = localStorage.getItem(key);
        return data != {} ? isJSON(data) ? JSON.parse(data) : data : false;
    };

    const setData = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    };

    return {
        getData,
        setData
    };
};