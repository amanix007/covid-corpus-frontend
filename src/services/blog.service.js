import data from '../mock/blog-mock.json';

export const blogService = {
    get,
    getById
};

function get() {
    return new Promise(function(resolve) {
        resolve(data);
    })
}

function getById(id) {
    return new Promise(function(resolve) {
        resolve(data.find(d => d.id === id));
    })
}