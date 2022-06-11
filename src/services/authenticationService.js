import { BehaviorSubject } from 'rxjs';
import config from 'config';
import { handleResponse } from '@/helpers';

const userNameSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('userName')));

export const authenticationService = {
    login,
    logout,
    userName: userNameSubject.asObservable(),
    get userNameValue () { return userNameSubject.value }
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/users/authenticate`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('userName', JSON.stringify(user));
            userNameSubject.next(user);
            return user;
        });
}

function logout() {
    localStorage.removeItem('userName');
    userNameSubject.next(null);
}
