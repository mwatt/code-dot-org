require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/main.js":[function(require,module,exports){
(function (global){
'use strict';

var appMain = require('../appMain');
window.Jigsaw = require('./jigsaw');
if (typeof global !== 'undefined') {
  global.Jigsaw = window.Jigsaw;
}
var blocks = require('./blocks');
var levels = require('./levels');
var skins = require('./skins');

window.jigsawMain = function (options) {
  options.skinsModule = skins;
  options.blocksModule = blocks;
  appMain(window.Jigsaw, levels, options);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1aWxkL2pzL2ppZ3Nhdy9tYWluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQUksT0FBTyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztBQUNwQyxNQUFNLENBQUMsTUFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUNwQyxJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsRUFBRTtBQUNqQyxRQUFNLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7Q0FDL0I7QUFDRCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7QUFDakMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0FBQ2pDLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzs7QUFFL0IsTUFBTSxDQUFDLFVBQVUsR0FBRyxVQUFTLE9BQU8sRUFBRTtBQUNwQyxTQUFPLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQztBQUM1QixTQUFPLENBQUMsWUFBWSxHQUFHLE1BQU0sQ0FBQztBQUM5QixTQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxDQUFDLENBQUM7Q0FDekMsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGFwcE1haW4gPSByZXF1aXJlKCcuLi9hcHBNYWluJyk7XG53aW5kb3cuSmlnc2F3ID0gcmVxdWlyZSgnLi9qaWdzYXcnKTtcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBnbG9iYWwuSmlnc2F3ID0gd2luZG93LkppZ3Nhdztcbn1cbnZhciBibG9ja3MgPSByZXF1aXJlKCcuL2Jsb2NrcycpO1xudmFyIGxldmVscyA9IHJlcXVpcmUoJy4vbGV2ZWxzJyk7XG52YXIgc2tpbnMgPSByZXF1aXJlKCcuL3NraW5zJyk7XG5cbndpbmRvdy5qaWdzYXdNYWluID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zLnNraW5zTW9kdWxlID0gc2tpbnM7XG4gIG9wdGlvbnMuYmxvY2tzTW9kdWxlID0gYmxvY2tzO1xuICBhcHBNYWluKHdpbmRvdy5KaWdzYXcsIGxldmVscywgb3B0aW9ucyk7XG59O1xuIl19
},{"../appMain":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/appMain.js","./blocks":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/blocks.js","./jigsaw":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/jigsaw.js","./levels":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/levels.js","./skins":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/skins.js"}],"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/skins.js":[function(require,module,exports){
/**
 * Load Skin for Jigsaw.
 */

'use strict';

var skinsBase = require('../skins');

var CONFIGS = {

  jigsaw: {}

};

exports.load = function (assetUrl, id) {
  var skin = skinsBase.load(assetUrl, id);
  var config = CONFIGS[skin.id];

  skin.artist = skin.assetUrl('artist.png');
  skin.blocks = skin.assetUrl('blocks.png');

  skin.apple = skin.assetUrl('apple.png');
  skin.smiley = skin.assetUrl('smiley.png');
  skin.snail = skin.assetUrl('snail.png');
  skin.elephant = skin.assetUrl('elephant.png');
  skin.fish = skin.assetUrl('fish.png');
  skin.doggie = skin.assetUrl('doggie.png');
  skin.tree = skin.assetUrl('tree.png');
  skin.flower = skin.assetUrl('flower.png');
  skin.house = skin.assetUrl('house.png');
  skin.computer = skin.assetUrl('computer.png');

  skin.blank = skin.assetUrl('blank.png');
  skin.smallStaticAvatar = skin.blank;

  // Settings
  skin.background = skin.assetUrl('background.png');

  return skin;
};

},{"../skins":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/skins.js"}],"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/jigsaw.js":[function(require,module,exports){
/**
 * Blockly App: Jigsaw
 *
 * Copyright 2013 Code.org
 *
 */

'use strict';

var studioApp = require('../StudioApp').singleton;
var skins = require('../skins');
var page = require('../templates/page.html.ejs');
var dom = require('../dom');

/**
 * Create a namespace for the application.
 */
var Jigsaw = module.exports;

var level;
var skin;

var ResultType = studioApp.ResultType;
var TestResults = studioApp.TestResults;

studioApp.setCheckForEmptyBlocks(true);

// Never bump neighbors for Jigsaw
Blockly.BUMP_UNCONNECTED = false;

function useLargeNotches() {
  var notchHeight = 8;
  var notchWidthA = 6;
  var notchWidthB = 10;

  Blockly.BlockSvg.NOTCH_PATH_WIDTH = notchWidthA * 2 + notchWidthB;
  Blockly.BlockSvg.NOTCH_WIDTH = 50;

  var notchPathLeft = 'l ' + notchWidthA + ',' + notchHeight + ' ' + notchWidthB + ',0 ' + notchWidthA + ',-' + notchHeight;
  var notchPathRight = 'l ' + '-' + notchWidthA + ',' + notchHeight + ' ' + '-' + notchWidthB + ',0 ' + '-' + notchWidthA + ',-' + notchHeight;
  // Blockly.BlockSvg.NOTCH_PATH_LEFT = 'l 6,4 3,0 6,-4';
  // Blockly.BlockSvg.NOTCH_PATH_RIGHT = 'l -6,4 -3,0 -6,-4';

  var notchHighlightHeight = notchHeight; //4;
  var notchHighlightWidthA = notchWidthA + 0.5; //6.5;
  var notchHighlightWidthB = notchWidthB - 1; //2;

  var notchPathLeftHighlight = 'l ' + notchHighlightWidthA + ',' + notchHighlightHeight + ' ' + notchHighlightWidthB + ',0 ' + notchHighlightWidthA + ',-' + notchHighlightHeight;
  // Blockly.BlockSvg.NOTCH_PATH_LEFT_HIGHLIGHT = 'l 6.5,4 2,0 6.5,-4';

  Blockly.Connection.NOTCH_PATHS_OVERRIDE = {
    left: notchPathLeft,
    leftHighlight: notchPathLeftHighlight,
    right: notchPathRight
  };
}

// Default Scalings
Jigsaw.scale = {
  'snapRadius': 1,
  'stepSpeed': 33
};

var loadLevel = function loadLevel() {
  // Load maps.
  // Override scalars.
  for (var key in level.scale) {
    Jigsaw.scale[key] = level.scale[key];
  }

  Jigsaw.MAZE_WIDTH = 0;
  Jigsaw.MAZE_HEIGHT = 0;

  Jigsaw.block1Clicked = false;
};

var drawMap = function drawMap() {
  // Hide the left column and the resize bar.
  var visualizationColumn = document.getElementById('visualizationColumn');
  visualizationColumn.style.display = 'none';
  var visualizationResizeBar = document.getElementById('visualizationResizeBar');
  visualizationResizeBar.style.display = 'none';

  if (level.ghost) {
    var blockCanvas = Blockly.mainBlockSpace.getCanvas();
    Blockly.createSvgElement('rect', {
      fill: "url(#pat_" + level.id + "A)",
      "fill-opacity": "0.2",
      width: level.image.width,
      height: level.image.height,
      transform: "translate(" + level.ghost.x + ", " + level.ghost.y + ")"
    }, blockCanvas, {
      beforeExisting: true
    });
  }
};

/**
 * Initialize Blockly and the Jigsaw app.  Called on page load.
 */
Jigsaw.init = function (config) {
  // Jigsaw.clearEventHandlersKillTickLoop();
  skin = config.skin;
  level = config.level;
  loadLevel();

  if (level.largeNotches) {
    useLargeNotches();
  }
  Blockly.SNAP_RADIUS = level.snapRadius || 90;

  config.html = page({
    assetUrl: studioApp.assetUrl,
    data: {
      localeDirection: studioApp.localeDirection(),
      controls: require('./controls.html.ejs')({ assetUrl: studioApp.assetUrl }),
      editCode: level.editCode,
      blockCounterClass: 'block-counter-default'
    }
  });

  // TODO (br-pair) : I think this is something that's happening in all apps?
  config.loadAudio = function () {
    studioApp.loadAudio(skin.winSound, 'win');
    studioApp.loadAudio(skin.startSound, 'start');
    studioApp.loadAudio(skin.failureSound, 'failure');
  };

  config.afterInject = function () {
    /**
     * The richness of block colours, regardless of the hue.
     * MOOC blocks should be brighter (target audience is younger).
     * Must be in the range of 0 (inclusive) to 1 (exclusive).
     * Blockly's default is 0.45.
     */
    Blockly.HSV_SATURATION = 0.6;

    drawMap();
  };

  // only have trashcan for levels with toolbox
  config.trashcan = !!level.toolbox;
  config.scrollbars = false;

  config.enableShowCode = false;
  config.enableShowBlockCount = false;

  studioApp.init(config);

  document.getElementById('runButton').style.display = 'none';
  Jigsaw.successListener = Blockly.mainBlockSpaceEditor.addChangeListener(function (evt) {
    checkForSuccess();
  });

  // Only used by level1, in which the success criteria is clicking on the block
  var block1 = document.querySelectorAll("[block-id='1']")[0];
  if (block1) {
    dom.addMouseDownTouchEvent(block1, function () {
      Jigsaw.block1Clicked = true;
    });
  }
};

function checkForSuccess() {
  var success = level.goal.successCondition();
  if (success) {
    Blockly.removeChangeListener(Jigsaw.successListener);

    Jigsaw.result = ResultType.SUCCESS;
    Jigsaw.onPuzzleComplete();
  }
}

/**
 * App specific displayFeedback function that calls into
 * studioApp.displayFeedback when appropriate
 */
var displayFeedback = function displayFeedback() {
  if (!Jigsaw.waitingForReport) {
    studioApp.displayFeedback({
      app: 'Jigsaw',
      skin: skin.id,
      feedbackType: Jigsaw.testResults,
      response: Jigsaw.response,
      level: level
    });
  }
};

/**
 * Function to be called when the service report call is complete
 * @param {object} JSON response (if available)
 */
Jigsaw.onReportComplete = function (response) {
  Jigsaw.response = response;
  Jigsaw.waitingForReport = false;
  displayFeedback();
};

/**
 * Execute the user's code.  Heaven help us...
 */
Jigsaw.execute = function () {
  // execute is a no-op for jigsaw
};

Jigsaw.onPuzzleComplete = function () {

  // If we know they succeeded, mark levelComplete true
  // Note that we have not yet animated the succesful run
  var levelComplete = Jigsaw.result == ResultType.SUCCESS;

  Jigsaw.testResults = studioApp.getTestResults(levelComplete, {
    allowTopBlocks: true
  });

  if (Jigsaw.testResults >= TestResults.FREE_PLAY) {
    studioApp.playAudio('win');
  } else {
    studioApp.playAudio('failure');
  }

  var xml = Blockly.Xml.blockSpaceToDom(Blockly.mainBlockSpace);
  var textBlocks = Blockly.Xml.domToText(xml);

  Jigsaw.waitingForReport = true;

  // Report result to server.
  studioApp.report({
    app: 'Jigsaw',
    level: level.id,
    result: Jigsaw.result === ResultType.SUCCESS,
    testResult: Jigsaw.testResults,
    program: encodeURIComponent(textBlocks),
    onComplete: Jigsaw.onReportComplete
  });
};

},{"../StudioApp":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/StudioApp.js","../dom":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/dom.js","../skins":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/skins.js","../templates/page.html.ejs":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/templates/page.html.ejs","./controls.html.ejs":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/controls.html.ejs"}],"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/controls.html.ejs":[function(require,module,exports){
module.exports= (function() {
  var t = function anonymous(locals, filters, escape) {
escape = escape || function (html){
  return String(html)
    .replace(/&(?!\w+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};
var buf = [];
with (locals || {}) { (function(){ 
 buf.push('');1; var msg = require('./locale') ; buf.push('\n'); })();
} 
return buf.join('');
};
  return function(locals) {
    return t(locals, require("ejs").filters);
  }
}());
},{"./locale":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/locale.js","ejs":"/Users/joshlory/Work/2k14/code-dot-org/apps/node_modules/ejs/lib/ejs.js"}],"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/blocks.js":[function(require,module,exports){
/**
 * Blockly App: Jigsaw
 *
 * Copyright 2013 Code.org
 *
 */
'use strict';

var msg = require('./locale');
var dom = require('../dom');
var levels = require('./levels');

var patternCache = {
  queued: [],
  created: {},

  /**
   * Stick an item in our queue
   */
  addToQueue: function addToQueue(patternInfo) {
    this.queued.push(patternInfo);
  },

  /**
   * Add all the svg patterns we've queued up.
   */
  addQueuedPatterns: function addQueuedPatterns() {
    this.queued.forEach(function (pattern) {
      addPattern(pattern.id, pattern.imagePath, pattern.width, pattern.height, pattern.offsetX, pattern.offsetY);
    });
    this.queued = [];
  },

  /**
   * Have we already created an svg element for this patternInfo?  Throws if
   * we ask with a patternInfo that has the same id but different attributes.
   */
  wasCreated: function wasCreated(patternInfo) {
    var equal = true;
    var cached = this.created[patternInfo.id];
    if (!cached) {
      return false;
    }

    Object.keys(patternInfo).forEach(function (key) {
      if (patternInfo[key] !== cached[key]) {
        equal = false;
      }
    });
    if (!equal) {
      throw new Error("Can't add attribute of same id with different attributes");
    }
    return true;
  },

  /**
   * Mark that we've created an svg pattern
   */
  markCreated: function markCreated(patternInfo) {
    if (this.created[patternInfo.id]) {
      throw new Error('Already have cached item with id: ' + patternInfo.id);
    }
    this.created[patternInfo.id] = patternInfo;
  }

};

var patterns = [];
var createdPatterns = {};

/**
 * Add an svg pattern for the given image. If document is not yet fully loaded,
 * it will add the pattern to a list for later.
 *
 * @param {string} id Pattern name
 * @param {string} imagePath Url of the image
 * @param {number} width Width of the image
 * @param {number} height Height of the image
 * @param {number|function} offsetX Offset of the image to start pattern
 * @param {number|function} offsetY Offset of the image to start pattern
 */
var addPattern = function addPattern(id, imagePath, width, height, offsetX, offsetY) {
  var x, y, pattern, patternImage;
  var patternInfo = {
    id: id,
    imagePath: imagePath,
    width: width,
    height: height,
    offsetX: offsetX,
    offsetY: offsetY
  };

  // If we don't yet have an svgDefs, queue the pattern and wait until we do
  var svgDefs = document.getElementById('blocklySvgDefs');
  if (!svgDefs) {
    patternCache.addToQueue(patternInfo);
  } else if (!patternCache.wasCreated(patternInfo)) {
    // add the pattern
    x = typeof offsetX === "function" ? -offsetX() : -offsetX;
    y = typeof offsetY === "function" ? -offsetY() : -offsetY;
    pattern = Blockly.createSvgElement('pattern', {
      id: id,
      patternUnits: 'userSpaceOnUse',
      width: "100%",
      height: height,
      x: x,
      y: y
    }, svgDefs);
    patternImage = Blockly.createSvgElement('image', {
      width: width,
      height: height
    }, pattern);
    patternImage.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', imagePath);

    patternCache.markCreated(patternInfo);
  }
  return id;
};

/**
 * Search the workspace for a block of the given type
 *
 * @param {string} type The type of the block to search for
 */
var blockOfType = function blockOfType(type) {
  var blocks = Blockly.mainBlockSpace.getAllBlocks();
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].type === type) {
      return blocks[i];
    }
  }
  return null;
};

/**
 * Get the width of the block of the given type
 *
 * @param {string} type The type of the block to search for
 */
var blockWidth = function blockWidth(type) {
  return blockOfType(type).getHeightWidth().width;
};

function addQueuedWhenReady() {
  if (!document.getElementById('blocklySvgDefs')) {
    setTimeout(addQueuedWhenReady, 100);
    return;
  }
  patternCache.addQueuedPatterns();
}

// Install extensions to Blockly's language and JavaScript generator.
exports.install = function (blockly, blockInstallOptions) {
  var skin = blockInstallOptions.skin;
  // could make this settable on the level if I need
  var HSV = [0, 1.00, 0.98];

  var existingBlocks = Object.keys(blockly.Blocks);

  Object.keys(levels).forEach(function (key) {
    var level = levels[key];
    generateJigsawBlocksForLevel(blockly, skin, {
      image: skin[level.image.name],
      HSV: level.backgroundHSV || HSV,
      width: level.image.width,
      height: level.image.height,
      numBlocks: level.numBlocks,
      notchedEnds: level.notchedEnds,
      level: key
    });

    if (level.numBlocks === 0) {
      // still want the pattern for the ghost
      var patternName = 'pat_' + level.id + 'A';
      addPattern(patternName, skin[level.image.name], level.image.width, level.image.height, 0, 0);
    }
  });

  generateBlankBlock(blockly, skin, 'jigsaw_repeat', [322, 0.90, 0.95], 100, true);
  generateBlankBlock(blockly, skin, 'jigsaw_green', [140, 1.00, 0.74], 80);
  generateBlankBlock(blockly, skin, 'jigsaw_blue', [184, 1.00, 0.74], 80);
  generateBlankBlock(blockly, skin, 'jigsaw_purple', [312, 0.32, 0.62], 80);

  // Go through all added blocks, and add empty generators for those that
  // weren't already given generators
  var generator = blockly.Generator.get('JavaScript');
  blockly.JavaScript = generator;
  Object.keys(blockly.Blocks).forEach(function (block) {
    if (existingBlocks.indexOf(block) === -1 && !generator[block]) {
      generator[block] = function () {
        return '\n';
      };
    }
  });

  addQueuedWhenReady();

  delete blockly.Blocks.procedures_defreturn;
  delete blockly.Blocks.procedures_ifreturn;
};

function generateBlankBlock(blockly, skin, name, hsv, width, hasAppend) {
  blockly.Blocks[name] = {
    helpUrl: '',
    init: function init() {
      this.setHSV.apply(this, hsv);
      this.appendDummyInput().appendTitle(new blockly.FieldImage(skin.blank, width, 54));
      this.setPreviousStatement(true);
      if (hasAppend) {
        this.appendStatementInput('child');
      }
      this.setNextStatement(true);
    }
  };
}

function generateJigsawBlocksForLevel(blockly, skin, options) {
  var image = options.image;
  var width = options.width;
  var height = options.height;
  var numBlocks = options.numBlocks;
  var level = options.level;
  var HSV = options.HSV;
  // if true, first/last block will still have previous/next notches
  var notchedEnds = options.notchedEnds;

  var blockHeight = height / numBlocks;
  var titleWidth = width - 20;
  var titleHeight = blockHeight - 10;

  var letters = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function generateBlock(blockNum) {
    var blockName = 'jigsaw_' + level + letters[blockNum];
    var patternName = 'pat_' + level + letters[blockNum];
    blockly.Blocks[blockName] = {
      helpUrl: '',
      init: function init() {
        this.setHSV.apply(this, HSV);
        this.appendDummyInput().appendTitle(new blockly.FieldImage(skin.blank, titleWidth, titleHeight));
        this.setPreviousStatement(blockNum !== 1 || notchedEnds);
        this.setNextStatement(blockNum !== numBlocks || notchedEnds);
        this.setFillPattern(addPattern(patternName, image, width, height, 0, blockHeight * (blockNum - 1)));
      }
    };
  }

  for (var i = 1; i <= numBlocks; i++) {
    generateBlock(i);
  }
}

},{"../dom":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/dom.js","./levels":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/levels.js","./locale":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/locale.js"}],"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/locale.js":[function(require,module,exports){
// locale for jigsaw

"use strict";

module.exports = window.blockly.jigsaw_locale;

},{}],"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/levels.js":[function(require,module,exports){
/*jshint multistr: true */

'use strict';

var createToolbox = require('../block_utils').createToolbox;

var jigsawBlock = function jigsawBlock(type, x, y, child, childType) {
  return jigsawBlockWithDeletableAttr(type, x, y, child, childType, true);
};

var undeletableJigsawBlock = function undeletableJigsawBlock(type, x, y, child, childType) {
  return jigsawBlockWithDeletableAttr(type, x, y, child, childType, false);
};

var jigsawBlockWithDeletableAttr = function jigsawBlockWithDeletableAttr(type, x, y, child, childType, deletable) {
  var childAttr = '';
  x = x || 0;
  y = y || 0;
  childType = childType || "next";
  if (childType === 'statement') {
    childAttr = " name='child'";
  }
  return '<block type="' + type + '" deletable="' + deletable + '"' + ' x="' + x + '"' + ' y="' + y + '">' + (child ? '<' + childType + childAttr + '>' + child + '</' + childType + '>' : '') + '</block>';
};

/**
 * Validates whether puzzle has been successfully put together.
 *
 * @param {string[]} list of types
 * @param {number} options.level Level number
 * @Param {number} options.numBlocks How many blocks there are in the level
 */
var validateSimplePuzzle = function validateSimplePuzzle(types, options) {
  var numBlocks;
  if (types) {
    numBlocks = types.length;
  } else {
    var letters = '-ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var level = options.level;
    numBlocks = options.numBlocks;

    types = [];
    for (var i = 1; i <= numBlocks; i++) {
      types.push('jigsaw_' + level + letters[i]);
    }
  }

  var roots = Blockly.mainBlockSpace.getTopBlocks();
  if (roots.length !== 1) {
    return false;
  }

  var depth = 0;
  var block = roots[0];
  while (depth < numBlocks) {
    if (!block || block.type !== types[depth]) {
      return false;
    }
    var children = block.getChildren();
    if (children.length > 1) {
      return false;
    }
    block = children[0];
    depth++;
  }

  // last block shouldnt have children
  if (block !== undefined) {
    return false;
  }

  return true;
};

/*
 * Configuration for all levels.
 */

module.exports = {
  '1': {
    instructionsIcon: 'apple',
    aniGifURL: '/script_assets/k_1_images/instruction_gifs/click-block.gif',
    isK1: true,
    image: {
      name: 'apple',
      width: 200,
      height: 200
    },
    backgroundHSV: [41, 1.00, 0.969],
    numBlocks: 1,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    goal: {
      successCondition: function successCondition() {
        return Jigsaw.block1Clicked;
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_1A', 20, 20)
  },
  '2': {
    instructionsIcon: 'smiley',
    aniGifURL: '/script_assets/k_1_images/instruction_gifs/drag-drop.gif',
    isK1: true,
    image: {
      name: 'smiley',
      width: 200,
      height: 200
    },
    backgroundHSV: [184, 1.00, 0.733],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 1,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    goal: {
      successCondition: function successCondition() {
        // need to be finished drag
        if (Blockly.mainBlockSpace.dragMode) {
          return false;
        }
        var pos = Blockly.mainBlockSpace.getAllBlocks()[0].getRelativeToSurfaceXY();
        // how close to ghost?
        var dx = Math.abs(400 - pos.x);
        var dy = Math.abs(100 - pos.y);
        return dx + dy < 80;
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_2A', 20, 20)
  },
  '3': {
    instructionsIcon: 'snail',
    aniGifURL: '/script_assets/k_1_images/instruction_gifs/drag-connect.gif',
    isK1: true,
    image: {
      name: 'snail',
      width: 200,
      height: 200
    },
    backgroundHSV: [36, 1.00, 0.999],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 2,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 3, numBlocks: 2 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_3A', 400, 100) + undeletableJigsawBlock('jigsaw_3B', 100, 220)
  },

  '4': {
    instructionsIcon: 'elephant',
    isK1: true,
    image: {
      name: 'elephant',
      width: 200,
      height: 200
    },
    backgroundHSV: [320, 0.60, 0.999],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 2,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 4, numBlocks: 2 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_4A', 100, 140) + undeletableJigsawBlock('jigsaw_4B', 400, 200)
  },

  '5': {
    instructionsIcon: 'fish',
    isK1: true,
    image: {
      name: 'fish',
      width: 200,
      height: 200
    },
    backgroundHSV: [209, 0.57, 0.600],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    notchedEnds: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 5, numBlocks: 3 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_5A', 100, 20) + undeletableJigsawBlock('jigsaw_5B', 100, 140) + undeletableJigsawBlock('jigsaw_5C', 100, 280)
  },

  '6': {
    instructionsIcon: 'doggie',
    isK1: true,
    image: {
      name: 'doggie',
      width: 200,
      height: 200
    },
    backgroundHSV: [25, 0.57, 0.960],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    notchedEnds: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 6, numBlocks: 3 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_6B', 100, 20) + undeletableJigsawBlock('jigsaw_6A', 100, 140) + undeletableJigsawBlock('jigsaw_6C', 100, 280)
  },

  '7': {
    instructionsIcon: 'tree',
    isK1: true,
    image: {
      name: 'tree',
      width: 200,
      height: 200
    },
    backgroundHSV: [238, 0.51, 0.999],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    notchedEnds: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 7, numBlocks: 3 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_7B', 100, 20) + undeletableJigsawBlock('jigsaw_7A', 100, 140) + undeletableJigsawBlock('jigsaw_7C', 100, 280)
  },

  '8': {
    instructionsIcon: 'flower',
    isK1: true,
    image: {
      name: 'flower',
      width: 200,
      height: 200
    },
    backgroundHSV: [75, 0.80, 0.999],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    notchedEnds: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 8, numBlocks: 3 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_8C', 100, 20) + undeletableJigsawBlock('jigsaw_8B', 100, 140) + undeletableJigsawBlock('jigsaw_8A', 100, 280)
  },

  '9': {
    instructionsIcon: 'house',
    aniGifURL: '/script_assets/k_1_images/instruction_gifs/drag-disordered.gif',
    isK1: true,
    image: {
      name: 'house',
      width: 200,
      height: 200
    },
    backgroundHSV: [110, 0.56, 0.60],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    notchedEnds: true,
    largeNotches: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 9, numBlocks: 3 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_9B', 100, 20, undeletableJigsawBlock('jigsaw_9C', 0, 0, undeletableJigsawBlock('jigsaw_9A', 0, 0)))
  },

  '10': {
    instructionsIcon: 'computer',
    isK1: true,
    image: {
      name: 'computer',
      width: 200,
      height: 200
    },
    backgroundHSV: [300, 0.25, 0.80],
    ghost: {
      x: 400,
      y: 100
    },
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    notchedEnds: true,
    largeNotches: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 10, numBlocks: 3 });
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_10A', 100, 20, undeletableJigsawBlock('jigsaw_10C', 0, 0, undeletableJigsawBlock('jigsaw_10B', 0, 0)))
  },

  '11': {
    instructionsIcon: 'blocks',
    isK1: true,
    image: {
      name: 'blocks',
      width: 131,
      height: 286
    },
    ghost: {
      x: 200,
      y: 12
    },
    numBlocks: 0,
    requiredBlocks: [],
    freePlay: false,
    notchedEnds: true,
    largeNotches: false,
    snapRadius: 30,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(['jigsaw_repeat', 'jigsaw_purple', 'jigsaw_blue', 'jigsaw_green'], {});
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_repeat', 20, 20, undeletableJigsawBlock('jigsaw_purple', 0, 0, undeletableJigsawBlock('jigsaw_blue')), 'statement'),
    toolbox: createToolbox(jigsawBlock('jigsaw_green'))
  },

  '12': {
    instructionsIcon: 'blocks',
    isK1: true,
    image: {
      name: 'blocks',
      width: 131,
      height: 286
    },
    ghost: {
      x: 200,
      y: 12
    },
    numBlocks: 0,
    requiredBlocks: [],
    freePlay: false,
    notchedEnds: true,
    largeNotches: false,
    snapRadius: 30,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(['jigsaw_repeat', 'jigsaw_purple', 'jigsaw_blue', 'jigsaw_green'], {});
      }
    },
    startBlocks: undeletableJigsawBlock('jigsaw_repeat', 20, 20),
    toolbox: createToolbox(jigsawBlock('jigsaw_green') + jigsawBlock('jigsaw_purple') + jigsawBlock('jigsaw_blue'))
  },

  // assessment
  '13': {
    instructionsIcon: 'doggie',
    isK1: true,
    image: {
      name: 'doggie',
      width: 200,
      height: 200
    },
    ghost: {
      x: 400,
      y: 100
    },
    backgroundHSV: [25, 0.57, 0.960],
    numBlocks: 3,
    requiredBlocks: [],
    freePlay: false,
    largeNotches: true,
    notchedEnds: true,
    goal: {
      successCondition: function successCondition() {
        return validateSimplePuzzle(null, { level: 13, numBlocks: 3 });
      }
    },
    startBlocks: jigsawBlock('jigsaw_13C', 100, 20, jigsawBlock('jigsaw_13B', 0, 0, jigsawBlock('jigsaw_13A', 0, 0)))
  }
};

},{"../block_utils":"/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/block_utils.js"}]},{},["/Users/joshlory/Work/2k14/code-dot-org/apps/build/js/jigsaw/main.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9mYWN0b3ItYnVuZGxlL25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJidWlsZC9qcy9qaWdzYXcvbWFpbi5qcyIsImJ1aWxkL2pzL2ppZ3Nhdy9za2lucy5qcyIsImJ1aWxkL2pzL2ppZ3Nhdy9qaWdzYXcuanMiLCJidWlsZC9qcy9qaWdzYXcvY29udHJvbHMuaHRtbC5lanMiLCJidWlsZC9qcy9qaWdzYXcvYmxvY2tzLmpzIiwiYnVpbGQvanMvamlnc2F3L2xvY2FsZS5qcyIsImJ1aWxkL2pzL2ppZ3Nhdy9sZXZlbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2ZBLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQzs7QUFFcEMsSUFBSSxPQUFPLEdBQUc7O0FBRVosUUFBTSxFQUFFLEVBQ1A7O0NBRUYsQ0FBQzs7QUFFRixPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVMsUUFBUSxFQUFFLEVBQUUsRUFBRTtBQUNwQyxNQUFJLElBQUksR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN4QyxNQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDOztBQUc5QixNQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLENBQUM7QUFDMUMsTUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDOztBQUUxQyxNQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDeEMsTUFBSSxDQUFD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QUFZLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7R0FDdkc7Q0FDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIihmdW5jdGlvbiAoZ2xvYmFsKXtcbid1c2Ugc3RyaWN0JztcblxudmFyIGFwcE1haW4gPSByZXF1aXJlKCcuLi9hcHBNYWluJyk7XG53aW5kb3cuSmlnc2F3ID0gcmVxdWlyZSgnLi9qaWdzYXcnKTtcbmlmICh0eXBlb2YgZ2xvYmFsICE9PSAndW5kZWZpbmVkJykge1xuICBnbG9iYWwuSmlnc2F3ID0gd2luZG93LkppZ3Nhdztcbn1cbnZhciBibG9ja3MgPSByZXF1aXJlKCcuL2Jsb2NrcycpO1xudmFyIGxldmVscyA9IHJlcXVpcmUoJy4vbGV2ZWxzJyk7XG52YXIgc2tpbnMgPSByZXF1aXJlKCcuL3NraW5zJyk7XG5cbndpbmRvdy5qaWdzYXdNYWluID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgb3B0aW9ucy5za2luc01vZHVsZSA9IHNraW5zO1xuICBvcHRpb25zLmJsb2Nrc01vZHVsZSA9IGJsb2NrcztcbiAgYXBwTWFpbih3aW5kb3cuSmlnc2F3LCBsZXZlbHMsIG9wdGlvbnMpO1xufTtcblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG4vLyMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldDp1dGYtODtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbUoxYVd4a0wycHpMMnBwWjNOaGR5OXRZV2x1TG1weklsMHNJbTVoYldWeklqcGJYU3dpYldGd2NHbHVaM01pT2lJN096dEJRVUZCTEVsQlFVa3NUMEZCVHl4SFFVRkhMRTlCUVU4c1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dEJRVU53UXl4TlFVRk5MRU5CUVVNc1RVRkJUU3hIUVVGSExFOUJRVThzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0QlFVTndReXhKUVVGSkxFOUJRVThzVFVGQlRTeExRVUZMTEZkQlFWY3NSVUZCUlR0QlFVTnFReXhSUVVGTkxFTkJRVU1zVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4TlFVRk5MRU5CUVVNN1EwRkRMMEk3UVVGRFJDeEpRVUZKTEUxQlFVMHNSMEZCUnl4UFFVRlBMRU5CUVVNc1ZVRkJWU3hEUVVGRExFTkJRVU03UVVGRGFrTXNTVUZCU1N4TlFVRk5MRWRCUVVjc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eERRVUZETzBGQlEycERMRWxCUVVrc1MwRkJTeXhIUVVGSExFOUJRVThzUTBGQlF5eFRRVUZUTEVOQlFVTXNRMEZCUXpzN1FVRkZMMElzVFVGQlRTeERRVUZETEZWQlFWVXNSMEZCUnl4VlFVRlRMRTlCUVU4c1JVRkJSVHRCUVVOd1F5eFRRVUZQTEVOQlFVTXNWMEZCVnl4SFFVRkhMRXRCUVVzc1EwRkJRenRCUVVNMVFpeFRRVUZQTEVOQlFVTXNXVUZCV1N4SFFVRkhMRTFCUVUwc1EwRkJRenRCUVVNNVFpeFRRVUZQTEVOQlFVTXNUVUZCVFN4RFFVRkRMRTFCUVUwc1JVRkJSU3hOUVVGTkxFVkJRVVVzVDBGQlR5eERRVUZETEVOQlFVTTdRMEZEZWtNc1EwRkJReUlzSW1acGJHVWlPaUpuWlc1bGNtRjBaV1F1YW5NaUxDSnpiM1Z5WTJWU2IyOTBJam9pSWl3aWMyOTFjbU5sYzBOdmJuUmxiblFpT2xzaWRtRnlJR0Z3Y0UxaGFXNGdQU0J5WlhGMWFYSmxLQ2N1TGk5aGNIQk5ZV2x1SnlrN1hHNTNhVzVrYjNjdVNtbG5jMkYzSUQwZ2NtVnhkV2x5WlNnbkxpOXFhV2R6WVhjbktUdGNibWxtSUNoMGVYQmxiMllnWjJ4dlltRnNJQ0U5UFNBbmRXNWtaV1pwYm1Wa0p5a2dlMXh1SUNCbmJHOWlZV3d1U21sbmMyRjNJRDBnZDJsdVpHOTNMa3BwWjNOaGR6dGNibjFjYm5aaGNpQmliRzlqYTNNZ1BTQnlaWEYxYVhKbEtDY3VMMkpzYjJOcmN5Y3BPMXh1ZG1GeUlHeGxkbVZzY3lBOUlISmxjWFZwY21Vb0p5NHZiR1YyWld4ekp5azdYRzUyWVhJZ2MydHBibk1nUFNCeVpYRjFhWEpsS0NjdUwzTnJhVzV6SnlrN1hHNWNibmRwYm1SdmR5NXFhV2R6WVhkTllXbHVJRDBnWm5WdVkzUnBiMjRvYjNCMGFXOXVjeWtnZTF4dUlDQnZjSFJwYjI1ekxuTnJhVzV6VFc5a2RXeGxJRDBnYzJ0cGJuTTdYRzRnSUc5d2RHbHZibk11WW14dlkydHpUVzlrZFd4bElEMGdZbXh2WTJ0ek8xeHVJQ0JoY0hCTllXbHVLSGRwYm1SdmR5NUthV2R6WVhjc0lHeGxkbVZzY3l3Z2IzQjBhVzl1Y3lrN1hHNTlPMXh1SWwxOSIsIi8qKlxuICogTG9hZCBTa2luIGZvciBKaWdzYXcuXG4gKi9cblxudmFyIHNraW5zQmFzZSA9IHJlcXVpcmUoJy4uL3NraW5zJyk7XG5cbnZhciBDT05GSUdTID0ge1xuXG4gIGppZ3Nhdzoge1xuICB9XG5cbn07XG5cbmV4cG9ydHMubG9hZCA9IGZ1bmN0aW9uKGFzc2V0VXJsLCBpZCkge1xuICB2YXIgc2tpbiA9IHNraW5zQmFzZS5sb2FkKGFzc2V0VXJsLCBpZCk7XG4gIHZhciBjb25maWcgPSBDT05GSUdTW3NraW4uaWRdO1xuXG5cbiAgc2tpbi5hcnRpc3QgPSBza2luLmFzc2V0VXJsKCdhcnRpc3QucG5nJyk7XG4gIHNraW4uYmxvY2tzID0gc2tpbi5hc3NldFVybCgnYmxvY2tzLnBuZycpO1xuXG4gIHNraW4uYXBwbGUgPSBza2luLmFzc2V0VXJsKCdhcHBsZS5wbmcnKTtcbiAgc2tpbi5zbWlsZXkgPSBza2luLmFzc2V0VXJsKCdzbWlsZXkucG5nJyk7XG4gIHNraW4uc25haWwgPSBza2luLmFzc2V0VXJsKCdzbmFpbC5wbmcnKTtcbiAgc2tpbi5lbGVwaGFudCA9IHNraW4uYXNzZXRVcmwoJ2VsZXBoYW50LnBuZycpO1xuICBza2luLmZpc2ggPSBza2luLmFzc2V0VXJsKCdmaXNoLnBuZycpO1xuICBza2luLmRvZ2dpZSA9IHNraW4uYXNzZXRVcmwoJ2RvZ2dpZS5wbmcnKTtcbiAgc2tpbi50cmVlID0gc2tpbi5hc3NldFVybCgndHJlZS5wbmcnKTtcbiAgc2tpbi5mbG93ZXIgPSBza2luLmFzc2V0VXJsKCdmbG93ZXIucG5nJyk7XG4gIHNraW4uaG91c2UgPSBza2luLmFzc2V0VXJsKCdob3VzZS5wbmcnKTtcbiAgc2tpbi5jb21wdXRlciA9IHNraW4uYXNzZXRVcmwoJ2NvbXB1dGVyLnBuZycpO1xuXG4gIHNraW4uYmxhbmsgPSBza2luLmFzc2V0VXJsKCdibGFuay5wbmcnKTtcbiAgc2tpbi5zbWFsbFN0YXRpY0F2YXRhciA9IHNraW4uYmxhbms7XG5cbiAgLy8gU2V0dGluZ3NcbiAgc2tpbi5iYWNrZ3JvdW5kID0gc2tpbi5hc3NldFVybCgnYmFja2dyb3VuZC5wbmcnKTtcblxuICByZXR1cm4gc2tpbjtcbn07XG4iLCIvKipcbiAqIEJsb2NrbHkgQXBwOiBKaWdzYXdcbiAqXG4gKiBDb3B5cmlnaHQgMjAxMyBDb2RlLm9yZ1xuICpcbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzdHVkaW9BcHAgPSByZXF1aXJlKCcuLi9TdHVkaW9BcHAnKS5zaW5nbGV0b247XG52YXIgc2tpbnMgPSByZXF1aXJlKCcuLi9za2lucycpO1xudmFyIHBhZ2UgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZXMvcGFnZS5odG1sLmVqcycpO1xudmFyIGRvbSA9IHJlcXVpcmUoJy4uL2RvbScpO1xuXG4vKipcbiAqIENyZWF0ZSBhIG5hbWVzcGFjZSBmb3IgdGhlIGFwcGxpY2F0aW9uLlxuICovXG52YXIgSmlnc2F3ID0gbW9kdWxlLmV4cG9ydHM7XG5cbnZhciBsZXZlbDtcbnZhciBza2luO1xuXG52YXIgUmVzdWx0VHlwZSA9IHN0dWRpb0FwcC5SZXN1bHRUeXBlO1xudmFyIFRlc3RSZXN1bHRzID0gc3R1ZGlvQXBwLlRlc3RSZXN1bHRzO1xuXG5zdHVkaW9BcHAuc2V0Q2hlY2tGb3JFbXB0eUJsb2Nrcyh0cnVlKTtcblxuLy8gTmV2ZXIgYnVtcCBuZWlnaGJvcnMgZm9yIEppZ3Nhd1xuQmxvY2tseS5CVU1QX1VOQ09OTkVDVEVEID0gZmFsc2U7XG5cbmZ1bmN0aW9uIHVzZUxhcmdlTm90Y2hlcygpIHtcbiAgdmFyIG5vdGNoSGVpZ2h0ID0gODtcbiAgdmFyIG5vdGNoV2lkdGhBID0gNjtcbiAgdmFyIG5vdGNoV2lkdGhCID0gMTA7XG5cbiAgQmxvY2tseS5CbG9ja1N2Zy5OT1RDSF9QQVRIX1dJRFRIID0gbm90Y2hXaWR0aEEgKiAyICsgbm90Y2hXaWR0aEI7XG4gIEJsb2NrbHkuQmxvY2tTdmcuTk9UQ0hfV0lEVEggPSA1MDtcblxuICB2YXIgbm90Y2hQYXRoTGVmdCA9ICdsICcgK1xuICAgIG5vdGNoV2lkdGhBICsgJywnICsgbm90Y2hIZWlnaHQgKyAnICcgK1xuICAgIG5vdGNoV2lkdGhCICsgJywwICcgK1xuICAgIG5vdGNoV2lkdGhBICsgJywtJyArIG5vdGNoSGVpZ2h0O1xuICB2YXIgbm90Y2hQYXRoUmlnaHQgPSAnbCAnICtcbiAgICAnLScgKyBub3RjaFdpZHRoQSArICcsJyArIG5vdGNoSGVpZ2h0ICsgJyAnICtcbiAgICAnLScgKyBub3RjaFdpZHRoQiArICcsMCAnICtcbiAgICAnLScgKyBub3RjaFdpZHRoQSArICcsLScgKyBub3RjaEhlaWdodDtcbiAgLy8gQmxvY2tseS5CbG9ja1N2Zy5OT1RDSF9QQVRIX0xFRlQgPSAnbCA2LDQgMywwIDYsLTQnO1xuICAvLyBCbG9ja2x5LkJsb2NrU3ZnLk5PVENIX1BBVEhfUklHSFQgPSAnbCAtNiw0IC0zLDAgLTYsLTQnO1xuXG4gIHZhciBub3RjaEhpZ2hsaWdodEhlaWdodCA9IG5vdGNoSGVpZ2h0OyAvLzQ7XG4gIHZhciBub3RjaEhpZ2hsaWdodFdpZHRoQSA9IG5vdGNoV2lkdGhBICsgMC41OyAvLzYuNTtcbiAgdmFyIG5vdGNoSGlnaGxpZ2h0V2lkdGhCID0gbm90Y2hXaWR0aEIgLSAxOyAvLzI7XG5cbiAgdmFyIG5vdGNoUGF0aExlZnRIaWdobGlnaHQgPSAnbCAnICtcbiAgICBub3RjaEhpZ2hsaWdodFdpZHRoQSArICcsJyArIG5vdGNoSGlnaGxpZ2h0SGVpZ2h0ICsgJyAnICtcbiAgICBub3RjaEhpZ2hsaWdodFdpZHRoQiArICcsMCAnICtcbiAgICBub3RjaEhpZ2hsaWdodFdpZHRoQSArICcsLScgKyBub3RjaEhpZ2hsaWdodEhlaWdodDtcbiAgLy8gQmxvY2tseS5CbG9ja1N2Zy5OT1RDSF9QQVRIX0xFRlRfSElHSExJR0hUID0gJ2wgNi41LDQgMiwwIDYuNSwtNCc7XG5cbiAgQmxvY2tseS5Db25uZWN0aW9uLk5PVENIX1BBVEhTX09WRVJSSURFID0ge1xuICAgIGxlZnQ6IG5vdGNoUGF0aExlZnQsXG4gICAgbGVmdEhpZ2hsaWdodDogbm90Y2hQYXRoTGVmdEhpZ2hsaWdodCxcbiAgICByaWdodDogbm90Y2hQYXRoUmlnaHRcbiAgfTtcblxufVxuXG5cbi8vIERlZmF1bHQgU2NhbGluZ3NcbkppZ3Nhdy5zY2FsZSA9IHtcbiAgJ3NuYXBSYWRpdXMnOiAxLFxuICAnc3RlcFNwZWVkJzogMzNcbn07XG5cbnZhciBsb2FkTGV2ZWwgPSBmdW5jdGlvbigpIHtcbiAgLy8gTG9hZCBtYXBzLlxuICAvLyBPdmVycmlkZSBzY2FsYXJzLlxuICBmb3IgKHZhciBrZXkgaW4gbGV2ZWwuc2NhbGUpIHtcbiAgICBKaWdzYXcuc2NhbGVba2V5XSA9IGxldmVsLnNjYWxlW2tleV07XG4gIH1cblxuICBKaWdzYXcuTUFaRV9XSURUSCA9IDA7XG4gIEppZ3Nhdy5NQVpFX0hFSUdIVCA9IDA7XG5cbiAgSmlnc2F3LmJsb2NrMUNsaWNrZWQgPSBmYWxzZTtcbn07XG5cbnZhciBkcmF3TWFwID0gZnVuY3Rpb24oKSB7XG4gIC8vIEhpZGUgdGhlIGxlZnQgY29sdW1uIGFuZCB0aGUgcmVzaXplIGJhci5cbiAgdmFyIHZpc3VhbGl6YXRpb25Db2x1bW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndmlzdWFsaXphdGlvbkNvbHVtbicpO1xuICB2aXN1YWxpemF0aW9uQ29sdW1uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIHZhciB2aXN1YWxpemF0aW9uUmVzaXplQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Zpc3VhbGl6YXRpb25SZXNpemVCYXInKTtcbiAgdmlzdWFsaXphdGlvblJlc2l6ZUJhci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuXG4gIGlmIChsZXZlbC5naG9zdCkge1xuICAgIHZhciBibG9ja0NhbnZhcyA9IEJsb2NrbHkubWFpbkJsb2NrU3BhY2UuZ2V0Q2FudmFzKCk7XG4gICAgQmxvY2tseS5jcmVhdGVTdmdFbGVtZW50KCdyZWN0Jywge1xuICAgICAgZmlsbDogXCJ1cmwoI3BhdF9cIiArIGxldmVsLmlkICsgXCJBKVwiLFxuICAgICAgXCJmaWxsLW9wYWNpdHlcIjogXCIwLjJcIixcbiAgICAgIHdpZHRoOiBsZXZlbC5pbWFnZS53aWR0aCxcbiAgICAgIGhlaWdodDogbGV2ZWwuaW1hZ2UuaGVpZ2h0LFxuICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZShcIiArIGxldmVsLmdob3N0LnggKyBcIiwgXCIgK1xuICAgICAgICBsZXZlbC5naG9zdC55ICsgXCIpXCJcbiAgICB9LCBibG9ja0NhbnZhcywge1xuICAgICAgYmVmb3JlRXhpc3Rpbmc6IHRydWVcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBJbml0aWFsaXplIEJsb2NrbHkgYW5kIHRoZSBKaWdzYXcgYXBwLiAgQ2FsbGVkIG9uIHBhZ2UgbG9hZC5cbiAqL1xuSmlnc2F3LmluaXQgPSBmdW5jdGlvbihjb25maWcpIHtcbiAgLy8gSmlnc2F3LmNsZWFyRXZlbnRIYW5kbGVyc0tpbGxUaWNrTG9vcCgpO1xuICBza2luID0gY29uZmlnLnNraW47XG4gIGxldmVsID0gY29uZmlnLmxldmVsO1xuICBsb2FkTGV2ZWwoKTtcblxuICBpZiAobGV2ZWwubGFyZ2VOb3RjaGVzKSB7XG4gICAgdXNlTGFyZ2VOb3RjaGVzKCk7XG4gIH1cbiAgQmxvY2tseS5TTkFQX1JBRElVUyA9IGxldmVsLnNuYXBSYWRpdXMgfHwgOTA7XG5cbiAgY29uZmlnLmh0bWwgPSBwYWdlKHtcbiAgICBhc3NldFVybDogc3R1ZGlvQXBwLmFzc2V0VXJsLFxuICAgIGRhdGE6IHtcbiAgICAgIGxvY2FsZURpcmVjdGlvbjogc3R1ZGlvQXBwLmxvY2FsZURpcmVjdGlvbigpLFxuICAgICAgY29udHJvbHM6IHJlcXVpcmUoJy4vY29udHJvbHMuaHRtbC5lanMnKSh7YXNzZXRVcmw6IHN0dWRpb0FwcC5hc3NldFVybH0pLFxuICAgICAgZWRpdENvZGU6IGxldmVsLmVkaXRDb2RlLFxuICAgICAgYmxvY2tDb3VudGVyQ2xhc3M6ICdibG9jay1jb3VudGVyLWRlZmF1bHQnXG4gICAgfVxuICB9KTtcblxuICAvLyBUT0RPIChici1wYWlyKSA6IEkgdGhpbmsgdGhpcyBpcyBzb21ldGhpbmcgdGhhdCdzIGhhcHBlbmluZyBpbiBhbGwgYXBwcz9cbiAgY29uZmlnLmxvYWRBdWRpbyA9IGZ1bmN0aW9uKCkge1xuICAgIHN0dWRpb0FwcC5sb2FkQXVkaW8oc2tpbi53aW5Tb3VuZCwgJ3dpbicpO1xuICAgIHN0dWRpb0FwcC5sb2FkQXVkaW8oc2tpbi5zdGFydFNvdW5kLCAnc3RhcnQnKTtcbiAgICBzdHVkaW9BcHAubG9hZEF1ZGlvKHNraW4uZmFpbHVyZVNvdW5kLCAnZmFpbHVyZScpO1xuICB9O1xuXG4gIGNvbmZpZy5hZnRlckluamVjdCA9IGZ1bmN0aW9uKCkge1xuICAgIC8qKlxuICAgICAqIFRoZSByaWNobmVzcyBvZiBibG9jayBjb2xvdXJzLCByZWdhcmRsZXNzIG9mIHRoZSBodWUuXG4gICAgICogTU9PQyBibG9ja3Mgc2hvdWxkIGJlIGJyaWdodGVyICh0YXJnZXQgYXVkaWVuY2UgaXMgeW91bmdlcikuXG4gICAgICogTXVzdCBiZSBpbiB0aGUgcmFuZ2Ugb2YgMCAoaW5jbHVzaXZlKSB0byAxIChleGNsdXNpdmUpLlxuICAgICAqIEJsb2NrbHkncyBkZWZhdWx0IGlzIDAuNDUuXG4gICAgICovXG4gICAgQmxvY2tseS5IU1ZfU0FUVVJBVElPTiA9IDAuNjtcblxuICAgIGRyYXdNYXAoKTtcbiAgfTtcblxuICAvLyBvbmx5IGhhdmUgdHJhc2hjYW4gZm9yIGxldmVscyB3aXRoIHRvb2xib3hcbiAgY29uZmlnLnRyYXNoY2FuID0gISFsZXZlbC50b29sYm94O1xuICBjb25maWcuc2Nyb2xsYmFycyA9IGZhbHNlO1xuXG4gIGNvbmZpZy5lbmFibGVTaG93Q29kZSA9IGZhbHNlO1xuICBjb25maWcuZW5hYmxlU2hvd0Jsb2NrQ291bnQgPSBmYWxzZTtcblxuICBzdHVkaW9BcHAuaW5pdChjb25maWcpO1xuXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdydW5CdXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICBKaWdzYXcuc3VjY2Vzc0xpc3RlbmVyID0gQmxvY2tseS5tYWluQmxvY2tTcGFjZUVkaXRvci5hZGRDaGFuZ2VMaXN0ZW5lcihmdW5jdGlvbihldnQpIHtcbiAgICBjaGVja0ZvclN1Y2Nlc3MoKTtcbiAgfSk7XG5cbiAgLy8gT25seSB1c2VkIGJ5IGxldmVsMSwgaW4gd2hpY2ggdGhlIHN1Y2Nlc3MgY3JpdGVyaWEgaXMgY2xpY2tpbmcgb24gdGhlIGJsb2NrXG4gIHZhciBibG9jazEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiW2Jsb2NrLWlkPScxJ11cIilbMF07XG4gIGlmIChibG9jazEpIHtcbiAgICBkb20uYWRkTW91c2VEb3duVG91Y2hFdmVudChibG9jazEsIGZ1bmN0aW9uICgpIHtcbiAgICAgIEppZ3Nhdy5ibG9jazFDbGlja2VkID0gdHJ1ZTtcbiAgICB9KTtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2hlY2tGb3JTdWNjZXNzKCkge1xuICB2YXIgc3VjY2VzcyA9IGxldmVsLmdvYWwuc3VjY2Vzc0NvbmRpdGlvbigpO1xuICBpZiAoc3VjY2Vzcykge1xuICAgIEJsb2NrbHkucmVtb3ZlQ2hhbmdlTGlzdGVuZXIoSmlnc2F3LnN1Y2Nlc3NMaXN0ZW5lcik7XG5cbiAgICBKaWdzYXcucmVzdWx0ID0gUmVzdWx0VHlwZS5TVUNDRVNTO1xuICAgIEppZ3Nhdy5vblB1enpsZUNvbXBsZXRlKCk7XG4gIH1cbn1cblxuLyoqXG4gKiBBcHAgc3BlY2lmaWMgZGlzcGxheUZlZWRiYWNrIGZ1bmN0aW9uIHRoYXQgY2FsbHMgaW50b1xuICogc3R1ZGlvQXBwLmRpc3BsYXlGZWVkYmFjayB3aGVuIGFwcHJvcHJpYXRlXG4gKi9cbnZhciBkaXNwbGF5RmVlZGJhY2sgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCFKaWdzYXcud2FpdGluZ0ZvclJlcG9ydCkge1xuICAgIHN0dWRpb0FwcC5kaXNwbGF5RmVlZGJhY2soe1xuICAgICAgYXBwOiAnSmlnc2F3JyxcbiAgICAgIHNraW46IHNraW4uaWQsXG4gICAgICBmZWVkYmFja1R5cGU6IEppZ3Nhdy50ZXN0UmVzdWx0cyxcbiAgICAgIHJlc3BvbnNlOiBKaWdzYXcucmVzcG9uc2UsXG4gICAgICBsZXZlbDogbGV2ZWxcbiAgICB9KTtcbiAgfVxufTtcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBiZSBjYWxsZWQgd2hlbiB0aGUgc2VydmljZSByZXBvcnQgY2FsbCBpcyBjb21wbGV0ZVxuICogQHBhcmFtIHtvYmplY3R9IEpTT04gcmVzcG9uc2UgKGlmIGF2YWlsYWJsZSlcbiAqL1xuSmlnc2F3Lm9uUmVwb3J0Q29tcGxldGUgPSBmdW5jdGlvbihyZXNwb25zZSkge1xuICBKaWdzYXcucmVzcG9uc2UgPSByZXNwb25zZTtcbiAgSmlnc2F3LndhaXRpbmdGb3JSZXBvcnQgPSBmYWxzZTtcbiAgZGlzcGxheUZlZWRiYWNrKCk7XG59O1xuXG4vKipcbiAqIEV4ZWN1dGUgdGhlIHVzZXIncyBjb2RlLiAgSGVhdmVuIGhlbHAgdXMuLi5cbiAqL1xuSmlnc2F3LmV4ZWN1dGUgPSBmdW5jdGlvbigpIHtcbiAgLy8gZXhlY3V0ZSBpcyBhIG5vLW9wIGZvciBqaWdzYXdcbn07XG5cbkppZ3Nhdy5vblB1enpsZUNvbXBsZXRlID0gZnVuY3Rpb24oKSB7XG5cbiAgLy8gSWYgd2Uga25vdyB0aGV5IHN1Y2NlZWRlZCwgbWFyayBsZXZlbENvbXBsZXRlIHRydWVcbiAgLy8gTm90ZSB0aGF0IHdlIGhhdmUgbm90IHlldCBhbmltYXRlZCB0aGUgc3VjY2VzZnVsIHJ1blxuICB2YXIgbGV2ZWxDb21wbGV0ZSA9IChKaWdzYXcucmVzdWx0ID09IFJlc3VsdFR5cGUuU1VDQ0VTUyk7XG5cbiAgSmlnc2F3LnRlc3RSZXN1bHRzID0gc3R1ZGlvQXBwLmdldFRlc3RSZXN1bHRzKGxldmVsQ29tcGxldGUsIHtcbiAgICBhbGxvd1RvcEJsb2NrczogdHJ1ZVxuICB9KTtcblxuICBpZiAoSmlnc2F3LnRlc3RSZXN1bHRzID49IFRlc3RSZXN1bHRzLkZSRUVfUExBWSkge1xuICAgIHN0dWRpb0FwcC5wbGF5QXVkaW8oJ3dpbicpO1xuICB9IGVsc2Uge1xuICAgIHN0dWRpb0FwcC5wbGF5QXVkaW8oJ2ZhaWx1cmUnKTtcbiAgfVxuXG4gIHZhciB4bWwgPSBCbG9ja2x5LlhtbC5ibG9ja1NwYWNlVG9Eb20oQmxvY2tseS5tYWluQmxvY2tTcGFjZSk7XG4gIHZhciB0ZXh0QmxvY2tzID0gQmxvY2tseS5YbWwuZG9tVG9UZXh0KHhtbCk7XG5cbiAgSmlnc2F3LndhaXRpbmdGb3JSZXBvcnQgPSB0cnVlO1xuXG4gIC8vIFJlcG9ydCByZXN1bHQgdG8gc2VydmVyLlxuICBzdHVkaW9BcHAucmVwb3J0KHtcbiAgICAgYXBwOiAnSmlnc2F3JyxcbiAgICAgbGV2ZWw6IGxldmVsLmlkLFxuICAgICByZXN1bHQ6IEppZ3Nhdy5yZXN1bHQgPT09IFJlc3VsdFR5cGUuU1VDQ0VTUyxcbiAgICAgdGVzdFJlc3VsdDogSmlnc2F3LnRlc3RSZXN1bHRzLFxuICAgICBwcm9ncmFtOiBlbmNvZGVVUklDb21wb25lbnQodGV4dEJsb2NrcyksXG4gICAgIG9uQ29tcGxldGU6IEppZ3Nhdy5vblJlcG9ydENvbXBsZXRlXG4gIH0pO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzPSAoZnVuY3Rpb24oKSB7XG4gIHZhciB0ID0gZnVuY3Rpb24gYW5vbnltb3VzKGxvY2FscywgZmlsdGVycywgZXNjYXBlKSB7XG5lc2NhcGUgPSBlc2NhcGUgfHwgZnVuY3Rpb24gKGh0bWwpe1xuICByZXR1cm4gU3RyaW5nKGh0bWwpXG4gICAgLnJlcGxhY2UoLyYoPyFcXHcrOykvZywgJyZhbXA7JylcbiAgICAucmVwbGFjZSgvPC9nLCAnJmx0OycpXG4gICAgLnJlcGxhY2UoLz4vZywgJyZndDsnKVxuICAgIC5yZXBsYWNlKC9cIi9nLCAnJnF1b3Q7Jyk7XG59O1xudmFyIGJ1ZiA9IFtdO1xud2l0aCAobG9jYWxzIHx8IHt9KSB7IChmdW5jdGlvbigpeyBcbiBidWYucHVzaCgnJyk7MTsgdmFyIG1zZyA9IHJlcXVpcmUoJy4vbG9jYWxlJykgOyBidWYucHVzaCgnXFxuJyk7IH0pKCk7XG59IFxucmV0dXJuIGJ1Zi5qb2luKCcnKTtcbn07XG4gIHJldHVybiBmdW5jdGlvbihsb2NhbHMpIHtcbiAgICByZXR1cm4gdChsb2NhbHMsIHJlcXVpcmUoXCJlanNcIikuZmlsdGVycyk7XG4gIH1cbn0oKSk7IiwiLyoqXG4gKiBCbG9ja2x5IEFwcDogSmlnc2F3XG4gKlxuICogQ29weXJpZ2h0IDIwMTMgQ29kZS5vcmdcbiAqXG4gKi9cbid1c2Ugc3RyaWN0JztcblxudmFyIG1zZyA9IHJlcXVpcmUoJy4vbG9jYWxlJyk7XG52YXIgZG9tID0gcmVxdWlyZSgnLi4vZG9tJyk7XG52YXIgbGV2ZWxzID0gcmVxdWlyZSgnLi9sZXZlbHMnKTtcblxudmFyIHBhdHRlcm5DYWNoZSA9IHtcbiAgcXVldWVkOiBbXSxcbiAgY3JlYXRlZDoge30sXG5cbiAgLyoqXG4gICAqIFN0aWNrIGFuIGl0ZW0gaW4gb3VyIHF1ZXVlXG4gICAqL1xuICBhZGRUb1F1ZXVlOiBmdW5jdGlvbiAocGF0dGVybkluZm8pIHtcbiAgICB0aGlzLnF1ZXVlZC5wdXNoKHBhdHRlcm5JbmZvKTtcbiAgfSxcblxuICAvKipcbiAgICogQWRkIGFsbCB0aGUgc3ZnIHBhdHRlcm5zIHdlJ3ZlIHF1ZXVlZCB1cC5cbiAgICovXG4gIGFkZFF1ZXVlZFBhdHRlcm5zOiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5xdWV1ZWQuZm9yRWFjaChmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgYWRkUGF0dGVybihwYXR0ZXJuLmlkLCBwYXR0ZXJuLmltYWdlUGF0aCwgcGF0dGVybi53aWR0aCwgcGF0dGVybi5oZWlnaHQsXG4gICAgICAgIHBhdHRlcm4ub2Zmc2V0WCwgcGF0dGVybi5vZmZzZXRZKTtcbiAgICB9KTtcbiAgICB0aGlzLnF1ZXVlZCA9IFtdO1xuICB9LFxuXG4gIC8qKlxuICAgKiBIYXZlIHdlIGFscmVhZHkgY3JlYXRlZCBhbiBzdmcgZWxlbWVudCBmb3IgdGhpcyBwYXR0ZXJuSW5mbz8gIFRocm93cyBpZlxuICAgKiB3ZSBhc2sgd2l0aCBhIHBhdHRlcm5JbmZvIHRoYXQgaGFzIHRoZSBzYW1lIGlkIGJ1dCBkaWZmZXJlbnQgYXR0cmlidXRlcy5cbiAgICovXG4gIHdhc0NyZWF0ZWQ6IGZ1bmN0aW9uIChwYXR0ZXJuSW5mbykge1xuICAgIHZhciBlcXVhbCA9IHRydWU7XG4gICAgdmFyIGNhY2hlZCA9IHRoaXMuY3JlYXRlZFtwYXR0ZXJuSW5mby5pZF07XG4gICAgaWYgKCFjYWNoZWQpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBPYmplY3Qua2V5cyhwYXR0ZXJuSW5mbykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICBpZiAocGF0dGVybkluZm9ba2V5XSAhPT0gY2FjaGVkW2tleV0pIHtcbiAgICAgICAgZXF1YWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAoIWVxdWFsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW4ndCBhZGQgYXR0cmlidXRlIG9mIHNhbWUgaWQgd2l0aCBkaWZmZXJlbnQgYXR0cmlidXRlc1wiKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG5cbiAgLyoqXG4gICAqIE1hcmsgdGhhdCB3ZSd2ZSBjcmVhdGVkIGFuIHN2ZyBwYXR0ZXJuXG4gICAqL1xuICBtYXJrQ3JlYXRlZDogZnVuY3Rpb24gKHBhdHRlcm5JbmZvKSB7XG4gICAgaWYgKHRoaXMuY3JlYXRlZFtwYXR0ZXJuSW5mby5pZF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSBoYXZlIGNhY2hlZCBpdGVtIHdpdGggaWQ6ICcgKyBwYXR0ZXJuSW5mby5pZCk7XG4gICAgfVxuICAgIHRoaXMuY3JlYXRlZFtwYXR0ZXJuSW5mby5pZF0gPSBwYXR0ZXJuSW5mbztcbiAgfVxuXG59O1xuXG52YXIgcGF0dGVybnMgPSBbXTtcbnZhciBjcmVhdGVkUGF0dGVybnMgPSB7fTtcblxuLyoqXG4gKiBBZGQgYW4gc3ZnIHBhdHRlcm4gZm9yIHRoZSBnaXZlbiBpbWFnZS4gSWYgZG9jdW1lbnQgaXMgbm90IHlldCBmdWxseSBsb2FkZWQsXG4gKiBpdCB3aWxsIGFkZCB0aGUgcGF0dGVybiB0byBhIGxpc3QgZm9yIGxhdGVyLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBpZCBQYXR0ZXJuIG5hbWVcbiAqIEBwYXJhbSB7c3RyaW5nfSBpbWFnZVBhdGggVXJsIG9mIHRoZSBpbWFnZVxuICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoIFdpZHRoIG9mIHRoZSBpbWFnZVxuICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodCBIZWlnaHQgb2YgdGhlIGltYWdlXG4gKiBAcGFyYW0ge251bWJlcnxmdW5jdGlvbn0gb2Zmc2V0WCBPZmZzZXQgb2YgdGhlIGltYWdlIHRvIHN0YXJ0IHBhdHRlcm5cbiAqIEBwYXJhbSB7bnVtYmVyfGZ1bmN0aW9ufSBvZmZzZXRZIE9mZnNldCBvZiB0aGUgaW1hZ2UgdG8gc3RhcnQgcGF0dGVyblxuICovXG52YXIgYWRkUGF0dGVybiA9IGZ1bmN0aW9uIChpZCwgaW1hZ2VQYXRoLCB3aWR0aCwgaGVpZ2h0LCBvZmZzZXRYLCBvZmZzZXRZKSB7XG4gIHZhciB4LCB5LCBwYXR0ZXJuLCBwYXR0ZXJuSW1hZ2U7XG4gIHZhciBwYXR0ZXJuSW5mbyA9IHtcbiAgICBpZDogaWQsXG4gICAgaW1hZ2VQYXRoOiBpbWFnZVBhdGgsXG4gICAgd2lkdGg6IHdpZHRoLFxuICAgIGhlaWdodDogaGVpZ2h0LFxuICAgIG9mZnNldFg6IG9mZnNldFgsXG4gICAgb2Zmc2V0WTogb2Zmc2V0WVxuICB9O1xuXG4gIC8vIElmIHdlIGRvbid0IHlldCBoYXZlIGFuIHN2Z0RlZnMsIHF1ZXVlIHRoZSBwYXR0ZXJuIGFuZCB3YWl0IHVudGlsIHdlIGRvXG4gIHZhciBzdmdEZWZzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NrbHlTdmdEZWZzJyk7XG4gIGlmICghc3ZnRGVmcykge1xuICAgIHBhdHRlcm5DYWNoZS5hZGRUb1F1ZXVlKHBhdHRlcm5JbmZvKTtcbiAgfSBlbHNlIGlmICghcGF0dGVybkNhY2hlLndhc0NyZWF0ZWQocGF0dGVybkluZm8pKSB7XG4gICAgLy8gYWRkIHRoZSBwYXR0ZXJuXG4gICAgeCA9IHR5cGVvZihvZmZzZXRYKSA9PT0gXCJmdW5jdGlvblwiID8gLW9mZnNldFgoKSA6IC1vZmZzZXRYO1xuICAgIHkgPSB0eXBlb2Yob2Zmc2V0WSkgPT09IFwiZnVuY3Rpb25cIiA/IC1vZmZzZXRZKCkgOiAtb2Zmc2V0WTtcbiAgICBwYXR0ZXJuID0gQmxvY2tseS5jcmVhdGVTdmdFbGVtZW50KCdwYXR0ZXJuJywge1xuICAgICAgaWQ6IGlkLFxuICAgICAgcGF0dGVyblVuaXRzOiAndXNlclNwYWNlT25Vc2UnLFxuICAgICAgd2lkdGg6IFwiMTAwJVwiLFxuICAgICAgaGVpZ2h0OiBoZWlnaHQsXG4gICAgICB4OiB4LFxuICAgICAgeTogeVxuICAgIH0sIHN2Z0RlZnMpO1xuICAgIHBhdHRlcm5JbWFnZSA9IEJsb2NrbHkuY3JlYXRlU3ZnRWxlbWVudCgnaW1hZ2UnLCB7XG4gICAgICB3aWR0aDogd2lkdGgsXG4gICAgICBoZWlnaHQ6IGhlaWdodFxuICAgIH0sIHBhdHRlcm4pO1xuICAgIHBhdHRlcm5JbWFnZS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluaycsICd4bGluazpocmVmJyxcbiAgICAgIGltYWdlUGF0aCk7XG5cbiAgICBwYXR0ZXJuQ2FjaGUubWFya0NyZWF0ZWQocGF0dGVybkluZm8pO1xuICB9XG4gIHJldHVybiBpZDtcbn07XG5cbi8qKlxuICogU2VhcmNoIHRoZSB3b3Jrc3BhY2UgZm9yIGEgYmxvY2sgb2YgdGhlIGdpdmVuIHR5cGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ30gdHlwZSBUaGUgdHlwZSBvZiB0aGUgYmxvY2sgdG8gc2VhcmNoIGZvclxuICovXG52YXIgYmxvY2tPZlR5cGUgPSBmdW5jdGlvbiAodHlwZSkge1xuICB2YXIgYmxvY2tzID0gQmxvY2tseS5tYWluQmxvY2tTcGFjZS5nZXRBbGxCbG9ja3MoKTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBibG9ja3MubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYmxvY2tzW2ldLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiBibG9ja3NbaV07XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuLyoqXG4gKiBHZXQgdGhlIHdpZHRoIG9mIHRoZSBibG9jayBvZiB0aGUgZ2l2ZW4gdHlwZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIFRoZSB0eXBlIG9mIHRoZSBibG9jayB0byBzZWFyY2ggZm9yXG4gKi9cbnZhciBibG9ja1dpZHRoID0gZnVuY3Rpb24gKHR5cGUpIHtcbiAgcmV0dXJuIGJsb2NrT2ZUeXBlKHR5cGUpLmdldEhlaWdodFdpZHRoKCkud2lkdGg7XG59O1xuXG5mdW5jdGlvbiBhZGRRdWV1ZWRXaGVuUmVhZHkoKSB7XG4gIGlmICghZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Jsb2NrbHlTdmdEZWZzJykpIHtcbiAgICBzZXRUaW1lb3V0KGFkZFF1ZXVlZFdoZW5SZWFkeSwgMTAwKTtcbiAgICByZXR1cm47XG4gIH1cbiAgcGF0dGVybkNhY2hlLmFkZFF1ZXVlZFBhdHRlcm5zKCk7XG59XG5cblxuLy8gSW5zdGFsbCBleHRlbnNpb25zIHRvIEJsb2NrbHkncyBsYW5ndWFnZSBhbmQgSmF2YVNjcmlwdCBnZW5lcmF0b3IuXG5leHBvcnRzLmluc3RhbGwgPSBmdW5jdGlvbihibG9ja2x5LCBibG9ja0luc3RhbGxPcHRpb25zKSB7XG4gIHZhciBza2luID0gYmxvY2tJbnN0YWxsT3B0aW9ucy5za2luO1xuICAvLyBjb3VsZCBtYWtlIHRoaXMgc2V0dGFibGUgb24gdGhlIGxldmVsIGlmIEkgbmVlZFxuICB2YXIgSFNWID0gWzAsIDEuMDAsIDAuOThdO1xuXG4gIHZhciBleGlzdGluZ0Jsb2NrcyA9IE9iamVjdC5rZXlzKGJsb2NrbHkuQmxvY2tzKTtcblxuICBPYmplY3Qua2V5cyhsZXZlbHMpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XG4gICAgdmFyIGxldmVsID0gbGV2ZWxzW2tleV07XG4gICAgZ2VuZXJhdGVKaWdzYXdCbG9ja3NGb3JMZXZlbChibG9ja2x5LCBza2luLCB7XG4gICAgICBpbWFnZTogc2tpbltsZXZlbC5pbWFnZS5uYW1lXSxcbiAgICAgIEhTVjogbGV2ZWwuYmFja2dyb3VuZEhTViB8fCBIU1YsXG4gICAgICB3aWR0aDogbGV2ZWwuaW1hZ2Uud2lkdGgsXG4gICAgICBoZWlnaHQ6IGxldmVsLmltYWdlLmhlaWdodCxcbiAgICAgIG51bUJsb2NrczogbGV2ZWwubnVtQmxvY2tzLFxuICAgICAgbm90Y2hlZEVuZHM6IGxldmVsLm5vdGNoZWRFbmRzLFxuICAgICAgbGV2ZWw6IGtleVxuICAgIH0pO1xuXG4gICAgaWYgKGxldmVsLm51bUJsb2NrcyA9PT0gMCkge1xuICAgICAgLy8gc3RpbGwgd2FudCB0aGUgcGF0dGVybiBmb3IgdGhlIGdob3N0XG4gICAgICB2YXIgcGF0dGVybk5hbWUgPSAncGF0XycgKyBsZXZlbC5pZCArICdBJztcbiAgICAgIGFkZFBhdHRlcm4ocGF0dGVybk5hbWUsIHNraW5bbGV2ZWwuaW1hZ2UubmFtZV0sIGxldmVsLmltYWdlLndpZHRoLFxuICAgICAgICBsZXZlbC5pbWFnZS5oZWlnaHQsIDAsIDApO1xuICAgIH1cbiAgfSk7XG5cbiAgZ2VuZXJhdGVCbGFua0Jsb2NrKGJsb2NrbHksIHNraW4sICdqaWdzYXdfcmVwZWF0JywgWzMyMiwgMC45MCwgMC45NV0sIDEwMCwgdHJ1ZSk7XG4gIGdlbmVyYXRlQmxhbmtCbG9jayhibG9ja2x5LCBza2luLCAnamlnc2F3X2dyZWVuJywgWzE0MCwgMS4wMCwgMC43NF0sIDgwKTtcbiAgZ2VuZXJhdGVCbGFua0Jsb2NrKGJsb2NrbHksIHNraW4sICdqaWdzYXdfYmx1ZScsIFsxODQsIDEuMDAsIDAuNzRdLCA4MCk7XG4gIGdlbmVyYXRlQmxhbmtCbG9jayhibG9ja2x5LCBza2luLCAnamlnc2F3X3B1cnBsZScsIFszMTIsIDAuMzIsIDAuNjJdLCA4MCk7XG5cbiAgLy8gR28gdGhyb3VnaCBhbGwgYWRkZWQgYmxvY2tzLCBhbmQgYWRkIGVtcHR5IGdlbmVyYXRvcnMgZm9yIHRob3NlIHRoYXRcbiAgLy8gd2VyZW4ndCBhbHJlYWR5IGdpdmVuIGdlbmVyYXRvcnNcbiAgdmFyIGdlbmVyYXRvciA9IGJsb2NrbHkuR2VuZXJhdG9yLmdldCgnSmF2YVNjcmlwdCcpO1xuICBibG9ja2x5LkphdmFTY3JpcHQgPSBnZW5lcmF0b3I7XG4gIE9iamVjdC5rZXlzKGJsb2NrbHkuQmxvY2tzKS5mb3JFYWNoKGZ1bmN0aW9uIChibG9jaykge1xuICAgIGlmIChleGlzdGluZ0Jsb2Nrcy5pbmRleE9mKGJsb2NrKSA9PT0gLTEgJiYgIWdlbmVyYXRvcltibG9ja10pIHtcbiAgICAgIGdlbmVyYXRvcltibG9ja10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnXFxuJztcbiAgICAgIH07XG4gICAgfVxuICB9KTtcblxuICBhZGRRdWV1ZWRXaGVuUmVhZHkoKTtcblxuICBkZWxldGUgYmxvY2tseS5CbG9ja3MucHJvY2VkdXJlc19kZWZyZXR1cm47XG4gIGRlbGV0ZSBibG9ja2x5LkJsb2Nrcy5wcm9jZWR1cmVzX2lmcmV0dXJuO1xufTtcblxuZnVuY3Rpb24gZ2VuZXJhdGVCbGFua0Jsb2NrKGJsb2NrbHksIHNraW4sIG5hbWUsIGhzdiwgd2lkdGgsIGhhc0FwcGVuZCkge1xuICBibG9ja2x5LkJsb2Nrc1tuYW1lXSA9IHtcbiAgICBoZWxwVXJsOiAnJyxcbiAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldEhTVi5hcHBseSh0aGlzLCBoc3YpO1xuICAgICAgdGhpcy5hcHBlbmREdW1teUlucHV0KClcbiAgICAgICAgLmFwcGVuZFRpdGxlKG5ldyBibG9ja2x5LkZpZWxkSW1hZ2Uoc2tpbi5ibGFuaywgd2lkdGgsIDU0KSk7XG4gICAgICB0aGlzLnNldFByZXZpb3VzU3RhdGVtZW50KHRydWUpO1xuICAgICAgaWYgKGhhc0FwcGVuZCkge1xuICAgICAgICB0aGlzLmFwcGVuZFN0YXRlbWVudElucHV0KCdjaGlsZCcpO1xuICAgICAgfVxuICAgICAgdGhpcy5zZXROZXh0U3RhdGVtZW50KHRydWUpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVKaWdzYXdCbG9ja3NGb3JMZXZlbChibG9ja2x5LCBza2luLCBvcHRpb25zKSB7XG4gIHZhciBpbWFnZSA9IG9wdGlvbnMuaW1hZ2U7XG4gIHZhciB3aWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gIHZhciBoZWlnaHQgPSBvcHRpb25zLmhlaWdodDtcbiAgdmFyIG51bUJsb2NrcyA9IG9wdGlvbnMubnVtQmxvY2tzO1xuICB2YXIgbGV2ZWwgPSBvcHRpb25zLmxldmVsO1xuICB2YXIgSFNWID0gb3B0aW9ucy5IU1Y7XG4gIC8vIGlmIHRydWUsIGZpcnN0L2xhc3QgYmxvY2sgd2lsbCBzdGlsbCBoYXZlIHByZXZpb3VzL25leHQgbm90Y2hlc1xuICB2YXIgbm90Y2hlZEVuZHMgPSBvcHRpb25zLm5vdGNoZWRFbmRzO1xuXG4gIHZhciBibG9ja0hlaWdodCA9IGhlaWdodCAvIG51bUJsb2NrcztcbiAgdmFyIHRpdGxlV2lkdGggPSB3aWR0aCAtIDIwO1xuICB2YXIgdGl0bGVIZWlnaHQgPSBibG9ja0hlaWdodCAtIDEwO1xuXG4gIHZhciBsZXR0ZXJzID0gJy1BQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWic7XG5cbiAgZnVuY3Rpb24gZ2VuZXJhdGVCbG9jayhibG9ja051bSkge1xuICAgIHZhciBibG9ja05hbWUgPSAnamlnc2F3XycgKyBsZXZlbCArIGxldHRlcnNbYmxvY2tOdW1dO1xuICAgIHZhciBwYXR0ZXJuTmFtZSA9ICdwYXRfJyArIGxldmVsICsgbGV0dGVyc1tibG9ja051bV07XG4gICAgYmxvY2tseS5CbG9ja3NbYmxvY2tOYW1lXSA9IHtcbiAgICAgIGhlbHBVcmw6ICcnLFxuICAgICAgaW5pdDogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnNldEhTVi5hcHBseSh0aGlzLCBIU1YpO1xuICAgICAgICB0aGlzLmFwcGVuZER1bW15SW5wdXQoKVxuICAgICAgICAgIC5hcHBlbmRUaXRsZShuZXcgYmxvY2tseS5GaWVsZEltYWdlKHNraW4uYmxhbmssIHRpdGxlV2lkdGgsIHRpdGxlSGVpZ2h0KSk7XG4gICAgICAgIHRoaXMuc2V0UHJldmlvdXNTdGF0ZW1lbnQoYmxvY2tOdW0gIT09IDEgfHwgbm90Y2hlZEVuZHMpO1xuICAgICAgICB0aGlzLnNldE5leHRTdGF0ZW1lbnQoYmxvY2tOdW0gIT09IG51bUJsb2NrcyB8fCBub3RjaGVkRW5kcyk7XG4gICAgICAgIHRoaXMuc2V0RmlsbFBhdHRlcm4oXG4gICAgICAgICAgYWRkUGF0dGVybihwYXR0ZXJuTmFtZSwgaW1hZ2UsIHdpZHRoLCBoZWlnaHQsIDAsXG4gICAgICAgICAgICBibG9ja0hlaWdodCAqIChibG9ja051bSAtIDEpKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfVxuXG4gIGZvciAodmFyIGkgPSAxOyBpIDw9IG51bUJsb2NrczsgaSsrKSB7XG4gICAgZ2VuZXJhdGVCbG9jayhpKTtcbiAgfVxufVxuIiwiLy8gbG9jYWxlIGZvciBqaWdzYXdcblxubW9kdWxlLmV4cG9ydHMgPSB3aW5kb3cuYmxvY2tseS5qaWdzYXdfbG9jYWxlO1xuIiwiLypqc2hpbnQgbXVsdGlzdHI6IHRydWUgKi9cblxudmFyIGNyZWF0ZVRvb2xib3ggPSByZXF1aXJlKCcuLi9ibG9ja191dGlscycpLmNyZWF0ZVRvb2xib3g7XG5cbnZhciBqaWdzYXdCbG9jayA9IGZ1bmN0aW9uICh0eXBlLCB4LCB5LCBjaGlsZCwgY2hpbGRUeXBlKSB7XG4gIHJldHVybiBqaWdzYXdCbG9ja1dpdGhEZWxldGFibGVBdHRyKHR5cGUsIHgsIHksIGNoaWxkLCBjaGlsZFR5cGUsIHRydWUpO1xufTtcblxudmFyIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2sgPSBmdW5jdGlvbiAodHlwZSwgeCwgeSwgY2hpbGQsIGNoaWxkVHlwZSkge1xuICByZXR1cm4gamlnc2F3QmxvY2tXaXRoRGVsZXRhYmxlQXR0cih0eXBlLCB4LCB5LCBjaGlsZCwgY2hpbGRUeXBlLCBmYWxzZSk7XG59O1xuXG52YXIgamlnc2F3QmxvY2tXaXRoRGVsZXRhYmxlQXR0ciA9IGZ1bmN0aW9uICh0eXBlLCB4LCB5LCBjaGlsZCwgY2hpbGRUeXBlLCBkZWxldGFibGUpIHtcbiAgdmFyIGNoaWxkQXR0ciA9ICcnO1xuICB4ID0geCB8fCAwO1xuICB5ID0geSB8fCAwO1xuICBjaGlsZFR5cGUgPSBjaGlsZFR5cGUgfHwgXCJuZXh0XCI7XG4gIGlmIChjaGlsZFR5cGUgPT09ICdzdGF0ZW1lbnQnKSB7XG4gICAgY2hpbGRBdHRyID0gXCIgbmFtZT0nY2hpbGQnXCI7XG4gIH1cbiAgcmV0dXJuICc8YmxvY2sgdHlwZT1cIicgKyB0eXBlICsgJ1wiIGRlbGV0YWJsZT1cIicgKyBkZWxldGFibGUgKyAnXCInICtcbiAgICAnIHg9XCInICsgeCArICdcIicgK1xuICAgICcgeT1cIicgKyB5ICsgJ1wiPicgK1xuICAgIChjaGlsZCA/ICc8JyArIGNoaWxkVHlwZSArIGNoaWxkQXR0ciArICc+JyArIGNoaWxkICsgJzwvJyArIGNoaWxkVHlwZSArICc+JyA6ICcnKSArXG4gICAgJzwvYmxvY2s+Jztcbn07XG5cbi8qKlxuICogVmFsaWRhdGVzIHdoZXRoZXIgcHV6emxlIGhhcyBiZWVuIHN1Y2Nlc3NmdWxseSBwdXQgdG9nZXRoZXIuXG4gKlxuICogQHBhcmFtIHtzdHJpbmdbXX0gbGlzdCBvZiB0eXBlc1xuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubGV2ZWwgTGV2ZWwgbnVtYmVyXG4gKiBAUGFyYW0ge251bWJlcn0gb3B0aW9ucy5udW1CbG9ja3MgSG93IG1hbnkgYmxvY2tzIHRoZXJlIGFyZSBpbiB0aGUgbGV2ZWxcbiAqL1xudmFyIHZhbGlkYXRlU2ltcGxlUHV6emxlID0gZnVuY3Rpb24gKHR5cGVzLCBvcHRpb25zKSB7XG4gIHZhciBudW1CbG9ja3M7XG4gIGlmICh0eXBlcykge1xuICAgIG51bUJsb2NrcyA9IHR5cGVzLmxlbmd0aDtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGV0dGVycyA9ICctQUJDREVGR0hJSktMTU5PUFFSU1RVVldYWVonO1xuICAgIHZhciBsZXZlbCA9IG9wdGlvbnMubGV2ZWw7XG4gICAgbnVtQmxvY2tzID0gb3B0aW9ucy5udW1CbG9ja3M7XG5cbiAgICB0eXBlcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IG51bUJsb2NrczsgaSsrKSB7XG4gICAgICB0eXBlcy5wdXNoKCdqaWdzYXdfJyArIGxldmVsICsgbGV0dGVyc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgdmFyIHJvb3RzID0gQmxvY2tseS5tYWluQmxvY2tTcGFjZS5nZXRUb3BCbG9ja3MoKTtcbiAgaWYgKHJvb3RzLmxlbmd0aCAhPT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHZhciBkZXB0aCA9IDA7XG4gIHZhciBibG9jayA9IHJvb3RzWzBdO1xuICB3aGlsZSAoZGVwdGggPCBudW1CbG9ja3MpIHtcbiAgICBpZiAoIWJsb2NrIHx8IGJsb2NrLnR5cGUgIT09IHR5cGVzW2RlcHRoXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgY2hpbGRyZW4gPSBibG9jay5nZXRDaGlsZHJlbigpO1xuICAgIGlmIChjaGlsZHJlbi5sZW5ndGggPiAxKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGJsb2NrID0gY2hpbGRyZW5bMF07XG4gICAgZGVwdGgrKztcbiAgfVxuXG4gIC8vIGxhc3QgYmxvY2sgc2hvdWxkbnQgaGF2ZSBjaGlsZHJlblxuICBpZiAoYmxvY2sgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLypcbiAqIENvbmZpZ3VyYXRpb24gZm9yIGFsbCBsZXZlbHMuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICcxJzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdhcHBsZScsXG4gICAgYW5pR2lmVVJMOiAnL3NjcmlwdF9hc3NldHMva18xX2ltYWdlcy9pbnN0cnVjdGlvbl9naWZzL2NsaWNrLWJsb2NrLmdpZicsXG4gICAgaXNLMTogdHJ1ZSxcbiAgICBpbWFnZToge1xuICAgICAgbmFtZTogJ2FwcGxlJyxcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDIwMFxuICAgIH0sXG4gICAgYmFja2dyb3VuZEhTVjogWzQxLCAxLjAwLCAwLjk2OV0sXG4gICAgbnVtQmxvY2tzOiAxLFxuICAgIHJlcXVpcmVkQmxvY2tzOiBbXSxcbiAgICBmcmVlUGxheTogZmFsc2UsXG4gICAgbGFyZ2VOb3RjaGVzOiB0cnVlLFxuICAgIGdvYWw6IHtcbiAgICAgIHN1Y2Nlc3NDb25kaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIEppZ3Nhdy5ibG9jazFDbGlja2VkO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RhcnRCbG9ja3M6XG4gICAgICB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfMUEnLCAyMCwgMjApXG4gIH0sXG4gICcyJzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdzbWlsZXknLFxuICAgIGFuaUdpZlVSTDogJy9zY3JpcHRfYXNzZXRzL2tfMV9pbWFnZXMvaW5zdHJ1Y3Rpb25fZ2lmcy9kcmFnLWRyb3AuZ2lmJyxcbiAgICBpc0sxOiB0cnVlLFxuICAgIGltYWdlOiB7XG4gICAgICBuYW1lOiAnc21pbGV5JyxcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDIwMFxuICAgIH0sXG4gICAgYmFja2dyb3VuZEhTVjogWzE4NCwgMS4wMCwgMC43MzNdLFxuICAgIGdob3N0OiB7XG4gICAgICB4OiA0MDAsXG4gICAgICB5OiAxMDBcbiAgICB9LFxuICAgIG51bUJsb2NrczogMSxcbiAgICByZXF1aXJlZEJsb2NrczogW10sXG4gICAgZnJlZVBsYXk6IGZhbHNlLFxuICAgIGxhcmdlTm90Y2hlczogdHJ1ZSxcbiAgICBnb2FsOiB7XG4gICAgICBzdWNjZXNzQ29uZGl0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIC8vIG5lZWQgdG8gYmUgZmluaXNoZWQgZHJhZ1xuICAgICAgICBpZiAoQmxvY2tseS5tYWluQmxvY2tTcGFjZS5kcmFnTW9kZSkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcG9zID0gQmxvY2tseS5tYWluQmxvY2tTcGFjZS5nZXRBbGxCbG9ja3MoKVswXS5nZXRSZWxhdGl2ZVRvU3VyZmFjZVhZKCk7XG4gICAgICAgIC8vIGhvdyBjbG9zZSB0byBnaG9zdD9cbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoNDAwIC0gcG9zLngpO1xuICAgICAgICB2YXIgZHkgPSBNYXRoLmFicygxMDAgLSBwb3MueSk7XG4gICAgICAgIHJldHVybiBkeCArIGR5IDwgODA7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydEJsb2NrczpcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd18yQScsIDIwLCAyMClcbiAgfSxcbiAgJzMnOiB7XG4gICAgaW5zdHJ1Y3Rpb25zSWNvbjogJ3NuYWlsJyxcbiAgICBhbmlHaWZVUkw6ICcvc2NyaXB0X2Fzc2V0cy9rXzFfaW1hZ2VzL2luc3RydWN0aW9uX2dpZnMvZHJhZy1jb25uZWN0LmdpZicsXG4gICAgaXNLMTogdHJ1ZSxcbiAgICBpbWFnZToge1xuICAgICAgbmFtZTogJ3NuYWlsJyxcbiAgICAgIHdpZHRoOiAyMDAsXG4gICAgICBoZWlnaHQ6IDIwMFxuICAgIH0sXG4gICAgYmFja2dyb3VuZEhTVjogWzM2LCAxLjAwLCAwLjk5OV0sXG4gICAgZ2hvc3Q6IHtcbiAgICAgIHg6IDQwMCxcbiAgICAgIHk6IDEwMFxuICAgIH0sXG4gICAgbnVtQmxvY2tzOiAyLFxuICAgIHJlcXVpcmVkQmxvY2tzOiBbXSxcbiAgICBmcmVlUGxheTogZmFsc2UsXG4gICAgbGFyZ2VOb3RjaGVzOiB0cnVlLFxuICAgIGdvYWw6IHtcbiAgICAgIHN1Y2Nlc3NDb25kaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlU2ltcGxlUHV6emxlKG51bGwsIHtsZXZlbDogMywgbnVtQmxvY2tzOiAyfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydEJsb2NrczpcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd18zQScsIDQwMCwgMTAwKSArXG4gICAgICB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfM0InLCAxMDAsIDIyMClcbiAgfSxcblxuICAnNCc6IHtcbiAgICBpbnN0cnVjdGlvbnNJY29uOiAnZWxlcGhhbnQnLFxuICAgIGlzSzE6IHRydWUsXG4gICAgaW1hZ2U6IHtcbiAgICAgIG5hbWU6ICdlbGVwaGFudCcsXG4gICAgICB3aWR0aDogMjAwLFxuICAgICAgaGVpZ2h0OiAyMDBcbiAgICB9LFxuICAgIGJhY2tncm91bmRIU1Y6IFszMjAsIDAuNjAsIDAuOTk5XSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDIsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiA0LCBudW1CbG9ja3M6IDJ9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0QmxvY2tzOlxuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzRBJywgMTAwLCAxNDApICtcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd180QicsIDQwMCwgMjAwKVxuICB9LFxuXG4gICc1Jzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdmaXNoJyxcbiAgICBpc0sxOiB0cnVlLFxuICAgIGltYWdlOiB7XG4gICAgICBuYW1lOiAnZmlzaCcsXG4gICAgICB3aWR0aDogMjAwLFxuICAgICAgaGVpZ2h0OiAyMDBcbiAgICB9LFxuICAgIGJhY2tncm91bmRIU1Y6IFsyMDksIDAuNTcsIDAuNjAwXSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDMsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgbm90Y2hlZEVuZHM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiA1LCBudW1CbG9ja3M6IDN9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0QmxvY2tzOlxuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzVBJywgMTAwLCAyMCkgK1xuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzVCJywgMTAwLCAxNDApICtcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd181QycsIDEwMCwgMjgwKVxuICB9LFxuXG4gICc2Jzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdkb2dnaWUnLFxuICAgIGlzSzE6IHRydWUsXG4gICAgaW1hZ2U6IHtcbiAgICAgIG5hbWU6ICdkb2dnaWUnLFxuICAgICAgd2lkdGg6IDIwMCxcbiAgICAgIGhlaWdodDogMjAwXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kSFNWOiBbMjUsIDAuNTcsIDAuOTYwXSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDMsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgbm90Y2hlZEVuZHM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiA2LCBudW1CbG9ja3M6IDN9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0QmxvY2tzOlxuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzZCJywgMTAwLCAyMCkgK1xuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzZBJywgMTAwLCAxNDApICtcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd182QycsIDEwMCwgMjgwKVxuICB9LFxuXG4gICc3Jzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICd0cmVlJyxcbiAgICBpc0sxOiB0cnVlLFxuICAgIGltYWdlOiB7XG4gICAgICBuYW1lOiAndHJlZScsXG4gICAgICB3aWR0aDogMjAwLFxuICAgICAgaGVpZ2h0OiAyMDBcbiAgICB9LFxuICAgIGJhY2tncm91bmRIU1Y6IFsyMzgsIDAuNTEsIDAuOTk5XSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDMsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgbm90Y2hlZEVuZHM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiA3LCBudW1CbG9ja3M6IDN9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0QmxvY2tzOlxuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzdCJywgMTAwLCAyMCkgK1xuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzdBJywgMTAwLCAxNDApICtcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd183QycsIDEwMCwgMjgwKVxuICB9LFxuXG4gICc4Jzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdmbG93ZXInLFxuICAgIGlzSzE6IHRydWUsXG4gICAgaW1hZ2U6IHtcbiAgICAgIG5hbWU6ICdmbG93ZXInLFxuICAgICAgd2lkdGg6IDIwMCxcbiAgICAgIGhlaWdodDogMjAwXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kSFNWOiBbNzUsIDAuODAsIDAuOTk5XSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDMsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgbm90Y2hlZEVuZHM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiA4LCBudW1CbG9ja3M6IDN9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0QmxvY2tzOlxuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzhDJywgMTAwLCAyMCkgK1xuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3XzhCJywgMTAwLCAxNDApICtcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd184QScsIDEwMCwgMjgwKVxuICB9LFxuXG4gICc5Jzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdob3VzZScsXG4gICAgYW5pR2lmVVJMOiAnL3NjcmlwdF9hc3NldHMva18xX2ltYWdlcy9pbnN0cnVjdGlvbl9naWZzL2RyYWctZGlzb3JkZXJlZC5naWYnLFxuICAgIGlzSzE6IHRydWUsXG4gICAgaW1hZ2U6IHtcbiAgICAgIG5hbWU6ICdob3VzZScsXG4gICAgICB3aWR0aDogMjAwLFxuICAgICAgaGVpZ2h0OiAyMDBcbiAgICB9LFxuICAgIGJhY2tncm91bmRIU1Y6IFsxMTAsIDAuNTYsIDAuNjBdLFxuICAgIGdob3N0OiB7XG4gICAgICB4OiA0MDAsXG4gICAgICB5OiAxMDBcbiAgICB9LFxuICAgIG51bUJsb2NrczogMyxcbiAgICByZXF1aXJlZEJsb2NrczogW10sXG4gICAgZnJlZVBsYXk6IGZhbHNlLFxuICAgIG5vdGNoZWRFbmRzOiB0cnVlLFxuICAgIGxhcmdlTm90Y2hlczogdHJ1ZSxcbiAgICBnb2FsOiB7XG4gICAgICBzdWNjZXNzQ29uZGl0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZVNpbXBsZVB1enpsZShudWxsLCB7bGV2ZWw6IDksIG51bUJsb2NrczogM30pO1xuICAgICAgfVxuICAgIH0sXG4gICAgc3RhcnRCbG9ja3M6XG4gICAgICB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfOUInLCAxMDAsIDIwLFxuICAgICAgICB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfOUMnLCAwLCAwLFxuICAgICAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd185QScsIDAsIDApKSlcbiAgfSxcblxuICAnMTAnOiB7XG4gICAgaW5zdHJ1Y3Rpb25zSWNvbjogJ2NvbXB1dGVyJyxcbiAgICBpc0sxOiB0cnVlLFxuICAgIGltYWdlOiB7XG4gICAgICBuYW1lOiAnY29tcHV0ZXInLFxuICAgICAgd2lkdGg6IDIwMCxcbiAgICAgIGhlaWdodDogMjAwXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kSFNWOiBbMzAwLCAwLjI1LCAwLjgwXSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDMsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBub3RjaGVkRW5kczogdHJ1ZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiAxMCwgbnVtQmxvY2tzOiAzfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydEJsb2NrczpcbiAgICAgIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd18xMEEnLCAxMDAsIDIwLFxuICAgICAgICB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfMTBDJywgMCwgMCxcbiAgICAgICAgICB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfMTBCJywgMCwgMCkpKVxuICB9LFxuXG4gICcxMSc6IHtcbiAgICBpbnN0cnVjdGlvbnNJY29uOiAnYmxvY2tzJyxcbiAgICBpc0sxOiB0cnVlLFxuICAgIGltYWdlOiB7XG4gICAgICBuYW1lOiAnYmxvY2tzJyxcbiAgICAgIHdpZHRoOiAxMzEsXG4gICAgICBoZWlnaHQ6IDI4NlxuICAgIH0sXG4gICAgZ2hvc3Q6IHtcbiAgICAgIHg6IDIwMCxcbiAgICAgIHk6IDEyXG4gICAgfSxcbiAgICBudW1CbG9ja3M6IDAsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBub3RjaGVkRW5kczogdHJ1ZSxcbiAgICBsYXJnZU5vdGNoZXM6IGZhbHNlLFxuICAgIHNuYXBSYWRpdXM6IDMwLFxuICAgIGdvYWw6IHtcbiAgICAgIHN1Y2Nlc3NDb25kaXRpb246IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHZhbGlkYXRlU2ltcGxlUHV6emxlKFsnamlnc2F3X3JlcGVhdCcsICdqaWdzYXdfcHVycGxlJyxcbiAgICAgICAgICAnamlnc2F3X2JsdWUnLCAnamlnc2F3X2dyZWVuJ10sIHt9KTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHN0YXJ0QmxvY2tzOiB1bmRlbGV0YWJsZUppZ3Nhd0Jsb2NrKCdqaWdzYXdfcmVwZWF0JywgMjAsIDIwLFxuICAgICAgdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3X3B1cnBsZScsIDAsIDAsIHVuZGVsZXRhYmxlSmlnc2F3QmxvY2soJ2ppZ3Nhd19ibHVlJykpLCAnc3RhdGVtZW50JyksXG4gICAgdG9vbGJveDogY3JlYXRlVG9vbGJveChcbiAgICAgIGppZ3Nhd0Jsb2NrKCdqaWdzYXdfZ3JlZW4nKVxuICAgIClcbiAgfSxcblxuICAnMTInOiB7XG4gICAgaW5zdHJ1Y3Rpb25zSWNvbjogJ2Jsb2NrcycsXG4gICAgaXNLMTogdHJ1ZSxcbiAgICBpbWFnZToge1xuICAgICAgbmFtZTogJ2Jsb2NrcycsXG4gICAgICB3aWR0aDogMTMxLFxuICAgICAgaGVpZ2h0OiAyODZcbiAgICB9LFxuICAgIGdob3N0OiB7XG4gICAgICB4OiAyMDAsXG4gICAgICB5OiAxMlxuICAgIH0sXG4gICAgbnVtQmxvY2tzOiAwLFxuICAgIHJlcXVpcmVkQmxvY2tzOiBbXSxcbiAgICBmcmVlUGxheTogZmFsc2UsXG4gICAgbm90Y2hlZEVuZHM6IHRydWUsXG4gICAgbGFyZ2VOb3RjaGVzOiBmYWxzZSxcbiAgICBzbmFwUmFkaXVzOiAzMCxcbiAgICBnb2FsOiB7XG4gICAgICBzdWNjZXNzQ29uZGl0aW9uOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB2YWxpZGF0ZVNpbXBsZVB1enpsZShbJ2ppZ3Nhd19yZXBlYXQnLCAnamlnc2F3X3B1cnBsZScsXG4gICAgICAgICAgJ2ppZ3Nhd19ibHVlJywgJ2ppZ3Nhd19ncmVlbiddLCB7fSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydEJsb2NrczogdW5kZWxldGFibGVKaWdzYXdCbG9jaygnamlnc2F3X3JlcGVhdCcsIDIwLCAyMCksXG4gICAgdG9vbGJveDogY3JlYXRlVG9vbGJveChcbiAgICAgIGppZ3Nhd0Jsb2NrKCdqaWdzYXdfZ3JlZW4nKSArXG4gICAgICBqaWdzYXdCbG9jaygnamlnc2F3X3B1cnBsZScpICtcbiAgICAgIGppZ3Nhd0Jsb2NrKCdqaWdzYXdfYmx1ZScpXG4gICAgKVxuICB9LFxuXG4gIC8vIGFzc2Vzc21lbnRcbiAgJzEzJzoge1xuICAgIGluc3RydWN0aW9uc0ljb246ICdkb2dnaWUnLFxuICAgIGlzSzE6IHRydWUsXG4gICAgaW1hZ2U6IHtcbiAgICAgIG5hbWU6ICdkb2dnaWUnLFxuICAgICAgd2lkdGg6IDIwMCxcbiAgICAgIGhlaWdodDogMjAwXG4gICAgfSxcbiAgICBnaG9zdDoge1xuICAgICAgeDogNDAwLFxuICAgICAgeTogMTAwXG4gICAgfSxcbiAgICBiYWNrZ3JvdW5kSFNWOiBbMjUsIDAuNTcsIDAuOTYwXSxcbiAgICBudW1CbG9ja3M6IDMsXG4gICAgcmVxdWlyZWRCbG9ja3M6IFtdLFxuICAgIGZyZWVQbGF5OiBmYWxzZSxcbiAgICBsYXJnZU5vdGNoZXM6IHRydWUsXG4gICAgbm90Y2hlZEVuZHM6IHRydWUsXG4gICAgZ29hbDoge1xuICAgICAgc3VjY2Vzc0NvbmRpdGlvbjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGVTaW1wbGVQdXp6bGUobnVsbCwge2xldmVsOiAxMywgbnVtQmxvY2tzOiAzfSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzdGFydEJsb2NrczpcbiAgICAgIGppZ3Nhd0Jsb2NrKCdqaWdzYXdfMTNDJywgMTAwLCAyMCwgamlnc2F3QmxvY2soJ2ppZ3Nhd18xM0InLCAwLCAwLCBqaWdzYXdCbG9jaygnamlnc2F3XzEzQScsIDAsIDApKSlcbiAgfVxufTtcbiJdfQ==
