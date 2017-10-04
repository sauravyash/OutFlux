// A simple test to verify a visible window is opened with a title
var Application = require('spectron').Application
var assert = require('assert')

var app = new Application({
  path: 'outFlux-linux-x64/outflux'
})

app.start().then(function () {
  // Check if the window is visible
  return app.browserWindow.isVisible();
}).then(function (isVisible) {
  console.log('Browser Window is visible');
  // Verify the window is visible
  assert.equal(isVisible, true);
}).then(function () {
  console.log('Browser Window is visible (verified)');
  // Get the window's title
  return app.client.getTitle()
}).then(function (title) {
  console.log('Browser Window title matched to outflux');
  // Verify the window's title
  assert.equal(title, 'outflux')
}).then(function () {
  console.log('verified above');
  // Stop the application
  return app.stop()
}).catch(function (error) {
  // Log any failures
  console.error('Test failed', error.message)
})
