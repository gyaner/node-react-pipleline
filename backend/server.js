const dotenv= require("dotenv");
const mongoose = require('mongoose');
const app= require("./app");
dotenv.config({ path: './config.env' });

app.use((req, res, next) => {
   
    console.log('Middleware 1');
    next(); // Pass control to the next middleware
  });
  
  app.use((req, res, next) => {
    console.log('Middleware 2');
    res.send('Done');
  });
  

//const DB = process.env.DATABASE_LOCAL;
const DB = process.env.DATABASE_LOCAL || 'mongodb://localhost:27017/ecommerce';
console.log(DB,"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");

mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
}).then(()=>console.log("Database connect suuccesfullly !",+DB,"***************************************")
) .catch((err) => console.error('Failed to connect to MongoDB:', err));



app.listen(3008,()=>{
    console.log("app running at "+3008);
    
});