import { Component, OnDestroy, OnInit } from '@angular/core';
import { IItemRepo } from 'src/app/core/repository/interfaces/IItemRepo';
import { forkJoin, Subscription } from 'rxjs';
import { Item } from 'src/app/models/schema/Item';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {
  items: Item[];
  subscriptions: Subscription[] = [];

  constructor(
    private itemRepo: IItemRepo<Item>,
  ) { }

  ngOnInit(): void {

    this.subscriptions.push(this.itemRepo.get5TopItems().subscribe(res => {
      this.getItemDetails(res.data)
    })
    )

  }

  getItemDetails(ids: string[]): void {

    let obsevableObjectForForkJoin = {};

    ids.forEach(id => {
      obsevableObjectForForkJoin[id] = this.itemRepo.get(id)
    });

    this.subscriptions.push(forkJoin(obsevableObjectForForkJoin).subscribe(val => {
        this.items = Object.values(val).map((x: any) => x.data);
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    })
  }


}
