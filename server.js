const express = require("express");
const cors = require("cors");
const app = express();
var corsOptions = {
    origin: "http://localhost:8081"
};

const KnowledgeController = require("./app/controllers/knowledge.controller");
const TagController = require("./app/controllers/tag.controller");

app.use(cors(corsOptions));
//body-parser: requests of content-type: application/json
app.use(express.json());
//body-parser: requests of content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

const db = require("./app/models");
/*
db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db");
        
         const kno1 = KnowledgeController.create({
            subject: "Qustion1",
            body: "Answer1: xxxxxxxxxxxxx",
            ref_url: "www.supermicro.com",
            notes: "This is a note",
            author: "Manman Zhang",
            publishDate: "08/29/2022",
            visible: true,
          }).then(res =>{
            console.log(res)
          }).catch((err)=>{
            console.error("failed to create a knowledge.");
          });

          const tag1 = TagController.create({
            name: "tag1",
          }).then((res)=>{
            console.log(res)
          }).catch((err)=>{
            console.error("failed to create a tag.");
          });

          const know_tag_1 = TagController.addKnowledge(1, 1).then(res =>{
            console.log(res)
          }).catch((err)=>{
            console.error("failed to create a tag and knowledge mapping.");
          }); 
});
*/
db.sequelize.sync();

//default route
app.get("/", (req, res)=>{
    res.json({message: "This is the FAQ tool backend API."});
});
require("./app/routes/knowledge_tag.routes")(app);
//configure the port
const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`The FAQ API server is running on port ${PORT}.`);
});
