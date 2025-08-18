import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './service/user.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiResponse({ status: 201, description: 'Succes' })
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }
}
