const moment = require('moment')
const curFormatter = require('currency-formatter')

module.exports = ({
    invoice,
    totalIncome,
    totalDays,
    rate,
    totalExpense,
    expenses,
    startDate,
    endDate,
    agent,
    user,
    airplane
}) => {
    return (
        `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6" crossorigin="anonymous">
            <title>Invoice</title>
            <style>
                h1 {
                    font-size: 24px;
                    font-weight: 100;
                    letter-spacing: 8px;
                    margin: 0;
                }

                h5 {
                    font-size: 12px;
                    font-weight: 100;
                    letter-spacing: 2px;
                    margin: 0;
                }
                
                h6 {
                    font-size: 10px;
                    font-weight: 200;
                    letter-spacing: 2px;
                    margin: 0;
                }
    
                p {
                    font-size: 10px;
                    margin: 0;
                    padding: 0;
                }

                body {
                    font-weight: 200;
                    letter-spacing: 2px;
                }
    
                .main-container {
                    margin: 0 auto;
                    margin-top: 10px;
                    width: 550px;
                    height: 800px;
                }
    
                .header-container {
                    height: 200px;
                    border: 1px solid black;
                }
    
                .title {
                    padding-top: 80px;
                }

                .pos {
                    position: absolute;
                    right: 20px;
                }
    
                .table-header {
                    display: inline-block;
                    width: 100px;
                }
    
                .service-header {
                    display: inline-block;
                    width: 220px;
                }

                .box {
                    border: 1px solid black;
                }
    
                .trip-expenses-container {
                    background-color: rgba(238, 238, 238, 0.658);
                }
    
                .info-container {
                    height: 200px;
                    width: 100%;
                }
    
                .personal-info {
                    display: inline-block;
                    width: 250px;
                }

                .bank-info {
                    display: inline-block;
                    width: 280px;
                }

                
    
                .blue {
                    background-color: blue;
                }
    
                .pink {
                    background-color: pink;
                }
    
                .yellow {
                    background-color: yellow;
                }
    
            </style>
        </head>
            <body>
        
                <div class="container-fluid main-container position-relative">
    
                    <div class="container header-container position-relative">
                        <!-- <img src="./logo/plane.png" class="logo position-absolute bottom-0 start-50 translate-middle-x" alt="Logo"> -->
                        <div class="row">
                            <h1 class="text-center title">${user.companyName.toUpperCase()}</h1>
                        </div>
                        <div class="row">
                            <h5 class="text-center">${user.firstName.toUpperCase()} ${user.lastName.toUpperCase()}</h5>
                        </div>
                        <div class=" position-absolute bottom-0 mb-3 pos">
                            <div class="row">
                                <h5>${invoice.invoiceNumber}</h5>
                            </div>
                            <div class="row">
                                <h5 class="text-end"></h5>
                            </div>
                        </div>
                    </div>

                    <div class="container blue mt-4 ">
                        <div class="ms-3 pink">
                            <div class="row mb-3 ">
                                <h6>BILLED TO</h6>
                            </div>
                            <div class="row mb-2">
                                <h6>Company: ${agent.companyName} </h6>  
                            </div>
                            <div class="row mb-2">
                                <h6>Contract Ref: ${invoice.invoiceReference} </h6>
                            </div>
                            <div class="row mb-2">
                                <h6>Attention: ${invoice.contactPerson} </h6>
                            </div>
                            <div class="row mb-2">
                            <h6>Airplane: ${airplane} </h6>
                            </div>
                            <div class="row mb-2">
                                <h6>Invoice Date: ${moment(invoice.invoiceDate).format('DD MMM YYYY')}</h6>
                            </div>
                        </div>
                    </div>

                    <div class="container mt-5">
                        <div class="box mb-2">
                            <div class="service-header p-2 ">
                                <h6 class="px-2">SERVICE</h6>
                            </div>
                            <div class="table-header p-2 text-center ">
                                <h6>QTY</h6>
                            </div>
                            <div class="table-header p-2 text-center ">
                                <h6>PRICE</h6>
                            </div>
                            <div class="table-header p-2 text-end ">
                                <h6>TOTAL</h6>
                            </div>
                        </div>

                        <div class="pb-2">
                            <div class="service-header p-2">
                                <h6>DAILY RATE</h6>
                                <p>${moment(startDate).format('MMM Do')} through ${moment(endDate).format('MMM Do')}</p>
                            </div>
                            <div class="table-header p-2 text-center">
                                <p>${totalDays}</p>
                            </div>
                            <div class="table-header p-2 text-center">
                                <p>${curFormatter.format(rate, { code: 'USD' })}</p>
                            </div>
                            <div class="table-header p-2 text-end">
                                <p>${curFormatter.format(totalIncome, { code: 'USD' })}</p>
                            </div>
                        </div>
                        <div class="pb-2">
                            <div class="service-header p-2">
                                <h6>EXPENSE TOTAL</h6>
                            </div>
                            <div class="table-header p-2 text-center">
                                
                            </div>
                            <div class="table-header p-2 text-center">
                                
                            </div>
                            <div class="table-header p-2 text-end">
                                <p>${curFormatter.format(totalExpense, { code: 'USD' })}</p>
                            </div>
                        </div>

                        <div class="pb-2 mt-2">
                            <div class="service-header p-2"></div>
                            <div class="table-header p-2"></div>
                            <div class="table-header p-2 text-center">
                                <h6>TOTAL</h6>
                            </div>
                            <div class="table-header p-2 text-end">
                                <h6>${curFormatter.format(invoice.invoiceTotal, { code: 'USD' })}</h6>
                            </div>
                        </div>
                    </div>

                    <div class="info-container pt-4 mt-4">
                        <div class="personal-info mt-5 px-3">
                            <div class="mb-3">
                                <h6>PERSONAL INFORMATION</h6>
                            </div>
                            <div class="row">
                                <p>${user.email}</p>
                            </div>
                            <div class="row">
                                <p>+${user.phoneNumber.countryCode} ${user.phoneNumber.number}</p>
                            </div>
                            <div class="row">
                                <p>${user.address.street}</p>
                            </div>
                            <div>
                                <p>${user.address.cityState}, ${user.address.zip}</p>
                            </div>
                        </div>

                        <div class="bank-info mt-5 px-3">
                            <div class="row mb-3">
                                <h6>BANK INFORMATION</h6>
                            </div>
                            <div class="row">
                                <p>Account Name: ${user.bankDetails.accountName}</p>
                            </div>
                            <div class="row">
                                <p>Account Number: ${user.bankDetails.accountNumber}</p>
                            </div>
                            <div class="row">
                                <p>Routing Number: ${user.bankDetails.routingNumber}</p>
                            </div>
                            <div class="row">
                                <p>Account Type: ${user.bankDetails.accountType} Account</p>
                            </div>
                        </div>
    
                    </div>
                </div>
                <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.1/dist/umd/popper.min.js" integrity="sha384-SR1sx49pcuLnqZUnnPwx6FCym0wLsk5JZuNx2bPPENzswTNFaQU1RDvt3wT4gWFG" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.min.js" integrity="sha384-j0CNLUeiqtyaRmlzUHCPZ+Gy5fQu0dQ6eZ/xAww941Ai1SxSY+0EQqNXNE6DZiVc" crossorigin="anonymous"></script>
            </body>
        </html>
        `
    )
}

{/* <div class="pb-2 trip-expenses-container">
    ${expenses.map(expense => (
        `<div class="service-header p-2">
            <h6>Expense Submitted:</h6>
        </div>
        <div class="table-header p-2 text-center">
            <p>${moment(expense.submitDate).format('DD MMM')}</p>
        </div>
        <div class="table-header p-2 text-center">
            <p></p>
        </div>
        <div class="table-header p-2 text-end">
            <p>${curFormatter.format(expense.amount, { code: 'USD' })}</p>
        </div>`
    ))}
</div> */}