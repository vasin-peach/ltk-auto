import { comparePassword } from '@libs/helper';
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
  let user;

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
      email: 'mock01@email.com',
      password: 'password01',
      permission: permissionEnum.GUEST,
      name: 'mock01',
    };
  });

  describe('Create user', () => {
    it('should return array of users with 1 length', async () => {
      await usersController.create(user);
      expect((await usersController.findAll()).data).toHaveLength(1);
    });

    it('hash password should return true when compare with plain password', async () => {
      const create = await usersController.create(user);

      const plainPassword = user.password;
      const hashPassword = create.data.password;
      const compare = await comparePassword(plainPassword, hashPassword);

      expect(compare).toBe(true);
    });
  });

  describe('Get users', () => {
    it('should return array of empty users', async () => {
      const { data, meta } = await usersController.findAll();

      const result = {
        data: [],
        meta: {
          total: 0,
        },
      };

      expect({ data, meta }).toStrictEqual(result);
    });
  });

  describe('Get user by {:id}', () => {
    it('should return user from specific id', async () => {
      // create user
      const create = await usersService.create(user);

      // query user by id
      const resp = instanceToPlain(await usersController.findById(create.id));
      const result = { data: user };

      // exclude
      delete result.data.password;
      delete resp.data.updatedAt;
      delete resp.data.createdAt;

      expect(resp).toStrictEqual(result);
    });
  });

  describe('Get user by {:email}', () => {
    it('should return user from specific email', async () => {
      await usersController.create(user);

      // query user by id
      const resp = instanceToPlain(
        await usersController.findByEmail(user.email),
      );

      // create expect result
      const result = { data: user };

      // exclude
      delete result.data.password;
      delete resp.data.updatedAt;
      delete resp.data.createdAt;

      expect(resp).toStrictEqual(result);
    });
  });

  describe('Update user by {:id}', () => {
    it('should return update user', async () => {
      // create user
      const create = await usersController.create(user);

      // update user payload
      user = { ...user, email: 'mock02@email.com' };

      // query user by id
      const resp = instanceToPlain(
        await usersController.patch(create.data.id, user),
      );

      const result = {
        data: user,
      };

      // exclude
      delete resp.data.updatedAt;
      delete resp.data.createdAt;

      expect(resp).toStrictEqual(result);
    });
  });

  describe('Delete user by {:id}', () => {
    it('should return null with success status if {:id} is exist', async () => {
      // create user
      const create = await usersController.create(user);
      const result = { data: user };

      // remove
      const resp = instanceToPlain(
        await usersController.remove(create.data.id),
      );

      delete result.data.id;
      delete result.data.password;
      delete resp.data.id;
      delete resp.data.createdAt;
      delete resp.data.updatedAt;

      expect(resp).toStrictEqual(result);
    });

    it('should return null with notfound status  if {:id} is not exist', async () => {
      // create user
      await usersController.create(user);
      const result = { data: null };

      // remove
      const resp = await usersController.remove('mockup-id');

      expect(resp).toStrictEqual(result);
    });
  });
});
