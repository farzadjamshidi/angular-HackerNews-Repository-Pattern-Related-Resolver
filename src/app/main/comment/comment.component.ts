import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { forkJoin } from 'rxjs';
import { HackerNewsFirebase_v0_Item_Repo } from 'src/app/core/repository/hackerNewsFirebase/v0/Item_repo.service';
import { IItemRepo } from 'src/app/core/repository/interfaces/IItemRepo';
import { Item } from 'src/app/models/schema/Item';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  providers : [{ provide: IItemRepo, useClass: HackerNewsFirebase_v0_Item_Repo }]
})
export class CommentComponent implements OnInit {

  items : Item[] = [];
  
  constructor(
    private route : ActivatedRoute,
    private itemRepo: IItemRepo<Item>
  ) { }

  ngOnInit(): void {

    this.route.data.subscribe( (data : Data) => {
      
      this.getItemDetails(data.comments)

    })
  }

  getItemDetails(ids: number[]): void {

    let obsevableObjectForForkJoin = {};

    ids.forEach(id => {
      obsevableObjectForForkJoin[id] = this.itemRepo.get(id)
    });

    forkJoin(obsevableObjectForForkJoin).subscribe(val => {
        this.items = Object.values(val).map((x: any) : Item => x.data);
      })

  }

}
