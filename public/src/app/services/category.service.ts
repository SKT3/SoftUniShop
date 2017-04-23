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

  /**
   * Get Category by ID
   * @param  {number} id Category ID
   * @return {Observable<any>}
   */
  getByID(id: number): Observable<any>{
      return this._http.get(`/api/category/${id}`)
                        .map((res: Response) => res.json())
                        .catch(err => Observable.throw(err.json().err || 'Server Error'));
  }



}
