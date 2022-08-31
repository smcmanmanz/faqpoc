module.exports = app =>{
    const KnowledgeController = require("../controllers/knowledge.controller.js");
    const TagController = require("../controllers/tag.controller");

    var router = require("express").Router();
    router.post("/knowledge/", KnowledgeController.create);
    router.get("/knowledge/", KnowledgeController.findAll);
    router.get("/knowledge/:id", KnowledgeController.findById);
    router.post("/tag/", TagController.create);
    router.get("/tag/", TagController.findAll);
    router.get("/tag/:id", TagController.findById);

    app.use('/api/v1', router);
};