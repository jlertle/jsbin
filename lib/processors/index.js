// 1. preload all the available preprocessors
var path     = require('path'),
    root     = path.resolve(path.join(__dirname, '../../')),
    jade     = require('jade'),
    coffee   = require(root + '/public/js/vendor/coffee-script').CoffeeScript,
    markdown = require(root + '/public/js/vendor/markdown'),
    less     = require('less'),
    stylus   = require('stylus');


module.exports = {
  coffeescript: function (source) {
    var renderedCode = '';
    try {
      renderedCode = coffee.compile(source, {
        bare: true
      });
    } catch (e) {
      if (console) {
        console.error(e.message);
      }
    }
    return renderedCode;
  },
  jade: function (source) {
    try {
      source = jade.compile(source, { pretty: true })();
    } catch (e) {}

    return source;
  },
  markdown: function (source) {
    try {
      source = markdown.toHTML(source);
    } catch (e) {}

    return source;
  },
  less: function (source) {
    var css = '';
    try {
      less.Parser().parse(source, function (err, result) {
        if (err) {
          if (console) {
            console.error(err);
          }
          return source;
        }
        css = result.toCSS().trim();
      });
    } catch (e) {}
    return css;
  },
  stylus: function (source) {
    var css = '';

    try {
      stylus(source).render(function (err, result) {
        if (err) {
          if (console) {
            console.error(err);
          }
          return;
        }
        css = result.trim();
      });
    } catch (e) {}

    return css;
  }
};
