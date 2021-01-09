import { Controller, Get, Post, Req, Res} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { createRequire } from 'module';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async signup(@Req() request: Request):Promise<string>{
      const username: string = request.query.username.toString();
      const email: string = request.query.email.toString();
      let password: string = request.query.password.toString();
      const confirmPassword: string = request.query.confirmPassword.toString();
      if(password != confirmPassword){
          return 'Passwords do not match';
      }else{
        let saltOrRounds = 10;
        password = await bcrypt.hash(password, saltOrRounds, async (error, hashed_password) => {
            let createUserDto: CreateUserDto = new CreateUserDto;        
            let sessionid: string = this.usersService.generateSessionId();
            createUserDto.username = username;
            createUserDto.password = hashed_password;
            createUserDto.email = email;
            createUserDto.sessionid = sessionid;
            await this.usersService.create(createUserDto);
        });
        
        return 'User Created';
      }
  }
  @Post('login')
  async login(@Req() request:Request, @Res() res): Promise<string>{
      const usernameOrEmail: string = request.query.usernameOrEmail.toString();
      const password: string = request.query.password.toString();
      let createUserDto = await this.usersService.findByEmailOrUsername(usernameOrEmail);
      if(createUserDto == null || createUserDto == undefined){
          return "Username or Email is not available";
      }
      let hashed_password = createUserDto.password;
      return this.usersService.checkPassword(password,hashed_password, createUserDto);
        
  }
  @Post('forgotPassword')
  forgotPassword(@Req() request:Request):string{
      const email: string = request.params.email;
      return 'forgot password not implemented';
  }
  @Post('changePassword')
  changePassword(@Req() request:Request):string{
      const password: string = request.params.password;
      const sessionid: string = request.params.sessionid;
      const confirmPassword: string = request.params.confirmPassword;
      if(password != confirmPassword){
          return "Passwords do not match";
      }else{
          return "changePassword not implemented";
      }
  }
  @Post('updatePassword')
  updatePassword(@Req() request:Request):string{
      const id: string = request.params.id;
      const password: string = request.params.password;
      const confirmPassword: string = request.params.confirmPassword;
      if(password != confirmPassword){
          return "Passwords do not match";
      }else{
          return "update Password not implemented";
      }
  }
  @Get('findAll')
  async findAll(): Promise<string>{
      return await (await this.usersService.findall()).toString();
  }
}
