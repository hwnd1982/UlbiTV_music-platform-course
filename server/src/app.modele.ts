/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrackModule } from './track/track.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://hwnd1982:power@cluster0.tdga1.mongodb.net/musec-platform?retryWrites=true&w=majority'),
    TrackModule
  ]
})
export class AppModule { }
