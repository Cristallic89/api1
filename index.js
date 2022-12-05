//--käivitame vahetööriistad...
const Joi = require('joi');
const express = require('express');
const app = express();
const NOT_FOUND_ERROR = {
    id: "go.micro.client", code: 500, detail: "not found", status: "Internal Server Error"
}
app.use(express.json());

//---loon users sisu...
let users = [{id: 1, username: 'machimos', email: 'machimos@hot.ee', password: 'SaVanaKonn123!'}, {
    id: 2, username: 'cristallic', email: 'cristallic@hot.ee', password: 'P0leMeeles112@'
}, {id: 3, username: 'sasuke', email: 'sasuke@hot.ee', password: 'KesSeeTeab911!!!'}, {
    id: 4, username: 'hinata', email: 'hinata@hot.ee', password: 'Pure3nergy777#'
}, {id: 5, username: 'playhate', email: 'playhate@hot.ee', password: 'SailAwayOnTuesday555¤'}, {
    id: 6, username: 'kuldmynt', email: 'goldencoin@hot.ee', password: 'BitCoin4ever007'
}, {id: 7, username: 'toasted', email: 'toasted@hot.ee', password: 'On1Side0nly91#'},];


// luuakse veebilingi lisa /api/courses millele minnes kuvatakse BODY sisu...
app.post('/api/user/List', (req, res) => {
    //--tagastatakse users sisu rida (7-14)...
    res.send(users);
});


// lisatakse uus user. Uus id läheb users nimekirja järgmise vaba numbrina. Konstant schema kasutades Joi'd
// paneb paika miinimum tähtede nõude, et päring võiks läbi minna. Kui nõudele ei vastata
// siis kuvatakse teave.
app.post('/api/user/Create', (req, res) => {
    console.log(req.body);
    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = {
        id: users.length + 1, username: req.body.username, email: req.body.email, password: req.body.password
    };

    users.push(user);
    res.send(user);
});

//UPDATE
app.post('/api/user/Update', (req, res) => {
    // otsib üles user'i väärtuse ja kui ei leia annab 500 errori
    const user = users.find(c => c.id === parseInt(req.body.id)); //enne oli req.params.id
    if (!user) return res.status(500).send(NOT_FOUND_ERROR);

    const {error} = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);


    // Update user
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    res.send({});
});


// DELETE
app.post('/api/user/Delete', (req, res) => {
    // otsib üles antud id'ga user'i. Kui ei ole olemas tuleb error 500
    const user = users.find(c => c.id === parseInt(req.body.id));
    if (!user) return res.status(500).send(NOT_FOUND_ERROR);

    // kustutamine
    const index = users.indexOf(user);
    users.splice(index, 1);

    // user info kuvamine
    res.send(user);
});


function validateUser(user) {
    const schema = {
        id: Joi.number().min(1).max(Number.MAX_SAFE_INTEGER),
        username: Joi.string().min(3).required(),
        email: Joi.string().min(3).required(),
        password: Joi.string().min(3).required()

    };
    return Joi.validate(user, schema);
}


app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(500).send('Antud id-ga kasutajat ei ole');
    res.send(user);
});


// PORT
const port = process.env.PORT || 7000;
//jälgitakse tegevust antud pordil...
app.listen(port, () => console.log(`Listening on post ${port}...`));






