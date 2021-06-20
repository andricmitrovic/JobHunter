const parser = require('../../node_modules/xml2js');

const fromRSSUrlToJson = async (req, res, next) => {
    const rss_url=req.params.url;
    const resJson=parser.toJson(rss_url);

    try{
        if(rss_url==null){
            res.status(404).json();
        }
        else{
            res.status(200).json(resJson);
        }
    } catch(error){
        next(error);
    }
}

module.exports={
    fromRSSUrlToJson
};