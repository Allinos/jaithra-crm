const db = require('../config/db.config')
const dataUnity = require('../utils/arrange')
const multer = require('multer');




// ---- All Index routes here ----
exports.indexDeshboard = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const q = `SELECT * from properties;`
        await db.query(q, (err, results) => {
                res.status(200).render('../views/admin/_index.ejs', { data:results })
            }
        )
    } else { res.redirect('/admin/login') }

}


exports.settings = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const query = `select * from subtask;select * from mis_subtask;select * from amount_split`
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/admin/settings.ejs', { data: result })
        })
    }
}
exports.clientsPage = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const query = `select * from clients;`
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/admin/np.finance.ejs', { data: result })
        })
    }
}
exports.ownersPage = (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        const query = `select * from subtask;select * from mis_subtask;select * from amount_split`
        db.query(query, (err, result, field) => {
            res.status(200).render('../views/admin/settings.ejs', { data: result })
        })
    }
}



exports.insertProp =  async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
        console.log(req.body);
        console.log(req.files);
        
        res.status(200).send({ msg: "new deal entered successfully..😍" })
    }
}



exports.PropertiesForm = async (req, res) => {
    if (req.session.isLoggedIn == true && req.session.role == 'admin') {
                res.status(200).render('../views/admin/np.form.ejs')
            } else {
                res.status(500).send({ msg: "Some internal error has occurred !!" })
        }
}

