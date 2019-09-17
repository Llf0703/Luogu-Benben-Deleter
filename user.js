// ==UserScript==
// @name         Luogu-Benben-Deleter
// @version      1.0
// @description
// @author       Llf0703
// @match        *://www.luogu.org/
// @match        *://www.luogu.com.cn/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let uid = 29696;

    $('nav.user-nav').append('<a id="bb-del" data-v-1f4667be="" data-v-19d75f76="" href="javascript:void 0" class="icon-btn color-none"><i data-v-19d75f76="" data-v-1f4667be="" class="fas fa-check"></i></a>');

    $('#bb-del').click(function work() {
        $.get('https://www.luogu.org/feed/user/'+uid, function(data){
            for (let i=0;;i+=2) {
                let cur = $(data)[i];
                console.log(cur);
                if (cur.children[1] === undefined) {
                    break; //遍历完毕退出
                }
                //如果是系统自动发送，cur.children[1].children[1].children[0].firstChild 为 text
                if (cur.children[1].children[1].children[0].firstChild.toString() !== "[object Text]") {
                    continue; //不是系统自动发送则跳过
                }
                let id = cur.children[1].children[0].children[0].children[1].dataset.feedId;
                $.post("/api/feed/delete/" + id);
            }
        });
    });
})();