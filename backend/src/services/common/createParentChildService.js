
const mongoose = require('mongoose');

const createParentChildService = async (request, parentModel, childModel, joinPropertyName) => {
    const session = await mongoose.startSession();
    try {
        await session.startTransaction();

        // Parent creation
        let parent = request.body['parent'];
        parent.userEmail = request.headers['email'];
        let parentCreation = await parentModel.create([parent], { session });

        // Child creation
        let child = request.body['child'];

        for (let element of child) {
            element[joinPropertyName] = parentCreation[0]['_id']; // Fix: use index 0
            element['userEmail'] = request.headers['email'];
        }

        let childCreation = await childModel.insertMany(child, { session });

        // Commit transaction
        await session.commitTransaction();

        return {
            status: 200,
            message: "Parent and Child Created Successfully",
            data: {
                parent: parentCreation[0],
                child: childCreation
            }
        };
    } catch (error) {
        await session.abortTransaction();
        return {
            status: 500,
            message: "Transaction Failed",
            error: error.toString()
        };
    } finally {
        session.endSession(); // Always end session
    }
};

module.exports = createParentChildService;












/*
const mongoose = require('mongoose');

const createParentChildService = async (request, parentModel, childModel, joinPropertyName) => {
    // create a session for transaction
    const session = await mongoose.startSession();
    try {
        // start a transaction
        await session.startTransaction();

        // first database process for Parent Model
        let parent = request.body['parent'];
        parent.userEmail = request.headers['email'];
        let parentCreation = await parentModel.create([parent], { session });

        // second database process for Child Model
        let child = request.body['child'];

        await child.forEach((element) => {
            element[joinPropertyName] = parentCreation['_id'];
            element['userEmail'] = request.headers['email'];
            });

            let childCreation = await childModel.insertMany(child, { session });

            // commit the transaction
            await session.commitTransaction();
            session.endSession();

            return {status: Success, message: "Parent and Child Created Successfully",
                data: { parent: parentCreation[0], child: childCreation }};

    }
    catch (error) {
            // rollback the transaction in case of error
            await session.abortTransaction();
            session.endSession();
            return {status: 500, message: "Transaction Failed", error: error.toString()};
        // return {status: , message: "Transaction Failed", error: error.toString()};
    }
};

module.exports = createParentChildService;
*/