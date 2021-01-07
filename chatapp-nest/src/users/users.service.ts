import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModule } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService{
    constructor(@InjectModule(User.name) private userModule: Module<UserDocument}){}
    
    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }
    
    async findall(): Promise<User[]>{
        return this.userModel.find().exec();
    }
    generateSessionId(): string{
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+={[}]|\:;<,>.?/~`';
        let str = '';
        for (let i = 0; i < 256; i++){
            str += chars.charAt(Math.floor(Math.random() * chars.length));
        }
       return str;
   }
   async findByEmailOrUsername(usernmaeOrEmail: string){
       return this.userModel.find({
           $or: [
                {email: usernameOrEmail},
                {username: usernameOrEmail}
           ]
       }).exec();
   }
}