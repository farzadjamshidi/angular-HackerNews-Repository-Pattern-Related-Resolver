import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/baseResponse';
import { NetworkWrapperHelper } from '../../../helpers/network-wrapper.helper';
import { IItemRepo } from '../../interfaces/IItemRepo';
import { catchError, map } from 'rxjs/operators';
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

  public get5TopItems () : Observable<BaseResponse<number[]>> {

    return this.networkWrapper.get({
      url: this.baseURL + "topstories.json"
    }).pipe(
      map((n : number[]) : BaseResponse<number[]>  => {
        return { data : n.slice(0,5)}
      })
    );
  }

  public get(id : string) : Observable<BaseResponse<Item>> {
    return this.networkWrapper.get({
      url: this.baseURL + "item/" + id + ".json"
    }).pipe(
      map((n : Item) : BaseResponse<Item> => {

        if(n) return { data : n}

        throw new Error()        
      }),
      catchError(() => {throw new Error() })
    );

  }
  public list() : Observable<BaseResponse<Item[]>> {
    return this.networkWrapper.get({
      url: this.baseURL + "items"
    }).pipe(
      map((n : Item[]) : BaseResponse<Item[]> => {
        if(n) return { data : n}

        throw new Error()        
      }),
      catchError(() => {throw new Error() })
    );
  }
  public insert(model : Item) : Observable<BaseResponse<Item>> {
    return this.networkWrapper.post({
      url: this.baseURL + "item",
      data : model
    }).pipe(
      map((n : Item) : BaseResponse<Item> => {
        if(n) return { data : n}

        throw new Error()        
      }),
      catchError(() => {throw new Error() })
    );
  }
  public update(id : string, model : Item) : Observable<BaseResponse<Item>> {
    return this.networkWrapper.put({
      url: this.baseURL + "item/" + id,
      data : model
    }).pipe(
      map((n : Item) : BaseResponse<Item> => {
        if(n) return { data : n}

        throw new Error()        
      }),
      catchError(() => {throw new Error() })
    );
  }

  public delete(id : string) : Observable<BaseResponse<{}>> {
    return this.networkWrapper.delete({
      url: this.baseURL + "item/" + id
    }).pipe(
      map((n : any) : BaseResponse<{}> => {
        if(n) return { data : n}

        throw new Error()        
      }),
      catchError(() => {throw new Error() })
    );
  }


}