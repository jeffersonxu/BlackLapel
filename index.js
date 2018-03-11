const readline = require('readline');
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

	//Data Parsing
	for(var item in result){
		if(result.hasOwnProperty(item)){
			var obj = result[item].data;

			for(var key in obj){
				var suit = obj[key].row[0];

				if(suit.hasOwnProperty("_mageid") && suit.name != "Suits")
					dict[key] = suit;
			}
		}
	}

	rl.question('What color suit would you like to see or type (all) to see every choice available:\n', (answer) => {
	  	var counter = 0;
	  	var all = false;

	 	if(answer.toString().trim() === "all")
	 		all = true;

		for(var suit in dict){
			if(!dict[suit].meta_keyword.includes(answer.toLowerCase()) && !all)
				continue;
			
			console.log("$" + dict[suit].price + " - " + dict[suit].name); 
			counter++;
		}
	 	
	 	if(counter == 0)
	 		console.log("Sorry, there were no fields found :(");

	 	console.log("\n\n" + counter + " items returned");
	    rl.close();
	});
});