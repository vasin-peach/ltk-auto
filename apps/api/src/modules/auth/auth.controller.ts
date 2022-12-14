import {
  Controller,
  Post,
  VERSION_NEUTRAL,
  UseGuards,
  Body,
  Req,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign In' })
  async login(@Body() _: SignInDto, @Req() req) {
    const data = this.authService.signIn(req.user.data)
    return { data }
  }
}
