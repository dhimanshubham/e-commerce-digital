import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts : undefined | product[]
  trendyProducts : undefined | product[]
  searchResult : undefined | product[]
  constructor(private productservice :ProductService,private router: Router) { }

  ngOnInit(): void {
    this.getPopularProducts();
    this.getTrendyProduct();
  }


  getPopularProducts(){
    this.productservice.popularProjects().subscribe((res:any)=>{
      this.popularProducts = res;
    })
  }

  getTrendyProduct(){
    this.productservice.trendyProducts().subscribe((res:any)=>{
      this.trendyProducts = res;
    })
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      
      const element = query.target as HTMLInputElement;

      this.productservice.searchProduct(element.value).subscribe((res:any)=>{
        if(res.length>5){
          res.length = 5;
        }
        this.searchResult = res;

      })
    }
  }
  hideSearch(){
    this.searchResult = undefined
  }

  searchpage(value:string){
    this.router.navigate([`search/${value}`]);

  }
}
