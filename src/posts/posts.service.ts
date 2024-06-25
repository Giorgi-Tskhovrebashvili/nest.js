import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { newPostsType, postType } from 'src/types/common';

@Injectable()
export class PostsService {
  private readonly posts: newPostsType[] = [
    {
      id: 1,
      name: 'book',
      post: 'today will be the best day',
    },
  ];

  getPosts() {
    return this.posts;
  }

  findPostWithId(id: string) {
    const post = this.posts.find((u) => u.id === parseInt(id));
    if (!post) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    return post;
  }

  addPost(body: postType) {
    const { name, post } = body;
    const newPost = {
      id: this.posts.length + 1,
      name: name,
      post: post,
    };
    if (!name || !post) {
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    }
    this.posts.push(newPost);

    return this.posts;
  }

  changePost(id: string, changedPost: postType) {
    const postIndex = this.posts.findIndex((i) => i.id === Number(id));
    if (postIndex === -1) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    }
    this.posts[postIndex] = { id: parseInt(id), ...changedPost };
    return this.posts;
  }

  removePost(id: string) {
    const postIndex = this.posts.findIndex((i) => i.id === Number(id));
    if (postIndex === -1) {
      throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
    } else {
      this.posts.splice(postIndex, 1);
    }
    return this.posts;
  }
}
