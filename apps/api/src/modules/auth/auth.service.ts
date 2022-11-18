import { comparePassword } from '@libs/helper';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain } from 'class-transformer';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validate(email: string, password: string) {
    const user = await this.usersService.findOne({ email });

    // is not found
    if (!user)
      throw new NotFoundException({ error: [`email '${email}' not found`] });

    // is password not correct
    if (!comparePassword(password, user.password))
      throw new BadRequestException({ error: ['password is not correct'] });

    return instanceToPlain(user);
  }

  signIn(data: User) {
    const payload = data;
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
