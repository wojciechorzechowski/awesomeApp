var ContractorCalcExample = angular.module('ContractorCalcExample', []);

ContractorCalcExample.controller('getSettings', ['$scope', '$http', function($scope, $http) {
		
    	$http.get('http://localhost:8080/countries').
        success(function(data) {
            $scope.countries = data;
        });
    	
    	$scope.formData={};
    }]);


