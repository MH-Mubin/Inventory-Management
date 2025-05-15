
const expenseReportService = require('../../services/reports/expenseReportService')
const purchaseReportService = require('../../services/reports/purchaseReportService')
const returnReportService = require('../../services/reports/returnReportService')
const saleReportService = require ('../../services/reports/saleReportService')

exports.expenseReport = async (req,res) =>{    
    const result = await expenseReportService(req);
    res.status(200).json(result)
}


exports.purchaseReport = async (req,res) =>{
    let result = await purchaseReportService(req);
    res.status(200).json(result);
}


exports.returnReport = async (req,res)=>{
    let result = await returnReportService(req);
    res.status(200).json(result);
}


exports.salesReport = async (req,res)=>{
    let result = await saleReportService(req);
    res.status(200).json(result)
}