/**
 * The function `checkAssociateService` checks if there are any associates matching the given query
 * object in the associate model.
 * @param queryObject - The `queryObject` parameter is an object that contains the criteria used to
 * filter the data when querying the `associateModel` collection. It is used to match documents in the
 * collection based on the specified conditions.
 * @param associateModel - The `associateModel` parameter in the `checkAssociateService` function is
 * likely a model or schema representing associates in a database. It is used to perform an aggregation
 * operation to match documents based on the `queryObject` provided.
 * @returns The `checkAssociateService` function is being exported and returned as a module. This
 * function takes in a `queryObject` and an `associateModel`, performs an aggregation operation on the
 * `associateModel` based on the `queryObject`, and then returns a boolean value indicating whether
 * there are any results in the aggregated data. If an error occurs during the aggregation operation,
 * the function will return `false
 */


const checkAssociateService = async (queryObject, associateModel) => {
    try{
        let data = await associateModel.aggregate([
            {$match: queryObject}
        ])
        return data.length > 0;
    }
    catch(error){
        return false
    }
}

module.exports = checkAssociateService;