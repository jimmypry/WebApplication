import { Injectable } from '@angular/core';



@Injectable()
export class BlogService {
	private posts:Post[];
	private maxPostId = 1;

	constructor() { 
		this.fetchPosts();
	}

 
	fetchPosts():void{
	   let stringRetrieved: string = localStorage.getItem("posts");
	   if (stringRetrieved) {
	    this.posts = JSON.parse(stringRetrieved);
	   } else {
	    this.posts = [];
   }

	}

	getPosts(): Post[] {
		return this.posts;
	}

	getPost(id: number): Post{
		return this.posts.find(post=>post.postid === id);
	}

	newPost(): Post{
		var myDate = new Date();
		myDate.toLocaleString();
		let newAddedPost: Post = {
		      postid: this.maxPostId,
		      created: myDate,
		      modified: myDate,
		      title: "",
		      body: ""
		   };
		   	this.posts.push(newAddedPost);
		   	console.log('cool!');
   			this.maxPostId++;
    		localStorage.setItem("posts", JSON.stringify(this.posts));
   			return newAddedPost;
	}

	updatePost(post: Post): void{
		let postFound:Post = this.posts.find(postinposts=>post.postid === postinposts.postid);
		var myDate = new Date();
		var test = new Date(Date.now());
		myDate.toLocaleString();
		if (postFound) {
      	console.log("title is" + post.title);
    	postFound.title = post.title;
    	postFound.body = post.body;
    	postFound.modified = myDate;
    	localStorage.setItem("posts", JSON.stringify(this.posts)); // is this the correct way?
       console.log(myDate);

    } else {
      console.log("not found");
    }
	}

	deletePost(id: number): void{
		let po: Post[] = this.posts;
		var i = 0;
		for (; i < po.length; i++){
			if (po[i].postid === id){
				po.splice(i,1);
			}
		}
		if(i!=po.length){
			localStorage.setItem("posts", JSON.stringify(this.posts));
		}
		else {
			console.log('cannot delete!');
		}

	}

}
export class Post {
  postid: number;
  created: Date;
  modified: Date;
  title: string;
  body: string;
}



