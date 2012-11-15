exports.findAll = function(req, res) {
    res.send([{name:'videos'}, {name:'videos'}, {name:'videos'}]);
};

exports.findById = function(req, res) {
    res.send({id:req.params.id, name: "The Name", description: "description"});
};