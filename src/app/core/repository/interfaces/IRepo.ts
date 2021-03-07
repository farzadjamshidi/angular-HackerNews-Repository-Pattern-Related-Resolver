import { Observable } from 'rxjs';
import { BaseResponse } from './../../../models/baseResponse';

export abstract class IRepo<T> {

    get      : (id : string|number)               => Observable<BaseResponse>;
    list     : (filters : any)                    => Observable<BaseResponse>;
    insert   : (model: T)                         => Observable<BaseResponse>;
    update   : (id : string|number, model: T)     => Observable<BaseResponse>;
    delete   : (id : string|number)               => Observable<BaseResponse>;

}