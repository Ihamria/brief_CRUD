
const bodyParser= require('body-parser')
const express = require('express');
const fs = require('fs')
const app = express();
const port = 3000;

const read = fs.readFileSync('./data/Marque.json');
let data= JSON.parse(read);

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))




app.get('/', (req, res) => {
 res.render('pages/index',{data});
});


app.post('/Marque', function(req, res){
	if(req.body.Marque==""||req.body.Collection==""||req.body.Categorie=="" || req.body.ID==""){
		res.redirect('/Marque')
	}
else{
	for(var i in data){
		if(data[i].Marque==req.body.Marque){
		data.push({
			"Marque":req.body.Marque,
			"Collectin":req.body.Collection,
			"Categorie":req.body.Categorie,
			
		});
		fs.writeFileSync('./data/Marque.json', JSON.stringify(data, null, 4));
	res.render('Marque.ejs');
	}
}
}
});
app.listen(port, () => console.log(`localhost ${port}!`));
