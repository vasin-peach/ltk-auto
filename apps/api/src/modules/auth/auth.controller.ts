import {
  Controller,
  Post,
  VERSION_NEUTRAL,
  UseGuards,
  Request,
  Body,
  Req,
  Get,
  Res,
} from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { UsersService } from '../users/users.service'
import { AuthService } from './auth.service'
import { SignInDto } from './dto/signIn.dto'
import { GoogleOAuthGuard } from './guards/google-auth.guard'
import { LocalAuthGuard } from './guards/local-auth.guard'

@ApiTags('auth')
@Controller({
  path: 'auth',
  version: VERSION_NEUTRAL,
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Get('access-token')
  @ApiOperation({ summary: 'Session' })
  async session(@Request() req) {
    if (req.session.accessToken) {
      return { data: { accessToken: req.session.accessToken } }
    }
    return
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({ summary: 'Sign In' })
  async signin(@Body() _: SignInDto, @Req() req) {
    const data = this.authService.signIn(req.user.data)
    return { data }
  }

  @Get('signin/google')
  @UseGuards(GoogleOAuthGuard)
  @ApiOperation({ summary: 'Sign In with google' })
  async signinWithGoogle(@Request() req) {
    return
  }

  @Get('signin/google/redirect')
  @UseGuards(GoogleOAuthGuard)
  async googleAuthRedirect(@Request() req, @Res() res) {
    // check is user exist
    const isEmailExist = await this.usersService.findOne({
      email: req.user.email,
    })
    if (!isEmailExist) {
      const { email, firstName, lastName } = req.user
      const payload = { email, name: `${firstName} ${lastName}` }
      await this.usersService.create(payload)
    }

    // find user agin
    const { id, email, name, role } = await this.usersService.findOne({
      email: req.user.email,
    })
    const payload = { id, email, name, role }
    const data = this.authService.signIn(payload)
    req.session.accessToken = data.accessToken

    return res.redirect(`${process.env.CLIENT_URL}/signin`)
  }
}
