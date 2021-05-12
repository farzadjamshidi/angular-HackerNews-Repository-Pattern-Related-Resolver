import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { NetworkWrapperHelper } from 'src/app/core/helpers/network-wrapper.helper';
import { HackerNewsFirebase_v0_Item_Repo } from 'src/app/core/repository/hackerNewsFirebase/v0/Item_repo.service';
import { IItemRepo } from 'src/app/core/repository/interfaces/IItemRepo';
import { BaseResponse } from 'src/app/models/baseResponse';
import { Item } from 'src/app/models/schema/Item';

const ITEMREPO_INJECTIONTOKEN = new InjectionToken<IItemRepo<Item>>(
  'Inject HackerNewsFirebase_v0_Item_Repo as IItemRepo<Item>',
  {
    factory: () => new HackerNewsFirebase_v0_Item_Repo(inject(NetworkWrapperHelper))
  }
);

@Injectable({
  providedIn: 'root'
})
export class CommentsIdResolverService implements Resolve<number[]>{

  constructor(
    @Inject(ITEMREPO_INJECTIONTOKEN) private itemRepo: IItemRepo<Item>,
    private router: Router,
  ) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<number[]>
  {

    const id = route.paramMap.get('id');

    const numberOfComments: number = 3;

    if (this.router.getCurrentNavigation()?.extras?.state?.kids)
      return of(this.router.getCurrentNavigation()?.extras?.state?.kids.slice(0, numberOfComments));

    return this.itemRepo.get(id).pipe(
      map((res: BaseResponse<Item>) =>
      {
        return res.data.kids.slice(0, numberOfComments);
      }),
      catchError(() =>
      {
        this.router.navigate(['/']);
        return EMPTY;
      })
    );
  }
}
