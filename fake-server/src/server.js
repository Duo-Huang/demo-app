const express = require('express')
const { houseDetails, postedHouseInfo } = require('./db/houses')
const { wrapperRes } = require('./utils')

const app = express()

let count = 0

app.get('/rent-in-houses/:id', (req, res) => {
    // ---test retry---
    // count++
    // if (count < 2) {
    //     console.log(count)
    //     return res.status(500).json(wrapperRes(houseDetails))
    // }
    // console.log(count)
    // setTimeout(() => {
    //     console.log('reset')
    //     count = 0;
    //     res.status(200).json(wrapperRes(houseDetails))

    // }, 3000)
    // ---test retry---
    setTimeout(() => {
        res.status(500).json(wrapperRes(houseDetails))
    }, 2000)
})

app.post('/rent-out-requests', (req, res) => {
    setTimeout(() => {
        res.status(500).json(postedHouseInfo)
    }, 2000)
})

app.listen(3000, () => {
    console.log('mock server is running in 3000')
})
