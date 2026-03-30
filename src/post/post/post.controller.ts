import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guard/auth-guard';

import { PostService } from './post.service';
import { CreatePostDto } from '../dto/create-post';
import { UpdatePostDto } from '../dto/update-post';
import { User } from 'src/user/entity/user';
import { CurrentUser } from 'src/auth/decorator/current-user';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreatePostDto, @CurrentUser() user: User) {
    return this.postService.create(dto, user);
  }

  // Public: anyone can view posts
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // Public: anyone can view a single post
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postService.findOne(id);
  }

  // Only authenticated users can update their own posts
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.update(id, dto, user); // 👈 pass user for ownership check
  }

  // Only authenticated users can delete their own posts
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.postService.remove(id, user); // 👈 pass user for ownership check
  }
}
