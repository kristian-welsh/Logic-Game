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
function TestRunner() {
  var testClasses = []

  this.addTest = function(testClass) {
    testClasses.push(testClass)
  }

  this.runTests = function() {
    testClasses.forEach(function(testClass) {
      runTestsFromClass(testClass)
    })
  }

  function runTestsFromClass(testCaseClass) {
    var tests = testCaseClass.getTests()

    tests.forEach(function(test) {
      runTest(new testCaseClass(), test)
    })
  }

  function runTest(testCase, testName) {
    testCase[testName]()
  }
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
var runner = new TestRunner()
runner.addTest(ExampleTest)
runner.runTests()
