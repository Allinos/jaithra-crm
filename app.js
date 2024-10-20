const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config({path:path.resolve(__dirname,`./.env.${process.env.NODE_ENV}`)});
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const LokiStore = require('connect-loki')(session);
const { errHandler } = require('./middleware/error')
let LokiConf = {path:'./sessions/loginAuth.db'}

app.use(session({
    store: new LokiStore(LokiConf),
    secret: "secrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, },
    resave: false,
}));


// Administrator 
const auth = require('./controllers/adminAuth')
const indexRoutes = require('./routes/admin/indexRoutes')
const userManager = require('./routes/admin/userManagerRoute.js')
const settings = require('./routes/admin/settingRoute.js')
const finance = require('./routes/admin/financeRoute')
const financeExpense = require('./routes/admin/financeRoute.expance')
const nitify = require('./routes/admin/notificationRoute')

const apiRoute = require('./routes/admin/projectRoute.js')



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)
app.use(cookieParser());

// For Admin **********
app.use('/admin', auth)
app.use('/admin', indexRoutes)
app.use('/admin/settings', setings)
app.use('/admin/clients', finance)

app.use('/apiv1', apiRoute)




app.get('*',(req,res)=>{ 
    res.render('../views/errorPage.ejs');
    })
app.use(errHandler);
app.listen(PORT,
    () => {
        console.log(`working at port ${PORT} .env ${process.env.NODE_ENV}`);
    }
)