const express =require("express");
const app=express();
const cors=require("cors")
const fs =require("node:fs");
const path=require("node:path");
const PORT=3000;
const {logger}=require("./middleware/logEvents");

// tüm originlere izin veren basit yapılandırma
const corsOptions ={
    origin:function(origin,callBack){
        // izin verilen origin listesi
        const whiteList=[
            "http://localhost:3000",
            "http://localhost:5173",
            "http://127.0.0.1:3000",
            "https://www.google.com.tr",
        ];
        if (whiteList.indexOf(origin)!== -1 || !origin) {
            callBack(null,true);
        }else{
            callBack(new Error("CORS politikası tarafından engellendiniz"));
        }
    },
    methods:["GET","POST","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"],
    credentials:true,
    maxAge:86400, // 24 saat

};
app.use(cors(corsOptions));
// request logger middilware
app.use(logger);

// Midilware to parse JSON badies
app.use(express.json());
// contet-type html deki kodu javasc kodunun anlayabilceği hale getiren midilware
app.use(express.urlencoded({extended:false}));
const filePath="data.json";

const readData=()=>{
    const jsonData=fs.readFileSync(filePath);
    return JSON.parse(jsonData)
};
const writeData=(users)=>{
    fs.writeFileSync(filePath,JSON.stringify(users,null,2));
};
//get   
app.get("/",(req,res)=>{
    const data =readData();
    res.json(data);
});
//create 
app.post("/",(req,res)=>{
   const newUser= req.body; 
   let users =readData();
   users=[...users,newUser]
   fs.writeFileSync(filePath,JSON.stringify(users,null,2));
    res.json(users);
});
//update
app.put("/",(req,res)=>{
    const {id:userId,email}=req.body;
    let users =readData();
    const findUser=users.find((user)=>user.id=== Number(userId));
    if (findUser) {
        users=users.map((user)=>{
            if (user.id===Number(userId)) {
                return{...user,email};
            }
            return user;
        });
        writeData(users);
        res.json({succes:true,users});
        console.log(users);
    }else{
        res.json({succes:false,message:"Kullanıcı bulunamadı"});
    }
});
//delete
app.delete("/:userId",(req,res)=>{
    const {userId}=req.params;
    let users= readData();
    users =users.filter((user)=>user.id !== Number(userId));
    writeData(users);
    res.status(204).json(users);
});

app.post("/submit",(req,res)=>{
    console.log(req.body);
    res.send("form verileri alındı");
    

});

app.get("/form",(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,"views","index.html"));
        
});





app.listen(PORT,()=>{
    console.log(`Sunucu ${PORT} portunda çalışıyor!`);
});
