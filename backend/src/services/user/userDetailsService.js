


const userDetailsService = async (request, dataModel) => {
    try{
        let data = await dataModel.aggregate([{$match: {email: request.body.email}}]);
        return {status: 200, message: "User Details:", data: data};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userDetailsService;
