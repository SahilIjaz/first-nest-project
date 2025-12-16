import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

@Injectable()
export class UserService {
    createUser(registerUserDto:RegisterUserDto) {
        return { message: 'User registered successfully/1.' };
    }
}
