const mongojs = require('mongojs');
const db = mongojs('fullapp',['termini']);

const savetnikTerminiController = (req,res) => {
    let name = req.params.name;
    let user = req.session.user;
    
    db.termini.find({savetnik: name}, (err, termini) => {
        res.render('admin/savetnikTermini', {
            name: name,
            termini: termini
        });
    })
}

module.exports = savetnikTerminiController;