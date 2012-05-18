module.exports = function createTest(name){
	var _bddText           = ''
	var _name              = name
	var _premiseList       = ['_']  // The 'Given'
	var _premiseResultList = []
	var _currentPremise    = 0
	var _action            =  '' // <STRING> describing the 'When' in gerund
	var _doTest                  // <FUNCTION> which will execute the test >>MUST RETURN SOMETHING<<
	var _postCondition           // <STRING> describing the post-conditions in natural language, the 'Then'
	var _expected                // <OBJECT> JSON which will describe the correct result
	var _doCleanUp               // <FUNCTION> in charge of the housekeeping of the test environment
	var _chainStarted      = false
	var _chainStarted      = false
	
	return {
		given: function(description, premise) {
			_premiseList.push(function () {				
				_bddText += "\t "
				_bddText += description
				premise()
				_bddText += "\n\tand\n"
			})
		}
		,when: function(action, doTest){
			_action = action
			_doTest = doTest
		}
		,then: function (postCondition, expectedObject){
			_postCondition = postCondition
			_expected      = expectedObject
		}
		,setCleanUp: function(cleanUp){
			_doCleanUp = cleanUp
		}

		// Runs the premise inside a try/catch block and
		// optionally stores the execution result in the
		// _premiseResultList[]
		,assertPremise: function(result){
			_premiseResultList[_currentPremise] = result
			_currentPremise = _currentPremise + 1

			if (typeof(_premiseList[_currentPremise]) === 'function') {
				_premiseList[_currentPremise]()
			} else {
				_doTest()
			}
		}

		,assertResult: function(response){
			try{
				;(function cmpObjects(expected, returned, ignoredValuesList){
					for (var key in expected){
					    // functions wont be compared
					    if (typeof(expected[key]) === 'function')
					        continue

					    // test if the key is missing 
					    var err = ''
					    if(! returned.hasOwnProperty(key)){ 
					        err = "returned object is missing the key '" + key + "'"
					        throw err
					    }

					    if (ignoredValuesList[key] !== undefined)
					    	continue

					    // wrong value
					    if( (typeof(expected[key]) === 'number') || (typeof(expected[key]) === 'string') || (typeof(expected[key]) === 'boolean')) {
					    	if (expected[key] !== returned[key]) { //Test the value
					            err = "Unexpected value '" + returned[key] + "' for key '" + key + "'. Expected '" + expected[key] + "'"
					            throw err
					        }
				        }

				        if(typeof(expected[key]) === 'object'){ 
				            cmpObjects(expected[key], returned[key])
				        }
				    }
				})(_expected, response)

				_bddText += "When:\n\t" + _hypothesis.action + 
				"\nThen:\n\t" + _postCondition
				console.log(_bddText += "\n\n>> Test '" + _name + "' passed. \\o/")
			}catch(err){
				console.log("\nTest '" + _name + "' failed")
				console.log(err + '\n')
			}	
		}
		,run: function(){
			_bddText += "\n>> Test '" + _name + "' is now running. \nGiven: \n"
				
			/* calling the 1st function in the pre-conditions chain */
			this.assertPremise()	
		}	
		,getPremiseResultList: function(){
			return _premiseResultList
		}
	}
}

