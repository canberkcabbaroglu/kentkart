import users from '../api/users.json';
export function configureFakeBackend() {
    window.fetch = function (url, vlds) {
        const isLoggedIn = vlds.headers['Authorization'] === 'Bearer fake-jwt-token';

        return new Promise((resolve ) => {

            setTimeout(() => {
                if (url.endsWith('/users/authenticate') && vlds.method === 'POST') {
                    const params = JSON.parse(vlds.body);
                    const user = users.find(x => x.email === params.email && x.password === params.password && x.status === true);
                    if (!user) return error('Yanlış giriş yaptınız!');
                    return ok({
                        email: user.email,
                        password:user.password,
                        token: 'fake-jwt-token'
                    });
                }
                
                if (url.endsWith('/users') && vlds.method === 'GET') {
                    if (!isLoggedIn) return unauthorised();
                    return ok(users);
                      
 
                }
                return error('Yanlış giriş yaptınız');
               

                function ok(body) {
                    resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) })
                }

                function unauthorised() {
                    resolve({ status: 401, text: () => Promise.resolve(JSON.stringify({ message: 'Unauthorised' })) })
                }

                function error(message) {
                    resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) })
                }
            }, 500);

     
        });
    }
 
}