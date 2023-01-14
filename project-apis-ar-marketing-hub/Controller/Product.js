const { result } = require('@hapi/joi/lib/base');
const Product = require('../Models/product');
const PER_PAGE = 16;


exports.getProducts = async(req, res, next) => {
    var page = req.params.page || 1;
    const filter = req.params.filter;
    const value = req.params.value;
    let searchObj = {};
 
    // constructing search object
    if(filter != 'all' && value != 'all') {
       // fetch books by search value and filter
       searchObj[filter] = value;
    }

    try {
       // Fetch products from database
       const products = await Product
       .find(searchObj)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE);

       // Get the count of total available book of given filter
       const count = await Product.find(searchObj).countDocuments();
 
       res.json(//"products", 
       {
          products: products,
          current: page,
          pages: Math.ceil(count / PER_PAGE),
          filter: filter,
          value: value,
          user: req.user,
       })
    } catch(err) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    }
}

exports.findProducts = async(req, res, next) => {
   
   var page = req.params.page || 1;
   const filter = req.params.filter;
   const value = req.body;//req.body.searchName;
   //const prod_id = req.body;
   console.log(value);

   // show flash message if empty search field is sent to backend
   if(value=="") {
       req.flash("error", "Search field is empty. Please fill the search field in order to get a result");
       return res.redirect('back');
   }

   //const searchObj = {};
   //searchObj[filter] = value;
 
    try {
       // Fetch books from database
       const products = await Product
       .find(value)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE)
 
       // Get the count of total available book of given filter
       const count = await Product.find(value).countDocuments();
 
       res.json(//"products",
        {
          products: products,
          current: page,
          pages: Math.ceil(count / PER_PAGE),
          filter: filter,
          value: value,
          user: req.user,
       })
    } catch(err) {
       console.log(err)
    }
 }
 
 // find book details working procedure
 /*
    1. fetch book from db by id
    2. populate book with associated comments
    3. render user/bookDetails template and send the fetched book
 */
 
 exports.getProductDetails = async(req, res, next) => {
    try {
       const product_id = req.params.product_id;
       const value = ({"Product_ID": product_id})
       console.log(product_id);
       const product = await Product.find(value).populate("prodComment");
       res.json(//"user/productDetails", 
       {product:product});
    } catch (err) {
       console.log(err);
       return res.redirect("back");
    }
 }
 

 exports.postAddNewProduct = async(req, res, next) => {
   try {
       const prod_info = req.body;
       console.log(prod_info);
       //prod_info.description = req.sanitize(prod_info.description);
       
       const isDuplicate = await Product.find(prod_info);
       console.log("isDuplicate: "+isDuplicate);

       if(isDuplicate.length > 0) {
           return res.json("This product is already registered in collection");
           //return res.redirect('back');
       } 

       const new_product = new Product(prod_info);
       await new_product.save();
       res.json(`A new product named ${new_product.Product_Name} is added to the collection`);
       //res.redirect("/auth/products");
   } catch(err) {
       console.log(err);
       res.redirect('back');
   }
};

exports.getDeleteProduct = async (req, res, next) => {
   try {
       const product_id = req.params.product_id;
      //  const product = await Product.find({"Product_ID": product_id});
       const value = ({"Product_ID": product_id})
       console.log(product_id);
       const product = await Product.find(value);

       try {
         await Product.deleteOne(value);
         res.json(`Product with Product ID ${product_id} has been deleted`)
       } catch (error) {
         console.log('Error:', error.message)
       }
       

       //await Comment.deleteMany({"author.id": user_id});

       

       //res.redirect("/admin/users/1");
   } catch(err) {
       console.log(err);
       res.redirect('back');
   }
}


exports.postUpdateProduct = async (req, res, next) => {
   try {
       const product_id = req.params.product_id;
       const result = req.body;
      //  const product = await Product.find({"Product_ID": product_id});
       const value = ({"Product_ID": product_id})
       
       //console.log(product)
      //  console.log(product_id);
      //  const product = await Product.find(value);
      
    
       try {
         await Product.findOneAndUpdate( value , {
            $set: {
                Product_Name: result.name,
                Description: result.desc,
                Link: result.link,  
                Image: result.image,
               //  categoryID: result.categoryID,
               //  description: result.description,
            }
        });
        res.json(`Product with Product ID ${product_id} has been updated`)
        const product = await Product.find(value);
        console.log(product);
       } catch (error) {
         console.log('Error:', error.message)
       }
       

       //await Comment.deleteMany({"author.id": user_id});

       

       //res.redirect("/admin/users/1");
   } catch(err) {
       console.log(err);
       res.redirect('back');
   }
}