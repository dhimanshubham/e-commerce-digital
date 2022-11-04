import { Component, OnInit } from '@angular/core';
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
  constructor(private productservice :ProductService) { }

  ngOnInit(): void {
    this.getPopularProducts();
    this.getTrendyProduct();
  }


  getPopularProducts(){
    this.productservice.popularProjects().subscribe((res:any)=>{
      this.popularProducts = res;
      console.log(this.popularProducts);
    })
  }

  getTrendyProduct(){
    this.productservice.trendyProducts().subscribe((res:any)=>{
      console.log(res);
      this.trendyProducts = res;
    })
  }
}
