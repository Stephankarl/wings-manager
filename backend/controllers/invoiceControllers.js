// const pdfMaster = require('pdf-master')
// const fs = require('fs')

// const asyncHandler = require('../middleware/asyncHandler')

// exports.generateInvoice = asyncHandler(async (req, res, next) => {
//     const PDF = await pdfMaster.generatePdf(`${__dirname}/../../invoice/template.hbs`);
//     fs.writeFileSync(`${__dirname}/invoice/invoice.pdf`, PDF);
// })