import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: String ='default';
  sellerName! :string;

  searchResult : undefined | product[]

  constructor(private productservice :ProductService,private router: Router) { }

  ngOnInit(): void {
    this.check();
  }

  check(){
    this.router.events.subscribe((Val:any) =>{
      if(Val.url){
        if(localStorage.getItem('seller') && Val.url.includes('seller')){
          this.menuType = "seller";
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('loggedUser');
            let sellerData = sellerStore && JSON.parse(sellerStore);
            this.sellerName = sellerData.name;
          }
        }
        else{
          this.menuType ="default";
        }
      }
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

  logout(){
    localStorage.removeItem("seller");
    this.router.navigate(["signin"])
  }
}
