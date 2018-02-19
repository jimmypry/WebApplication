import { Component, OnInit } from '@angular/core';
import { Parser, HtmlRenderer } from 'commonmark';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Post, BlogService } from '../blog.service';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.css']
})
export class PreviewComponent implements OnInit {

  post: Post;
  result: string[];
  constructor(private blogService: BlogService, private route: ActivatedRoute, private router: Router) { 
    
  }

  ngOnInit() {
  	this.route.paramMap.subscribe(() => {this.post = this.getPost(); this.result = this.getResult()});
  }

  getPost(): Post {
  	const id = +this.route.snapshot.paramMap.get('id');
  	return this.blogService.getPost(id);
  }

  getResult(): string[] { 
  	if (!this.post) {
  		return null;
  	}
  	let reader = new Parser();
    let writer = new HtmlRenderer();
    let titleParsed = reader.parse("*" + this.post.title + "*");
    let bodyParsed = reader.parse("*" + this.post.body + "*"); // parsed is a 'Node' tree 
    // transform parsed if you like... 
    let title = writer.render(titleParsed); // result is a String 
    let body = writer.render(bodyParsed); 
    let result = [title, body];
    return result;
  }

}
