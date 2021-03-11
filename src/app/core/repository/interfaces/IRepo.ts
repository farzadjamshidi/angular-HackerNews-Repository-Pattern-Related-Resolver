import { Observable } from 'rxjs';
import { BaseResponse } from './../../../models/baseResponse';

export abstract class IRepo<T> {

    get      : (id : string|number)               => Observable<BaseResponse<T>>;
    list     : (filters : any)                    => Observable<BaseResponse<T[]>>;
    insert   : (model: T)                         => Observable<BaseResponse<T | any>>;
    update   : (id : string|number, model: T)     => Observable<BaseResponse<T | any>>;
    delete   : (id : string|number)               => Observable<BaseResponse<T | any>>;

}