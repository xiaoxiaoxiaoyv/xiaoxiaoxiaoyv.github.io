$(function () {
    function resizeImg() {
        var windowWidth = $(window).width();
        // 切换小图
        var isSmall = windowWidth < 768;
        $('#carousel #carouselIndicators .carousel-inner .carousel-item').each(function (i, item) {
           // console.log(item);
            var $item = $(item);
            var imgUrl = $item.data(isSmall ? 'image-sm' : 'image-xl');
            $item.css('backgroundImage', 'url("'+ imgUrl +'")');
            if(isSmall) {
                $item.html(`<img src="${imgUrl}">`);
            } else {
                $item.empty();
            }
        });

        // tab切换
        var tabWidth = 180;
        $('#tbtj .container .tabChose ul li').each(function (i, item) {
            var $item = $(item);
            tabWidth += $item.width();
        })
       // console.log(tabWidth);
       //console.log(windowWidth);
        if(windowWidth < tabWidth) {
            $('#tbtj .container .tabChose ul').css('width', tabWidth)
                .parent().css('overflow-x','scroll');
        }
    }
    $(window).on('resize', resizeImg).trigger('resize');

    // tooltips初始化
    $('[data-toggle="tooltip"]').tooltip()


    // 新闻内容切换
    var innerText = $('#news .container #news-title');
    $('#news .container #v-pills-tab li').each(function (i, item) {
        var $item = $(item);
        $item.on('click', function (i, item) {
            var $this = $(this)
            innerText.html($this.data('inner'));
        })
    })

    var sreenWidth = $(window).width();
    var startX, endX;
    var offset = 50;
    if(sreenWidth < 768) {
        $('#carousel .carousel-inner div').each(function (i, item) {
            var $item = $(item);
            $item.on('touchstart', function (e) {
                startX = e.originalEvent.touches[0].clientX;
            })
            $item.on('touchmove', function (e) {
                endX = e.originalEvent.touches[0].clientX;
            })
            $item.on('touchend', function (e) {
                if(Math.abs(startX - endX) > 50) {
                    $('.carousel').carousel(startX > endX ? 'next' : 'prev');
                }
            })
        })
    }
});