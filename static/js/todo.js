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
      todo.done = response.data[i].done;
      todo.id = response.data[i].id;
      $scope.todoList.push(todo);
    }
  });
  $scope.saveData = function() {
    const data = { todo_text: $scope.todoInput, done: false };
    $http.put("/todo/api", data);
  };
  $scope.todoAdd = function() {
    $scope.todoList.push({ todoText: $scope.todoInput, done: false });
    $scope.todoInput = "";
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
