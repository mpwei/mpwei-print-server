// const { PDFDocument, rgb } = require('pdf-lib')
const ipp = require('@sealsystems/ipp')
// const fs = require('fs')
const fsp = require('fs/promises')

async function createPDF() {
    const data = await fsp.readFile('./942311061814FQW.pdf')
    const buffer = Buffer.from(data)
    console.log(buffer)

    const printer = ipp.Printer('http://192.168.0.49:631/printers/HPRT_TP805L')
    const msg = {
        "operation-attributes-tag": {
            "requesting-user-name": "ExpressPrinterServer",
            "job-name": "tag-template.pdf",
            "document-format": "application/pdf"
        },
        // "job-attributes-tag": {
        //     "media-col": {
        //         "media-source": "tray-2",
        //     },
        //     "print-scaling": "none",
        //     "stitching-reference-edge": "top"
        // },
        data: buffer,
    }
    printer.execute("Print-Job", msg, function (err, res) {
        console.log('error => ', err)
        console.log('result => ', res)
    })
}
createPDF()
