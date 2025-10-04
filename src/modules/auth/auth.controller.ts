import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './service/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiOperation({ summary: 'Login auth user' })
  @ApiResponse({ status: 201, description: 'Success' })
  async login(@Body('idToken') idToken: string) {
    const user = await this.authService.login(idToken);
    return { user };
  }
}
