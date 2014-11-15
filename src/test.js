// TestFailedError.js
TestFailedError.prototype = new Error()
function TestFailedError(message) {
  this.name = "Test Failed Error"
  this.message = message || "A test has failed with no message"
}

// Assert.js
function Assert() {
  this.fail = function(message) {
    message = message || ""
    throw new TestFailedError(message)
  }

  this.assertTrue = function(condition, message) {
    if (!condition)
      this.fail(message)
  }

  this.assertFalse = function(condition, message) {
    assertTrue(!condition, message)
  }
}

// TestCase.js
TestCase.prototype = new Assert()
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
    this.assertTrue(false)
  }
}

// TestRunner.js
function TestRunner() {
  var testClasses = []
  var resultsMessage = ""

  this.addTestClass = function(testClass) {
    testClasses.push(testClass)
  }

  this.runTests = function() {
    resultsMessage = ""
    testClasses.forEach(function(testClass) {
      runTestsFromClass(testClass)
    })
    print(resultsMessage)
  }

  function runTestsFromClass(testCaseClass) {
    var tests = new testCaseClass().getTests()

    tests.forEach(function(test) {
      runTest(new testCaseClass(), test)
    })
  }

  function runTest(testCase, testName) {
    testCase.setUp()
    runTestRescuingFailures(testCase, testName)
    testCase.tearDown()
  }

  function runTestRescuingFailures(testCase, testName) {
    try {
      testCase[testName]()
      resultsMessage += "."
    } catch (error) {
      if (error instanceof TestFailedError)
        resultsMessage += "F"
      else
        resultsMessage += "E"
    }
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

function print(output) {
  console.log(output)
}

// this file
var runner = new TestRunner()
runner.addTestClass(ExampleTest)
runner.runTests()
