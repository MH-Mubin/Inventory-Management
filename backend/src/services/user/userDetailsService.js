


const userDetailsService = async (request, dataModel) => {
    try{
        let data = await dataModel.agregate([{$match: {email: request.headers.email}}]);
        return {status: 200, message: "User Details:", data: data};
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}

module.exports = userDetailsService;
