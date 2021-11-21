/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";

//логика обработки данных может быть использованна в разных контроллерах
@Injectable()
export class AppService {
  getUsers(): string {
    return 'GET ALL USERS';
  }
};
