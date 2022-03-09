const express = require('express');
const app = express();
const morgan = require('morgan')


app.use(morgan('tiny'))

app.use((req, res, next) => {
    req.requestTime = Date.now()
    console.log(req.method.toUpperCase(), req.path)
    next();
})

app.get('/error', (req, res) => {
    chicken.fly()
})

app.use('/dogs', (req, res, next) => {
    console.log("I LOVE DOGS")
    next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'chickennugget'){
        next();
    }
    // res.send('SORRY YOU NEED A PASSWORD')
    throw new Error('PASSWORD REQUIRED')
}


// app.use((req, res, next) => {
//     console.log('This is my first MIDDLEWARE!')
//     return next();
//     console.log("THIS IS MY FIRST MID-WARE AFTER CALLING NEXT")
// })

// app.use((req, res, next) => {
//     console.log('This is my second MIDDLEWARE!')
//     return next();
// })

app.get('/', (req, res) => {
    console.log(`request date: ${req.requestTime}`)
    res.send('HOME PAGE!')
})

app.get('/dogs', (req, res) => {
    console.log(`request date: ${req.requestTime}`)
    res.send('WOOF WOOF!')
})

app.get('/secret', verifyPassword, (req, res) => {
    res.send("SECRET IS WeiRD")
})

app.use((req, res) => {
    res.status(404).send('NOT FOUND')
})

app.use((err, req, res, next) => {
    console.log('*******************')
    console.log('******ERROR********')
    console.log('*******************')
    next(err)
})
app.listen(3000, () => {
    console.log('App is running on localhost:3000')
})