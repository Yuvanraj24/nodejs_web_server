const { da } = require('date-fns/locale')
const express = require('express')
const router = express.Router()
const path = require('path')

data = {}

data.employees = require('../../data/employees.json')

router.route('/')
        .get((req,res) => {
            res.json(data.employees)
        })
        .post((req,res) =>{
            
        })
        .put()
        .delete()


module.exports = router