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
        html += '<li class="swipeout">' +
          '<div class="swipeout-content item-content">' +
            '<div class="item-media">' +
              '<img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/60/h/60" class="img">' +
            '</div>' +
            '<div class="item-inner">' +
              '<div class="item-title-row">' +
                '<div class="item-title car-title">浙A***88</div>' +
              '</div>' +
              '<div class="item-title-row">' +
                '<div class="item-title">自行车</div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div class="swipeout-actions-right">' +
            '<a href="#" class="swipeout-delete" data-confirm="确定要删除这一条吗?" data-confirm-title="Delete?">删除</a>' +
          '</div>' +
        '</li>';
      }

      $content.find('ul').html(html);

      // $(window).scrollTop(0);
      // 加载完毕需要重置
      $.pullToRefreshDone($content);

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
      html += '<li class="swipeout">' +
        '<div class="swipeout-content item-content">' +
          '<div class="item-media">' +
            '<img src="http://7xjclc.com2.z0.glb.clouddn.com/1433075645620.jpg?imageView2/1/w/60/h/60" class="img">' +
          '</div>' +
          '<div class="item-inner">' +
            '<div class="item-title-row">' +
              '<div class="item-title car-title">浙A***88</div>' +
            '</div>' +
            '<div class="item-title-row">' +
              '<div class="item-title">自行车</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="swipeout-actions-right">' +
          '<a href="#" class="swipeout-delete" data-confirm="确定要删除这一条吗?" data-confirm-title="Delete?">删除</a>' +
        '</div>' +
      '</li>';
    }
    // 添加新条目
    $('.infinite-scroll ul').append(html);

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

  $(page).on('click tap', '.button-pay', function(event) {
    event.preventDefault();
    var that = $(this);

    $.confirm('请务必到店享受服务，且与店员确认服务，支付完成后将扣除一次洗车权益', '温馨提示',
      function () {
        that.parent().parent().parent().remove('500');
      },
      function () {
      }
    );
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



// 评价页面
$(document).on('pageInit', '#comment-page', function(e, id, page) {

  // 清除input内容
  $(page).find('.rank-stars .xmdd-icon').on('click', function(event){
    event.preventDefault();
    event.stopPropagation();
    $(page).find('.rank-stars .xmdd-icon:lt(' + ($(this).index() + 1) + ')').addClass('xmdd-icon-star');
    $(page).find('.rank-stars .xmdd-icon:gt(' + $(this).index() + ')').removeClass('xmdd-icon-star');
  });

});



// 定位页面
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

// 定位页面
$(document).on('pageInit', '#map-page', function() {


  //解析定位结果
  function onComplete(data) {
    var str = ['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    str.push('精度：' + data.accuracy + ' 米');
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    console.log(str);
  }
  //解析定位错误信息
  function onError(data) {
    console.log('定位失败' + data);
  }

  var mapObj = new AMap.Map('iCenter');
  mapObj.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    mapObj.addControl(geolocation);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
  });

});

// 附近商户页面
$(document).on('pageInit', '#near-page', function() {

  var mapObj = new AMap.Map('iCenter');

  var positions = [
    {
      lng: '120.180457,30.1879739',
      nearest: true,
      title: '方恒国际中心方恒国际中心方恒国际中心方恒国际中心方恒国际中心',
      addr: '阜通东大街6号阜通东大街6号阜通东大街6号阜通东大街6号阜通东大街6号',
      tel: '13819493700'
    },
    {
      lng: '120.180247,30.1875839',
      nearest: false,
      title: '方恒国际中心',
      addr: '阜通东大街6号',
      tel: '18888888888'
    },
    {
      lng: '120.178257,30.1888639',
      nearest: false,
      title: '小马达达',
      addr: '阜通东大街6号',
      tel: '19999999999'
    }
  ];


  var icon = new AMap.Icon({
    image: 'images/ic_amap_marker_1.png',
    size: new AMap.Size(32, 50)
  });

  var iconClick = new AMap.Icon({
    image: 'images/ic_amap_marker_0.png',
    size: new AMap.Size(32, 50)
  });

  function createInfoWindowContent(item) {
    return '<div class="list-block media-list infowindow-content"><ul>' +
      '<li>' +
      '<div class="item-content">' +
      '<div class="item-inner">' +
      '<div class="item-title">' + item.title + '</div>' +
      '<div class="item-subtitle">' + item.addr + '</div>' +
      '</div>' +
      '<div class="item-after"><a href="shop.html" class="amap-info-body">详情>></a></div>' +
      '</div>' +
      '</li>' +
      '<li>' +
      '<div class="item-content">' +
      '<div class="item-inner">' +
      '<div class="item-subtitle"><a href="tel:' + item.tel + '" external><span class="icon xmdd-icon xmdd-icon-phone active"></span> 电话：' + item.tel + '</a></div>' +
      '</div>' +
      '</div>' +
      '</li>' +
      '</ul></div>';
  }

  var latestMarker;


  function markerPosition(position) {
    AMap.plugin('AMap.AdvancedInfoWindow', function() {
      var infowindow = new AMap.AdvancedInfoWindow({
        panel: 'panel',
        placeSearch: false,
        asOrigin: false,
        asDestination: false,
        content: createInfoWindowContent(position),
        offset: new AMap.Pixel(0, 0)
      });

      infowindow.open(mapObj, position.lng.split(','));
    });
  }

  function markerClick(e) {
    var target = e.target;
    target.setIcon(iconClick);

    if(latestMarker !== target) {
      latestMarker.setIcon(icon);
      latestMarker = target;
    }

    markerPosition(target.getExtData());
  }

  //解析定位结果
  function onComplete(data) {

    var str = ['定位成功'];
    str.push('经度：' + data.position.getLng());
    str.push('纬度：' + data.position.getLat());
    str.push('精度：' + data.accuracy + ' 米');
    str.push('是否经过偏移：' + (data.isConverted ? '是' : '否'));
    console.log(str);

    var allMarkers = mapObj.getAllOverlays('marker');

    mapObj.remove(allMarkers);


    for(var i = 0; i < positions.length; i++) {
      var position = positions[i];

      var marker = new AMap.Marker({
        icon: icon,//24px*24px
        position: position.lng.split(','),
        offset: new AMap.Pixel(-16, -50),
        map: mapObj,
        extData: position
      });


      if(!latestMarker) {
        marker.setIcon(iconClick);
        latestMarker = marker;

        markerPosition(position);
      }

      marker.on('click', markerClick);

    }


  }
  //解析定位错误信息
  function onError(data) {
    console.log('定位失败' + data);
  }

  mapObj.plugin('AMap.Geolocation', function () {
    var geolocation = new AMap.Geolocation({
      enableHighAccuracy: true,//是否使用高精度定位，默认:true
      timeout: 10000,          //超过10秒后停止定位，默认：无穷大
      maximumAge: 0,           //定位结果缓存0毫秒，默认：0
      convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      showButton: true,        //显示定位按钮，默认：true
      buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
      buttonOffset: new AMap.Pixel(6, 96),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
      showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
      panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
      zoomToAccuracy: false      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    });
    mapObj.addControl(geolocation);
    mapObj.setZoom(15);
    geolocation.getCurrentPosition();
    AMap.event.addListener(geolocation, 'complete', onComplete);//返回定位信息
    AMap.event.addListener(geolocation, 'error', onError);      //返回定位出错信息
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
