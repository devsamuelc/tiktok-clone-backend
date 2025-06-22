/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

let service: AuthService;
let usersService: UsersService;

describe('AuthService', () => {
  const mockUsersService = {
    findByEmail: jest.fn(),
    updateUser: jest.fn(),
    findById: jest.fn(),
  };

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('fake-jwt'),
  };

  jest.mock('bcrypt', () => ({
    compare: jest.fn(),
    hash: jest.fn(),
  }));

  afterEach(() => {
    jest.restoreAllMocks();
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should login a user with correct credentials', async () => {
    const user = {
      id: '1',
      email: 'test@test.com',
      password: await bcrypt.hash('123456', 10),
    };

    mockUsersService.findByEmail.mockResolvedValue(user);

    const result = await service.login({
      email: 'test@test.com',
      password: '123456',
    });

    expect(result.access_token).toBe('fake-jwt');
    expect(result.refresh_token).toBeDefined();
  });

  it('should throw if bcrypt.hash fails during login', async () => {
    const user = {
      id: '1',
      email: 'test@test.com',
      password: await bcrypt.hash('123456', 10),
    };

    mockUsersService.findByEmail.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(true);
    (bcrypt.hash as jest.Mock).mockRejectedValue(new Error('Hash failed'));

    await expect(
      service.login({ email: 'test@test.com', password: '123456' }),
    ).rejects.toThrow('Hash failed');
  });

  it('should throw if user has no refreshToken', async () => {
    mockUsersService.findById.mockResolvedValue({
      id: '1',
      refreshToken: null,
    });

    await expect(service.refreshToken('1', 'token')).rejects.toThrow(
      'Refresh token inválido',
    );
  });

  it('should throw if refreshToken does not match', async () => {
    const user = {
      id: '1',
      refreshToken: await bcrypt.hash('valid-token', 10),
    };

    mockUsersService.findById.mockResolvedValue(user);
    (bcrypt.compare as jest.Mock).mockResolvedValue(false);

    await expect(service.refreshToken('1', 'invalid-token')).rejects.toThrow(
      'Refresh token inválido',
    );
  });

  it('should throw if password is wrong', async () => {
    const user = {
      id: '1',
      email: 'test@test.com',
      password: await bcrypt.hash('123456', 10),
    };

    mockUsersService.findByEmail.mockResolvedValue(user);

    await expect(
      service.login({ email: 'test@test.com', password: 'wrongpass' }),
    ).rejects.toThrow('Email ou senha inválidos');
  });
});
