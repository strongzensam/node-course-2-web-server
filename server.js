const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs')
app.use(express.static(__dirname + '/public'));

app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log + '\n', (err) => {
    if (err) {
      console.log('Unable to append server log');
    }
  });
  next();
});
// app.use((req, res, next)=>{
//   res.render('maintenance.hbs', {
//     pageTitle: "Maintenance",
//     message: "Be back soon"
//   });
//   // function heyo() {
//   //   next();
//   // }
//   // setTimeout(heyo,2000);
//   // next();
// });

hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text)=>{
  return text.toUpperCase();
})

app.get('/',(req, res) =>{
  // res.send('<h1>Hello Express</h1>');
  res.render('home.hbs', {
    pageTitle: "Home page",
    welcomeMessage: "Welcome to the home page"
  })
});

app.get('/about',(req, res) =>{
  res.render('about.hbs', {
    pageTitle: 'About page',
  })
})

app.get('/bad',(req, res) =>{
  res.send({
    errorMessage: "Unable to load content on page"
  })
})

app.listen(3000, ()=>{
  console.log(`Server is up on port ${port}`);
});
