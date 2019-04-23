const app = angular.module("toDo", []);
// GET CSRF TOKEN!!
app.config([
  "$httpProvider",
  function($httpProvider) {
    $httpProvider.defaults.headers.common["X-Requested-With"] =
      "XMLHttpRequest";
    $httpProvider.defaults.xsrfCookieName = "csrftoken";
    $httpProvider.defaults.xsrfHeaderName = "X-CSRFToken";
  }
]);
app.controller("toDoController", function($scope, $http) {
  // GET LIST
  $http.get("/todo/api").then(function(response) {
    $scope.todoList = [];
    for (let i = 0; i < response.data.length; i++) {
      const todo = {};
      todo.todoText = response.data[i].todo_text;
      todo.todoDesc = response.data[i].todo_desc;
      todo.done = response.data[i].done;
      todo.date = response.data[i].created_date.split`T`[0];
      todo.id = response.data[i].id;
      $scope.todoList.push(todo);
    }
  });
  $scope.saveData = function() {
    const data = {
      todo_text: $scope.todoInput,
      todo_desc: $scope.todoDescInput,
      done: false
    };
    $http.put("/todo/api", data);
  };
  $scope.todoAdd = function() {
    $scope.todoList.push({
      todoText: $scope.todoInput,
      todo_desc: $scope.todoDescInput,
      done: false
    });
    $scope.todoInput = "";
    $scope.todoDescInput = "";
  };
  $scope.remove = function() {
    const oldList = $scope.todoList;
    ($scope.todoList = []),
      angular.forEach(oldList, function(todo) {
        if (todo.done) {
          $http.delete("/todo/api/" + todo.id + "/");
        } else {
          $scope.todoList.push(todo);
        }
      });
  };
});
