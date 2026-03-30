import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsService } from './comment.service';
import { CommentsController } from './comment.controller';

import { Comment } from '../entity/comment';
import { User } from '../../user/entity/user';
import { Post } from '../../post/entity/post';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, User, Post])],
  controllers: [CommentsController],
  providers: [CommentsService],
})
export class CommentModule {}
