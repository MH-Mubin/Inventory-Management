
const listOneJoinService = async (request, dataModel, searchArray, joinStage) => {
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
                joinStage,
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
                joinStage,
                {$facet: {
                    Total : [{$count: "count"}], // Counting the total number of documents
                    Rows : [
                        {$skip: skipRows}, // Skipping rows for pagination
                        {$limit: perPage} // Limiting the number of documents to return
                    ]
                }}
            ]); 
        }
        return {status: 200, message: "List of expenses", data: data}; // Sending success response with the data
    }catch (error) {
        return {
            message: "Error in listOneJoinService",
            data: null,
            error: error.message
        };
    }
}

module.exports = listOneJoinService; // Exporting the function to be used in other files