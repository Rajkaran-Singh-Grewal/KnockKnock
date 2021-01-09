import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UsersService{
    constructor(@InjectModel('User') private userModel: Model<UserDocument>){}
    
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
   async findByEmailOrUsername(usernameOrEmail: string): Promise<User> {
       return this.userModel.findOne({
           $or: [
                {email: usernameOrEmail},
                {username: usernameOrEmail}
           ]
       }).exec();
   }
   async checkPassword(password, hashed_password, user: CreateUserDto): Promise<string>{
       let response = await bcrypt.compare(password, hashed_password);
       console.log(response);
       if(response){
        return {
                'user': user,
                'message':'User Logged in'
            }.toString();
        }else{
            return  'Passwords do not match';
        }
   }
}