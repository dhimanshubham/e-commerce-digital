import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../shared/product.service';
import { DomSanitizer } from '@angular/platform-browser';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
  thumbnail: any;

  constructor(private product: ProductService,private Sanitizer: DomSanitizer){ }

  productList: undefined | product[]

  ngOnInit(): void {
    this.getProduct();
  }


  getProduct(){
    this.product.getProductList().subscribe((res: any) => {
      this.productList=res;

      // let objectURL = "https://t4.ftcdn.net/jpg/02/16/28/19/360_F_216281970_6gotBzdxtFD6vjh7RGmcc4X2JpJz3pr0.jpg";

      // this.thumbnail = this.Sanitizer.bypassSecurityTrustUrl(objectURL);
    })
  }

  deleteProduct(id:number){
    this.product.deleteProductList(id).subscribe((res)=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Deleted Successfully',
        showConfirmButton: false,
        timer: 1200
      })
      this.getProduct();

    })
  }
  
 


}
