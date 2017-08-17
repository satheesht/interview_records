var app = angular.module('tq_database', []);

app.controller('tq_db_controller', function($scope,IDGenerator,storage) {
    $scope.form_fields = {
        val_purpose:"Visa",
        val_city: "London",
        val_address:"tset1",
        val_interviewer:"tset2",
        val_interviewee:"tset3",
        val_interviewee_email:"tset4",
        val_interviewee_phone:"tset5",
        val_date:"tset6",
        val_interview_id:""
    }
    $scope.error_on = false;
    $scope.submit_ta_records = function(){ console.log("validation started");
        $scope.error_on = true;
        for (var i in $scope.form_fields) {
            if ($scope.form_fields[i] == "") {
                $scope.error_on = true;
                break;
            }
            $scope.error_on = false;
        }
        if(!$scope.error_on){
            if(!storage.store_ta_record($scope.form_fields)){
                $scope.error_on = true;
                $scope.form_fields.val_interview_id = IDGenerator.generateInterviewID();
            }
        }
    }
    $scope.generateID = function(){
       $scope.form_fields.val_interview_id = IDGenerator.generateInterviewID();
    }
    
});