import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registerUserDto: RegisterUserDto) {
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(registerUserDto.password, saltRounds);

    try {
      const created = await this.userService.createUser({
        firstName: registerUserDto.firstName,
        lastName: registerUserDto.lastName,
        email: registerUserDto.email,
        password: hashedPassword,
      } as any);

      const obj = created.toObject ? created.toObject() : created;
      const { password: _pw, ...safe } = obj as any;
      return safe;
    } catch (err: any) {
      throw new BadRequestException(err.message || 'Failed to create user');
    }
  }


  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      return null;
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    const { password: _pw, ...safe } = user.toObject();
    return safe;
  }

  async login(email: string, password: string) {
    const validated = await this.validateUser(email, password);
    if (!validated) {
      throw new BadRequestException('Invalid credentials');
    }
    return validated;
  }

  async changePassword(email: string, oldPassword: string, newPassword: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const isPasswordValid = bcrypt.compareSync(oldPassword, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Old password is incorrect');
    }

    const saltRounds = 10;
    const newHashed = bcrypt.hashSync(newPassword, saltRounds);
    const updated = await this.userService.updatePassword(email, newHashed);
    if (!updated) {
      throw new BadRequestException('Failed to update password');
    }
    const obj = (updated as any).toObject ? (updated as any).toObject() : (updated as any);
    const { password: _pw, ...safe } = obj as any;
    return safe;
  }

  async logout() {
    // stateless placeholder: if you later use JWT or sessions, invalidate token/session here
    return { message: 'Logged out' };
  }
}
