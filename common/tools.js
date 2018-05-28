
exports.getArr = function (arr){
	var newArr = [];
	for (var i = 0; i < arr.length; i++) {
		newArr[i] = arr[i].department;
	}
	return newArr;
}

exports.distinct = function (arr) {
	var len = arr.length;
	arr.sort(function(a,b){  //对数组进行排序才能方便比较
		return a - b;
	})
	function loop(index){
		if(index >= 1){
			if(arr[index] === arr[index-1]){
			arr.splice(index,1);
		}
			loop(index - 1); //递归loop函数进行去重
		}
	}
	loop(len-1);
	return arr;
};
