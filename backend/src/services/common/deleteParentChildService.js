
const mongoose = require('mongoose');

const deleteParentChildService = async (request, parentModel, childModel, joinPropertyName) => {
    const session = await mongoose.startSession();

    try {
        const deleteID = request.params.id;
        const userEmail = request.headers['email'];

        const childQueryObject = {
            [joinPropertyName]: deleteID,
            userEmail: userEmail
        };

        const parentQueryObject = {
            _id: deleteID,
            userEmail: userEmail
        };

        // Start transaction using withTransaction (ensures rollback on failure)
        let result;
        await session.withTransaction(async () => {
            // Delete child documents
            const childDelete = await childModel.deleteMany(childQueryObject, { session });
            if (childDelete.deletedCount === 0) {
                throw new Error("No child records deleted");
            }

            // Delete parent document
            const parentDelete = await parentModel.deleteOne(parentQueryObject, { session });
            if (parentDelete.deletedCount === 0) {
                throw new Error("Parent record not deleted");
            }

            result = {
                status: 200,
                message: "Parent and Child Deleted Successfully",
                data: {
                    parent: parentDelete,
                    child: childDelete
                }
            };
        });

        return result;
    } catch (error) {
        return {
            status: 500,
            message: "Error Deleting Parent and Child",
            error: error.toString()
        };
    } finally {
        session.endSession();
    }
};

module.exports = deleteParentChildService;
