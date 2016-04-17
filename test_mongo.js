var mongoose = require('mongoose');
// mongoose.connect('mongodb://istaging:1234@ds064748.mlab.com:64748/mLabMongoDB2');
// mongoose.connect('mongodb://13.67.63.163:2701');


var start = new Date().getTime();

// mongoose.connect('mongodb://mongodbrs2-x7vwm2u8.cloudapp.net:27018');
//mongoose.connect('mongodb://node:node@mongo.onmodulus.net:27017');
mongoose.connect('mongodb://root:Iwm7TshfkVJz@localhost:27017');

// mongoose.connect('mongodb://mongodbrs1-px566s12.cloudapp.net:27017');


var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

	var end = new Date().getTime();
	var time = end - start;
	console.log(time)

  	console.log('connection success:   '+time)
});


var kittySchema = mongoose.Schema({
    name: String
});


var count =0;

function insertObj(){
	var start = new Date().getTime();
	
    return new Promise(function(resolve, reject) {
		var Kitten = mongoose.model('Kitten', kittySchema);
		var silence = new Kitten({ name: 'abc' });
		// console.log(silence.name); // 'Silence'

		silence.save(function (err, result) {

			var end = new Date().getTime();
			var time = end - start;

			console.log(count + " time: "+time/1000)
			count++
            resolve()

		  if (err) return console.error(err);
		  // console.log(result);
		});
	})

}

	
var genNpro = function(N){
	console.log("  --genNpro")

	var  arr= []
	for(var i=0;i<N;i++){
		arr.push (insertObj())
	}
	return arr
}


	var start = function (N){
		console.log("  --start")

		var startt = new Date().getTime();

		Promise.all(genNpro(N)).then(function(values) { 
		  console.log(values); // [3, 1337, "foo"] 

		  return Promise.all(genNpro(N))
		}).then(function(values2) {

			var end = new Date().getTime();
			var time = end - startt;

		  console.log(values2); 
			console.log("time: "+time/1000 + "s")

		});
	}

start(10)
