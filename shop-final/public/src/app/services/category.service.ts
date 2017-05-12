import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class CategoryService {

  constructor(private _http: Http) { }

  /**
   * Get list of all categories
   * @return {Observable<any>}
   */
  categoriesList(): Observable<any>{
      return this._http.get('/api/categories')
                       .map((res: Response) => res.json())
                       .catch(err => Observable.throw(err.json().err || 'Server Error'));
  }

  getFlat(): Observable<any>{
    return this._http.get('/api/categories')
                     .map((res: Response) => {
                       let responseData = res.json(),
                           out = [];
                        for(let cat of responseData.data){
                          if(out.map(item => item.id).indexOf(cat.id) === -1)
                            out.push(cat);
                          for(let child of cat.children){
                            if(out.map(item => item.id).indexOf(child.id) === -1)
                              out.push(child);
                          }
                        }

                       return {success:  true, data: out};
                     })
                     .catch(err => Observable.throw(err.json().err || 'Server Error'));
  }

  /**
   * Get Category by ID
   * @param  {number} id Category ID
   * @return {Observable<any>}
   */
  getByID(id: number, page: number = 1, offset: number = 12, filters = [], sort = null): Observable<any>{
      var query =
      { filters: filters.map(filter => {
                               return {
                                   name: filter.name,
                                   value: filter.value
                               };
      }),
      sort: sort
    };
      console.log(query);
      return this._http.post(`/api/category/${id}/${page}/${offset}`, query)
                        .map((res: Response) => res.json())
                        .catch(err => {
                            return Observable.throw(err);
                        });
  }




}
