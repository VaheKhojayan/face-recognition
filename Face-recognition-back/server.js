const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
var   knex = require('knex');



const db = knex({
  client: 'pg',
  connection: {
    host : '172.23.0.2',
    user : 'postgres',
    password : 'vahe',
    database : 'smart_brain'
  }
});


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res) => {
	res.send('Hello from docker Container');
})

app.post('/signin',(req,res) => {
	if (  !req.body.email || !req.body.password) {
		return res.status(400).json('unable to signin')
	}
	db.select('email','hash').from('login')
	  .where('email', '=', req.body.email)
	  .then(data => {
	  	const isValid = bcrypt.compareSync(req.body.password,data[0].hash);
	  	if (isValid) {
	  		return db.select('*').from('users')
	  		       .where('email','=',data[0].email)
	  		       .then(user => res.json(user[0]))
	  		       .catch(err => res.status(400).json('Unable to sign in'))
	  	}
	  	else {
	  		return res.status(400).json('Wrong credentials')
	  	}
	  })
	 .catch(err => res.status(400).json('Something get wrong'))
})


app.post('/register',(req,res) => {
	const hash = bcrypt.hashSync(req.body.password);
	if (!req.body.name || !req.body.email || !req.body.password) {
		return res.status(400).json('unable to register')
	}
	db.transaction(trx => {
       trx.insert({
       	hash:hash,
       	email:req.body.email
                 })
          .into('login')
          .returning('email')
          .then(loginEmail => {
               return trx('users')
                .returning('*')
	            .insert({
		           email:loginEmail[0],
		           name:req.body.name,
		           joined: new Date()
                       })
                .then(user => {
    	           res.json(user[0]);
                        })
                  })
     .then(trx.commit)
     .catch(trx.rollback)
       })
.catch(err => res.status(400).json('unable to register'))
})




app.get('/profile/:id',(req,res) => {
	const {id} = req.params;
	db.select('*').from('users').where({id})
	.then (user =>{
		if(user.length) {
			res.json(user[0])
		} else {
			res.status(400).json('Not found')
		}
	})
	.catch(err => res.status(400).json('error getting user'))
	})
	



app.put('/image',(req,res) => {
	const {id}=req.body;
	db('users')
	.where('id','=',id)
	.increment('entries',1)
	.returning('entries')
	.then(entries =>{
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('unable to get entries'))
})



app.listen(3001,() => {
	console.log('App is running on port 3001')
});
