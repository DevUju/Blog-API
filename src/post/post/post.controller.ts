import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';

import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post';
import { UpdatePostDto } from '../dto/update-post';
import { User } from 'src/user/entity/user';
import { CurrentUser } from 'src/auth/decorator/current-user';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // CREATE POST
  @Post()
  create(@Body() dto: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(dto, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto) {
    return this.postService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postService.remove(id);
  }
}
