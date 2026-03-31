import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from '../entity/comment';
import { User } from '../../user/entity/user';
import { Post } from '../../post/entity/post';

import { CreateCommentDto } from '../dto/create-comment';
import { UpdateCommentDto } from '../dto/update-comment';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,

    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createCommentDto: CreateCommentDto, user: User) {
    const { content, postId } = createCommentDto;

    const post = await this.postRepository.findOne({
      where: { id: postId },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const comment = this.commentRepository.create({
      content,
      user,
      post,
    });

    return this.commentRepository.save(comment);
  }

  async findAll() {
    return this.commentRepository.find({
      relations: ['user', 'post'],
    });
  }

  async findOne(id: number) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user', 'post'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    return comment;
  }

  async update(id: number, updateDto: UpdateCommentDto, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('You cannot update this comment');
    }

    Object.assign(comment, updateDto);

    return this.commentRepository.save(comment);
  }

  async remove(id: number, user: User) {
    const comment = await this.commentRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!comment) {
      throw new NotFoundException('Comment not found');
    }

    if (comment.user.id !== user.id) {
      throw new UnauthorizedException('You cannot delete this comment');
    }

    await this.commentRepository.remove(comment);

    return {
      message: 'Comment deleted successfully',
    };
  }
}
