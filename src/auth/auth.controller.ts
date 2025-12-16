import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { register } from 'module';
import { RegisterUserDto } from './dto/register-user.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  registerUser(@Body() registerDto:RegisterUserDto) {

    return this.authService.registerUser(registerDto);
  }

}
