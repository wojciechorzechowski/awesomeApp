var ContractorCalcExample = angular.module('ContractorCalcExample', []);

ContractorCalcExample.config([ '$httpProvider',   function($httpProvider) {
	//for CORS
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

//providing currency rates
ContractorCalcExample
		.factory(
				'CurrencyRatesSource',
				[
						'$http',
						function($http) {
							return {
								get : function(callback, currencyAddress) {
									$http
											.get(currencyAddress)
											.then(
													function(response) {
														// this callback will be
														// called asynchronously
														// when the response is
														// available
														callback(x2js
																.xml_str2json(response.data));
													},
													function(response) {
														// called asynchronously
														// if an error occurs
														// or server returns
														// response with an
														// error status.
														alert("Pobranie " + currencyAddress + " nie powiodło się");
													});
								}
							}
						} ]);
//providing countries configuration
ContractorCalcExample
		.factory(
				'CountriesSource',
				[
						'$http',
						function($http) {
							return {
								get : function(callback, countriesAddress) {
									$http
											.get(
													countriesAddress)
											.then(
													function(response) {
														// this callback will be
														// called asynchronously
														// when the response is
														// available
														callback(response.data);
													},
													function(response) {
														// called asynchronously
														// if an error occurs
														// or server returns
														// response with an
														// error status.
														alert("Pobranie " + countriesAddress + " nie powiodło się");
													});
								}
							}
						} ]);


									
ContractorCalcExample.factory('Calculations', [ function() {
	var daysInMonth = 22;
	
	result = {}
	
	return {
		calculate: function(callback, hourPrice, rate, country){
			if (typeof hourPrice === 'undefined'){
				hourPrice=0;};
			result.monthNet = daysInMonth * hourPrice * rate;
			result.fixedCost = country.fixedCost * rate;
			result.tax = country.tax * result.monthNet / 100;
			callback(result);
		}		
	}
} ]);

ContractorCalcExample
		.controller(
				'AppController',
				[
						'$scope',
						'$http',
						'CurrencyRatesSource',
						'CountriesSource',
						'Calculations',
						function($scope, $http, CurrencyRatesSource,
								CountriesSource, Calculations) {

							//modifying results for template
							changeResults = function(result)
							{
								for (i in result){
									if (typeof result[i] === 'undefined'){
										result[i]=0;
								} else
									{
									result[i] = result[i].toFixed(2);
									result[i] = result[i].replace('.',',');
									}
								}
								return result;
							};
							
							//sets result of calculation for template
							//used as callback function in calculate
							setResult = function(result){
								$scope.result = changeResults(result); 
							}
							
							//launches calculation with callback : setResults
							//I feel that there is a better way to do it
							$scope.calculate = function(){
								rate = 0;
								if (typeof $scope.selectedCountry !=='undefined')
									{rate = getCurrencyRate($scope.selectedCountry.currencyCode);};
								
								return Calculations.calculate(setResult, $scope.formData.hourPrice, rate, 
										$scope.selectedCountry);
							}
							
							
							//launched when changing country
							$scope.setCountry = function() {
								console.log("in set country");
								
								//this code looks bad - should be changed - figure out how to use filter
								for ( var number in $scope.countries) {
									country = $scope.countries[number];
									if (country.id== $scope.formData.selected) {
										$scope.selectedCountry = country;
									}
								};
								$scope.calculate();
							};

							//returns currency rate for provided currency
							getCurrencyRate = function(currency) {
								console.log("in getCurrencyRate");
								if (typeof $scope.currencyRates === 'undefined') {
									console.log("rate - undefined")
									return 1;
								}

								table = $scope.currencyRates.tabela_kursow.pozycja_asArray;

								for ( var number in table) {
									if (table[number].kod_waluty == currency) {
										console.log("currency rate found")
										return Number(table[number].kurs_sredni
												.replace(',', '.'));
									}
								}
								console.log("currency rate not found");
								return 1;

							};

							
							
							//linked to form in template
							$scope.formData = {
									selected : 0//,
									//hourPrice
							};
							
							//getting currency rates
							setCurrencyRates = function(data) {
								$scope.currencyRates = data;
								$scope.calculate();
							}
							CurrencyRatesSource.get(setCurrencyRates, 'http://www.nbp.pl/LastA.xml');

							//getting countries list
							setCountries = function(data) {
								$scope.countries = data;
								$scope.setCountry();
							}
							CountriesSource.get(setCountries, 'http://localhost:8080/countries');

						} ]);
