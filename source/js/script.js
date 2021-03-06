var FF_BLOG = FF_BLOG || {};
FF_BLOG.Common = {};

FF_BLOG.Common.Menu = {
  SET_CLASS_NAME: 'togmenu',
  init: function () {
    this.setParameter();
    this.bindEvent();
  },
  setParameter: function () {
    this.$openTrigger = $('.menubtn');
    this.$menu = $('#menu');
  },
  bindEvent: function () {
    var _self = this;

    this.$openTrigger.on('click', function () {
      _self.$menu.toggleClass(_self.SET_CLASS_NAME)
    })
  }
};

FF_BLOG.Common.PageTop = {
  DURATION: {
    SHOW_HIDE: 200,
    PAGE_TOP: 500
  },
  VISIBLE_POSITION: 700,
  init: function () {
    this.setParameter();
    this.bindEvent();
  },
  setParameter: function () {
    this.$window = $(window);
    this.$body = $('html, body');

    this.$pageTopTarget = $('.pagetop');
  },
  bindEvent: function () {
    var _self = this;

    this.$window.on('scroll', function () {
      if (_self.$body.is(':animated') || _self.$pageTopTarget.is(':animated')) {
        return;
      }

      if ($(this).scrollTop() > _self.VISIBLE_POSITION) {
        _self.showPageTopTarget();
      } else {
        _self.hidePageTopTarget();
      }
    });

    this.$pageTopTarget.on('click', function (e) {
      e.preventDefault();

      _self.$body.animate({
        scrollTop: 0
      }, _self.DURATION.PAGE_TOP, 'swing', _self.hidePageTopTarget());
    })
  },
  hidePageTopTarget: function () {
    this.$pageTopTarget.animate({
      bottom: '-70px'
    }, this.DURATION.SHOW_HIDE);
  },
  showPageTopTarget: function () {
    this.$pageTopTarget.animate({
      bottom: '30px'
    }, this.DURATION.SHOW_HIDE);
  }
};

$(function () {
  FF_BLOG.Common.Menu.init();
  FF_BLOG.Common.PageTop.init();
});

!function (d, i) {
  if (!d.getElementById(i)) {
    var j = d.createElement("script");
    j.id = i;
    j.src = "https://widgets.getpocket.com/v1/j/btn.js?v=1";
    var w = d.getElementById(i);
    d.body.appendChild(j);
  }
}(document, "pocket-btn-js");
