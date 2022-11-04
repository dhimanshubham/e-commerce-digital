import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient,private router :Router)  { }

  productList(data :any){
    return this.http.post('http://localhost:3000/products',data)
    // {observe : 'response'}).subscribe((res:any)=>{
    //   this.isSellerLoggedIn.next(true);
    //   this.router.navigate(['seller-home']);
    // });
  }

  getProductList(){
    return this.http.get<any>('http://localhost:3000/products');
  }

  deleteProductList(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }

  getProduct(id:string){
    return this.http.get(`http://localhost:3000/products/${id}`);
  }

  updateProduct(data:product){
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`,data);
  }

  popularProjects(){
    return this.http.get<any>('http://localhost:3000/products?_limit=3');
  }

  trendyProducts(){
    return this.http.get<any>('http://localhost:3000/products?_limit=8');
  }
}
