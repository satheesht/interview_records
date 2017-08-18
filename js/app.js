var app = angular.module('tq_database', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.
	when("/",{templateUrl:"page_1.html",controller:"tq_db_controller",controllerAs:"c1"}).
	when("/list",{templateUrl:"page_2.html",controller:"controller2",controllerAs:"c2"}).
	otherwise({
		redirectTo:"/index"
	});
});

app.controller("tq_db_list_controller",function($scope,storage){

});

app.controller('tq_db_controller', function($scope,IDGenerator,storage,ta_validate) {
    $scope.form_fields = {
        val_purpose:"Visa",
        val_city: "London",
        val_address:"tset1",
        val_interviewer:"tset2",
        val_interviewee:"tset3",
        val_interviewee_email:"tset4@test.com",
        val_interviewee_phone:"666-666-6666",
        val_date:"tset6",
        val_interview_id:""
    }
    $scope.cities = ['','London','Brington','Belfast','Cardiff','Newcastle','Elsewhere'];
    $scope.error_on = false;
    $scope.invalid_phone = false;
    $scope.invalid_email = false;
    $scope.required_missing= false;
    $scope.submit_ta_records = function(){ 
        if($scope.validate($scope.form_fields)){
            if(!storage.store_ta_record($scope.form_fields)){
                $scope.form_fields.val_interview_id = IDGenerator.generateInterviewID();
            }
        }else{
            $scope.error_on = true;
        }
    }
    $scope.validate = function(records){
        ta_validate.checkPhone(records.val_interviewee_phone)?$scope.invalid_phone=false:$scope.invalid_phone=true;
        ta_validate.checkEmail(records.val_interviewee_email)?$scope.invalid_email=false:$scope.invalid_email=true;
        ta_validate.checkRequired(records)?$scope.required_missing = false:$scope.required_missing = true;
        return !($scope.required_missing || $scope.invalid_email || $scope.invalid_phone);
    }
    $scope.generateID = function(){
       $scope.form_fields.val_interview_id = IDGenerator.generateInterviewID();
    }
    
});