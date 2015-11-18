

/**
 * A set of tests for blocks in the UI controls section of the toolbox
 */

var elementUtils = require('../../../src/applab/designElements/elementUtils');
var testUtils = require('../../util/testUtils');
var TestResults = require('@cdo/apps/constants').TestResults;
var _ = require('lodash');

module.exports = {
  app: "applab",
  skinId: "applab",
  levelFile: "levels",
  levelId: "ec_simple",
  tests: [
    // These tests exercise the utilities in elementUtils.js. These exist inside
    // a level test so we have an easy way to create elements to test the utils on.
    {
      description: "text area and text input detection works",
      editCode: true,
      xml: '',
      runBeforeClick: function (assert) {
        $('#designModeButton').click();
        testUtils.dragToVisualization('TEXT_INPUT', 0, 0);
        testUtils.dragToVisualization('TEXT_AREA', 0, 100);

        testUtils.runOnAppTick(Applab, 2, function () {
          var text_input1 = $('#text_input1')[0];
          assert(elementUtils.isTextInput(text_input1), "text_input1 is a text input");
          assert(!elementUtils.isContentEditable(text_input1), "text_input1 is not content editable");
          var text_area1 = $('#text_area1')[0];
          assert(elementUtils.isContentEditable(text_area1), "text_area1 is content editable");
          assert(!elementUtils.isTextInput(text_area1), "text_area1 is not a text input");

          Applab.onPuzzleComplete();
        });
      },
      expected: {
        result: true,
        testResult: TestResults.FREE_PLAY
      },
    },
  ]
}