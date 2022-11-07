const History = require("../model/history");
const mongoose = require("mongoose");
const {Validate} = require("../validate/validate");

exports.save_URL = async(url) => {
    if (typeof url === null || url === null || url == "") {
        console.log("invalid url")
    }
        const history = await Validate(url);
        if(history){
            return false;
        }
        const newUrl = new History({URL_: url})
        try{
        newUrl.save(async function(err,result){
        if(err){
            return false;
        }
        });
        return true;
        } catch(e){
            
        }
        return false;

}
