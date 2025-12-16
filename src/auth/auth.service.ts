import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
      constructor(private readonly userService: UserService) {}

  async registerUser(registerUserDto:RegisterUserDto) {
    const saltRpounds = 10;
const hashedPassword = await bcrypt.hashSync(registerUserDto.password,saltRpounds);
    console.log('dto for register:',RegisterUserDto);
    return this.userService.createUser({...registerUserDto,password:hashedPassword});
  }


}
