import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommentComponent } from './main/comment/comment.component';
import { CommentDetailResolverService } from './main/comment/resolvers/comment-detail-resolver.service';


const routes: Routes = [
  {path : '' , redirectTo : 'news', pathMatch : "full"},
  {path : 'news' , loadChildren : () => import('./main/news/news.module').then(m => m.NewsModule)},
  {path : 'news/:id/comments' , component: CommentComponent, resolve : { comments : CommentDetailResolverService}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
