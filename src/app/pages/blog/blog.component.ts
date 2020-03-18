import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { blog } from 'src/app/models/blog/blog.model';
import marked from 'marked';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.sass']
})
export class BlogComponent implements OnInit {


  worker: number = 1583758268;
  blogItem: blog;

  constructor(private blogService: BlogService) { }

  ngOnInit(): void {

  	this.blogService.getBlog(this.worker).subscribe(i=>this.blogItem = i);
  	
  }

  getMarkDown(){
  	return marked(this.blogItem.content);
  }
}
