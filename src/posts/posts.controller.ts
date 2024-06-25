import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { newPostsType, postType } from 'src/types/common';

@Controller('/api')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('/posts')
  getPosts(): newPostsType[] {
    return this.postsService.getPosts();
  }

  @Get('/posts/:id')
  findPostWithId(@Param('id') id: string): newPostsType {
    return this.postsService.findPostWithId(id);
  }
    
    @Post('/addPost')
    addPost(@Body() body: postType) { 
        return this.postsService.addPost(body);
    }

    @Put('/posts/:id')
    change(@Param('id') id: string, @Body() body: postType) {
        return this.postsService.changePost(id, body);
    }

    @Delete('/posts/:id')
    remove(@Param('id') id: string) {
        return this.postsService.removePost(id);
    }
}
