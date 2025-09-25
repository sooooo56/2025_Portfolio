/**
 * Spanizer
 * Wraps letters with spans, for css animations
 *
 * @example
 * <h1 class="js-letters">Letters</h1>
 */
(function($) {
  var Spanizer = (function() {
    var settings = {
      letters: $('.js-letters'),
      animateClass: 'animate'
    };

    return {
      init: function() {
        this.bind();
      },
      bind: function() {
        // 글자 span으로 감싸기
        Spanizer.doSpanize();
      },
      doSpanize: function() {
        settings.letters.html(function(i, el) {
          var spanize = $.trim(el).split("");
          var template = '<span>' + spanize.join('</span><span>') + '</span>';
          return template;
        });
      }
    };
  })();
  Spanizer.init();
})(jQuery);
