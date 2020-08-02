import { authenticationService } from '../services';

export function authHeader() {
    //const [{currentUser}, dispatch] = useAppState();
    const currentUser = authenticationService.getCurrentUser();
      // return authorization header with jwt token

    if (currentUser && currentUser.access_token) {
        return { Authorization: `Bearer ${currentUser.access_token}` };
    } else {
        return {};
    }
}