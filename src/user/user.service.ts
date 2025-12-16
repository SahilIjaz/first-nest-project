import { Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createUser(registerUserDto: RegisterUserDto) {
        const created = new this.userModel(registerUserDto as any);
        return created.save();
    }

    async findByEmail(email: string) {
        return this.userModel.findOne({ email }).select('+password').exec();
    }
    
    async updatePassword(email: string, newHashedPassword: string) {
        return this.userModel
          .findOneAndUpdate({ email }, { password: newHashedPassword }, { new: true })
          .exec();
    }
}
