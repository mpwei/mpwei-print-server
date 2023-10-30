require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const ipp = require('@sealsystems/ipp')
const app = express()

app.use(express.json({limit: '10mb'}))
app.use(cookieParser())

app.post('/print', (req, res, next) => {
    const { PrinterName, PrintData, PrinterAddress = '127.0.0.1', Protocol = 'http' } = req.body

    if (!PrinterName) {
        return next({
            Code: 'PRINT-01',
            Status: 400,
            Message: 'PrinterName is required.'
        })
    }

    if (!PrintData) {
        return next({
            Code: 'PRINT-02',
            Status: 400,
            Message: 'PrintData is required.'
        })
    }

    const buffer = Buffer.from(PrintData, 'base64')
    const printer = ipp.Printer(`${Protocol}://${PrinterAddress}/printers/${PrinterName}`)
    const msg = {
        'operation-attributes-tag': {
            "requesting-user-name": "ExpressPrinterServer",
            // "job-name": "tag-template.pdf",
            // "document-format": "application/pdf"
        },
        'job-attributes-tag': {
            'media-col': {
                'media-source': 'tray-2',
            },
            'print-scaling': 'none',
            // 'stitching-reference-edge': 'top'
        },
        data: buffer,
    }
    printer.execute('Print-Job', msg, function (err, res) {
        console.log('error => ', err)
        console.log('result => ', res)
    })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next({
        Code: 'Global/Not-found',
        Status: 404,
        Message: 'Not found.'
    })
})

// error handler
app.use(function (err, req, res, next) {
    console.log(err)
    return res.status(err.Status || 500).send({
        Code: err.Code || err.Status,
        Message: err.Message,
        Detail: err.Detail
    })
})

module.exports = app
