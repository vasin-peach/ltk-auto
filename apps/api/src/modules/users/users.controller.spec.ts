import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { permissionEnum } from '../../common/constants/enum';
import { DatabaseMockModule } from '../../config/database/memory/provider.module';
import { User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  let user: User;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [DatabaseMockModule, TypeOrmModule.forFeature([User])],
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    usersController = moduleRef.get<UsersController>(UsersController);
    user = {
      id: '01faa5bf-4f07-4493-8969-fca0f5029656',
      username: 'mock01',
      email: 'mock01@email.com',
      password: 'password01',
      permission: permissionEnum.MEMBER,
      name: 'mock01',
    };
  });

  describe('Create user', () => {
    it('should return array of users with 1 length', async () => {
      await usersController.create(user);
      expect((await usersController.findAll()).data).toHaveLength(1);
    });
  });

  describe('Get users', () => {
    it('should return array of empty users', async () => {
      const result = {
        statusCode: 200,
        message: ['GET_USERS_SUCCESS'],
        data: [],
      };

      expect(await usersController.findAll()).toStrictEqual(result);
    });
  });

  describe('Get user by {:id}', () => {
    it('should return user from specific id', async () => {
      // create user
      const [, create] = await usersService.create(user);

      // query user by id
      const resp = instanceToPlain(await usersController.findById(create.id));

      // create expect result
      const result = {
        statusCode: 200,
        message: ['GET_USER_BY_ID_SUCCESS'],
        data: user,
      };

      // exclude password
      delete result.data.password;

      expect(resp).toStrictEqual(result);
    });
  });

  describe('Get user by {:username}', () => {
    it('should return user from specific username', async () => {
      await usersController.create(user);

      // query user by id
      const resp = instanceToPlain(
        await usersController.findByUsername(user.username),
      );

      // create expect result
      const result = {
        statusCode: 200,
        message: ['GET_USER_BY_USERNAME_SUCCESS'],
        data: user,
      };

      // exclude password
      delete result.data.password;

      expect(resp).toStrictEqual(result);
    });
  });

  describe('Update user by {:id}', () => {
    it('should return update user', async () => {
      // create user
      const create = await usersController.create(user);

      // update user payload
      user = { ...user, email: 'mock02@email.com' };

      const result = {
        statusCode: 200,
        message: ['UPDATE_USER_BY_ID_SUCCESS'],
        data: user,
      };

      // query user by id
      const resp = instanceToPlain(
        await usersController.patch(create.data.id, user),
      );

      // create expect result

      expect(resp).toStrictEqual(result);
    });
  });

  describe('Delete user by {:id}', () => {
    it('should return null with success status if {:id} is exist', async () => {
      // create user
      const create = await usersController.create(user);
      const result = {
        statusCode: HttpStatus.OK,
        message: ['DELETE_USER_BY_ID_SUCCESS'],
        data: null,
      };

      // remove
      const resp = await usersController.remove(create.data.id);

      expect(resp).toStrictEqual(result);
    });

    it('should return null with notfound status  if {:id} is not exist', async () => {
      // create user
      await usersController.create(user);
      const result = {
        statusCode: HttpStatus.OK,
        message: ['DELETE_USER_BY_ID_NOTFOUND'],
        data: null,
      };

      // remove
      const resp = await usersController.remove('mockup-id');

      expect(resp).toStrictEqual(result);
    });
  });
});
