

const createToken = require('../../utility/createToken');

const userLoginService = async (request, dataModel) => {
    try{
       // const { email, password } = request.body;
        let data = await dataModel.aggregate([
            { $match: request.body },
            { $project: {_id:0, password: 1, email: 1, firstName: 1, lastName: 1, photo:1}}
        ]);
        if (data.length > 0) {
            let token = await createToken(data[0], ['email']);
            return {status: 200, message: "User Login Successfull", data: data[0], token: token};
        }
        else {
            return {status: 401, message: "Invalid Credentials"};
        }
    }catch(err){
        console.log(err);
        return {status: 500, message: "Internal Server Error", error: err.message};
    }
}
module.exports = userLoginService;