const wiki=require("wikipedia");

module.exports=function(req,res){
    (async () => {
        try
        {
            const page = await wiki.page(req.body.search);
            const summary = await page.summary();
            res.send({result: summary.extract});
        }
        catch (error)
        {
            res.send({result: "Sorry! We cannot find this!"});
        }
    })();
}