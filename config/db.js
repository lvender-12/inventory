const mongoose = require('mongoose');
const URI = process.env.URI;

mongoose.connect(URI).then(() => {
    console.log(`connected to Database`);
}).catch((err)=>{
    console.log(err);
});

module.exports = mongoose;