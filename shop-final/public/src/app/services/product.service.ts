import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  getByID(id: number){
    return this._http.get(`/api/product/${id}`)
        .map((res: Response) => res.json())
        .catch(err => Observable.throw(err.json().err || 'Server Error'));
  }

  remove(id: number){
    return this._http.delete(`/api/product/${id}`)
              .map(res => res.json())
              .catch(err => Observable.throw(err.json().err || 'Server Error'));
  }

  update(id: number, query){
    let data = {
      data: query
    };
    return this._http.post(`/api/product/${id}`, data)
                      .map(res => res.json()).catch(err => Observable.throw(err.json().err || 'Server Error'))
  }


}
