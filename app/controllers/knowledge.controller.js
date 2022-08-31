const { knowledge } = require("../models");
const db = require("../models");
const tagModel = require("../models/tag.model");
const Knowledge = db.knowledge;
const Tag = db.tag;
const Op = db.Sequelize.Op;

//Insert a new knowledge entry to the database
exports.create = (req, res)=>{
    if(!req.body.subject || !req.body.body){
        res.status(400).send({
            message: "knowledge cannot be empty."
        });
        return;
    }
    const know = {
        subject: req.body.subject,
        body: req.body.body,
        ref_url: req.body.ref_url,
        notes: req.body.notes,
        author: req.body.author,
        publishDate: req.body.publishDate,
        visible: req.body.visible
    };
     Knowledge.create(know).then((data)=>{
        
        console.log(" Created Knowledge: " + JSON.stringify(knowledge, null, 4));
        res.send(data);
    }).catch((err)=>{
        console.log("Error creating Knowledge: ", err);
        res.status(500).send({
            message: err.message|| "Error creating the Knowledge."
    });
    });
};

//retrieve all knowledge from the db
exports.findAll = (req, res)=>{
    const searchTerm = req.query.search;
    var condition = searchTerm? {body: {[Op.like]: `%${searchTerm}%`}}:null;
     Knowledge.findAll({
       where: condition,
        include: [
            {
                model: Tag,
                as: "tags",
                attributes: ["id","name"],
                through: {
                    attributes: [],
                },
            },
        ],

    }).then((data)=>{
            res.send(data);
    }).catch((err)=>{
        console.log("Error finding (all) Knowledge: ", err);
        res.status(500).send({
            message: err.message|| "Error retrieving any Knowledge."
    });
    });
};

//find a knowledge entry by the id
exports.findById = (req, res) => {
    const id = req.params.id;
    Knowledge.findByPk(id, {
      include: [
        {
          model: Tag,
          as: "tags",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
        },
      ],
    })
      .then((data) => {
        if(data){
            res.send(data);
        }else {
            res.status(404).send({
                message: `Knowledge not found with id=${id}.`
            });
        }
        
      })
      .catch((err) => {
        console.log("Error findng Knowledge: ", err);
        res.status(500).send({
            message: `Error retrieving Knowledge with id=${id}.`
      });
        
      });
  };