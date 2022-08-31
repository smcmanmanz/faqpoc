const { knowledge } = require("../models");
const db = require("../models");
const tagModel = require("../models/tag.model");
const Knowledge = db.knowledge;
const Tag = db.tag;

//Insert a new tag to the database
exports.create = (req, res)=> {
    if(!req.body.name){
        res.status(400).send({
            message: "The tag cannot be empty."
        });
        return;
    }
    const tag1= {
        name: req.body.name
    };
     Tag.create(tag1).then((data)=>{
        console.log("Created Tag: " +JSON.stringify(data, null, 2));
        res.send(data);
    })
    .catch((err)=>{
        console.log("Error creating Tag: ", err);
        res.status(500).send({
            message: err.message|| "Error creating the tag."
    });
    });
};

//retrieve all tags from the db
exports.findAll = (req, res)=>{

     Tag.findAll({
        include: [{
            model: Knowledge,
            as: "knowledge",
            attributes: ["id", "subject", "body", "ref_url", "notes", "author", "publishDate", "visible"],
            through: {
                attributes: [],
            }
        },
    ],
    }).
    then((data)=>{
        res.send(data);
    }).catch((err)=>{
        console.log("Error retriving Tags: ", err);
        res.status(500).send({
            message: err.message|| "Error retrieving Tags."
    });
    });
};

//find a tag by id
exports.findById = (req, res)=>{
    const id = req.params.id;
     Tag.findByPk(id, {
        include: [{
            model: Knowledge,
            as: "knowledge",
            attributes: ["id", "subject", "body", "ref_url", "notes", "author", "publishDate", "visible"],
            through: {
                attributes: [],
            }
        },
    ],
    }).
    then((data)=>{
        if(data){
            res.send(data);
        }else {
            res.status(404).send({
                message: `Tag not found with id=${id}.`
            });
        }
    }).catch((err)=>{
        console.log("Error retriving Tags: ", err);
        res.status(500).send({
            message: `Error retrieving tag with id=${id}.`
      });
    });
};

/* //Add knowledge tag many-to-many mapping to the database
exports.addKnowledge = (tagId, knowledgeId) => {

    if(!req.body.tagId){
        res.status(400).send({
            message: "The tag cannot be empty."
        });
        return;
    }
    if(!req.body.knowledgeId){
        res.status(400).send({
            message: "The knowledge cannot be empty."
        });
        return;
    }
 
     Tag.findByPk(req.body.tagId).then((ta)=>{
        if(!ta){
            console.log("Tag not found");
            return;
        }
         Knowledge.findByPk(req.body.knowledgeId).then((know)=>{
            if(!know){
                console.log("Knowledg not found");
                return;
            }
            ta.addKnowledge(know);
            console.log(`Added Knowledge id = ${know.id} to Tag id=${ta.id}`);
            //return tag;
        });
    }).catch((err)=>{
        console.log("Error adding Knowledge to Tag:", err);
        res.status(500).send({
            message: err.message|| "Error creating the knowledge and tag mapping."
    });
    });
};
 */
