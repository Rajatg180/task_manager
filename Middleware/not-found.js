const notFound=(req,res)=>res.status(404).send(`<h1>Route Not Found you are looking for</h1>`);

module.exports=notFound;