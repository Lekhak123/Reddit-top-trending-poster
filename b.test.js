const mongoose = require("mongoose");
const config = require("./jsons/config.json")
mongoose.connect(config.mongo_url).then(()=>{
    console.log("DB connected");
}).catch((e)=>{
    console.log(e);
});
const History = require("./database/model/history");


const {Validate} = require("./database/validate/validate");

async function a(url){
    History.ensureIndexes(function (err) {
        if (err) {
            console.log(err);
        }
      });
    const history = await Validate(url);
    console.log(history)
}
//pass the url into a() function.
a(url)