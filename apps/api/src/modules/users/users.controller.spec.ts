import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { permissionEnum } from '../../common/constants/enum';
import { DatabaseMockModule } from '../../database/database-mock.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Repository } from 'typeorm';

const user = {
  email: 'mock01',
  password: 'password01',
  permission: permissionEnum.MEMBER,
  name: 'mock01',
  updatedAt: '2022-11-10T07:36:57.000Z',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  const inital = () => {
    beforeAll(async () => {
      const moduleRef = await Test.createTestingModule({
        imports: [DatabaseMockModule, TypeOrmModule.forFeature([User])],
        controllers: [UsersController],
        providers: [UsersService],
      }).compile();

      usersService = moduleRef.get<UsersService>(UsersService);
      usersController = moduleRef.get<UsersController>(UsersController);
    });
  };

  describe('createUser', () => {
    inital();

    it('should return `ApiResponseOne` of user', async () => {
      const result = {
        statusCode: 201,
        message: ['CREATE_USER_SUCCESS'],
        data: user,
      };

      expect(await usersController.create(user)).toStrictEqual(result);
    });

    it('should return users with length 1', async () => {
      expect((await usersController.findAll()).data).toHaveLength(1);
    });
  });

  describe('findAll', () => {
    inital();

    it('should return `ApiResponseMany` of users', async () => {
      const result = {
        statusCode: 200,
        message: ['GET_USERS_SUCCESS'],
        data: [],
      };

      expect(await usersController.findAll()).toStrictEqual(result);
    });
  });
});
