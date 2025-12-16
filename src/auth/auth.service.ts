import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    
  registerUser() {
   
  }

  getUser(){
    return {name:'John Doe', age:30};
  }
}
