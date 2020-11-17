angular.module("app", ["chart.js","datatables"])
// Optional configuration
.config(['ChartJsProvider', function (ChartJsProvider) {
    // Configure all charts
    ChartJsProvider.setOptions({
        chartColors: ['#FF5252', '#4682B4'],
        responsive: true
    });
    // Configure all line charts
    ChartJsProvider.setOptions('line', {
        showLines: true,
    });
}])
.controller("LineCtrl", ['$scope', '$interval', '$http', function ($scope, $interval, $http) {
    /*$scope.labels = ["15/10", "16/10", "17/10", "18/10", "19/10", "20/10", "21/10"];
    $scope.series = ['Temperature', 'Humidity'];
    $scope.data = [
        [65, 59, 80, 81, 56, 55, 40],
        [28, 48, 40, 19, 86, 27, 90]
    ];*/
    $scope.onClick = function (points, evt) {
        console.log(points, evt);
    };
    $scope.options={
        legend:{
            display: true
        },
	elements:{
	    line:{
		fill: false
	    }
	}
    }

    var refresh=()=>{
        $http.get('http://raspberrypi.local:3004/api/modbus').then((response)=>{
            let labels=new Array();
            let temperature=new Array();
            let humidity=new Array();
            angular.forEach(response.data.average,function(value, key){
                labels.push(value.date);
                temperature.push(value.temperature.toFixed(2));
                humidity.push(value.humidity.toFixed(2));
            });
            labels.reverse();
            temperature.reverse();
            humidity.reverse();
            $scope.labels=labels;
            $scope.series=['Temperature (*C)','Humidity (1:5%rh)'];
            $scope.data=[temperature,humidity];
        });
    };
    refresh();
    $interval(refresh,60000)
}])
.controller('DatatablesCtrl', ['$scope','$interval','$http', function ($scope, $interval, $http) {
    var refresh=()=>{
        $http.get('http://raspberrypi.local:3004/api/modbus').then((response)=>{
            $scope.details=response.data.detail;
        });
    };
    refresh();
    $interval(refresh,60000);
}])
//.controller('DatatablesCtrl',DatatablesCtrl)
.filter('formatAsDate',function(){
    return function(dateTime){
        return moment(dateTime).format('YYYY-MM-DD HH:mm');
    }
});

/*function DatatablesCtrl($resource, DTOptionsBuilder, DTColumnDefBuilder){
    var vm=this;
    vm.details=[];
    vm.dtOptions=DTOptionsBuilder.newOptions();
    vm.dtColumnDefs=[
        DTColumnDefBuilder.newColumnDef(0),
        DTColumnDefBuilder.newColumnDef(1),
        DTColumnDefBuilder.newColumnDef(2),
        DTColumnDefBuilder.newColumnDef(3)
    ];
    vm.dtInstance={};
    $resource('/data').query().$promise.then((response)=>{
        vm.details=response.data;
    })
}*/
