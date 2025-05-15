
const expenseSummaryService = require('../../services/summary/expenseSummaryService')
const purchaseSummaryService = require('../../services/summary/purchaseSummaryService')
const returnSummaryService = require('../../services/summary/returnSummaryService')
const saleSummaryService = require('../../services/summary/saleSummaryService')

exports.expenseSummary = async (req,res)=>{
    let result = await expenseSummaryService(req)
    res.status(200).json(result)
}

exports.purchaseSummary = async (req,res)=>{
    let result = await purchaseSummaryService(req)
    res.status(200).json(result)
}

exports.returnSummary = async (req,res)=>{
    let result = await returnSummaryService(req)
    res.status(200).json(result)
}

exports.saleSummary = async (req,res)=>{
    let result = await saleSummaryService(req)
    res.status(200).json(result)
}