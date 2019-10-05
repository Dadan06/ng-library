import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductListRootComponent } from './containers/product-list-root/product-list-root.component';
import { ProductFormRootComponent } from './containers/product-form-root/product-form-root.component';

@NgModule({
  declarations: [ProductListComponent, ProductFormComponent, ProductListRootComponent, ProductFormRootComponent],
  imports: [
    CommonModule
  ]
})
export class ProductModule { }
