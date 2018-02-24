const readline = require('readline');
var request = require('request');
var arraySort = require('array-sort');

//Initializes "Readline" to get user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//API Call
request('https://blacklapel.com/api/product/category/suits', function (error, response, body) {
	var list = []; 
 	var data = JSON.parse(body);

	//Data Parsing
    for(var column in data){
  		var item = data[column];

  		for(var key in item){
	  		var row = item[key];
	  		
	  		for(var obj in row){
	  			var row2 = row[obj];

	  			for(var obj2 in row2){
		  			var row3 = row2[obj2];

	  				var clothingRow = row2[obj2];

	  				for(var index in clothingRow){
	  					//if that object exists
  						if(clothingRow[index]){
  							if(clothingRow[index].hasOwnProperty("_mageid"))
  								list.push(clothingRow[index]);
  						}
  					}
	  			}
	  		}
  		}
  	}

  //Last element is always just the object title "suits"
  list.pop(list.length);

  //Sorts array by name (A-Z)
  var sortedList = arraySort(list, 'name');

  rl.question('What color suit would you like to see or type (all) to see every choice available:\n', (answer) => {
  	var counter = 0;

 	if(answer.toString().trim() === "all"){
 		for(var i = 0; i  < sortedList.length; i++){
  			console.log("$" + sortedList[i].price + " - " + sortedList[i].name); 
  			counter++;
 		}
 	}
 	else{
 		for(var j = 0; j < sortedList.length; j++){
 			if(sortedList[j].meta_keyword.includes(answer.toLowerCase())){
  				console.log("$" + sortedList[j].price + " - " + sortedList[j].name); 
 				counter++
 			}
 		}
 	}

 	if(counter == 0)
 		console.log("Sorry, there were no fields found :(");

 	console.log("\n\n" + counter + " items returned");
    rl.close();
  });

});