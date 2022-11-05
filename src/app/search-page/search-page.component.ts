import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { product } from '../data-type';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {

  searchItem : undefined | product[]

  constructor(private activeRoute:ActivatedRoute , private product:ProductService) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query');
    query && this.product.searchProduct(query).subscribe((res:any)=>{
      this.searchItem =res; 
    })
  }

}
