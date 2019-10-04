import { User } from 'src/app/user/types/user.interface';

export interface AuthenticationResponse {
    user: User;
    token: string;
}
