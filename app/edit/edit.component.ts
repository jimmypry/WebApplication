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


    @HostListener('window:beforeunload', ['$event'])
    beforeunloadHandler(event) {
        this.autosave();
    }


  	post: Post;
    postGroup = new FormGroup({
      title : new FormControl,
      body : new FormControl 
    });


  	constructor(private blogService: BlogService, 
  				private router: Router, 
  				private route: ActivatedRoute
  				) {
    }


    ngOnInit():void {
      this.route.paramMap.subscribe(() => this.post = this.getPost());


      console.log('refresh!');

    }

   	autosave():void{
  		this.blogService.updatePost(this.post);
      this.postGroup.markAsPristine();

  	}



  	getPost():Post{
  		const id = +this.route.snapshot.paramMap.get('id');
      this.postGroup.markAsPristine();
  		return this.blogService.getPost(id);

  	}

  	save():void{
  		this.blogService.updatePost(this.post);
      this.postGroup.markAsPristine();
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



