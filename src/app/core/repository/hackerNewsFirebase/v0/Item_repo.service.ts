import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/baseResponse';
import { NetworkWrapperHelper } from '../../../helpers/network-wrapper.helper';
import { IItemRepo } from '../../interfaces/IItemRepo';
import { map } from 'rxjs/operators';
import { repositoriesInfo } from '../../repositoriesInfo';
import { Item } from 'src/app/models/schema/Item';


@Injectable({
  providedIn: 'root'
})
export class HackerNewsFirebase_v0_Item_Repo implements IItemRepo<Item> {

  baseURL : String = repositoriesInfo.hackerNewsFirebase.v0.baseURL;

  constructor(
    private networkWrapper: NetworkWrapperHelper
  ) {
  }

  public get5TopItems () : Observable<BaseResponse> {

    return this.networkWrapper.get({
      url: this.baseURL + "topstories.json"
    }).pipe(
      map((n : number[]) => {
        return { data : n.slice(0,5)}
      })
    );
  }

  public get(id : string) : Observable<BaseResponse> {
    return this.networkWrapper.get({
      url: this.baseURL + "item/" + id + ".json"
    }).pipe(
      map((n : Item) => {
        return { data : n}
      })
    );

  }
  public list() : Observable<BaseResponse> {
    return this.networkWrapper.get({
      url: this.baseURL + "items"
    }).pipe(
      map((n : Item[]) => {
        return { data : n}
      })
    );
  }
  public insert(model : Item) : Observable<BaseResponse> {
    return this.networkWrapper.post({
      url: this.baseURL + "item",
      data : model
    }).pipe(
      map((n : any) => {
        return { data : n}
      })
    );
  }
  public update(id : string, model : Item) : Observable<BaseResponse> {
    return this.networkWrapper.put({
      url: this.baseURL + "item/" + id,
      data : model
    }).pipe(
      map((n : any) => {
        return { data : n}
      })
    );
  }

  public delete(id : string) : Observable<BaseResponse> {
    return this.networkWrapper.delete({
      url: this.baseURL + "item/" + id
    }).pipe(
      map((n : any) => {
        return { data : n}
      })
    );
  }


}