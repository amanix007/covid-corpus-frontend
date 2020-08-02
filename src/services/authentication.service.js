
import data from '../mock/user-mock.json';
import { handleResponse } from 'helpers';

export const authenticationService = {
    getCurrentUser,
    login,
    loginByGoogle,
    loginByLinkedIn,
    logout,
    register,
    forgotPassword,
    resetPassword,
    verifyEmail,
};

const covidUser = 'covidUser';

function getCurrentUser() {
    const x = localStorage.getItem(covidUser);
    return x && JSON.parse(x) || null;
}

async function login(email, password) {

    console.log("Api url:", process.env.REACT_APP_BACKEND_API)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ email, password })
    };

    //let query = buildQuery({ lineId });
    return fetch(`${process.env.REACT_APP_BACKEND_API}/loginUser`, requestOptions).then(handleResponse).then((data) => {
        //return data;
        let loginUser = {
            user: {
                name: data.user.name,
                surname: data.user.surname,
                profilePhoto: data.user.avatar,
                id: data.user.id,
                isAdmin: data.user.roles.find(x => x.name === 'admin') && true || false,
                isEditor: data.user.roles.find(x => x.name === 'editor') && true || false,
                email: data.user.email,
                status: data.user.status
            },
            access_token: data.access_token
        };

        localStorage.setItem(covidUser, JSON.stringify(loginUser));
        return loginUser;
        /*
        return new Promise(function(resolve) {
            localStorage.setItem(covidUser, JSON.stringify(loginUser));

            resolve(createLoginToken(loginUser.user.id, loginUser.user.name, loginUser.user.profilePhoto, loginUser.user.isAdmin, loginUser.user.isEditor));
        })
        */
    });
}

async function register({ firstName, lastName, email, password }) {
    // await new Promise(r => setTimeout(r, 2000));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ name: firstName, surname: lastName, email, password, password_confirmation: password })
    };

    //let query = buildQuery({ lineId });
    return fetch(`${process.env.REACT_APP_BACKEND_API}/register`, requestOptions).then(handleResponse);
}
async function forgotPassword({ email }) {
    // await new Promise(r => setTimeout(r, 2000));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ email })
    };

    //let query = buildQuery({ lineId });
    return fetch(`${process.env.REACT_APP_BACKEND_API}/passwords/email`, requestOptions).then(handleResponse);
}
async function resetPassword({ email, password, passwordConfirmation, token }) {
    // await new Promise(r => setTimeout(r, 2000));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ email, password, password_confirmation: passwordConfirmation, token })
    };

    //let query = buildQuery({ lineId });
    return fetch(`${process.env.REACT_APP_BACKEND_API}/passwords/reset`, requestOptions).then(handleResponse);
}
async function verifyEmail({ key }) {
    // await new Promise(r => setTimeout(r, 2000));

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ key })
    };

    //let query = buildQuery({ lineId });
    return fetch(`${process.env.REACT_APP_BACKEND_API}/users/verify`, requestOptions).then(handleResponse);
}

async function loginByGoogle(googleData) {
    console.log('google', googleData);
    //localStorage.setItem(covidUser, JSON.stringify(googleData));

    console.log("Api url:", process.env.REACT_APP_BACKEND_API)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ accessToken: googleData.accessToken, provider: "google" })
    };

    //let query = buildQuery({ lineId });
    return fetch(`${process.env.REACT_APP_BACKEND_API}/loginSocial`, requestOptions).then(handleResponse).then((data) => {
        console.log('google user', data);
        let loginUser = {
            user: {
                name: data.user.name,
                surname: data.user.surname,
                profilePhoto: googleData.profileObj.imageUrl,
                googleId: googleData.profileObj.googleId,
                id: data.user.id,
                isAdmin: data.user.roles.find(x => x.name === 'admin') && true || false,
                isEditor: data.user.roles.find(x => x.name === 'editor') && true || false,
                email: data.user.email,
                status: data.user.status
            },
            access_token: data.access_token
        };

        localStorage.setItem(covidUser, JSON.stringify(loginUser));
        return loginUser;
        /*
        console.log("Got data from loginSocial api:", data)
        return new Promise(function(resolve) {
            resolve(createLoginToken(googleData.profileObj.googleId, googleData.profileObj.givenName, googleData.profileObj.imageUrl, false, false));
        })
        */
    });
}

function loginByLinkedIn(data) {
    localStorage.setItem(covidUser, JSON.stringify(data));

    return new Promise(function (resolve) {
        resolve(data);
    })
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(covidUser);
}

function createLoginToken(id, name, profilePhoto, isAdmin, isEditor) {

    const loginToken = {
        id, name, profilePhoto, isAdmin, isEditor
    };

    localStorage.setItem(covidUser, JSON.stringify(loginToken));

    return loginToken;
}