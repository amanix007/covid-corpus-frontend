import { authenticationService } from '../services';

export function handleResponse(response) {
    // console.log('response', response);

    return response.text().then(text => {
        try {
            const data = text && JSON.parse(text);
            if (!response.ok) {
                if ([401, 403].indexOf(response.status) !== -1) {
                    // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                    authenticationService.logout();
                }
                if(response.status===422){
                    return {hasError:true,errors:data.errors}
                }

                const error = (data && data.message) || response.statusText;
                return Promise.reject(error);
            }

            return data;
        }
        catch {
            return Promise.reject("Fatal Error");
            return null;
        }
    });
}