
module.exports = (sequelize, DataTypes)=>{
    const Knowledge = sequelize.define("knowledge", {
        subject: {
            type: DataTypes.STRING,
        },
        body: {
            type: DataTypes.STRING,
        },
        ref_url: {
            type: DataTypes.STRING,
        },
        notes: {
            type: DataTypes.STRING,
        },
        author: {
            type: DataTypes.STRING,
        },
        publishDate: {
            type: DataTypes.DATE,
        },
        visible: {
            type: DataTypes.STRING,
        },
    });
    return Knowledge;
};