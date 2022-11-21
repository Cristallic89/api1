//--käivitame vahetööriistad...
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

//---loon users sisu...
const users = [
    {id: 1, username: 'machimos', email:'machimos@hot.ee', password:'SaVanaKonn123!'},
    {id: 2, username: 'cristallic', email:'cristallic@hot.ee', password:'P0leMeeles112@'},
    {id: 3, username: 'sasuke', email:'sasuke@hot.ee', password:'KesSeeTeab911!!!'},
    {id: 4, username: 'hinata', email:'hinata@hot.ee', password:'Pure3nergy777#'},
    {id: 5, username: 'playhate', email:'playhate@hot.ee', password:'SailAwayOnTuesday555¤'},
    {id: 6, username: 'kuldmynt', email:'goldencoin@hot.ee', password:'BitCoin4ever007'},
    {id: 7, username: 'toasted', email:'toasted@hot.ee', password:'On1Side0nly91#'},
];


//app hakkab kliendilt infot nõudma ja tagasi saatma...
app.get('/', (req, res) => {
    res.send('<h1>🙌Tere maailm!<br> Kuidas käsi käib ka? 💕</h1>');
});


// luuakse veebilingi lisa /api/courses millele minnes kuvatakse BODY sisu...
app.get('/api/users', (req, res) => {
    //--tagastatakse users sisu rida (7-14)...
    res.send(users);
});


// lisatakse uus user. Uus id läheb users nimekirja järgmise vaba numbrina. Konstant schema kasutades Joi'd
// paneb paika miinimum tähtede nõude, et päring võiks läbi minna. Kui nõudele ei vastata
// siis kuvatakse teave.
app.post('/api/users', (req, res) => {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = {
       id: users.length + 1,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    };

    users.push(user);
    res.send(user);
});

//UPDATE(PUT)
app.put('/api/users/:id', (req, res) => {
// otsib üles user'i väärtuse ja kui ei leia annab 404 errori
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Antud id-ga kasutajat ei ole');

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

// Update user
    user.username = req.body.username;
    user.email = req.body.email;
    user.password = req.body.password;
    res.send(user);
});


app.delete('/api/users/:id', (req, res) => {
    // otsib üles antud id'ga user'i. Kui ei ole olemas tuleb error 404
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Antud id-ga kasutajat ei ole');

    // kustutamine
    const index = users.indexOf(user);
    users.splice(index, 1);

    // user info kuvamine
    res.send(user);
});


function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).required()
    };
    return Joi.validate(user, schema);
}


app.get('/api/users/:id', (req, res) => {
    const user = users.find(c => c.id === parseInt(req.params.id));
    if (!user) return res.status(404).send('Antud id-ga kasutajat ei ole');
    res.send(user);
});


// PORT
const port = process.env.PORT || 7000;
//jälgitakse tegevust antud pordil...
app.listen(port, () => console.log(`Listening on post ${port}...`));






