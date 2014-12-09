/* ***************************************
/* starRate.js v1.0
/* ***************************************
/* javascript plugin based on jquery 1.11.1
/* author: Davis Lin
/* copyright (c) since 2014. Audatex TWIC.
/* ***************************************/

$(function() {
$.fn.extend({
  starRate: function() {
    return $(this).each(function(i, e) {
      var wrap = $(e),
        stars = $('span', wrap),
        counter = $('input',wrap),
        starRate = function() {

          // private attr. & func.
          var obj = this,
            checker = function(el, eve, hook, callback) {
              $(el).bind(eve, function() {
                var idx = $(stars).index(el); //get index of current element
                $(stars).each(function(j, ele) {
                  if (j <= idx) {
                    $(ele).addClass(hook);
                  } else {
                    $(ele).removeClass(hook);
                  }
                });
                if (typeof callback == 'function') {
                  callback();
                }
              });
            },
            setLv = function(idx) { // set lv attribute for wrap(star container)
              wrap.attr('lv', idx);
              counter.val(idx)
            },
            bindE = function() {
              stars.each(function(i, e) {
                checker(e, 'mouseenter', 'hover');
                checker(e, 'click', 'chked', function() {
                  var idx = stars.index(e) + 1;
                  setLv(idx);
                });
              });
              wrap.bind('mouseleave', function() {
                stars.removeClass('hover');
              });
            };

          // public func.

          // click idx-th star
          obj.clickStar = function(idx) {
            if (idx && idx !=0){
              stars.eq(idx - 1).trigger('click');  
            }            
          };
          // simply set lv.0 & remove .chk
          obj.refresh = function() {
            setLv(0);
            stars.removeClass('chked');
          };
          // initialize the level
          obj.initLv = function(idx) {
            if (idx && idx != 0) {
              obj.clickStar(idx);
              setLv(idx);
            } else {
              obj.refresh();
            }
          };
          obj.init = function() {
            bindE();
          };

        },
        inst = new starRate();

      wrap.data('starRate', inst);
      inst.init();

    });
  }
});

});