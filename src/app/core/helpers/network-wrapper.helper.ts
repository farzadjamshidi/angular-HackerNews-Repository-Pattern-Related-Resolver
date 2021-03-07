import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NetworkWrapperHelper {

  constructor(
    private _httpClient: HttpClient
  ) {
  }

  headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*');

  post(data : postMethod){

    return this._httpClient.post(
      data.url,
      data.data,
      { headers: this.headers }
      );
  }
  
  get(data : getMethod){

    return this._httpClient.get(
      this.makeCompleteUrl(data),
      { headers: this.headers }
    )
    
  }

  delete(data : getMethod){

    return this._httpClient.delete(
      this.makeCompleteUrl(data),
      { headers: this.headers }
    )
    
  }

  put(data : postMethod){

    return this._httpClient.put(
      data.url,
      data.data,
      { headers: this.headers }
      );
  }

  makeCompleteUrl(data){

    let completeUrl = data.url;

    if(data.params){

      completeUrl = completeUrl + "?"

      Object.keys(data.params).forEach((key) => {
  
        completeUrl = completeUrl + key + "=" + data.params[key] + "&"
        
      })

      completeUrl = completeUrl.slice(0, -1);
    }
    
    return completeUrl;

  }
  
}

export interface postMethod {
  url: string,
  data: any
}

export interface getMethod {
  url: string,
  params?: any
}
