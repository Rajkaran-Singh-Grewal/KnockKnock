import { Controller, Post, Req, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async signup(@Req() request: Request):string{
      const username: string = request.username;
      const email: string = request.email;
      let password: string = request.password;
      const confirmPassword: string = request.confirmPassword;
      if(password != confirmPassword){
          return 'Passwords do not match';
      }else{
        saltOrRounds = 10;
        password = await bcrypt.hash(password, saltOrRounds);
        let createUserDto: createUserDto = new CreateUserDto;        
        let sessionid: string = this.usersService.generateSessionId();
        createUserDto.setAll(id,username,email,password,sessionid);
        await this.usersService.create(createUserDto);
        return 'User Created';
      }
  }
  @Post()
  async login(@Req() request:Request):string{
      const usernameOrEmail: string = request.usernameOrEmail;
      const password: string = request.password;
      let createUserDto = await this.usersService.findByEmailOrUsername(usernameOrEmail);
      if(createUserDto == null || createUserDto == undefined){
          return "Username or Email is not available";
      }
      const isMatch = await bcrypt.compare(password,createUserDto.password);  
      if(isMatch){
          return "User Logged in";
      }else{
          return "Password is incorrect";
      }
  }
  @Post()
  forgotPassword(@Req() request:Request):string{
      const email: string = request.email;
  }
  @Post()
  changePassword(@Req() request:Request):string{
      const password: string = request.password;
      const id: string = request.id;
      const confirmPassword: string = request.confirmPassword;
      if(password != confirmPassword){
          return "Passwords do not match";
      }
  }
  @Post()
  updatePassword(@Req() request:Request):string{
      const id: string = request.id;
      const password: string = request.password;
      const confirmPassword: string = request.confirmPassword;
      if(password != confirmPassword){
          return "Passwords do not match";
      }
  }
}
