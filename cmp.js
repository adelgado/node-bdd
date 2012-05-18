
try {
	;(function cmpObjects(expected, returned, ignoreValueList) {
			for (var key in expected) {
	        	if (typeof(expected[key]) === 'object') {
		            cmpObjects(expected[key], returned[key], ignoreValueList)
		            continue
		        }

		        if (typeof(ignoreValueList) !== 'undefined') {
			    	if (ignoreValueList.indexOf(key) !== -1) {
			    		continue
			    	}
			    }

				var err
			    // test if the key is missing 
			    if( !returned.hasOwnProperty(key)) { 
			        err = "returned object is missing the key '" + key + "'"
			        throw err
			    }

			    

			    // wrong value
		    	if (expected[key] !== returned[key]) { //Test the value
		            err = "Unexpected value '" + returned[key] +
		                  "' for key '" + key + "'. Expected '"+
		                  expected[key] + "'"
		            throw err
		        }
		    }
		})({oii:"çi" , ola : { hry : true }}, {oii:"çi", ola : { hey : true }}, ["hry"])
	}catch(err) {
		console.log(err + '\n')
	}	
