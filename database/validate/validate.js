const History = require("../model/history");

exports.Validate = async(url) => {
    
    if (!url || typeof url === null) {
        console.error("Url is undefined.")
    }
    const result = await History.findOne({URL_:url});
    if(result) {
    
        return true;
    }

return false;

}