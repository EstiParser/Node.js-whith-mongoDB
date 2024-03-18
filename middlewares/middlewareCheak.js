const middlewareCheak=(req,res,next)=>
{
    console.log('Request Type:', req.method)
    if((req.method == 'PUT'||req.method == 'POST')&& Object.keys(req.body).length==0)
     res.send("eror")
    else
     next()

};

module.exports = middlewareCheak;
