'use strict';

angular.module('myApp.contacts', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'contacts/contacts.html',
    controller: 'ContactsCtrl'
  });
}])

.controller('ContactsCtrl', ['$scope','$firebaseArray', function($scope, $firebaseArray) {
	console.log("ContactsCtrl online!");


	var ref = new Firebase('https://flickering-inferno-9529.firebaseio.com');

	$scope.contacts = $firebaseArray(ref);

	$scope.addFormShow = true;
	$scope.editFormShow = false;

	$scope.showEditForm = function(contact){
		$scope.addFormShow = false;
		$scope.editFormShow = true;

		$scope.id = contact.$id;
		$scope.name = contact.name;
		$scope.email = contact.email;
		$scope.phone = contact.phone;
	}

	$scope.addContact = function(){
		console.log('Adding Contact...')

		$scope.contacts.$add({
			name: $scope.name,
			email: $scope.email,
			phone: $scope.phone
		}).then(function(ref){
			var id = ref.key();
			console.log('Added Contact '+id);


			$scope.name = '';
			$scope.email = '';
			$scope.phone = '';
		})
	}

	$scope.editContact = function(){
		var id = $scope.id;

		var record = $scope.contacts.$getRecord(id);

		record.name = $scope.name;
		record.email = $scope.email;
		record.phone = $scope.phone;

		//save
		$scope.contacts.$save(record).then(function(ref){
			console.log(ref.key);
		});

		$scope.name = '';
		$scope.email = '';
		$scope.phone = '';

		$scope.addFormShow = true;
		$scope.editFormShow = false;
	}

	$scope.removeContact = function(contact){
		$scope.contacts.$remove(contact);
	}

}]);