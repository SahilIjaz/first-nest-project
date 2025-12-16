import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';

@Injectable()
export class AuthService {
      constructor(private readonly userService: UserService) {}

  registerUser(RegisterUserDto:RegisterUserDto) {
    
    console.log('dto for register:',RegisterUserDto);
    return this.userService.createUser();
  }


}
