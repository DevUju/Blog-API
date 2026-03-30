import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostService } from './post.service';
import { PostController } from './post.controller';

import { Post } from '../entity/post';
import { User } from 'src/user/entity/user';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  providers: [PostService],
  controllers: [PostController],
  exports: [PostService], // optional but useful if other modules need it
})
export class PostModule {}
