// ExampleTest.js
function ExampleTest() {
  this.test_thingy = function() {
    assert(false)
  }
}

ExampleTest.getTests = function() {
  var tests = [
    "test_thingy"]
  return tests
}

// TestRunner.js
function runTests(testClass) {
  var tests = testClass.getTests()
  for (var i = 0; i < tests.length; ++i)
      new testClass()[tests[i]]()
}

// Util.js
function assert(condition, failMessage) {
  message = "An assertion has failed with no error message"
  if(failMessage)
    message = "An assertion has failed with this error message: " + failMessage 
  if(!condition)
    throw message
}

// this file
runTests(ExampleTest)
