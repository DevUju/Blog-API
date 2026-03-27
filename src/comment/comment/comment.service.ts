import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { User } from '../../user/entity/user';
import { Post } from '../../post/entity/post';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(content: string, userId: number, postId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const post = await this.postRepository.findOne({ where: { id: postId } });

    if (!user || !post) {
      throw new Error('User or Post not found');
    }

    const comment = this.commentRepository.create({ content, user, post });
    return this.commentRepository.save(comment);
  }

  async findAll() {
    return this.commentRepository.find({ relations: ['user', 'post'] });
  }

  async findOne(id: number) {
    return this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });
  }

  async update(id: number, content: string) {
    await this.commentRepository.update(id, { content });
    return this.findOne(id);
  }

  async remove(id: number) {
    await this.commentRepository.delete(id);
    return { deleted: true };
  }
}
