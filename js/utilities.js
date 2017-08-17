app.service('IDGenerator',function(){
    this.generateInterviewID = function(){
        var id = "#"+Math.random().toString(15).slice(2);
        if(!this.is_id_redundant(id)){
            return id;
        }else this.generateInterviewID(); // Recursive function call
    }
    /*
    | Returns false if the given ID doesn't exist in the local storage. Means it is not redundant
    */
    this.is_id_redundant = function(id){
        var items = JSON.parse(localStorage.getItem("ta_records"));
        if(items===null) return false;
        for(var i in items){
            if(items[i].val_interview_id===id) return true;
        }
        return false;
    }
});

app.service('storage',function(){
    this.store_ta_record = function(records){
            if(records==null || records =="") return false;
            var items = JSON.parse(localStorage.getItem("ta_records"));
            var ta_records = (items===null)?[]:items;
            ta_records.push(records);
            localStorage.setItem("ta_records",JSON.stringify(ta_records));
            console.log(JSON.parse(localStorage.getItem("ta_records")));
    }
});