import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CommentsService } from './comment.service';
import { JwtAuthGuard } from '../../auth/guard/auth-guard';
import { CurrentUser } from '../../auth/decorator/current-user';
import { User } from '../../user/entity/user';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body('content') content: string,
    @Body('postId', ParseIntPipe) postId: number,
    @CurrentUser() user: User, // 👈 inject logged-in user
  ) {
    return this.commentsService.create(content, user, postId);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.commentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body('content') content: string,
    @CurrentUser() user: User, // 👈 enforce ownership
  ) {
    return this.commentsService.update(id, content, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: User) {
    return this.commentsService.remove(id, user);
  }
}
