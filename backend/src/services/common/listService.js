// will be used for create lists of products and store to database


const listService = async (request, dataModel, searchArray) => {
    try{
        let pageNo = Number (request.params.pageNo); // Getting the page number from the request params
        let perPage = Number (request.params.perPage); // Getting the number of items per page from the request params
        let searchValue = request.params.searchKeyword; // Getting the search value from the request params
        let userEmail = request.headers['email']; // Getting the user email from the header

        let skipRows = (pageNo - 1) * perPage; // Calculating the number of rows to skip for pagination
        let data;

        if (searchValue!=="0") { // If search value is not "0", filter the data based on the search value
            let searchQuery = {$or: searchArray}; // Creating search query for filtering

            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail}}, // Matching documents based on user email
                {$match: searchQuery }, // Matching documents based on user email and search criteria
                {$facet: {
                    Total : [{$count: "count"}], // Counting the total number of documents
                    Rows : [
                        {$skip: skipRows}, // Skipping rows for pagination
                        {$limit: perPage} // Limiting the number of documents to return
                    ]
                }}
            ]);
        }
        else {
            // If search value is "0", return all documents for the user
            data = await dataModel.aggregate([
                { $match: { userEmail: userEmail}}, // Matching documents based on user email
                {$facet: {
                    Total : [{$count: "count"}], // Counting the total number of documents
                    Rows : [
                        {$skip: skipRows}, // Skipping rows for pagination
                        {$limit: perPage} // Limiting the number of documents to return
                    ]
                }}
            ]); 
        }
        return {status: 200, message: "List of Products", data: data}; // Sending success response with the data
    }
    catch(err){
        console.log(err); // Logging the error
        return {status: 500, message: "Internal Server Error", error: err.message}; // Sending error response
    }
}

module.exports = listService; // Exporting the function to be used in other files