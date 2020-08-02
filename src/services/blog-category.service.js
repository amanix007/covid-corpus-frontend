import data from '../mock/blog-category-mock.json';

export const blogCategoryService = {
    get,
    getActive,
    getById
};

function getActive() {
    return new Promise(function(resolve) {
        resolve(data.filter(x => x.status === 'A'));
    })
}

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