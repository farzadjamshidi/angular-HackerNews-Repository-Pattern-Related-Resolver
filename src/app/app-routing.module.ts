import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {path : '' , redirectTo : 'news', pathMatch : "full"},
  {path : 'news' , loadChildren : () => import('./main/news/news.module').then(m => m.NewsModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
