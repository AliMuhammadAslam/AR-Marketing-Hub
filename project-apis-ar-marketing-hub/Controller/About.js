const About = require('../Models/About');

exports.getAbout = async(req, res, next) => {
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
       const about = await About
       .findOne(searchObj)
    //    .skip((PER_PAGE * page) - PER_PAGE)
    //    .limit(PER_PAGE);

       // Get the count of total available book of given filter
       //const count = await Event.find(searchObj).countDocuments();
 
       res.send(//"events", 
       {
          about: about,
           //current: page,
           //pages: Math.ceil(count / PER_PAGE),
           //filter: filter,
           //value: value,
           //user: req.user,
       })
    } catch(err) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err
      });
    }
}



exports.postAddAbout = async(req, res, next) => {
    try {
        const about_info = req.body;
        console.log(about_info);
        //prod_info.description = req.sanitize(prod_info.description);
        
        //const isDuplicate = await Event.find(event_info);
 
        // if(isDuplicate.length > 0) {
        //     return res.json("This event is already registered in collection");
        //     //return res.redirect('back');
        // } 
 
        const new_about = new About(about_info);
        await new_about.save();
        res.json(`A new about page title named ${new_about.title} is added to the collection`);
        //res.redirect("/auth/products");
    } catch(err) {
        console.log(err);
        res.redirect('back');
    }
 };
 