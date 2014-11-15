// TestCase.js
function TestCase() {
  this.getTests = function() {
    // overide in subclass to return array of test method names
  }

  this.setUp = function() {
    // overide in subclass to construct test environment
  }

  this.tearDown = function() {
    // overide in subclass to deconstruct test environment
  }
}

// ExampleTest.js
ExampleTest.prototype = new TestCase()
ExampleTest.prototype.constructor = ExampleTest
function ExampleTest() {
  var tests = [
    "test_thingy"]

  this.getTests = function() {
    return tests
  }

  this.test_thingy = function() {
    assert(false)
  }
}

// TestRunner.js
function TestRunner() {
  var testClasses = []

  this.addTestClass = function(testClass) {
    testClasses.push(testClass)
  }

  this.runTests = function() {
    testClasses.forEach(function(testClass) {
      runTestsFromClass(testClass)
    })
  }

  function runTestsFromClass(testCaseClass) {
    var tests = new testCaseClass().getTests()

    tests.forEach(function(test) {
      runTest(new testCaseClass(), test)
    })
  }

  function runTest(testCase, testName) {
    testCase.setUp()
    testCase[testName]()
    testCase.tearDown()
  }
}

// AssertionFailedError.js
function AssertionFailedError(message) {
  this.name = "AssertionFailedError"
  this.message = message || "An assertion has failed with no error message"
}
AssertionFailedError.prototype = new Error()

// Util.js
function assert(condition, failMessage) {
  if(!condition)
    throw new AssertionFailedError(failMessage)
}

// this file
var runner = new TestRunner()
runner.addTestClass(ExampleTest)
runner.runTests()
