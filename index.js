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
	var dict = {}; 

 	var result = JSON.parse(body);
 	var data = result[0].data;

	//Data Parsing
	for(var key in data){
		if(data.hasOwnProperty(key)){
			var suit = data[key].row[0];
			var keyWords = data[key].row[4];

			for(var word in keyWords){
				var index = keyWords[word];
				
				if(suit.hasOwnProperty("_mageid") && suit.name != "Suits"){
					var obj = {
							name: suit.name,
							price: suit.price
						}

					//If the index exists just push
					if(dict[index])
						dict[index].push(obj)
					//If index doesn't exist, create new array and push
					else{
						dict[index] = [];  
						dict[index].push(obj);
					}
				}
			}
		}	
	}

	rl.question('What color suit would you like to see or type (all) to see every choice available:\n', (answer) => {
	  	var counter = 0;

		if(answer == "all"){
			for(var prop in dict){
				var suits = dict[prop];

				for(var suit in suits)
					console.log("$" + suits[suit].price + "\t: " + suits[suit].name);
			}
		}
		else{
			if(dict[answer]){
				dict[answer].forEach(function(suit) {
					console.log("$" + suit.price + "\t: " + suit.name);
					counter++;
				});
			}
			else
				console.log("Sorry, there were no fields found :(")
		}

	 	console.log("\n\n" + counter + " items returned");
	    rl.close();
	});
});