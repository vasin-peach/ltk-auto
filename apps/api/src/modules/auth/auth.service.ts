import { comparePassword } from '@libs/helper'
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { instanceToPlain } from 'class-transformer'
import { User } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.usersService.findOne({ email })

    // is not found
    if (!user)
      throw new NotFoundException({ error: [`ไม่พบอีเมลล์ '${email}' ในระบบ`] })

    if (!user.password)
      throw new BadRequestException({
        error: [`email ${email} is signup with google`],
      })

    // is password not correct
    if (!comparePassword(password, user.password))
      throw new BadRequestException({ error: ['รหัสผ่่านไม่ถูกต้อง'] })

    return instanceToPlain(user)
  }

  signIn(data: User) {
    const payload = data
    return {
      accessToken: this.jwtService.sign(payload),
    }
  }

  async signInGoogle(req: any) {
    // check is user exist
    const isEmailExist = await this.usersService.findOne({
      email: req.user.email,
    })

    // create account if not exist
    if (!isEmailExist) {
      const { email, firstName, lastName } = req.user
      const payload = { email, name: `${firstName} ${lastName}` }
      await this.usersService.create(payload)
    }

    // find user agin
    const { id, email, name, role } = await this.usersService.findOne({
      email: req.user.email,
    })

    // sign jwt
    const payload = { id, email, name, role }
    const data = this.signIn(payload)

    // save session
    req.session.accessToken = data.accessToken

    return data
  }
}
