const mongoose = require("mongoose");


const connectdB = (url)=>{
  return mongoose.connect(url)
}

module.exports = connectdB
