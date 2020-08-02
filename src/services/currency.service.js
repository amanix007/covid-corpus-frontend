import data from '../mock/currencies.json';

export const currencyService = {
    get
};

function get() {
    return new Promise(function(resolve) {
        resolve(data);
    })
}