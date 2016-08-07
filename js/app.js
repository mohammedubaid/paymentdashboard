angular.module('myApp', ['ui.bootstrap'])
.factory('UserData', function ($http) {
    return {
        get: function () {
            console.log("inside function");
            return $http.get('js/data.json');
        }
    };
})
.controller('mainController', function($scope,$http,UserData) {
  $scope.dummyData = new Array()
  ,$scope.filteredData = []
  ,$scope.currentPage = 1
  ,$scope.numPerPage = 10
  ,$scope.maxSize = 5;
  $scope.sortType     = "MerchantName"; // set the default sort type
  $scope.sortReverse  = false;  // set the default sort order
  $scope.search   = {};     // set the default search/filter term
 
  $(window).bind("load resize", function() {
    var topOffset = 50;
    var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
    if (width < 768) {
        $('div.navbar-collapse').addClass('collapse');
        topOffset = 100; // 2-row-menu
    } else {
        $('div.navbar-collapse').removeClass('collapse');
    }

    var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
    height = height - topOffset;
    if (height < 1) height = 1;
    if (height > topOffset) {
        $("#page-wrapper").css("min-height", (height) + "px");
    }
  });
  $(document).ready(function(){
    setTimeout(function() {
      $(".delete-btn").click(function () {
        var cnfrm = confirm("Are you sure?");
        if (cnfrm == true) {
          $(this).parents('tr').remove();
        } else {
        }
      });    
    }, 100);
    
  })
  

  var url = window.location;
  // var element = $('ul.nav a').filter(function() {
  //     return this.href == url;
  // }).addClass('active').parent().parent().addClass('in').parent();
  var element = $('ul.nav a').filter(function() {
   return this.href == url;
  }).addClass('active').parent();

  while(true){
      if (element.is('li')){
          element = element.parent().addClass('in').parent();
      } else {
          break;
      }
  }


  UserData.get().then(function (msg) {
    $scope.dummyData = msg['data'];
    console.log($scope.dummyData); 
    $('#table').bootstrapTable({
      data: $scope.dummyData
  });   
    $scope.$watch('currentPage + numPerPage', function() {
      var begin = (($scope.currentPage - 1) * $scope.numPerPage)
      , end = begin + $scope.numPerPage;    
      $scope.filteredData = $scope.dummyData.slice(begin, end);
    });
  });




  
  

  

  
});