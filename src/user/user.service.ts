import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    createUser() {
        return { message: 'User registered successfully/1.' };
    }
}
