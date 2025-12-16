import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  registerUser() {
    return { message: 'User registered successfully' };
  }

  getUser(){
    return {name:'John Doe', age:30};
  }
}
