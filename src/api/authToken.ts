import { parseCookies } from 'nookies';
export function cookieToken() {
    const cookies = parseCookies();
    const token = cookies['token'];
    return token;
}
