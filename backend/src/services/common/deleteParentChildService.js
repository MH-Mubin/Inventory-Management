
const mongoose = require('mongoose');

const deleteParentChildService = async (request, parentModel, childModel, joinPropertyName) => {
    const session = await mongoose.startSession();
    try{
        // Start transaction
        await session.startTransaction();

        //parent Creation
        let deleteID = request.params.id;
        let userEmail = request.headers['email'];

        let childQueryObject = {};
        childQueryObject[joinPropertyName] = deleteID;
        childQueryObject['userEmail'] = userEmail;

        let parentQueryObject = {};
        parentQueryObject['_id'] = deleteID;
        parentQueryObject['userEmail'] = userEmail;


        // Delete child records first
     //   let childDelete = await childModel.deleteMany(childQueryObject, { session });
        let childDelete = await childModel.remove(childQueryObject).session(session);

        // Delete parent record
     //   let parentDelete = await parentModel.deleteMany(parentQueryObject, { session });
        let parentDelete = await parentModel.remove(parentQueryObject).session(session);

        // Commit transaction
        await session.commitTransaction();
        session.endSession(); // Always end session
        return {
            status: 200,
            message: "Parent and Child Deleted Successfully",
            data: {
                parent: parentDelete,
                child: childDelete
            }
        };
    }
    catch (error) {
        // Rollback transaction in case of error
        await session.abortTransaction();
        session.endSession(); // Always end session
        return {
            status: 500,
            message: "Error Deleting Parent and Child",
            error: error.message
        };
    }
}

module.exports = deleteParentChildService;