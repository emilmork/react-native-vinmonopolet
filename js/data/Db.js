var { AsyncStorage } = require('react-native');


module.exports = {
    get(key) {
        return AsyncStorage.getItem(key).then(function(value) {
            return JSON.parse(value);
        });
    },

    save(key, value) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
    },

    delete(key) {
        return AsyncStorage.removeItem(key);
    },

    getAll() {
        return AsyncStorage.getAllKeys()
            .then(AsyncStorage.multiGet)
            .then((res) => {
                return res.filter(item => item[1] != null).map(item => JSON.parse(item[1]));
            });
    }
};

