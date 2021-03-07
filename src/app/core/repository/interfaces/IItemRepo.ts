import { Observable } from 'rxjs';
import { BaseResponse } from 'src/app/models/baseResponse';
import { IRepo } from './IRepo';

export abstract class IItemRepo<T> extends IRepo<T> {

    get5TopItems : ()  => Observable<BaseResponse>;

}