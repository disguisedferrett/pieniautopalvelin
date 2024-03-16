const express = require('express');
const {port, host} = require('./config.json');
let autot = require('./autot.json');

var path = require('path');
var PORT = 3000;

const app = express();
app.use(express.json());

// Kaikkien autojen haku
app.get('/autot', (req, res) => {
    res.json(autot);
});

// Tietyn auton haku ID:llä
app.get('/autot/id', (req, res) => {
    const haettava = req.params.id;
    const tulos = autot.filter((auto) => auto.id == haettava);
    res.json(tulos);
});

// Auton lisääminen
app.post('/autot/uusi', (req, res) => {
    const id = req.body.id;
    const merkki = req.body.merkki;
    const malli = req.body.malli;
    const vuosimalli = req.body.vuosimalli;
    const omistaja = req.body.omistaja;


    if (id == undefined || merkki == undefined || malli == undefined || vuosimalli == undefined || omistaja == undefined) {
        res.json({'viesti': 'Virhe: Kaikkia tietoja ei annettu.'});
    }
    else {
        const uusi = {
            id: id,
            merkki: merkki,
            malli: malli,
            vuosimalli: vuosimalli,
            omistaja: omistaja,
        };
    
        autot.push(uusi);
    
        res.json({'viesti': 'Auto lisätty.'});
    }
});

// Auton muokkaaminen
app.put('/autot/muokkaa/:id', (req, res) => {
    const muokattava = req.params.id;
    const merkki = req.body.merkki;
    const malli = req.body.malli;
    const vuosimalli = req.body.vuosimalli;
    const omistaja = req.body.omistaja;

    let onOlemassa = false;

    for (let auto of autot) {
        if (auto.id == muokattava) {
            auto.merkki = merkki;
            auto.malli = malli;
            auto.vuosimalli = vuosimalli;
            auto.omistaja = omistaja;

            onOlemassa = true;
        }
    }
    

    if (onOlemassa) {
        res.json({'viesti': 'Muokkaus tehty.'});
    }
    else {
        res.json({'viesti': 'Virhe: Annettua ID-numeroa ei ole olemassa.'});
    }
});

// Auton poistaminen
app.delete('/autot/poista/:id', (req, res) => {
    const poistettava = req.params.id;
    let alkuperainenPituus = autot.length;

    autot = autot.filter((auto) => auto.id != poistettava);
    

    if (alkuperainenPituus != autot.length) {
        res.json({'viesti': 'Auto poistettu.'});
    }
    else {
        res.json({'viesti': 'Virhe: Annettua ID-numeroa ei ole olemassa.'});
    }
});

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});