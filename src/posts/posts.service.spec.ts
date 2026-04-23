import { Test, TestingModule } from "@nestjs/testing";
import { PostsService } from "./posts.service";
import { PrismaService } from "../prisma/prisma.service";
describe('PostsService', () => {
  let service: PostsService;
  let prisma: any;

  beforeEach(async () => {
    prisma = {
      post: {
        create: jest.fn(),
        findMany: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PrismaService, useValue: prisma },
      ],
    }).compile();

    service = module.get(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  //  // 🟢 CREATE TEST
  // it('should create a post', async () => {
  //   const dto = { title: 'Test Post', content: 'Hello' };

  //   const expectedResult = {
  //     id: 1,
  //     ...dto,
  //   };

  //   prisma.post.create.mockResolvedValue(expectedResult);

  //   const result = await service.create(dto);

  //   expect(prisma.post.create).toHaveBeenCalledWith({
  //     data: dto,
  //   });

  //   expect(result).toEqual(expectedResult);
  // });

  // 🟢 FIND ALL TEST
  it('should return all posts', async () => {
    const expectedPosts = [
      { id: 1, title: 'Post 1' },
      { id: 2, title: 'Post 2' },
    ];

    prisma.post.findMany.mockResolvedValue(expectedPosts);

    const result = await service.findAll();

    expect(prisma.post.findMany).toHaveBeenCalled();
    expect(result).toEqual(expectedPosts);
  });
});