class APIFeatures{
    
    constructor(query, queryString){
        this.query = query 
        this.queryString  = queryString 
    }


    search(){
        const keyword = this.queryString.keyword ?{
        name : {
            $regex : this.queryString.keyword,
            $options : 'i'
        }
    } : {}
    
    this.query = this.query.find({...keyword});
    return this
    }


    pagination(resultsPerPage){
        const currentPage = Number(this.queryString.page)||1;
        const skip = resultsPerPage * (currentPage - 1) //Page2 11-20
        this.query = this.query.limit(resultsPerPage).skip(skip);
        return this;        
    }




}



module.exports  = APIFeatures