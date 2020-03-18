window.onload = function() {
    leftMove();
};
// 滑动效果
function leftMove() {
    /*获取左侧栏*/
    var cateList = document.querySelector(".cate_list");
    /*获取左侧栏的高度*/
    var cateHeight = cateList.offsetHeight;
    /*获取用来滑动的列表*/
    var listBox = cateList.querySelector(".listbox");
    var liboxHeight = listBox.offsetHeight;
    var lists = listBox.querySelectorAll("li");
    // 获取右侧元素
    var rightBox = document.querySelector(".cate_main");
    var divs = rightBox.querySelectorAll(".cate_box");
    // 设置静止状态的最大top值
    var maxTop = 0;
    /*设置静止状态下的最小的top值*/
    var minTop = cateHeight - liboxHeight;
    /*设置滑动状态下的最大的top值*/
    var maxBouncetop = maxTop + 100;
    /*设置滑动状态下的最小top值*/
    var minBouncetop = minTop - 100;
    /*实现滑动*/
    /*currentY记录当前元素滑动到的距离*/
    var startY, moveY, distanceY, currentY = 0;
    /*添加滑动事件*/
    listBox.addEventListener("touchstart", function(e) {
        /*获取手指的起始坐标*/
        startY = e.targetTouches[0].clientY;
    });
    listBox.addEventListener("touchmove", function(e) {
        moveY = e.targetTouches[0].clientY;
        /*计算距离的差异*/
        distanceY = moveY - startY;
        /*判断滑动的时候是否超出当前指定的滑动区间*/
        if (currentY + distanceY > maxBouncetop || currentY + distanceY < minBouncetop) {
            return;
        }
        /*先将之前可能添加的过渡效果清除*/
        listBox.style.transition = "none";
        /*实现偏移操作:应该在之前的滑动距离的基础之上再进行滑动*/
        listBox.style.top = (currentY + distanceY) + 'px';
    });
    listBox.addEventListener("touchend", function(e) {
        /*判断当前滑动的距离是否在静止状态和滑动状态下的最小top值之间*/
        if (currentY + distanceY < minTop) {
            currentY = minTop;
            /*回到minTop位置*/
            listBox.style.transition = "top 0.5s";
            listBox.style.top = minTop + 'px';
        } else if (currentY + distanceY > maxTop) {
            currentY = maxTop;
            /*回到maxTop位置*/
            listBox.style.transition = "top 0.5s";
            listBox.style.top = maxTop + 'px';
        } else {
            /*记录当前滑动的距离*/
            currentY += distanceY;
        }

    });
    /*为每一个li元素设置添加一个索引值*/
    for (var i = 0; i < lists.length; i++) {
        /*lis[i].setAttribute("index",i);*/
        lists[i].index = i;
    }
    /*绑定移动端的tap事件*/
    // tapclick.tap(listBox, function(e) {
    //     /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
    //     for (var i = 0; i < lists.length; i++) {
    //         lists[i].classList.remove("active");
    //     }
    //     /!*为当前被单击的li元素添加样式*!/
    //     var li = e.target.parentNode;
    //     // console.log(li);
    //     var liHeight = li.offsetHeight;
    //     li.classList.add("active");
    //     // 2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值
    //     //  获取当前li元素的索引值 
    //     var index = li.index;
    //     console.log(index);
    //     /*开启过渡*/
    //     listBox.style.transition = "top .5s";
    //     /!*设置偏移*!/
    //     if (-index * liHeight < minTop) {
    //         /!*只能偏移到minTop位置*!/
    //         listBox.style.top = minTop + 'px';
    //         currentY = minTop;
    //         console.log(currentY);
    //     } else {
    //         listBox.style.top = -index * liHeight + 'px';
    //         currentY = -index * liHeight;
    //     }

    // });
    /*绑定fastclick*/
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            /*参数可以是任意的dom元素，如果写document.body，说明会将document.body下面的所的元素都绑定fastclick*/
            FastClick.attach(document.body);
        }, false);
    }
    /*fastclick使用的时候就是来绑定添加click事件*/
    listBox.addEventListener("click", function(e) {
        /*1.修改li元素的样式：将所有li元素的active样式清除，再为当前被点击的li元素添加active样式*/
        for (var i = 0; i < lists.length; i++) {
            lists[i].classList.remove("active");
        }
        /!*为当前被单击的li元素添加样式*!/
        var li = e.target.parentNode;
        // console.log(li);
        var liHeight = li.offsetHeight;
        li.classList.add("active");
        // 2.移动当前的li元素到父容器的最顶部，但是不能超出之前设定了静止状态下的最小top值
        //  获取当前li元素的索引值 
        var index = li.index;
        // console.log(index);
        /*开启过渡*/
        listBox.style.transition = "top .5s";
        /!*设置偏移*!/
        if (-index * liHeight < minTop) {
            /!*只能偏移到minTop位置*!/
            listBox.style.top = minTop + 'px';
            currentY = minTop;
            console.log(currentY);
        } else {
            listBox.style.top = -index * liHeight + 'px';
            currentY = -index * liHeight;
        }

    });
}