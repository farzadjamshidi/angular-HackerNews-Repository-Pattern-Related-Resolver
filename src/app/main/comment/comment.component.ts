import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/schema/Item';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  items : Item[] = [];
  
  constructor(
    private route : ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe( (data : {comments : Item[]}) : void => {
      
      this.items = data.comments;
    })
  }

}
