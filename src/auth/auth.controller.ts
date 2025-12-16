import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  registerUser(@Body() registerDto: RegisterUserDto) {
    return this.authService.registerUser(registerDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('change-password')
  async changePassword(@Body() body: ChangePasswordDto) {
    return this.authService.changePassword(body.email, body.oldPassword, body.newPassword);
  }

  @Post('logout')
  async logout() {
    return this.authService.logout();
  }

  @Post('login')
  loginUser(@Body() loginDto: { email: string; password: string }) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }
}
