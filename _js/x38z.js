//скрипт для страницы j_x38z.html


$(document).ready(function () {

    /* test
    (function(){
        console.log("1111");
    }());
    */

    /* test
    var gggg;
    console.log("gggg="+gggg);
    */

    //показ ссылок на несуществующие страницы проекта
    $('#x39z').click(function () {

        //ПОЛУЧЕНИЕ 4-х рядного массива
        //диапазон
        var dia = "";
        for (var i = 0; i < yx23z_ranges.length; i++) {
            dia += yx23z_ranges[i];
        }
        //шаблон
        var pattern = "^[" + dia + "]_\\d+_[" + dia + "].html.*";
        //массив
        var ar4row = yg54g_Storages_getLinksOfFi(pattern, pattern);

        //МАССИВ ThFiNm11 всех страниц проекта
        var arFiNms = yg54g_Storages_getCrips_B(g_stProjectRootPath, 0, pattern);

        for (var i = 0; i < ar4row.length; i = i + 4) {

            //проверка есть ли ThLHref ссылки среди имен файлов проекта
            var b = false;
            for (var i1 = 0; i1 < arFiNms.length; i1++) {
                if (ar4row[i].indexOf(arFiNms[i1]) != -1) {
                    b = true;
                    break;
                }
            }
            if (b) {
                continue;
            }

            $('#x39z_result').append("<div>" +
                "<span style='color:darkgrey'>Ссылка:</span> <span><a href='" + ar4row[i] + "'>" + ar4row[i + 1] + "</a></span>" +
                " <span style='color:darkgrey'>Страница:</span> <span><a href='" + ar4row[i + 2] + "'>" + ar4row[i + 3] + "</a></span>" +
                "</div>");

        }


    });

    /**
     * Просматривает все файлы корня проекта которые имеют имя соответствующее шаблону (1).
     * Ищет в данных файлах ссылки у которых ThLHref соответствуют шаблону (2).
     * Возвращает 4-х рядный массив [ThLHref ссылки, ThLText ссылки, ThFiNm11-страницы, title-страницы, ...повтор]
     * @param aPatternFiNm (1) -- регулярное выражение для имен файлов
     * @param aPatternThLHref (2) -- регулярное выражение для ThLHref ссылок
     * @returns array
     */
    function yg54g_Storages_getLinksOfFi(aPatternFiNm, aPatternThLHref) {
        var m1 = null;

        var axo = new ActiveXObject("Scripting.FileSystemObject");

        //абсолютный путь к корню проекта
        var paRoot = yg54g_Storages_getPaFd_B();

        //массив ThFiNm11 файлов проекта
        var arFiNms = yg54g_Storages_getCrips_B(paRoot, 0, aPatternFiNm);
        //alert("arFiNms=["+arFiNms+"]");

        var arRes = [];
        var re = new RegExp(aPatternThLHref, "i");
        for (var i = 0; i < arFiNms.length; i++) {
            //содержимое файла в виде строки
            var fiSt = yg54g_Storages_readFi_B_node(m1, paRoot + "\\\\" + arFiNms[i], axo);
            //получение title
            var title = $(fiSt).filter('title').eq(0).text();
            //получение массива
            var arA = $(fiSt).filter('a').map(function (ix, elem) {
                var href = $(elem).attr('href');
                var text = $(elem).text();
                if (!re.test(href)) {
                    //не добавляется в итоговый набор если не соответствует шаблону
                    return undefined;
                }
                return [href, text, arFiNms[i], title];
            });
            var arA2 = arA.toArray();
            if (arA2.length > 0) {
                arRes = arRes.concat(arA2);

            }

        }
        return arRes;
        //alert("arRes=["+arRes+"]");

    }
});


function fn_replace_zad1(m105m) {
    var m1 = logif("fn_replace_zad1", m105m);

    //имена всех страниц проекта
    var nms = bus_articlesAll(m1, 0);

    var fso = yg54g_Storages_getFileSystemObject_node(m1);
    logif2('-- цикл по статьям');
    var ct = 0;
    var ctRp = 0;
    for (var i = 0; i < nms.length; i++) {
        var e = nms[i];

        //получение содержимого страницы по ссылке в виде строки
        var st = yg54g_Storages_readFi_B_node(i + "^" + m1, g_stProjectRootPath + '\\' + e, fso);

        //парсинг по технике m94m
        var ar = m94m_getTreeAsAr(st);

        //цикл по элементам страницы
        var replaced = false;
        for (var j = 0; j < ar.length; j++) {
            var e1 = ar[j];
            //если блок пересечений
            if (e1.yId.toLowerCase() == "x41z_blocks".toLowerCase()) {
                ct++;
                var startIn = e1.yD_IxEnd;
                var endIn = e1.yTgCloseIxStart;

                //внутренности блока-пересечений
                var inn = st.substring(startIn, endIn);
                //if (ct < 10) console.log('inn=' + inn);



                //парсинг внутренностей блока пересечений
                var innAr = m94m_getTreeAsAr(inn);
                //console.log("innAr.length="+innAr.length);
                if (innAr) {
                    //массив замен
                    var rpx = [];

                    for (var u = 0; u < innAr.length; u++) {
                        var e2 = innAr[u];
                        //если тег "a" и это его открывающая часть
                        if (e2.yTgName.toLowerCase() == 'a' && e2.yB_TgIsOpening) {

                            var allSt = e2.yAllSt;
                            var ojHref = yg54g_Strings_html_getTgAttrOne_m94m(allSt, 'href');

                            //если тег "href" есть в элементе
                            if ((ojHref[1] != -1) && ojHref[0] ) {
                                //если содержимое тега "href" является абсолютной-ссылкой
                                if (new RegExp(yx23z_re2).test(ojHref[0])) {
                                    console.log("hrf=" + hrf);
                                    //замена абс.-ссылки на относительную
                                    var hrf2 = hrf.replace(new RegExp(yx23z_re2), '$2');
                                    console.log("hrf2=" + hrf2);
                                    rpx.push({ixStart: e2.yD_IxStart+ojHref[1] , ixEnd: e2.yD_IxStart+ojHref[1]+ojHref[0].length, stForRp: hrf2});
                                }
                            }
                        }
                    }

                    if(rpx.length > 0){
                        for(var ue=0; ue < rpx.length; ue++){
                            st = yg54g_Strings_rpTxsDiaps(st, rpx[ue]);
                        }
                        if (ct > 20 && ct < 40){
                            console.log("st="+st); //g8g
                        }
                    }
                }


            }
        }

        if (replaced) {
            /*
             var rpx = [{ixStart: startIn, ixEnd: endIn, stForRp: stUnit}];
             //замена внутренностей блока-пересечений строки-страницы
             var stNew = yg54g_Strings_rpTxsDiaps(st, rpx);

             //физическая замена на диске
             //yg54g_Storages_rpFi(m1, yx15z_pathRoot + '\\' + e, stNew, fso);
             ctRp++;
             */
        }
    }

    console.log("nms=" + nms);
    console.log('ct=' + ct);
    console.log('ctRp=' + ctRp);

}
