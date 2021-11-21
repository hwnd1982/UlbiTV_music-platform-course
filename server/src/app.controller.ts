/* eslint-disable prettier/prettier */
import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

// вся логика взаимодействия с запросами, обработка запроса и возвращение результата на клиент
@Controller('/api')
export class AppController {
  constructor(private appService: AppService) { }
  @Get()
  getUsers() {
    return this.appService.getUsers();
  };
}
