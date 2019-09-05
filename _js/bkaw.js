//см. ^[bkaw]

$(document).ready(function () {
    //alert("alert");
    var arr = [];
    $(".igex").each(function () {
        var val = $(this).html();
        var ix = arr.indexOf(val);
        if (ix === -1) {
            arr.push(val);
        }
    });
    console.log("arr=" + arr);

    //---
    $("[clsCbeb = cbeb]").each(function () {
        //--- отбор того что есть
        var arr40 = [];
        $(this).find(".igex").each(function () {
            var val40 = $(this).html();
            if (arr40.indexOf(val40) === -1) {
                arr40.push(val40);
            }
        });
        //--- добавление того чего нет
        for (var i = 0; i < arr.length; i++) {
            if (arr40.indexOf(arr[i]) === -1) {
                $(this).append("<li class=edyd><span class='igex'>" + arr[i] + "</span> <span class='nnvk' style='color:red'>?</span></li>");
            }
        }
        //---
    });
});