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
								$scope.result.monthNet = 22 * $scope.formData.hourPrice;
								$scope.result.fixedCost = $scope.selectedCountry.fixedCost;
								$scope.result.tax = $scope.selectedCountry.tax
										* $scope.result.monthNet / 100;
							};

							$scope.setCountry = function() {
								$scope.selectedCountry = $scope.formData.selected;
								$scope.currencyRate = getCurrencyRate($scope.selectedCountry.countryCurrency);
							};

							getCurrencyRate = function(bla) {
								//$scope.currencyRates.tabela_kursow
								//<pozycja>
								//<nazwa_waluty>bat (Tajlandia)</nazwa_waluty>
								//<przelicznik>1</przelicznik>
								//<kod_waluty>THB</kod_waluty>
								console.log($scope.currencyRates('tabelakorsow/pozycja/:kod_waluty/privileges', {kod_waluty: '@id'});
								$scope.currencyRates.tabela_kursow);
							};

							$scope.hourPrice = 0;
							$scope.formData = {};
							
							setCurrencyRates = function(data) {
								$scope.currencyRates = data;
							}
							CurrencyRatesSource.get(setCurrencyRates);

							setCountries = function(data) {
								$scope.countries = data;
							}
							CountriesSource.get(setCountries);

							$scope.result = {};

						} ]);
