/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hckrmoon on 7/30/17.
 */

var rectsColliding = exports.rectsColliding = function rectsColliding(r1, r2) {
  return !(r1.x > r2.x + r2.w || r1.x + r1.w < r2.x || r1.y > r2.y + r2.h || r1.y + r1.h < r2.y);
};

var isMouseInRectangle = exports.isMouseInRectangle = function isMouseInRectangle(x, y, rect) {
  return x > rect[0] && x < rect[0] + rect[2] && y > rect[1] && y < rect[1] + rect[3];
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _const = __webpack_require__(2);

var _const2 = _interopRequireDefault(_const);

var _bird = __webpack_require__(3);

var _bird2 = _interopRequireDefault(_bird);

var _score = __webpack_require__(4);

var _score2 = _interopRequireDefault(_score);

var _pipe = __webpack_require__(5);

var _pipe2 = _interopRequireDefault(_pipe);

var _bg = __webpack_require__(6);

var _bg2 = _interopRequireDefault(_bg);

var _helper = __webpack_require__(0);

var _user = __webpack_require__(7);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var TITLE = _const2.default.TITLE,
    START_AS_GUEST = _const2.default.START_AS_GUEST,
    START_BTN_SIZE = _const2.default.START_BTN_SIZE; /**
                                                      * Created by hckrmoon on 7/30/17.
                                                      */

var retryCount = 0;
var score = new _score2.default();
var bird = void 0,
    jumpSound = void 0,
    birdImage = void 0,
    bg = void 0,
    layer1 = void 0,
    layer2 = void 0,
    layer3 = void 0,
    layer4 = void 0,
    layer5 = void 0;
var pipes = [];
var WINDOW_WIDTH = window.innerWidth > 720 ? 720 : window.innerWidth;
var WINDOW_HEIGHT = window.innerHeight > 900 ? 900 : window.innerHeight;
var start = false;
var startFrame = 0;
var START_BTN_POSITION = [0, 0, 0, 0];
var startBTNSize = START_BTN_SIZE;

window._frameCount = 0;

function onStart() {
  bird.y = height / 2;
  startFrame = frameCount;
  window._frameCount = frameCount - startFrame;
  start = true;
}

function onRetry() {
  retryCount += 1;

  score.value = 0;
  score.jumped = 0;
  startFrame = frameCount;
  window._frameCount = 0;
  bird.y = height / 2;
  bird.status = "live";
  pipes = [];
}

window.preload = preload;
window.setup = setup;
window.draw = draw;

/**
 * Define things that should be preloaded.
 */
function preload() {
  birdImage = loadImage("/static/images/aramy.png");
  jumpSound = loadSound("/static/sound/jump.wav");

  layer1 = loadImage("/static/images/background_01/layer_01.png");
  layer2 = loadImage("/static/images/background_01/layer_02.png");
  layer3 = loadImage("/static/images/background_01/layer_03.png");
  layer4 = loadImage("/static/images/background_01/layer_04.png");
  layer5 = loadImage("/static/images/background_01/layer_05.png");
}

/**
 * Setup for drawing
 */
function setup() {
  console.log(WINDOW_WIDTH, WINDOW_HEIGHT);
  createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

  bg = new _bg2.default(layer1, layer2, layer3, layer4, layer5);
  bird = new _bird2.default(birdImage, jumpSound);
}

/**
 * Drawing function called 60 times per 1sec.
 */
function draw() {
  clear();
  bg.show();
  // drawGrid()

  if (bird.status === "dead") {
    return onDead();
  }

  window._frameCount = frameCount - startFrame;

  if (!start) {
    return whenNotyetStarted();
  }

  bird.update();
  bird.show();
  drawPipes();

  if (_frameCount % 80 === 0) {
    pipes.push(new _pipe2.default());
  }

  score.show();
}

function drawPipes() {
  pipes = pipes.filter(function (p) {
    p.show();

    if (bird.status === "dead") {
      return true;
    }

    p.update();

    if (p.isPassed(bird)) {
      score.up();
    }

    if (p.x + p.w < 0) {
      return false;
    }

    if (p.hits(bird)) {
      bird.die();
      onDead();
    }

    return true;
  });
}

window.keyPressed = keyPressed;

function keyPressed() {
  if (key === " ") {
    bird.jump(start && bird.status !== "dead", score);
  }
}

if (isMobile.any) {
  var touchStarted = function touchStarted() {
    if (!touching) {
      if (!start || bird.status === "dead") {
        if ((0, _helper.isMouseInRectangle)(mouseX, mouseY, START_BTN_POSITION)) {
          !start ? onStart() : onRetry();
        }
      }

      bird.jump(start && bird.status !== "dead", score);
      touching = true;
    }

    return false;
  };

  var touchEnded = function touchEnded() {
    touching = false;
  };

  var touching = false;

  window.touchStarted = touchStarted;
  window.touchEnded = touchEnded;
} else {
  var mouseClicked = function mouseClicked() {
    startBTNSize = START_BTN_SIZE;

    if (!start || bird.status === "dead") {
      if ((0, _helper.isMouseInRectangle)(mouseX, mouseY, START_BTN_POSITION)) {
        !start ? onStart() : onRetry();
      }
    }
  };

  var mousePressed = function mousePressed() {
    if (!start || bird.status === "dead") {
      if ((0, _helper.isMouseInRectangle)(mouseX, mouseY, START_BTN_POSITION)) {
        startBTNSize = START_BTN_SIZE - 5;
      }
    }

    bird.jump(start && bird.status !== "dead");
  };

  window.mouseClicked = mouseClicked;
  window.mousePressed = mousePressed;
}

function drawGrid() {
  stroke(200);
  fill(120);
  for (var x = -width; x < width; x += 20) {
    line(x, -height, x, height);
    textSize(11);
    textFont("sans-serif");
    text(x, x + 1, 12);
  }
  for (var y = -height; y < height; y += 20) {
    line(-width, y, width, y);
    text(y, 1, y + 12);
  }
}

function onDead() {
  var halfW = width / 2;
  var halfH = height / 2;

  bird.show();
  drawPipes();

  textFont("sans-serif");
  textSize(45);
  fill(0);

  text(score.value, halfW - textWidth(score.value) / 2, halfH - 200);

  textFont("Indie Flower");
  textSize(startBTNSize);
  fill(255, 0, 0);
  text("RETRY", halfW - textWidth("RETRY") / 2, halfH - 70);
  START_BTN_POSITION = [halfW - textWidth("RETRY") / 2, halfH - 70 - startBTNSize / 2, textWidth("RETRY"), startBTNSize];
}

function whenNotyetStarted() {
  var halfW = width / 2;
  var halfH = height / 2;

  bird.show();
  bird.bounce();

  textFont("Indie Flower");
  textSize(55);
  fill(0);
  text(TITLE, halfW - textWidth(TITLE) / 2, halfH - 200);

  /** GUEST */
  textSize(startBTNSize);
  fill(255, 0, 0);
  text(START_AS_GUEST, halfW - textWidth(START_AS_GUEST) / 2, halfH - 80);
  START_BTN_POSITION = [halfW - textWidth(START_AS_GUEST) / 2, halfH - 80 - startBTNSize / 2, textWidth(START_AS_GUEST), startBTNSize];
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Created by hckrmoon on 7/30/17.
 */

exports.default = {
  TITLE: "Flappy Arami",
  START: "START",
  START_AS_GUEST: "START  as guest",
  RANKING: "Ranking",
  START_BTN_SIZE: 30,
  RANK_BTN_SIZE: 25,
  HELLO_USER_TEXT_SIZE: 13
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by hckrmoon on 7/30/17.
 */

var Bird = function () {
  function Bird(img, sound) {
    _classCallCheck(this, Bird);

    this.y = height / 2;
    this.x = 64;
    this.w = 25; // 38 - 13
    this.h = 20; // 47 - 27
    this.img = img;
    this.jumpSound = sound;
    this.jumpSound.setVolume(0.1);

    this.jumpStatus = false;
    this.gravity = 0.7;
    this.upwardSpeed = 11;
    this.velocity = 0;
    this.status = "live";
    this.bounceTo = "up";
  }

  _createClass(Bird, [{
    key: "show",
    value: function show() {
      image(this.img, this.x - 7, this.y - 13);
    }
  }, {
    key: "update",
    value: function update() {
      if (this.jumpStatus) {
        this.velocity = -this.upwardSpeed;
        this.jumpStatus = false;
      }

      this.velocity += this.gravity;
      this.y += this.velocity;

      if (this.y + this.h > height) {
        this.y = height - this.h;
        this.velocity = 0;
        this.die();
      }

      if (this.y <= 0) {
        this.y = 0;
      }
    }
  }, {
    key: "bounce",
    value: function bounce() {
      if (this.bounceTo === "down") {
        this.y += 0.8;
      } else {
        this.y -= 0.8;
      }

      if (this.y < height / 2 - 20) {
        this.bounceTo = "down";
      } else if (this.y > height / 2 + 20) {
        this.bounceTo = "up";
      }
    }
  }, {
    key: "jump",
    value: function jump(active, score) {
      if (!active) {
        return;
      }

      this.jumpStatus = true;

      if (score) {
        score.jumped += 1;
      }

      if (this.jumpSound.isPlaying()) {
        this.jumpSound.stop();
      }

      this.jumpSound.play();
    }
  }, {
    key: "die",
    value: function die() {
      this.status = "dead";
    }
  }]);

  return Bird;
}();

exports.default = Bird;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by hckrmoon on 7/30/17.
 */

var Score = function () {
  function Score() {
    _classCallCheck(this, Score);

    this.value = 0;
    this.jumped = 0;
  }

  _createClass(Score, [{
    key: "show",
    value: function show() {
      textFont("sans-serif");
      fill(0);
      textSize(30);
      text(this.value, 20, 50);
    }
  }, {
    key: "up",
    value: function up() {
      this.value += 1;
    }
  }]);

  return Score;
}();

exports.default = Score;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      * Created by hckrmoon on 7/30/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      */

var _helper = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Pipe = function () {
  function Pipe() {
    _classCallCheck(this, Pipe);

    this.hasPassed = false;
    this.minSpace = 30;
    this.holeSize = random(100, 220);
    this.top = random(this.minSpace, height - this.holeSize - this.minSpace);
    this.bottom = height - this.holeSize - this.top;

    this.x = width;
    this.w = 20;
    this.speed = 5;

    this.topPipe = {
      x: this.x,
      y: 0,
      w: this.w,
      h: this.top
    };

    this.bottomPipe = {
      x: this.x,
      y: height - this.bottom,
      w: this.w,
      h: this.bottom
    };
  }

  _createClass(Pipe, [{
    key: 'show',
    value: function show() {
      stroke(0);
      fill(255);
      rect(this.x, 0, this.w, this.top);
      rect(this.x, this.bottomPipe.y, this.w, this.bottom);
    }
  }, {
    key: 'update',
    value: function update() {
      this.x -= this.speed;
      this.topPipe.x = this.x;
      this.bottomPipe.x = this.x;
    }
  }, {
    key: 'hits',
    value: function hits(bird) {
      return (0, _helper.rectsColliding)(bird, this.topPipe) || (0, _helper.rectsColliding)(bird, this.bottomPipe);
    }
  }, {
    key: 'isPassed',
    value: function isPassed(bird) {
      if (this.hasPassed) {
        return false;
      }

      if (bird.x > this.x + this.w) {
        this.hasPassed = true;
        return true;
      }

      return false;
    }
  }]);

  return Pipe;
}();

exports.default = Pipe;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by hckrmoon on 7/30/17.
 */

var Background = function () {
  function Background(layer1, layer2, layer3, layer4, layer5) {
    _classCallCheck(this, Background);

    this.layerSize = 2048;
    this.layerHeight = 1546;
    this.wRatio = this.layerSize / width;
    this.hRatio = this.layerHeight / height;
    this.ratio = height / width;
    this.width = this.layerSize / (this.ratio > 1 ? this.hRatio : this.wRatio);
    this.height = this.layerHeight / (this.ratio > 1 ? this.hRatio : this.wRatio);

    this.layer1Image = layer1;
    this.layer2Image = layer2;
    this.layer3Image = layer3;
    this.layer4Image = layer4;
    this.layer5Image = layer5;
  }

  _createClass(Background, [{
    key: "show",
    value: function show() {
      this.drawLayer(this.layer1Image, _frameCount / 6, this.width, this.height);
      this.drawLayer(this.layer2Image, _frameCount / 4, this.width, this.height);
      this.drawLayer(this.layer3Image, _frameCount / 2, this.width, this.height);
      this.drawLayer(this.layer4Image, _frameCount / 1, this.width, this.height);
      this.drawLayer(this.layer5Image, _frameCount / 0.5, this.width, this.height);
    }
  }, {
    key: "drawLayer",
    value: function drawLayer(layerImage, frame, rWidth, rHeight) {
      push();

      var nextStage = parseInt((frame + width) / rWidth);
      translate(-frame, 0);
      image(layerImage, nextStage < 2 ? 0 : rWidth * (nextStage - 1), 0, rWidth, rHeight);

      if (nextStage > 0) {
        image(layerImage, rWidth * nextStage, 0, rWidth, rHeight);
      }

      pop();
    }
  }]);

  return Background;
}();

exports.default = Background;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UserService = function () {
  function UserService() {
    _classCallCheck(this, UserService);
  }

  _createClass(UserService, [{
    key: "renderUserComponent",
    value: function renderUserComponent(users) {
      var $userList = $(".user-list__wrap ul");

      $userList.empty();

      users.forEach(function (user, idx) {
        var userComponent = $("#user__wrap").clone();

        userComponent.find('.user__rank').text("#" + (idx + 1));
        userComponent.find('img').attr('src', user.profile.picture);
        userComponent.find('.user__name').text(user.profile.name);
        userComponent.find('.user__score').text(user.score);

        $userList.append(userComponent);
      });
    }
  }]);

  return UserService;
}();

var userSvc = exports.userSvc = new UserService();

/***/ })
/******/ ]);