const storage = (() => {

    /**
     *
     * @param {*} key Clave del valor
     * @param {*} value Valor
     * @param {*} expiryTime Días para la expiración
     * @returns Boolean
     */
    function safeStorage(key, value, expiryTime = null) {
        try {
            localStorage.setItem(key, JSON.stringify({
                value: value,
                expiry: (expiryTime)
                    ? new Date().getTime() + (ttl / (1000 * 60 * 60 * 24))
                    : 0
            }));
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    }

    /**
     *
     * @param {string} theme
     * @returns Boolean
     */
    function setTheme(theme) {
        try {
            localStorage.setItem('theme', theme);
            return true;
        } catch (e) {
            document.body.className = theme;
            return false;
        }
    }

    return {
        safeStorage,
        setTheme
    }
})();


export default storage;