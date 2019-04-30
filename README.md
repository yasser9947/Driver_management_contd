# Driver and Car Management Continued.
So far we have one `model` the `company` model but this may not be sufficient enough for our application

## Your Mission
Lets break our app into more models and pass references.

## Your Task

Let's keep track of our Restful Routes as we build out our app. Copy/paste this table into a fresh file, open an excel/sheets spreadsheet or draw on a piece of paper. Feel free to add more columns and notes to help you put it all together.

Let make 2 more models from our current `Company` model named `Driver` and `Car`

`Car` model will be our schema to store all cars that will belong to a company. 
`Driver` model will be our schema to store all drivers which belong to a company and can driver a car.

#### Restful Routes
Build the following routes for the following models:

`:Company`

|#|Action|URL|HTTP Verb|EJS view filename|mongoose method|
|:---:|:---:|:---:|:---:|:---:|:---:|
|1| Index | /companys/ | GET | index.ejs | Company.find()|
|2| Show |/companys/:id |GET|show.ejs|Company.findById()|
|3| New | /companys/new | GET | new.ejs | none |
|4| Create | /companys/ | POST| none | Company.create(req.body)|
|5| Edit |/companys/:id|GET|edit.ejs||
|6| Update |/companys/:id|PUT|update.ejs|Company.findByIdAndUpdate()|
|7| Destroy |/companys/:id|DELETE|none|||

`:Car`

|#|Action|URL|HTTP Verb|EJS view filename|mongoose method|
|:---:|:---:|:---:|:---:|:---:|:---:|
|1| Index | /cars/ | GET | index.ejs | Car.find()|
|2| Show |/cars/:id|GET|show.ejs|Car.findById()|
|3| New | /cars/new | GET | new.ejs | none |
|4| Create | /cars/ | POST| none | Car.create(req.body)|
|5| Edit |/cars/:id||edit.ejs||
|6| Update |/cars/:id|PUT|||
|7| Destroy |/cars/:id|DELETE||||

`:Driver`

|#|Action|URL|HTTP Verb|EJS view filename|mongoose method|
|:---:|:---:|:---:|:---:|:---:|:---:|
|1| Index | /drivers/ | GET | index.ejs | Driver.find()|
|2| Show |/drivers/:id| GET|||
|3| New | /drivers/new | GET | new.ejs | none |
|4| Create | /drivers/ | POST| none | Driver.create(req.body)|
|5| Edit |/drivers/:id||edit.ejs||
|6| Update |/drivers/:id| PUT|||
|7| Destroy |/drivers/:id|DELETE|none|||


## Step 1
 1. Create one model each for `Car` and `Driver` with the data embedded in :cars and :drivers
 1. For drivers
 1. Create the routes above
 1. Think about this, One `Company` *can have many* `Cars` and `Drivers`
 1. One `Driver` *can driver many* `Cars`
 1. Modify your Company, Driver and Car models to accomodate this by referencing `Car`(ObjectId) in `Company` and `Driver` (ObjectId) in `Company`. `(drivers : [{type: Schema.Types.ObjectId, ref: 'Driver'}])`
 1. One more reference is required please complete this.

## Step 2
 1. Create new routes based on the routes listed above and any more routes that maybe required.
 1. Create the views for each of these models for Create - Read - Update - Delete like todays lesson

## Step 3
1. Push some data into the cars and drivers collections

> Do the same for Driver and Car

## Step 4
1. Now when you call the route `/company/:companyid`, display the company and all the drivers and cars belonging to that company
> `.populate()`
> Do the same for Driver with Cars.


### Extras
1. Now create a route that pushes cars`ObjectId` into Company this can be `\company\:companyid\car\add`
1. Do the same for Driver i.e. the route can be `\drivers\:driverid\car\add`
1. Create a views page so that you can update Company and push the ObjectId from Car into the particular company it belongs to.  

<details>
<summary>Code FindByIdAndUpdate ID</summary>
<p>

```js

Driver.findByIdAndUpdate(id, {$push:{ cars: carId }})
.then(() => {
  res.redirect('/drivers')
})
.catch(err => console.log(err))  
//[mongodb push to array](https://docs.mongodb.com/manual/reference/operator/update/push/)
```

</p>
</details>  
