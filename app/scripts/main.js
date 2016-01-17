'use strict';

//商户列表 下拉刷新页面
$(document).on('pageInit', '#index-page-infinite-scroll-bottom', function(e, id, page) {
  var $content = $(page).find('.content').on('refresh', function() {

    // 每次加载添加多少条目
    var itemsPerLoad = 20;

    // 模拟2s的加载过程
    setTimeout(function() {
      var html = '';
      for (var i = 1; i <= itemsPerLoad; i++) {
        html += '<div class="card shop">' +
          '<a href="shop.html" data-view="shopId" class="item-content">' +

            '<div class="wrapper shop-info">' +
              '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/100/h/100" class="img"></div>' +
              '<div class="item-inner">' +
                '<div class="item-title-row">' +
                  '<div class="item-title shop-title">下拉刷新</div>' +
                '</div>' +
                '<div class="item-title-row comments">' +
                  '<div class="item-title"><span class="rank-stars"><i class="icon icon-star active"></i><i class="icon icon-star active"></i><i class="icon icon-star active"></i><i class="icon icon-star-half-o active"></i><i class="icon icon-star-o active"></i></span> <span class="rank-points">3.9分</span></div>' +
                  '<div class="item-after"><span class="badge badge-open">营业中</span></div>' +
                '</div>' +
                '<div class="item-title-row location">' +
                  '<div class="item-title address">下拉刷新</div>' +
                  '<div class="item-after distance">0.5km</div>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="wrapper wash">' +
              '<div class="item-inner">' +
                '<div class="item-title-row">' +
                  '<div class="item-title type">普洗</div>' +
                  '<div class="item-after"><button data-pay="shopId" class="button button-fill button-pay">支付</button></div>' +
                '</div>' +
              '</div>' +
            '</div>' +

          '</a>' +
        '</div>';
      }

      $content.find('.card-container').html(html);

      $(page).find('.button-pay').on('click', function(event) {

        event.preventDefault();
        event.stopPropagation();

        if(!$(this).hasClass('disabled')) {
          $.router.load('pay.html');
        }

      });

      // $(window).scrollTop(0);
      // 加载完毕需要重置
      $.pullToRefreshDone($content);


    }, 2000);
  });
});

//商户列表 无限滚动
$(document).on('pageInit', '#index-page-infinite-scroll-bottom', function(e, id, page) {
  var loading = false;
  // 每次加载添加多少条目
  var itemsPerLoad = 20;
  // 最多可加载的条目
  var maxItems = 100;
  var lastIndex = $('.card-container>.card').length;

  function addItems(number, index) {
    // 生成新条目的HTML
    var html = '';
    for (var i = index + 1; i <= index + number; i++) {
      html += '<div class="card shop">' +
        '<a href="shop.html" data-view="shopId" class="item-content">' +

          '<div class="wrapper shop-info">' +
            '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/100/h/100" class="img"></div>' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title shop-title">上拉滚动</div>' +
              '</div>' +
              '<div class="item-title-row comments">' +
                '<div class="item-title"><span class="rank-stars"><i class="icon icon-star active"></i><i class="icon icon-star active"></i><i class="icon icon-star active"></i><i class="icon icon-star-half-o active"></i><i class="icon icon-star-o active"></i></span> <span class="rank-points">3.9分</span></div>' +
                '<div class="item-after"><span class="badge badge-open">营业中</span></div>' +
              '</div>' +
              '<div class="item-title-row location">' +
                '<div class="item-title address">上拉滚动</div>' +
                '<div class="item-after distance">0.5km</div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="wrapper wash">' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title type">普洗</div>' +
                '<div class="item-after"><button data-pay="shopId" class="button button-fill button-pay">支付</button></div>' +
              '</div>' +
            '</div>' +
          '</div>' +

        '</a>' +
      '</div>';
    }
    // 添加新条目
    $('.infinite-scroll .card-container').append(html);

    $(page).find('.button-pay').on('click', function(event) {

      event.preventDefault();
      event.stopPropagation();

      if(!$(this).hasClass('disabled')) {
        $.router.load('pay.html');
      }

    });

  }
  $(page).on('infinite', function() {

    // 显示加载提示符
    $('.infinite-scroll-preloader').show();

    // 如果正在加载，则退出
    if (loading) {
      return;
    }
    // 设置flag
    loading = true;
    // 模拟1s的加载过程
    setTimeout(function() {
      // 重置加载flag
      loading = false;

      if (lastIndex >= maxItems) {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();
        return;
      }
      addItems(itemsPerLoad, lastIndex);
      // 更新最后加载的序号
      lastIndex = $('.card-container>.card').length;

      $.refreshScroller();

      // 隐藏加载提示符
      $('.infinite-scroll-preloader').hide();

    }, 1000);
  });

  $(page).find('.button-pay').on('click', function(event) {

    event.preventDefault();
    event.stopPropagation();

    if(!$(this).hasClass('disabled')) {
      $.router.load('pay.html');
    }

  });

});

// 商户评价 下拉刷新页面
$(document).on('pageInit', '#comment-page-infinite-scroll-bottom', function(e, id, page) {
  var $content = $(page).find('.content').on('refresh', function() {

    // 每次加载添加多少条目
    var itemsPerLoad = 20;

    // 模拟2s的加载过程
    setTimeout(function() {
      var html = '';
      for (var i = 1; i <= itemsPerLoad; i++) {
        html += '<div class="card comment">' +
          '<div class="item-content">' +
            '<div class="wrapper comment-info">' +
              '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/60/h/60" class="img"></div>' +
              '<div class="item-inner">' +
                '<div class="item-title-row">' +
                  '<div class="item-title comment-title">浙A***23 宝马Z4</div>' +
                '</div>' +
                '<div class="item-title-row wash">' +
                  '<div class="item-title">服务项目：<span class="type">普洗</span> - <span class="seats">7座</span></span></div>' +
                  '<div class="item-after date">2015.11.05</div>' +
                '</div>' +
                '<div class="item-title-row">' +
                  '<div class="item-text comment-text">非常好！非常好！</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }

      $content.find('.card-container').html(html);
      // $(window).scrollTop(0);
      // 加载完毕需要重置
      $.pullToRefreshDone($content);
    }, 2000);
  });
});

// 商户评价 无限滚动
$(document).on('pageInit', '#comment-page-infinite-scroll-bottom', function(e, id, page) {
  var loading = false;
  // 每次加载添加多少条目
  var itemsPerLoad = 20;
  // 最多可加载的条目
  var maxItems = 100;
  var lastIndex = $('.card-container>.card').length;

  function addItems(number, index) {
    // 生成新条目的HTML
    var html = '';
    for (var i = index + 1; i <= index + number; i++) {
      html += '<div class="card comment">' +
        '<div class="item-content">' +
          '<div class="wrapper comment-info">' +
            '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/60/h/60" class="img"></div>' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title comment-title">浙A***23 宝马Z4</div>' +
              '</div>' +
              '<div class="item-title-row wash">' +
                '<div class="item-title">服务项目：<span class="type">普洗</span> - <span class="seats">7座</span></span></div>' +
                '<div class="item-after date">2015.11.05</div>' +
              '</div>' +
              '<div class="item-title-row">' +
                '<div class="item-text comment-text">非常好！非常好！</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
    // 添加新条目
    $('.infinite-scroll .card-container').append(html);
  }
  $(page).on('infinite', function() {

    // 显示加载提示符
    $('.infinite-scroll-preloader').show();

    // 如果正在加载，则退出
    if (loading) {
      return;
    }
    // 设置flag
    loading = true;
    // 模拟1s的加载过程
    setTimeout(function() {
      // 重置加载flag
      loading = false;

      if (lastIndex >= maxItems) {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();
        return;
      }
      addItems(itemsPerLoad, lastIndex);
      // 更新最后加载的序号
      lastIndex = $('.card-container>.card').length;

      $.refreshScroller();

      // 隐藏加载提示符
      $('.infinite-scroll-preloader').hide();

    }, 1000);
  });
});

// 我的爱车 下拉刷新页面
$(document).on('pageInit', '#car-page-infinite-scroll-bottom', function(e, id, page) {
  var $content = $(page).find('.content').on('refresh', function() {

    // 每次加载添加多少条目
    var itemsPerLoad = 20;

    // 模拟2s的加载过程
    setTimeout(function() {
      var html = '';
      for (var i = 1; i <= itemsPerLoad; i++) {
        html += '<div class="card car">' +
          '<div class="item-content">' +
            '<div class="wrapper car-info item-swipe">' +
              '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/60/h/60" class="img"></div>' +
              '<div class="item-inner">' +
                '<div class="item-title-row">' +
                  '<div class="item-title car-title">浙A***23</div>' +
                '</div>' +
                '<div class="item-title-row">' +
                  '<div class="item-title">宝马 Z4</div>' +
                '</div>' +
              '</div>' +
            '</div>' +
            '<div class="item-back">' +
              '<button class="button button-fill button-danger button-delete" type="button">删除</button>' +
            '</div>' +
          '</div>' +
        '</div>';
      }

      $content.find('.card-container').html(html);

      // $(window).scrollTop(0);
      // 加载完毕需要重置
      $.pullToRefreshDone($content);


      $('.item-swipe').swipeTo({
        minSwipe: '.item-back',
        angle: 0,
        wrapScroll: '.item-content',
        binder: true,
        swipeStart: function() {
          // console.log('start');
        },
        swipeMove: function() {
          // console.log('move');
        },
        swipeEnd: function() {
          // console.log('end');
        }
      });

    }, 2000);
  });

});

// 我的爱车 无限滚动
$(document).on('pageInit', '#car-page-infinite-scroll-bottom', function(e, id, page) {
  var loading = false;
  // 每次加载添加多少条目
  var itemsPerLoad = 20;
  // 最多可加载的条目
  var maxItems = 100;
  var lastIndex = $('.card-container>.card').length;

  function addItems(number, index) {
    // 生成新条目的HTML
    var html = '';
    for (var i = index + 1; i <= index + number; i++) {
      html += '<div class="card car">' +
        '<div class="item-content">' +
          '<div class="wrapper car-info item-swipe">' +
            '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/60/h/60" class="img"></div>' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title car-title">浙A***23</div>' +
              '</div>' +
              '<div class="item-title-row">' +
                '<div class="item-title">宝马 Z4</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="item-back">' +
            '<button class="button button-fill button-danger button-delete" type="button">删除</button>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
    // 添加新条目
    $('.infinite-scroll .card-container').append(html);

    $('.item-swipe').swipeTo({
      minSwipe: '.item-back',
      angle: 0,
      wrapScroll: '.item-content',
      binder: true,
      swipeStart: function() {
       // console.log('start');
      },
      swipeMove: function() {
       // console.log('move');
      },
      swipeEnd: function() {
       // console.log('end');
      }
    });
  }
  $(page).on('infinite', function() {

    // 显示加载提示符
    $('.infinite-scroll-preloader').show();

    // 如果正在加载，则退出
    if (loading) {
      return;
    }
    // 设置flag
    loading = true;
    // 模拟1s的加载过程
    setTimeout(function() {
      // 重置加载flag
      loading = false;

      if (lastIndex >= maxItems) {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();
        return;
      }
      addItems(itemsPerLoad, lastIndex);
      // 更新最后加载的序号
      lastIndex = $('.card-container>.card').length;

      $.refreshScroller();

      // 隐藏加载提示符
      $('.infinite-scroll-preloader').hide();

    }, 1000);
  });

  $('.item-swipe').swipeTo({
    minSwipe: '.item-back',
    angle: 0,
    wrapScroll: '.item-content',
    binder: true,
    swipeStart: function() {
     // console.log('start');
    },
    swipeMove: function() {
     // console.log('move');
    },
    swipeEnd: function() {
     // console.log('end');
    }
  });

  $(page).on('click tap', '.button-delete', function(event) {
    event.preventDefault();
    var that = $(this);

    $.confirm('确定删除?',
      function () {
        that.parent().parent().parent().remove('500');
      },
      function () {
      }
    );
  });


});


// 我的订单 下拉刷新页面
$(document).on('pageInit', '#order-page-infinite-scroll-bottom', function(e, id, page) {

  var $content = $(page).find('.content').on('refresh', function() {

    // 每次加载添加多少条目
    var itemsPerLoad = 20;

    // 模拟2s的加载过程
    setTimeout(function() {
      var html = '';
      for (var i = 1; i <= itemsPerLoad; i++) {
        html += '<div class="card order">' +
          '<div class="item-content">' +
            '<div class="wrapper order-info">' +
              '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/80/h/80" class="img"></div>' +
              '<div class="item-inner">' +
                '<div class="item-title-row">' +
                  '<div class="item-title shop-title">小拇指婺江路店小拇指婺江路店小拇指婺江路店小拇指婺江路店</div>' +
                '</div>' +
                '<div class="item-title-row info">' +
                  '<div class="item-title"><span class="date">2015.11.09 14:19:00 </span></div>' +
                  '<div class="item-after"><span class="badge badge-no-comment">待评价</span></div>' +
                '</div>' +
              '</div>' +
            '</div>' +

            '<div class="wrapper wash">' +
              '<div class="item-inner">' +
                '<div class="item-title-row">' +
                  '<div class="item-title type">普洗</div>' +
                  '<div class="item-after"><span class="status success">交易成功</span> <button data-pay="shopId" class="button button-fill button-comment">评价</button></div>' +
                '</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';
      }

      $content.find('.card-container').html(html);
      // $(window).scrollTop(0);
      // 加载完毕需要重置
      $.pullToRefreshDone($content);
    }, 2000);
  });
});

// 我的订单 无限滚动
$(document).on('pageInit', '#order-page-infinite-scroll-bottom', function(e, id, page) {
  var loading = false;
  // 每次加载添加多少条目
  var itemsPerLoad = 20;
  // 最多可加载的条目
  var maxItems = 100;
  var lastIndex = $('.card-container>.card').length;

  function addItems(number, index) {
    // 生成新条目的HTML
    var html = '';
    for (var i = index + 1; i <= index + number; i++) {
      html += '<div class="card order">' +
        '<div class="item-content">' +
          '<div class="wrapper order-info">' +
            '<div class="item-media"><img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/80/h/80" class="img"></div>' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title shop-title">小拇指婺江路店小拇指婺江路店小拇指婺江路店小拇指婺江路店</div>' +
              '</div>' +
              '<div class="item-title-row info">' +
                '<div class="item-title"><span class="date">2015.11.09 14:19:00 </span></div>' +
                '<div class="item-after"><span class="badge badge-no-comment">待评价</span></div>' +
              '</div>' +
            '</div>' +
          '</div>' +

          '<div class="wrapper wash">' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title type">普洗</div>' +
                '<div class="item-after"><span class="status success">交易成功</span> <button data-pay="shopId" class="button button-fill button-comment">评价</button></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    }
    // 添加新条目
    $('.infinite-scroll .card-container').append(html);
  }
  $(page).on('infinite', function() {

    // 显示加载提示符
    $('.infinite-scroll-preloader').show();

    // 如果正在加载，则退出
    if (loading) {
      return;
    }
    // 设置flag
    loading = true;
    // 模拟1s的加载过程
    setTimeout(function() {
      // 重置加载flag
      loading = false;

      if (lastIndex >= maxItems) {
        // 加载完毕，则注销无限加载事件，以防不必要的加载
        $.detachInfiniteScroll($('.infinite-scroll'));
        // 删除加载提示符
        $('.infinite-scroll-preloader').remove();
        return;
      }
      addItems(itemsPerLoad, lastIndex);
      // 更新最后加载的序号
      lastIndex = $('.card-container>.card').length;

      $.refreshScroller();

      // 隐藏加载提示符
      $('.infinite-scroll-preloader').hide();

    }, 1000);
  });
});

// 定义计时器
function Timer() {

}

Timer.prototype.countdown = 60;
Timer.prototype.obj = null;
Timer.prototype.intervalId = null;

Timer.prototype.setTime = function() {
  if (this.countdown === 0) {
    return this.clear();
  } else {
    this.obj.attr('disabled', true);
    this.obj.text('重新发送(' + this.countdown + ')');
    this.countdown--;
  }
  return this;
};

Timer.prototype.start = function() {
  var thiz = this;
  this.intervalId = setInterval(function() { thiz.setTime(); }, 1000);
  return this;
};

Timer.prototype.clear = function() {
  this.obj.removeAttr('disabled');
  this.obj.text('获取验证码');
  this.countdown = 60;
  clearInterval(this.intervalId);
  return this;
};


// 全局计时器
var counter;

// 支付页面
$(document).on('pageInit', '#pay-page', function(e, id, page) {

  // 验证码倒计时
  $(page).find('.button-code').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    counter = new Timer();
    counter.obj = $(this);
    counter.setTime().start();

  });

  // 清除input内容
  $(page).find('.input-addon-close').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    $(this).prev('input').val('');
  });

});

// 登录页面
$(document).on('pageInit', '#login-page', function(e, id, page) {

  // 验证码倒计时
  $(page).find('.button-code').on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();

    counter = new Timer();
    counter.obj = $(this);
    counter.setTime().start();

  });

  // 清除input内容
  $(page).find('.input-addon-close').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    $(this).prev('input').val('');
  });

});

// 登录页面
$(document).on('pageInit', '#car-page', function(e, id, page) {

  $(page).on('click', '.popup-brand', function () {
    var popupHTML = '<div class="popup">' +
      '<div class ="list-block brand-block">' +
      '<div class="list-group">' +
      '<ul>';

    var letter = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < letter.length; i++) {
      popupHTML += '<li class="list-group-title">' + letter[i] + '</li>';
      var total = 1 + Math.floor(Math.random() * 10);
      for(var j = 0; j < total; j++) {
        popupHTML += '<li>' +
        '<div class="item-content close-popup" data-label="' + letter[i] + j + '阿斯顿马丁">' +
        '<div class="item-inner">' +
        '<div class="item-title">' + j + '阿斯顿马丁</div>' +
        '</div>' +
        '</div>' +
        '</li>';
      }

    }

    popupHTML += '</ul>' +
      '</div>' +
      '</div>' +/*
      '<div class="ab-panel">'+
      '<ul class="abs">'+
      '<li><span class="ab" for="A">A</span></li>'+
      '<li><span class="ab" for="B">B</span></li>'+
      '<li><span class="ab" for="C">C</span></li>'+
      '<li><span class="ab" for="D">D</span></li>'+
      '<li><span class="ab" for="E">E</span></li>'+
      '<li><span class="ab" for="F">F</span></li>'+
      '<li><span class="ab" for="G">G</span></li>'+
      '<li><span class="ab" for="H">H</span></li>'+
      '<li><span class="ab" for="I">I</span></li>'+
      '</ul>'+
      '</div>'+*/
      '</div>';

    $.popup(popupHTML);

    $('.brand-block .close-popup').on('click', function(){
      var newValue = $(this).data('label');
      var oldValue = $('input[name="brand"]').val();

      $('input[name="brand"]').val(newValue);
      if(oldValue !== newValue) {
        $('input[name="series"]').val('');
      }
    });

  });

  $(page).on('click', '.popup-series', function () {

    if($('input[name="brand"]').val() !== '') {
      var popupHTML = '<div class="popup">' +
        '<div class="list-block series-block">' +
        '<div class="list-group">' +
        '<ul>';

      var letter = ['A', 'B', 'C', 'D'];
      for (var i = 0; i < letter.length; i++) {
        popupHTML += '<li class="list-group-title">' + letter[i] + '</li>';
        var total = 1 + Math.floor(Math.random() * 10);
        for(var j = 1; j < total; j++) {
          popupHTML += '<li>' +
            '<div class="item-content close-popup" data-label="' + letter[i] + j + 'Z4">' +
            '<div class="item-inner">' +
            '<div class="item-title">' + j + 'Z4</div>' +
            '</div>' +
            '</div>' +
            '</li>';
        }

      }

      popupHTML += '</ul>' +
        '</div>' +
        '</div>' +
        '</div>';

      $.popup(popupHTML);

      $('.series-block .close-popup').on('click', function(){
  /*      $('#series').text($(this).data('label'));*/
        $('input[name="series"]').val($(this).data('label'));
      });
    }
  });

});



// 登录页面
$(document).on('pageInit', '#geo-page', function(e, id, page) {

  $(page).on('click', '.popup-city', function () {
    var popupHTML = '<div class="popup">' +
      '<div class="list-block city-block">' +
      '<div class="list-group">' +
      '<ul>';

    var letter = ['A', 'B', 'C', 'D'];
    for (var i = 0; i < letter.length; i++) {
      popupHTML += '<li class="list-group-title">' + letter[i] + '</li>';
      var total = 1 + Math.floor(Math.random() * 10);
      for (var j = 0; j < total; j++) {
        popupHTML += '<li>' +
          '<div class="item-content close-popup" data-label="' + letter[i] + j + '北京">' +
          '<div class="item-inner">' +
          '<div class="item-title">' + j + '北京</div>' +
          '</div>' +
          '</div>' +
          '</li>';
      }

    }

    popupHTML += '</ul>' +
      '</div>' +
      '</div>' + /*
       '<div class="ab-panel">'+
       '<ul class="abs">'+
       '<li><span class="ab" for="A">A</span></li>'+
       '<li><span class="ab" for="B">B</span></li>'+
       '<li><span class="ab" for="C">C</span></li>'+
       '<li><span class="ab" for="D">D</span></li>'+
       '<li><span class="ab" for="E">E</span></li>'+
       '<li><span class="ab" for="F">F</span></li>'+
       '<li><span class="ab" for="G">G</span></li>'+
       '<li><span class="ab" for="H">H</span></li>'+
       '<li><span class="ab" for="I">I</span></li>'+
       '</ul>'+
       '</div>'+*/
      '</div>';

    $.popup(popupHTML);

    $('.brand-block .close-popup').on('click', function () {
      var newValue = $(this).data('label');
      var oldValue = $('input[name="brand"]').val();

      $('input[name="brand"]').val(newValue);
      if (oldValue !== newValue) {
        $('input[name="series"]').val('');
      }
    });

  });
});



// 页面切换时清除page中的js
$(window).on('beforePageRemove', function() {

  // 重置倒计时
  if(counter) {
    counter.clear();
  }

  // 重置滑动删除滑块
  animateTo($('.item-swipe'), 0);
  $('.item-swipe').removeClass('open');

});

$(window).on('resize', function(){
  // 重置滑动删除滑块
  animateTo($('.item-swipe'), 0);
  $('.item-swipe').removeClass('open');

});

$.init();
