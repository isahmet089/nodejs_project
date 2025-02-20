const app = require('./app');
require("dotenv").config();
const connectDB=require("./config/dbConfig");
const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor!`);
}); 

