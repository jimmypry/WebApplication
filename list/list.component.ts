import { Component, OnInit } from '@angular/core';
import { Post, BlogService } from '../blog.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


	selectedPost: Post;
	posts: Post[];
  constructor(private blogService: BlogService, private router: Router) { }

  ngOnInit() {
  	this.getPosts();
  }

  getPosts():void{
  	this.posts = this.blogService.getPosts();
  }

  newpost(): void{
  	let newadded = this.blogService.newPost();
  	    console.log("added");

  	this.router.navigate(["/edit/" + newadded.postid]);
  }

}
