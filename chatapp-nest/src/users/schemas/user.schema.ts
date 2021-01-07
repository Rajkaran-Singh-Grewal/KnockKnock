import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop({required: true})
    id: number;
    @Prop()
    username: string;
    @Prop()
    email: string;
    @Prop()
    password: string;
    @Prop()
    sessionId: string;
    @Prop()
    created_at: string;
    @Prop()
    modified_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);