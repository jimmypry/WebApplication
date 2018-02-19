import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { HostListener } from '@angular/core';

import { Post, BlogService } from '../blog.service';



@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})




export class EditComponent implements OnInit {

  	post: Post;


  	constructor(private blogService: BlogService, 
  				private router: Router, 
  				private route: ActivatedRoute
  				) {}

  	ngOnInit():void {
  		this.route.paramMap.subscribe(() => this.post = this.getPost());
  	}

  	@HostListener('window:beforeunload', ['$event'])
		beforeunloadHandler(event) {
    		this.autosave();
		}

   	autosave():void{
  		this.blogService.updatePost(this.post);
  	}


  	getPost():Post{
  		const id = +this.route.snapshot.paramMap.get('id');
  		return this.blogService.getPost(id);
  	}

  	save():void{
  		this.blogService.updatePost(this.post);
  	}

   	dele():void{
  		this.blogService.deletePost(this.post.postid);
  		console.log('call delete!');    
  		this.router.navigate(['/']);

  	}
  	preview(): void {
    this.blogService.updatePost(this.post);
    this.router.navigate(["/preview/" + this.post.postid]);
  }

}



