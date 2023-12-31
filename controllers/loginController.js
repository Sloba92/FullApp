const mongojs = require('mongojs');
const db = mongojs('fullapp', ['users']);

const loginController = (req, res) => {
    let nameIzForme = req.body.name;
    let passIzforme = req.body.password;

    db.users.find({ first_name: nameIzForme, password: passIzforme }, (err, docs) => {
        if (err) {
            console.log('Greska!!!');
            res.redirect('/');
        } else {
            if (docs.length === 1) {
                // pronadjen korisnik
                let user = docs[0];
                req.session.user = user;
                if (user.role == 'admin') {
                    res.redirect('/admin');
                } else if (user.role == 'operater') {
                    res.redirect('/operater');
                } else if (user.role == 'savetnik') {
                    res.redirect('/savetnik');
                } else {
                    res.redirect('/');
                }
            } else {
                // podaci nisu tacni
                res.redirect('/');
            }
        }
    })
}

module.exports = loginController;