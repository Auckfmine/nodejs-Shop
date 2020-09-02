# backend

Routes :

*/api/

  *signup/
  *signin/
  *signout/
  *user/
  
  
    *:userId (readUser // with get method)
    *:userId (updateProfule // with put method)
    
    
  *product/
  
  
    *:productId get a product based on its ID (Get request)
    *products/  //get all products (get request)
    *categories   // get all categories for a product (get request)
    *create/:userId  // create product (post request ) 
    *:productId/:userId // delete product based on your account status (DELETE request) (admin only can delete)
    *:productId/:userId // update product based on  your account status (PUT request) (admin only can update) 
    *photo/:productId // get the photo of a product seperately  (speed and optimization purposes )  ( get request )
    *related/:productId // get  related products by category ( products in the same category)  (get request)
    
  *category /// TO BE CONTINuED $$$  ya39oubi !!! 
  
  
