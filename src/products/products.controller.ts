import { ProductsService } from './products.service';
import { Controller, Post, Body,Get, Param, Patch, Delete } from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService){}
  // -add-products-controller
  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const generateId = this.productsService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return generateId;
  }

  @Get()
  getAllProducts(){
    return {products: this.productsService.getProducts()};
  }

  @Get(':id')
  getProduct(@Param('id') prodId:string){
    return this.productsService.getSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId:string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
    ) {
      this.productsService.updateProduct(prodId, prodTitle, prodDescription, prodPrice);
      return null;
  }

  @Delete(':id')
  removeProduct(@Param('id') prodId:string){
    this.productsService.deleteProduct(prodId);
    return null;
  }
}