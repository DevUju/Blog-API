import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { CommentsService } from './comment.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Body('content') content: string,
    @Body('userId') userId: number,
    @Body('postId') postId: number,
  ) {
    return this.commentsService.create(content, userId, postId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body('content') content: string) {
    return this.commentsService.update(id, content);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commentsService.remove(id);
  }
}
