//    var stPg = yg54g_Storages_readFi('t_152_t.html');
var stPg = yg54g_Storages_readFi('_test\\m94m_test2.html');
var ar = m94m_getTreeAsAr(stPg);
console.log("stPg.length=[" + stPg.length + "]");
console.log("ar.length=[" + ar.length + "]");


$('#tb').append('<tr>' +
    '<th>yAllSt</th>' +
    '<th>yTgName</th>' +
    '<th>yId</th>' +
    '<th>yClass</th>' +
    '<th>yHref</th>' +
    '<th>yPN</th>' +
    '<th>yPNParent</th>' +
    '<th>yLvl</th>' +
    '<th>yD_IxStart</th>' +
    '<th>yD_IxEnd</th>' +
    '<th>yTgCloseIxStart</th>' +
    '<th>yTgCloseIxEnd</th>' +
    '<th>yA_ThisIsTx</th>' +
    '<th>yA_ThisIsTg</th>' +
    '<th>yB_TgIsOpening</th>' +
    '<th>yB_TgIsClosing</th>' +
    '<th>yIsAlone</th>' +
    '<th>yIsComm</th>' +
    '<th>yIsBroken</th>' +
    '<th>yAttrs</th>' +
    '</tr>');
//простой вывод
for (var i = 0; i < ar.length; i++) {
    var im = ar[i];

    var s = im.yAllSt.replace(/</g, '&lt;');
    var s = s.replace(/\>/g, '&gt;');

    var t = '<tr>' +
        '<td>' + s + '</td>' +
        '<td>' + im.yTgName + '</td>' +
        '<td>' + im.yId + '</td>' +
        '<td>' + im.yClass + '</td>' +
        '<td>' + im.yHref + '</td>' +
        '<td>' + im.yPN + '</td>' +
        '<td>' + im.yPNParent + '</td>' +
        '<td>' + im.yLvl + '</td>' +
        '<td>' + im.yD_IxStart + '</td>' +
        '<td>' + im.yD_IxEnd + '</td>' +
        '<td>' + im.yTgCloseIxStart + '</td>' +
        '<td>' + im.yTgCloseIxEnd + '</td>' +
        '<td>' + im.yA_ThisIsTx + '</td>' +
        '<td>' + im.yA_ThisIsTg + '</td>' +
        '<td>' + im.yB_TgIsOpening + '</td>' +
        '<td>' + im.yB_TgIsClosing + '</td>' +
        '<td>' + im.yIsAlone + '</td>' +
        '<td>' + im.yIsComm + '</td>' +
        '<td>' + im.yIsBroken + '</td>' +
        '<td>' + im.yAttrs + '</td>' +
        '</tr>';
    //console.log("t=["+t+"]");
    $('#tb').append(t);

}


var r = m94m_get01(ar, 'a', 'x41z_blocks');
console.log("r=[" + r + "]");
for (var i = 0; i < r.length; i++) {
    yg54g_DOM_printPropOj_w2w_my(r[i]);
}


//=================================================================
//=================================================================
//=================================================================

/**
 * Выводит в консоль свойства (со значениями) объекта (1)
 * @param oj (1) -- объект
 */
function yg54g_DOM_printPropOj_w2w_my(oj) {
    console.log('--');
    for (var p in oj) {
        console.log(p + '=' + oj[p]);
    }
}

