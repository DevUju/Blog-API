import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../entity/post';
import { CreatePostDto } from '../dto/create-post';
import { UpdatePostDto } from '../dto/update-post';
import { User } from '../../user/entity/user';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(dto: CreatePostDto, user: User) {
    const post = this.postRepository.create({
      ...dto,
      user,
    });
    return this.postRepository.save(post);
  }

  findAll() {
    return this.postRepository.find({
      relations: ['user', 'comments'],
    });
  }

  async findOne(id: number) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: ['user', 'comments'],
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.findOne(id);

    Object.assign(post, dto);

    return this.postRepository.save(post);
  }

  async remove(id: number) {
    const post = await this.findOne(id);
    return this.postRepository.remove(post);
  }
}
