const { stringify } = require("nodemon/lib/utils");
const Product = require("../Models/product"),
    productComment = require("../Models/productComment"),
    Event = require("../Models/event"),
    eventComment = require("../Models/eventComment"),
    User = require("../Models/User.model");

exports.postNewProdComment = async(req, res, next) => {
    try {
        const comment_text = req.body.text;//JSON.stringify(req.body);
        const user_id = req.params.user_id;//req.user._id;
        const user = await User.findById(user_id);
        const email = user.email;

        // fetching the book to be commented by id
        const product_id = req.params.product_id;
        const product = await Product.findById(product_id);

        // creating new comment instance
        const comment = new productComment({
            text: comment_text,
            author: {
                id: user_id,
                email: email,
            },
            product: {
                id: product._id,
                Product_Name: product.Product_Name,
            }
        });
        await comment.save();
        
        // pushing the comment id to book
        product.prodComment.push(comment._id);//.comments.push(comment._id);
        await product.save();

        // logging the activity
        /*const activity = new Activity({
            info: {
                id: book._id,
                title: book.title,
            },
            category: "Comment",
            user_id: {
                id: user_id,
                username: username,
            }
        });
        await activity.save();*/

        res.json("New comment added.");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
        
    }
}



exports.postNewEventComment = async(req, res, next) => {
    try {
        const comment_text = req.body.text;//JSON.stringify(req.body);
        const user_id = req.params.user_id;//req.user._id;
        const user = await User.findById(user_id);
        const email = user.email;

        // fetching the book to be commented by id
        const event_id = req.params.event_id;
        const event = await Event.findById(event_id);

        // creating new comment instance
        const comment = new eventComment({
            text: comment_text,
            author: {
                id: user_id,
                email: email,
            },
            event: {
                id: event._id,
                Event_Name: event.Event_Name,
            }
        });
        await comment.save();
        
        // pushing the comment id to book
        event.eventComments.push(comment._id);//.comments.push(comment._id);
        await event.save();

        // logging the activity
        /*const activity = new Activity({
            info: {
                id: book._id,
                title: book.title,
            },
            category: "Comment",
            user_id: {
                id: user_id,
                username: username,
            }
        });
        await activity.save();*/

        res.json("New comment added.");
    } catch (err) {
        console.log(err);
        return res.redirect("back");
        
    }
}
 

// exports.updatProfile = async(req, res, next) => {
//     try {
        
//     } catch (error) {

        
        
//     }




// }
exports.postUpdateUserInfo = async (req, res, next) => {
    try {
        const user_id = req.params.user_id;
        const result = req.body;
       //  const product = await Product.find({"Product_ID": product_id});
        const value = ({"_id": user_id})
        
        //console.log(product)
       //  console.log(product_id);
       //  const product = await Product.find(value);
       
     
        try {
          await User.findOneAndUpdate( value , {
             $set: {
                 name: result.name,
                 contact: result.contact,  
                //  Image: result.image,
                 address: result.address,
                //  categoryID: result.categoryID,
                //  description: result.description,
             }
         });
         res.json(`User with User ID ${user_id} has been updated`)
         const user = await User.find(value);
         console.log(user);
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



