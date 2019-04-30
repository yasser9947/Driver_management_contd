// console.log("hy ")
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
// process.env.PORT;
const Company = require('./models/company');
const Car = require('./models/car');
const Driver = require('./models/driver');
const ejs = require('ejs');
const methodOverride = require('method-override')


const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/companys', {
        userNewUrlParser: true
    })
    .then(() => console.log("mongodb is runing"))

app.set('view engine', 'ejs');

app.use(express.urlencoded({
    extended: false
}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
//=======================   Company  ==================
// INDEX COMPANY


app.get('/companys', (req, res) => {

    Company.find().sort('-createdAt')
        .populate({
            path: 'cars',
            select: 'name'
        }, {
            path: 'drivers',
            select: 'name'
        })
        .then((companys) => {
            res.render('index', {
                companys
            })
        }).catch(err => console.log(err))

})

//NEW COMPANY
app.get('/companys/new', (req, res) => {
    res.render('new')
})

//POST COMPANY
app.post('/companys', (req, res) => {
    // Company.create(req.body)
    let data = {
        name: req.body.name,
        logo: req.body.logo,
        address: req.body.address,
        city: req.body.city,
        telephone: req.body.telephone,

    }


    let company = new Company(data)
    company.save()
        .then(() => {
            res.redirect('/companys')
        }).catch(err => console.log(err))
})
// show COMPANY
app.get('/companys/:indexOfCompanysArray', (req, res) => {
    Company.findById(req.params.indexOfCompanysArray)
        .then((company) => {
            res.render('show', {
                company: company
            })
        })
})
//   edit COMPANY
app.get('/companys/:indexOfCompanysArray/edit', (req, res) => {
    Company.findById(req.params.indexOfCompanysArray)
        .then(company => {
            res.render('edit', {
                company
            })
        })
})
//PUT COMPANY
app.put('/companys/:indexOfCompanyArray', (req, res) => {


    Company.findByIdAndUpdate(req.params.indexOfCompanyArray)
        .then(company => {
            res.redirect(`/companys/${company._id}`);
        })
})
//   delete COMPANY
app.delete('/companys/:indexOfCompanysArray', (req, res) => {
    Company.findByIdAndDelete(req.params.indexOfCompanysArray)
        .then(() => {
            res.redirect('/companys');
        })
})

//=======================   Driver  ==================

// INDEX Driver


app.get('/drivers', (req, res) => {


    Driver.find()
        .sort('-createdAt')
        .populate({
            path: 'cars',
            select: 'name'
        })
        .then((drivers) => {
            res.render('drivers/index', {
                drivers
            })
        }).catch(err => console.log(err))

})

//NEW driver
app.post('/smoothies', (req, res) => {
let newdriver = new Driver(req.body)
if (!Array.isArray(req.body.driverCarsArray)){
  newdriver.cars.push(req.body.driverCarsArray)
}else{
  req.body.driverCarsArray.forEach(fruit => {
    newdriver.cars.push(fruit)
  })
}
  newdriver.save()
  res.redirect('/drivers');

})
//POST driver
app.post('/drivers', (req, res) => {
    // driver.create(req.body)
    let data = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address,
        city: req.body.city,
        telephone: req.body.telephone,

    }


    let driver = new Driver(data)
    driver.save()
        .then(() => {
            res.redirect('/drivers')
        }).catch(err => console.log(err))
})
// show driver
app.get('/drivers/:indexOfDriversArray', (req, res) => {

    Driver.findById(req.params.indexOfDriversArray)
        .then((driver) => {
            res.render('drivers/show', {
                driver: driver
            })
        })
})
//   edit driver
app.get('/drivers/:indexOfDriversArray/edit', (req, res) => {
    Driver.findById(req.params.indexOfDriversArray)
        .then(driver => {
            res.render('drivers/edit', {
                driver
            })
        })
})
//PUT driver
app.put('/drivers/:indexOfDriverArray', (req, res) => {


    Driver.findByIdAndUpdate(req.params.indexOfDriverArray)
        .then(driver => {
            res.redirect(`/drivers/${driver._id}`);
        })
})
//   delete driver
app.delete('/drivers/:indexOfDriversArray', (req, res) => {
    Driver.findByIdAndDelete(req.params.indexOfDriversArray)
        .then(() => {
            res.redirect('/drivers');
        })
})


// =================== Cars ===================

//INDEX Cars
app.get('/cars', (req, res) => {
  
    Car.find()
    .then((cars)=>{
      res.render('cars/index', { cars })
    }).catch(err => console.log(err))
  
  })
  
  //NEW Cars
  app.get('/cars/new', (req, res) => {
    res.render('cars/new')
  })
  
  //POST Cars
  app.post('/cars', (req, res) => {
  
    let data = {
      name: req.body.name, 
      model: req.body.model,
      color: req.body.color,
       
    }
  
    
  
    let car = new Car(data)
    car.save()
    .then(()=> {
      res.redirect('/cars')
    }).catch(err => console.log(err))
  
    
  })
  
  //SHOW Cars
  app.get('/cars/:indexOfCarsArray', (req, res) => {
    Car.findById(req.params.indexOfCarsArray)
    .then((car)=>{
      res.render('cars/show', {
        car: car
      })
    })
  })
  
  //EDIT Cars
  app.get('/cars/:indexOfCarsArray/edit', (req, res) => {
    Car.findById(req.params.indexOfCarsArray)
      .then(car => {
        res.render('cars/edit', { car })
      })
  })
  
  //DELETE Cars
  app.delete('/cars/:indexOfCarsArray', (req, res) => {
    Car.findByIdAndDelete(req.params.indexOfCarsArray)
      .then(() => {
        res.redirect('/cars');
      })
  })
  
  //PUT Cars
  app.put('/cars/:indexOfCarsArray', (req, res) => {
   
   
    Car.findByIdAndUpdate(req.params.indexOfCarsArray, )
      .then(far => {
        res.redirect(`/cars/${car._id}`);
      })
  })

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})