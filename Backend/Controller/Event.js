const { result } = require('@hapi/joi/lib/base');
const Event = require('../Models/event');
const ticket = require('../Models/ticket');
const PER_PAGE = 16;


exports.getEvents = async(req, res, next) => {
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
       const events = await Event
       .find(searchObj)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE);

       // Get the count of total available book of given filter
       const count = await Event.find(searchObj).countDocuments();
 
       res.json(//"events", 
       {
          events: events,
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

exports.findEvents = async(req, res, next) => {
   
   var page = req.params.page || 1;
   //const filter = req.params.filter;
   const event_name = req.params.event_name;//req.body.searchName;
   const value = ({"Event_Name": event_name})
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
       const events = await Event
       .find(value)
       .skip((PER_PAGE * page) - PER_PAGE)
       .limit(PER_PAGE)
 
       // Get the count of total available book of given filter
       const count = await Event.find(value).countDocuments();
 
       res.json(//"events",
        {
          events: events,
          current: page,
          pages: Math.ceil(count / PER_PAGE),
         //  filter: filter,
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
 
 exports.getEventDetails = async(req, res, next) => {
    try {
       const event_id = req.params.event_id;
       const value = ({"Event_ID": event_id})
       console.log(event_id);
       const event = await Event.find(value).populate("eventComments");
       res.json(//"user/eventDetails", 
       {event:event});
    } catch (err) {
       console.log(err);
       return res.redirect("back");
    }
 }



 exports.postAddNewEvent = async(req, res, next) => {
    try {
        const event_info = req.body;
        console.log(event_info);
        //prod_info.description = req.sanitize(prod_info.description);
        
        const isDuplicate = await Event.find(event_info);
 
        if(isDuplicate.length > 0) {
            return res.json("This event is already registered in collection");
            //return res.redirect('back');
        } 
 
        const new_event = new Event(event_info);
        await new_event.save();
        res.json(`A new event named ${new_event.Event_Name} is added to the collection`);
        //res.redirect("/auth/products");
    } catch(err) {
        console.log(err);
        res.redirect('back');
    }
 };
 

 exports.getDeleteEvent = async (req, res, next) => {
   try {
       const event_id = req.params.event_id;
      //  const product = await Product.find({"Product_ID": product_id});
       const value = ({"Event_ID": event_id})
       console.log(event_id);
       const event = await Event.find(value);

       try {
         await Event.deleteOne(value);
         res.json(`Event with Event ID ${event_id} has been deleted`)
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


exports.postUpdateEvent = async (req, res, next) => {
   try {
       const event_id = req.params.event_id;
       const result = req.body;
      //  const product = await Product.find({"Product_ID": product_id});
       const value = ({"Event_ID": event_id})
       
       //console.log(product)
      //  console.log(product_id);
      //  const product = await Product.find(value);
      
    
       try {
         await Event.findOneAndUpdate( value , {
            $set: {
                Event_Name: result.name,
                Description: result.desc,  
                Image: result.image,
                Location: result.location,
                Ticket_Price: result.price,
                Delivery_Charge: result.charge
               //  categoryID: result.categoryID,
               //  description: result.description,
            }
        });
        res.json(`Event with Event ID ${event_id} has been updated`)
        const event = await Event.find(value);
        console.log(event);
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

 exports.postAddNewTicket = async(req, res, next) => {
   try {
       const ticket_info = req.body;
       console.log(ticket_info);
       //prod_info.description = req.sanitize(prod_info.description);
       
      //  const isDuplicate = await Event.find(ticket_info);

      //  if(isDuplicate.length > 0) {
      //      return res.json("This event is already registered in collection");
      //      //return res.redirect('back');
      //  } 

       const new_ticket = new ticket(ticket_info);
       await new_ticket.save();
       res.json(`A new event ticket named ${new_ticket.Event_Name} is added to the collection`);
       //res.redirect("/auth/products");
   } catch(err) {
       console.log(err.message);
       res.redirect('back');
   }
};
 
