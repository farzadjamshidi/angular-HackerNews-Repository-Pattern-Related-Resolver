import { inject, Inject, Injectable, InjectionToken } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { NetworkWrapperHelper } from 'src/app/core/helpers/network-wrapper.helper';
import { HackerNewsFirebase_v0_Item_Repo } from 'src/app/core/repository/hackerNewsFirebase/v0/Item_repo.service';
import { IItemRepo } from 'src/app/core/repository/interfaces/IItemRepo';
import { Item } from 'src/app/models/schema/Item';
import { CommentsIdResolverService } from './comments-id-resolver.service';

const ITEMREPO_INJECTIONTOKEN = new InjectionToken<IItemRepo<Item>>(
  'Inject HackerNewsFirebase_v0_Item_Repo as IItemRepo<Item>',
  {
    factory: () => new HackerNewsFirebase_v0_Item_Repo(inject(NetworkWrapperHelper))
  }
);

@Injectable({
  providedIn: 'root',

})
export class CommentsDetailResolverService implements Resolve<Item[]> {

  constructor(
    @Inject(ITEMREPO_INJECTIONTOKEN) private itemRepo: IItemRepo<Item>,
    private router: Router,
    private commentsIdResolver : CommentsIdResolverService
  ) { }
  async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<Item[]> {

    const commentsIds = await this.commentsIdResolver.resolve(route, state).toPromise().then( (res : number[]) : number[] => {
      return res;
    });

    let obsevableObjectForForkJoin = {};

    commentsIds.forEach(id => {
      obsevableObjectForForkJoin[id] = this.itemRepo.get(id)
    });

    return await forkJoin(obsevableObjectForForkJoin).toPromise().then(val => {
      return Object.values(val).map((x: any) : Item => x.data);
    }, () => {
      this.router.navigate(['/']);
      return null
    })

  }

}
