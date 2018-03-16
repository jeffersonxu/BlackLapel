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
	console.time('parsing');
 	const data = JSON.parse(body)[0].data;
	var dict = { all: [] }; 

	for (let i = 0; i < data.length; i++){
		dict.all.push(i);
		for (let n = 0; n < data[i].row[4].length; n++){
			if (dict.hasOwnProperty(data[i].row[4][n]))
				dict[data[i].row[4][n]].push(i);
			else
				dict[data[i].row[4][n]] = [i];
		}
	}
	console.timeEnd('parsing');

	rl.question('What color suit would you like to see or type (all) to see every choice available:\n', (answer) => {
		console.time('filtering');
		if (dict.hasOwnProperty(answer))
			for (let i = 0; i < dict[answer].length; i++){
				const ind = dict[answer][i];
				console.log(`$${data[ind].row[0].price}\t: ${data[ind].row[0].name}`); }
		else
			console.log('Sorry, there where no fields found :(');
	 	console.log(`\n\n${dict[answer].length} items returned`);
		console.timeEnd('filtering');
		console.log(process.memoryUsage());
		rl.close();
	});
});