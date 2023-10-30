const { PDFDocument, rgb } = require('pdf-lib')
const ipp = require('@sealsystems/ipp')
const fs = require('fs')
const fsp = require('fs/promises')

async function createPDF() {
    // 创建一个新的PDF文档
    const pdfDoc = await PDFDocument.create();

    // 添加一个页面
    const page = pdfDoc.addPage([154, 114]);

    // 获取页面的宽度和高度
    const { width, height } = page.getSize();
    console.log(width)
    console.log(height)

    // 添加文本内容到页面
    page.drawText('A1', {
        x: 15,
        y: height - 15,
        size: 12,
        color: rgb(0, 0, 0),
    });

    page.drawText('B2', {
        x: width - 45,
        y: height - 15,
        size: 12,
        color: rgb(0, 0, 0),
    });

    page.drawText('測試123', {
        x: 15,
        y: 30,
        size: 14,
        color: rgb(0, 0, 0),
    });

    page.drawText('XXXXXXXXXXXX', {
        x: 15,
        y: 48,
        size: 14,
        color: rgb(0, 0, 0),
    });

    page.drawText('XXXXXXXXXXXX', {
        x: 15,
        y: 66,
        size: 14,
        color: rgb(0, 0, 0),
    });

    page.drawText('XXXXXXXXXXXX', {
        x: 15,
        y: 84,
        size: 14,
        color: rgb(0, 0, 0),
    });

    page.drawText('XXXXXXXXXXXX', {
        x: 15,
        y: 102,
        size: 14,
        color: rgb(0, 0, 0),
    });

    page.drawText('XXXXXXXXXXXX', {
        x: 15,
        y: 120,
        size: 14,
        color: rgb(0, 0, 0),
    });

    page.drawText('C3', {
        x: 15,
        y: 15,
        size: 12,
        color: rgb(0, 0, 0),
    });

    page.drawText('D4', {
        x: width - 60,
        y: 15,
        size: 12,
        color: rgb(0, 0, 0),
    });

    const borderWidth = 2; // 边框宽度
    page.drawLine({
        start: { x: borderWidth / 2, y: borderWidth / 2 },
        end: { x: width - borderWidth / 2, y: borderWidth / 2 },
        thickness: 1, // 底线的厚度
        color: rgb(0, 0, 0),
    });

    page.drawLine({
        start: { x: borderWidth / 2, y: height - borderWidth / 2 },
        end: { x: width - borderWidth / 2, y: height - borderWidth / 2 },
        thickness: 1, // 顶部线的厚度
        color: rgb(0, 0, 0),
    });

    // 将PDF保存到文件
    const pdfBytes = await pdfDoc.save();

    fs.writeFileSync('output.pdf', pdfBytes);

    return Promise.resolve()
}

createPDF().catch((error) => {
    console.log(error)
    process.exit(1)
}).then(async () => {
    console.log('success')
    const data = await fsp.readFile('./output.pdf')
    const buffer = Buffer.from(data)
    console.log(buffer)

    const printer = ipp.Printer('http://192.168.0.49:631/printers/HPRT_TP805L')
    const msg = {
        "operation-attributes-tag": {
            "requesting-user-name": "ExpressPrinterServer",
            "job-name": "tag-template.pdf",
            "document-format": "application/pdf"
        },
        "job-attributes-tag": {
            "media-col": {
                "media-source": "tray-2",
            },
            "print-scaling": "none",
            // "stitching-reference-edge": "top"
        },
        data: buffer,
    }
    printer.execute("Print-Job", msg, function (err, res) {
        console.log('error => ', err)
        console.log('result => ', res)
    })
})
