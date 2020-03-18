window.onload = function() {
    searchShow();
    timeBack();
    bannerEffect();
}

// 网页跳转
function clickHref(e) {
    console.log(111);
    window.location.href = e;
}
/*头部的js效果*/
function searchShow() {
    /*头部搜索块的js效果*/
    /*1.获取当前banner的高度*/
    var banner = document.querySelector(".jdbanner");
    var banHeight = banner.offsetHeight;
    // console.log(banHeight);
    /*获取header搜索块*/
    var jdSearch = document.querySelector(".jd_search");
    /*2.获取当前屏幕滚动时，banner滚动出屏幕的距离*/
    window.onscroll = function() {

        // 此处有兼容性问题 document.body.scrollTop获取为0
        var offsetTop = document.documentElement.scrollTop
            /*3.计算比例值，获取透明度，设置背景颜色的样式*/
        var opacity = 0;
        if (offsetTop < banHeight) {
            opacity = offsetTop / banHeight;
            /*设置样式*/
            jdSearch.style.backgroundColor = " rgba(228, 49, 48, " + opacity + ")";
        }
    }
}
// 倒计时效果
function timeBack() {
    /*1.获取用于展示时间的span*/
    var span = document.querySelector(".ftimer").querySelectorAll("span");
    /*2.设置初始的倒计时时间,以秒做为单位*/
    var totalTime = 7200;
    /*3.开启定时器*/
    var timerId = setInterval(function() {
        totalTime--;
        /*判断倒计时时间是否已经完成*/
        if (totalTime < 0) {
            clearInterval(timerId);
            return;
        }
        /*得到剩余时间中的  时  分  秒*/
        var hour = Math.floor(totalTime / 3600);
        var minute = Math.floor(totalTime % 3600 / 60);
        var second = Math.floor(totalTime % 60);
        var spanh = hour < 10 ? '0' + hour : hour;
        var spanm = minute < 10 ? '0' + minute : minute;
        var spans = second < 10 ? '0' + second : second;
        /*赋值，将时间填充到span中*/
        span[0].innerHTML = spanh;
        span[1].innerHTML = spanm;
        span[2].innerHTML = spans;

    }, 1000);
}

//轮播图效果
function bannerEffect() {
    /*1.设置修改轮播图的页面结构
     * a.在开始位置添加原始的最后一张图片
     * b.在结束位置添加原始的第一张图片*/
    /*1.1.获取轮播图结构*/
    var banner = document.querySelector(".bannercontainer");
    /*1.2.获取图片容器*/
    var bannerBox = banner.querySelector(".banner_box");
    /*1.3.获取原始的第一张图片*/
    var liFirst = bannerBox.querySelector("li:first-child");
    /*1.4.获取原始的最后一张图片*/
    var liLast = bannerBox.querySelector("li:last-child");
    /*1.5.在首尾插入两张图片   cloneNode:复制一个dom元素*/
    bannerBox.appendChild(liFirst.cloneNode(true));
    /*insertBefore(需要插入的dom元素，位置)*/
    bannerBox.insertBefore(liLast.cloneNode(true), bannerBox.firstChild);

    // 2.设置对应的样式
    /*2.1获取所有li元素*/
    var lists = bannerBox.querySelectorAll("li");
    /*2.2 获取li元素的数量*/
    var count = lists.length;
    /*2.3.获取banner的宽度*/
    var bannerWidth = banner.offsetWidth;
    /*2.4 设置图片盒子的宽度*/
    bannerBox.style.width = count * bannerWidth + 'px';
    /*2.5 设置每一个li(图片)元素的宽度*/
    for (var i = 0; i < count; i++) {
        lists[i].style.width = bannerWidth + 'px';
    }
    /*定义图片索引:图片已经有一个宽度的默认偏移*/
    var index = 1;
    /*3.设置默认的偏移*/
    bannerBox.style.left = -bannerWidth + 'px';
    // 4.当浏览器窗口变化时,重新获取宽度
    window.onresize = function() {
            /*4.1.获取banner的宽度,覆盖全局的宽度值*/
            bannerWidth = banner.offsetWidth;
            /*4.2 设置图片盒子的宽度*/
            bannerBox.style.width = count * bannerWidth + 'px';
            /*4.3设置每一个li(图片)元素的宽度*/
            for (var i = 0; i < count; i++) {
                lists[i].style.width = bannerWidth + 'px';
            }
            /*4.4重新设置定位值*/
            bannerBox.style.left = -index * bannerWidth + 'px';
        }
        /*实现点标记*/
    var setIndicator = function(index) {
            var indicators = document.querySelector(".bannericon").querySelectorAll("a");
            /*先清除其它a元素的active样式*/
            for (var i = 0; i < indicators.length; i++) {
                indicators[i].classList.remove("active");
            }
            /*为当前a元素添加active样式*/
            indicators[index - 1].classList.add("active");
        }
        // 5.自动轮播效果
    var timerId;
    var startTime = function() {
        timerId = setInterval(function() {
            /*5.1 变换索引*/
            index++;
            /*5.2.添加过渡效果*/
            bannerBox.style.transition = "left 0.5s ease-in-out";
            /*5.3 设置偏移*/
            bannerBox.style.left = -index * bannerWidth + 'px';
            /*5.4 判断是否到最后一张，如果是则让index等于第一张图片的索引*/
            setTimeout(function() {
                if (index === count - 1) {
                    index = 1;
                    /*如果一个元素的某个属性之前添加过过渡效果，那么过渡属性会一直存在，如果不想要，则需要清除过渡效果*/
                    /*关闭过渡效果*/
                    bannerBox.style.transition = "none";
                    /*偏移到指定的位置*/
                    bannerBox.style.left = -index * bannerWidth + 'px';
                }
            }, 500);
        }, 2000);
    }
    startTime();
    // 6.手动轮播效果
    var startX, moveX, distanceX;
    /*标记当前过渡效果是否已经执行完毕*/
    var isEnd = true;
    /*为图片添加触摸事件--触摸开始*/
    bannerBox.addEventListener("touchstart", function(e) {
        /*清除定时器*/
        clearInterval(timerId);
        /*获取当前手指的起始位置*/
        startX = e.targetTouches[0].clientX;
    });
    /*为图片添加触摸事件--滑动过程*/
    bannerBox.addEventListener("touchmove", function(e) {
        /*记录手指在滑动过程中的位置*/
        moveX = e.targetTouches[0].clientX;
        /*计算坐标的差异*/
        distanceX = moveX - startX;
        /*为了保证效果正常，将之前可能添加的过渡样式清除*/
        bannerBox.style.transition = "none";
        /*实现元素的偏移  left参照最原始的坐标
         * 重大细节：本次的滑动操作应该基于之前轮播图已经偏移的距离*/
        bannerBox.style.left = (-index * bannerWidth + distanceX) + 'px';
    });
    /*添加触摸结束事件*/
    bannerBox.addEventListener("touchend", function() {
        /*松开手指，标记当前过渡效果正在执行*/
        isEnd = false;
        /*获取当前滑动的距离，判断距离是否超出指定的范围 100px*/
        if (Math.abs(distanceX) > 100) {
            /*判断滑动的方向*/
            if (distanceX > 0) { //上一张
                index--;
            } else { //下一张
                index++;
            }
            // 翻页
            bannerBox.style.transition = "left 0.5s ease-in-out";
            bannerBox.style.left = -index * bannerWidth + 'px';
        } else if (Math.abs(distanceX) > 0) { //得保证用户确实进行过滑动操作
            /*回弹*/
            bannerBox.style.transition = "left 0.5s ease-in-out";
            bannerBox.style.left = -index * bannerWidth + 'px';
        }
        /*将上一次move所产生的数据重置为0*/
        startX = 0;
        moveX = 0;
        distanceX = 0;
    });
    /*webkitTransitionEnd:可以监听当前元素的过渡效果执行完毕，当一个元素的过渡效果执行完毕的时候，会触发这个事件*/
    bannerBox.addEventListener("webkitTransitionEnd", function() {
        /*如果到了最后一张(count-1)，回到索引1*/
        /*如果到了第一张(0)，回到索引count-2*/
        if (index === count - 1) {
            index = 1;
            /*清除过渡*/
            bannerBox.style.transition = "none";
            /*设置偏移*/
            bannerBox.style.left = -index * bannerWidth + "px";
        } else if (index === 0) {
            index = count - 2;
            /*清除过渡*/
            bannerBox.style.transition = "none";
            /*设置偏移*/
            bannerBox.style.left = -index * bannerWidth + "px";
        }
        /*设置标记*/
        setIndicator(index);
        setTimeout(function() {
            isEnd = true;
            /*清除之前添加的定时器*/
            clearInterval(timerId);
            //重新开启定时器
            startTime();
        }, 100);
    });
}