import { authenticationService } from '@/services';

export function authHeader() {
    const userName = authenticationService.userNameValue;
    if (userName && userName.token) {
        return { Authorization: `Bearer ${userName.token}` };
    } else {
        return {};
    }
}