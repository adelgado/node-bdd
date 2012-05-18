var createTest = require('./bdd')
var http 	   = require('http')


;(function (){
	var number_one = 3
	var number_two = 4

	var test = createTest("send two random numbers to server")
	//must call test.validatePremise()
	test.given("that we have a random number", function(){
		test.assertPremise(3)
	}) 

	//must call test.validatePremise()
	test.given("that we have another random number", function(){
		test.assertPremise(4)
	}) 

	//must call test.validate()
	test.when("sending the random numbers to the server", function () {
		var options = {  
           host: 'localhost'   
           ,port: 3000
           ,path: '/' + (test.getPremiseResultList())[1] + '?n2=' + (test.getPremiseResultList())[2]
           ,method: 'POST'
           ,headers: {
          		'Content-Type'   : 'application/json'
     		}	  
      	}

      	var req = http.request(options, function(res) {
			if (res.statusCode === 200) {
				res.setEncoding('utf8')
				res.on('data', function (chunk) {
					console.log("Body:")
					console.log(chunk)
					test.assertResult(JSON.parse(chunk))
				})	
			}
	    })

		req.end()
		
		//test.validate({success:true, id:10})
   	})
	//must pass the expected json
	test.then("we should retrieve their sum"
		, { content: (number_one + number_two) })

	test.run()
})()