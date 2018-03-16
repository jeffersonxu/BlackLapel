const readline = require('readline');
var arraySort = require('array-sort');
var request = require('request');

//Initializes "Readline" 
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

//API Call
request('https://blacklapel.com/api/product/category/suits', function (error, response, body) {
	var dict = { all: [] }; 
 	const data = JSON.parse(body)[0].data;

	//Data Parsing
	console.time('parsing');
	for(var key in data){
		var suit = data[key].row[0];
		var keyWords = data[key].row[4];

		var obj = {name: suit.name, price: suit.price};
		dict.all.push(obj);

		for(var word in keyWords){
			var index = keyWords[word];
			
			if(dict[index])
				dict[index].push(obj);
			else{
				dict[index] = [];  
				dict[index].push(obj);
			}
		}
	}
	console.timeEnd('parsing');

	//Sorting
	for(var x in dict){
		var sorted = arraySort(dict[x], "name");
		dict[x] = sorted;
	}

	rl.question('What color suit would you like to see or type (all) to see every choice available:\n', (answer) => {
		console.time('filtering');

		if(dict[answer]){
			dict[answer].forEach(function(suit) {
				console.log("$" + suit.price + "\t: " + suit.name);
			});
		}
		else
			console.log("Sorry, there were no fields found :(")
		
	 	console.log("\n\n" + dict[answer].length + " items returned");
	 	console.timeEnd('filtering');
	 	console.log(process.memoryUsage());
	    rl.close();
	});
});