import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewsComponent } from './news.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IItemRepo } from 'src/app/core/repository/interfaces/IItemRepo';
import { HackerNewsFirebase_v0_Item_Repo } from 'src/app/core/repository/hackerNewsFirebase/v0/Item_repo.service';

const routes: Routes = [
  {path : '' , component : NewsComponent}
];

@NgModule({
  declarations: [ 
    NewsComponent
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers : [{ provide: IItemRepo, useClass: HackerNewsFirebase_v0_Item_Repo }],
  exports: [RouterModule],
  entryComponents : [NewsComponent]
})
export class NewsModule { }
