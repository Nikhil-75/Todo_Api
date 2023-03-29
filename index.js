const express = require('express');
const mongoose = require("mongoose");
const routers = require('./routers/routes');
const { DB } = require('./config');


const app = express();

app.use(express.json())

app.use('/user', routers)
/*app.use((err,req,res,next)=>{

})*/
const port = 8084;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(DB);
    console.log('data is connected')
}
app.use(routers)
app.listen(port, () => {
    console.log(`server is up on port ${port}`)
})