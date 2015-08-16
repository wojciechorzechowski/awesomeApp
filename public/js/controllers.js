var ContractorCalcExample = angular.module('ContractorCalcExample', []);

ContractorCalcExample.config([ '$httpProvider', function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
} ]);

ContractorCalcExample.factory('CurrencyRatesSource', [
		'$http',
		function($http) {
			return {
				get : function(callback) {
					$http.get('http://www.nbp.pl/LastA.xml').success(
							function(data, status) {
								// send the converted data back
								// to the callback function
								//console.log("type of data:"+typeof data)
								//console.log(data);
								callback(x2js.xml_str2json(data));
							})
				}
			}
		} ]);

ContractorCalcExample.factory('CountriesSource', [
		'$http',
		function($http) {
			return {
				get : function(callback) {
					$http.get('http://localhost:8080/countries').success(
							function(data, status) {
								// send the converted data back
								// to the callback function
								callback(data);
							})
				}
			}
		} ]);

ContractorCalcExample
		.controller(
				'getSettings',
				[
						'$scope',
						'$http',
						'CurrencyRatesSource',
						'CountriesSource',
						function($scope, $http, CurrencyRatesSource,
								CountriesSource) {

							$scope.calculateResult = function() {
								console.log("asasdadasd");
								rate = $scope.currencyRate; 
								console.log("typeof= "+typeof $scope.currencyRate);
								//console.log($scope.currencyRate);
								console.log("rnd");
								$scope.result.monthNet = 22 * $scope.formData.hourPrice*rate;
								$scope.result.monthNet.toFixed(2);
								console.log("l"+$scope.result.monthNet);
								$scope.result.fixedCost = $scope.selectedCountry.fixedCost*rate;
								$scope.result.tax = $scope.selectedCountry.tax
										* $scope.result.monthNet / 100;
							};

							$scope.setCountry = function() {
								console.log("in set Country"+$scope.countries);
								for (var number in $scope.countries)
									{
										country = $scope.countries[number];
										if (country.id == $scope.formData.selected){
											$scope.selectedCountry = country;
										}
									};
								$scope.currencyRate = getCurrencyRate($scope.selectedCountry.currencyCode);
								$scope.calculateResult();
							};

							getCurrencyRate = function(currency) {
								console.log("in getCurrencyRate");
								if (typeof $scope.currencyRates === 'undefined') {
								    return 1;
								}
								
								table =$scope.currencyRates.tabela_kursow.pozycja_asArray;
								
								for (var number in table) {
									if (table[number].kod_waluty == currency) {
										return Number(table[number].kurs_sredni.replace(',','.'));
									}
								}
								
								return 1;
								
							};

							
							$scope.formData = {};
							$scope.formData.selected=0;
							$scope.formData.hourPrice = 0;
							
							setCurrencyRates = function(data) {
								$scope.currencyRates = data;
							}
							CurrencyRatesSource.get(setCurrencyRates);

							setCountries = function(data) {
								$scope.countries = data;
								$scope.setCountry();
							}
							CountriesSource.get(setCountries);

							$scope.result = {};

						} ]);
