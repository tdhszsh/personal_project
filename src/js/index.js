require(['config'], function() {
	require(['jquery', 'carousel', 'common', 'base'], function($, slided, com, base) {

		//	首页传参的传参
		//	  (function(){
		//		var $wrap = $('#warp1');
		//		var $a = $wrap.find('a');
		//		$a.on('click',function(){
		//			location.href = 'html/datalist.html';
		//			
		//		})
		//	})();
		//头部的hover
		$('#head').load('./html/baseHead.html', function() {

			base.headHover();
		});
		//返顶效果
		base.backTop();
		//nav2的动画hover
		base.nav2();
		//圆圈跳动的动画
		base.cirle();

		//导航跳转
		(function() {
			var $nav1 = $('#nav');
			$nav1.on('click', 'li', function() {
				location.href = './../html/list.html';
				console.log(this);

			});
			var $nav2 = $('.nav_2');
			$nav2.on('click', 'li', function() {
				location.href = './../html/list.html';
				console.log(this);

			});

		})();
		//底部的tab标签切换
		(function() {
			var $linkBox = $('.linkBox');
			var $lis = $linkBox.find('li');
			var $fshop = $('.fshop');
			var $friendly = $('.friendly');
			$lis.on('mouseenter', function() {
				$(this).addClass('cur').siblings().removeClass('cur');
				if($lis[0].classList.contains('cur')) {
					$fshop.show();
					$friendly.hide();
				} else {
					$fshop.hide();
					$friendly.show();
				}
			})
		})();
		//时钟走动
		(function() {
			var $clock_m = $('.clock-m');
			var deg = 0;
			setInterval(function() {
				deg++;
				$clock_m[0].style.transform = 'rotateZ(' + deg + 'deg)'
			}, 100)

		})();

		//大小轮播图
		(function() {
			//ajax请求
			var p = new Promise(function(resolve, reject) {
				$.ajax({
					type: "get",
					url: "../api/index.php",
					dataType: 'json',
					success: function(res) {
						resolve(res)
					}
				});
			});
			p.then(function(res) {

				var str = res.map(function(item) {
					return `<li class="carousel-item"><img src="${item.src}" /></li>`
				}).join("");
				$(".abc").html(str)

				$('#carousel_big').FtCarousel();
				$('.smallCarousel').FtCarousel();

				console.log(res);
			});
		})();
		//锚点定位
		(function() {
			var oNav = $('#LoutiNav');
			var aNav = oNav.find('li'); //导航
			var aDiv = $('#main .index_floor'); //楼层
			$(window).scroll(function() {
				var winH = $(window).height(); //可视窗口高度
				var iTop = $(window).scrollTop(); //鼠标滚动的距离
				if(iTop >= $('#warp1').height()) {
					oNav.fadeIn();
					aDiv.each(function() {

						if(winH + iTop - $(this).offset().top > winH / 2) {
							aNav.removeClass('active');
							aNav.eq($(this).index()).addClass('active');
						}
					})
				} else {
					oNav.fadeOut();
				}

			});
			//点击回到当前楼层
			aNav.click(function(){
				var t = aDiv.eq($(this).index()).offset().top;
				$('body,html').animate({"scrollTop":t},500);
				$(this).addClass('active').siblings().removeClass('active');
			});
			
		})();

	})
})