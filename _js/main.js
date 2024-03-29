//главный JS

//$(document).ready(function () {

//исходные установки
//TRUE чтобы показывать логи в консоли
yLogif = false;
//
yLogifPristavka = ":info:";
//в какой кодировке открывать файлы (0 - ASCII, -1 - Unicode, -2 - system default)
g_encoding = -1;
//имя ThFiNm11 файла индекса
g_stFileIndexName = "j_x50f.txt";
//относительное имя файла конфигурации (ThFiNmR11)
g_stConfigFileName = 'j_x52f.txt';
//===
var G1_SEPARATOR_W72W = '|_ _ _|_ _ _|';
var G1_COOK_LAST_FIND_W73W = 'cook_last_find';
var G1_ID_LAST_FIND_W74W = 'id_last_find';
var G1_LAST_FIND_MAX = 9;
var G1_DIV = '\\\\';
//---
//адрес по которому будет загружаться файл индекса
var G1_MNUA_URL = '/getFindIndex';
var G1_IXWA_UHOX = 'uhox';
var G1_IXWA_UASK = 'uask';

//---
PTDO_FILE_NAME = 'j_ptdo.txt';

//--- [[fziz]] - логирование с уровнями
var fzizLevelCurr = 1;
//- [[odpo]]
var ODPO_OPEN = 1;
var ODPO_IN = 2;
var ODPO_CLOSE = 3;

//-
function fzizPad(iLevel) {
    var stConfPrefixChunk = '   ';
    //---
    if (iLevel < 0) {
        iLevel = 0;
    }
    //---
    var stRet = "";
    for (var i = 0; i < iLevel; i++) {
        stRet += stConfPrefixChunk;
    }
    //---
    return stRet;
}

//-
function fzizLog(ojToLog, iOdpoConst) {
    var stPrefixOpen = "{{ ";
    var stPrefixClose = "}}";
    //---
    var stPad = fzizPad(fzizLevelCurr);
    //---
    if (iOdpoConst == ODPO_OPEN) {
        console.log(stPad + stPrefixOpen + ojToLog);
    } else if (iOdpoConst == ODPO_IN) {
        console.log(stPad + ojToLog);
    } else if (iOdpoConst == ODPO_CLOSE) {
        stPad = fzizPad(fzizLevelCurr - 1);
        console.log(stPad + stPrefixClose);
    }
    //---
    if (iOdpoConst === ODPO_OPEN) {
        fzizLevelCurr++;
    } else if (iOdpoConst === ODPO_CLOSE) {
        fzizLevelCurr--;
    }
}

//---
//[[sgto]] - константы отражающие кодировки
SGTO_UTF8 = 'sgto_utf8';
SGTO_UCS2 = 'sgto_ucs2';


//-------------------------------------------------------------------------------------------------
//* когда все скрипты загружены


function divGet(_g_stProjectRootPath) {
    var stRet = '';
    if (fnIsCurrentBrowserIE()) {
        stRet = '\\\\';
    } else {
        stRet = '\\';
        if (_g_stProjectRootPath.indexOf('\\') === -1) {
            stRet = '/';
        }
    }
    return stRet;
}

/**
 * Конкатенирует пути (1) (2) через разделитель. Разделителем будет '/' если (1) не содежрит обратного слэша, иначе
 * разделителем будет обратный слэш
 * @param _stPath1 (1) --
 * @param _stPath2 (2) --
 * @returns {string|*}
 */
function fnPathJoin(_stPath1, _stPath2) {
    if (_stPath1 && _stPath2) {
        var stDiv = '/';
        if (_stPath1.indexOf('\\') !== -1) {
            stDiv = '\\';
        }
        //---
        return _stPath1 + stDiv + _stPath2;
    } else {
        return _stPath1 + _stPath2;
    }
}


//* json3 подключен т.к. по умолчанию он остутствует в IE 8 (не работало создание индекса на работе из-за этого)
$.when(
    $.getScript("_js/xregexp-all-min.js")
    , $.getScript("_js/x45z.js")
    , $.getScript("_ext/json/json3.js")
    , $.getScript("_js/ixwa.js")
).done(function () {
    console.log('-- ixwaMode=' + ixwaMode);
    console.log('navigator.userAgent [' + navigator.userAgent + ']');

    //===
    $('.showAll').click(function () {
        $(".snippet-in").show();
        $(".snippetStyle").addClass("snippetStylePress");
    });

    //===
    var m1 = 'корень';

    //обновление блока пересечений
    x41z_fn_udAp();

    //замена консоли для Работы
    function Console1() {
        this.log = function (aSt) {

        }
    }

    console1 = new Console1();

    //массив диапазонов
    //p - работа; t - дом; q - дом личное
    yx23z_ranges = ["p", "t", "q"];

    //[[ijer]] - строка для RegExp соответствующая 1) всем диапазонам, 2) только ThFiNm11 страниц проекта
    var r = "";
    for (var i = 0; i < yx23z_ranges.length; i++) {
        r += yx23z_ranges[i];
    }
    ijer = r;

    //1 ограничение диапазона в соответствии с выбранными "галками"
    if (docCookies.getItem('w50w_t') !== '1') {
        r = r.replace('t', '');
    }
    if (docCookies.getItem('w50w_p') !== '1') {
        r = r.replace('p', '');
    }
    if (docCookies.getItem('w50w_q') !== '1') {
        r = r.replace('q', '');
    }
    //2


    //===

    yx23z_re_set = function (diaps) {
        if (diaps == '') {
            for (var i = 0; i < yx23z_ranges.length; i++) {
                diaps += yx23z_ranges[i];
            }
        }
        yx23z_re_diaps = diaps;
        yx23z_re = "^[" + diaps + "]_\\d+_[" + diaps + "].html$";
        stEinp = "^[" + ijer + "]_\\d+_[" + ijer + "].html$";
        yx23z_re2 = "^(.+)([" + diaps + "]_\\d+_[" + diaps + "].html)$";
    };

    yx23z_re_set(r);
    /**
     * Удаление одного диапазона
     * @param diap (1) -- удаляемый диапазон, например "p"
     */
    yx23z_re_remove = function (diap) {
        yx23z_re_diaps = yx23z_re_diaps.replace(diap, '');
        yx23z_re_set(yx23z_re_diaps);
        console.log("--35--yx23z_re=" + yx23z_re);
        console.log("--35--yx23z_re2=" + yx23z_re2);
    };
    /**
     * Добавление одного диапазона, например "p"
     * @param diap
     */
    yx23z_re_add = function (diap) {
        if (yx23z_re_diaps.indexOf(diap) !== -1) {
            yx23z_re_diaps = diap;
        } else {
            yx23z_re_diaps += diap;
        }
        yx23z_re_set(yx23z_re_diaps);
        console.log("--37--yx23z_re=" + yx23z_re);
        console.log("--37--yx23z_re2=" + yx23z_re2);
    };

    //[[bedn]] - путь к корню проекта, формат [aznf], например "F:\\Dropbox\\wiki"
    g_stProjectRootPath = yg54g_Storages_getPaFd_B();
    console.log('!!!!!!!!! g_stProjectRootPath [' + g_stProjectRootPath + ']');

    //имя страницы подгрузившей текущий js
    g_stPageCurrName = yg54g_Storages_getPaFi_B(); //старое имя yx21z_nmAbsCurrPg
    console.log('!!!!!!!!! g_stPageCurrName [' + g_stPageCurrName + ']');

    //абсолютное имя страницы подгрузившей текущий js
    g_stPageCurrNameAbs = g_stProjectRootPath + divGet(g_stProjectRootPath) + g_stPageCurrName;
    console.log('!!!!!!!!! g_stPageCurrNameAbs [' + g_stPageCurrNameAbs + ']');

    /**
     * абсолютное имя файла-индекса
     */
    g_stMnuaCrip = fnPathJoin(g_stProjectRootPath, g_stFileIndexName);


    //===
    var title = $('title:first').html();

    $($shapka).append('<img src="_pic_p/anim_001.gif" />');
    $($shapka).append(' <span id="shapka_title">' + title + '</span>');
    //отображение пути к странице
    var pa140427082100 = g_stPageCurrName.replace(/\\+/g, '/').replace(/\/+/g, '/');
    $($shapka).append(' <div id="shapka_path" onclick="prompt(' + "'" + "Чтобы скопировать путь " +
        "в буфер обмена, нажмите Ctrl+C и Enter" + "', '" + pa140427082100 + "'" + ');">' + pa140427082100 + '</div>');
    //
    $($shapka).append('<hr>');


    //кнопка "Кто ссылается?" и "Run ActiveX"
    $($podval)
        .append('</br><form>' +
            '<input class="css_btn" id=x47z_bt type=button value="Кто ссылается?"/>' +
            ' <input class="css_btn" id=x25z_id_bt type=button value="Run ActiveX"/></form>' +
            '<div id=x47z_res></div>')
    ;
    //ссылка на главную
    $($podval)
        .append('</br><hr style="color:silver"><a href="p_0_p.html">Wiki - главная</a>')
    ;

    //ФОРМА поиска
    //если блок пересечений есть, то вставлется после него, иначе после подвала
    var b7 = $("div").is($x41z_blocks);
    var se = $podval;
    if (b7) {
        se = $x41z_blocks;
    }

    $(se)
        .after('<form class="x42z_form_class">' +
            '<label><b>Поиск</b></label>' +
            '<br> <input id="x42z_tf" type="text" />' +
            '<input id=x42z_bt type=button value=Поиск onclick="basefnFind(' + "'нажата кнопка Поиск'" + ', $(' + "'" + '#x42z_tf' + "'" + ').val(), $('
            + "'" + '#x42z_cb_case' + "'" + ').prop(' + "'" + 'checked' + "'" + '))"/>' +
            ' <input id="w36w" type="button" value="Создать индекс" onclick="basefnIndexCreate(' + "'кнопка Создать индекс'" + ');" />' +
            ' <input id="w37w" type="button" value="test" onclick="fn_test();" />' +
            ' <span> <input type="checkbox" id="w50w_t"/>t' +
            '<input type="checkbox" id="w50w_p"/>p' +
            '<input type="checkbox" id="w50w_q"/>q </span>' +
            ' &nbsp;&nbsp;<a href="t_7_t.html" title="Программирование под Android">AN</a> <a href="t_98_t.html">JV</a>  <a href="t_1539_t.html">KT</a>  <a href="t_2506_t.html">RN</a>  <a href="t_1758_t.html" >ZR</a> ' +
            ' <span onclick="g1_clear();" class="g1a">x</span><span id="' + G1_ID_LAST_FIND_W74W + '"></span>' +
            '' +
            '<br><input id=x42z_cb_case type=checkbox /> учитывать регистр'
            + ' <input id="x50h" type="checkbox" /> искать в индексе'
            + ' <input id="x51h" type="checkbox" /> использовать технику m104m'
            + '<div id=x42z_find_result></div>' +
            '</form>')
    ;

    //===
    $('.snippet-in').each(function () {
        var stSnippet = 'snippet';
        if ($(this).attr('snippetTitle')) {
            stSnippet = $(this).attr('snippetTitle');
        }
        //---
        $(this).before('<span class="snippetStyle" onclick="$(this).next().toggle(); fnSnippetPressHandle(this); ">' + stSnippet + '</span>');
        $(this).hide();
    });

    //=== //показ
    updateShowLastFind();


    //===
    //НАЧАЛЬНЫЕ установки из куки
    //галка "искать в диапазоне t"
    if (docCookies.getItem('w50w_t') == '1') {
        $("#w50w_t").prop('checked', 'checked');
    } else {
        $("#w50w_t").prop('checked', '');
    }
    //галка "искать в диапазоне p"
    if (docCookies.getItem('w50w_p') == '1') {
        $("#w50w_p").prop('checked', 'checked');
    } else {
        $("#w50w_p").prop('checked', '');
    }
    //галка "искать в диапазоне q"
    if (docCookies.getItem('w50w_q') == '1') {
        $("#w50w_q").prop('checked', 'checked');
    } else {
        $("#w50w_q").prop('checked', '');
    }
    //галка "искать в индексе"
    if (docCookies.getItem('x50h') == '1') {
        $("#x50h").prop('checked', 'checked');
    } else {
        $("#x50h").prop('checked', '');
    }
    //галка "учитывать регистр"
    if (docCookies.getItem('x42z_cb_case') == '1') {
        $("#x42z_cb_case").prop('checked', 'checked');
    } else {
        $("#x42z_cb_case").prop('checked', '');
    }

    //галка "искать в диапазоне t"
    $("#w50w_t").click(function () {
        if ($(this).prop('checked')) {
            docCookies.setItem('w50w_t', '1');
            yx23z_re_add('t');
        } else {
            docCookies.setItem('w50w_t', '0');
            yx23z_re_remove('t');
        }
    });
    //галка "искать в диапазоне p"
    $("#w50w_p").click(function () {
        if ($(this).prop('checked')) {
            docCookies.setItem('w50w_p', '1');
            yx23z_re_add('p');
        } else {
            docCookies.setItem('w50w_p', '0');
            yx23z_re_remove('p');
        }
    });
    //галка "искать в диапазоне q"
    $("#w50w_q").click(function () {
        if ($(this).prop('checked')) {
            docCookies.setItem('w50w_q', '1');
            yx23z_re_add('q');
        } else {
            docCookies.setItem('w50w_q', '0');
            yx23z_re_remove('q');
        }
    });
    //галка "искать в индексе"
    $("#x50h").click(function () {
        if ($(this).prop('checked')) {
            docCookies.setItem('x50h', '1');
        } else {
            docCookies.setItem('x50h', '0');
        }
    });
    //галка "учитывать регистр"
    $("#x42z_cb_case").click(function () {
        if ($(this).prop('checked')) {
            docCookies.setItem('x42z_cb_case', '1');
        } else {
            docCookies.setItem('x42z_cb_case', '0');
        }
    });

    //запуск поиска по нажатию Enter
    //данная конструкция срабатывает при каждом изменении в поле ввода
    $('#x42z_tf').keypress(function () {
        var e = event.keyCode;
        if (e == 13) {
            basefnFind('кнопка Поиск по нажатию Enter', $('#x42z_tf').val(), $('#x42z_cb_case').prop('checked'));
            //далее инструкция чтобы браузер не выполнял действий, иначе результат поиска не будет выведен
            // в консоли и будет сообщение f140f
            return false;
        }
    });

    //обработка ссылок
    $('a').each(function () {
        var stHref = $(this).attr('href');
        var stLinkText = $(this).text();

        //пустые ссылки
        if (/^\s*$/.test(stHref)) {
            $(this).css('color', 'red');
            //---
            var x18z_TxLink = $(this).text();
            //--- ДОБАВЛЕНИЕ ссылки "создать"
            $(this).after(
                ' <span class="x11z" onclick=' + "'" + 'x12z_create("--> нажатие ссылки Создать", "' + x18z_TxLink
                + '",$(this))' + "'" + ' >создать</span>');
        } else { //если ссылка с непустым адресом
            //добавление информации о диапазоне
            for (var i = 0; i < yx23z_ranges.length; i++) {
                var regExp = new RegExp("^" + yx23z_ranges[i] + "_\\d*?_" + yx23z_ranges[i] + ".html", "i");
                if (regExp.test(stHref)) {
                    $(this).after(' <span class="x23z_css">/r' + yx23z_ranges[i] + '/</span>');
                }
            }
            //добавление /-/ (техника m81m)
            if (/\+$/.test(stHref)) {
                $(this).after(' <span class=x27z>/-/</span>');
            }
        }

        //техника m86m (удаление вертикальной черты на конце текста ссылок)
        if (/\s*\|\s*$/.test(stLinkText)) {
            stLinkText = stLinkText.replace(/\s*\|\s*$/, "");
            $(this).text(stLinkText);
        }

    });

    //действие при наведении мыши на ссылку
    $("a").hover(function () {
        var href = $(this).attr("href");

        //для техники m81m (удаление + на конце адреса)
        if (/\+$/.test(href)) {
            href = href.replace(/\+$/, '');
            $(this).attr("href", href);
        }
    });

    //отработка нажатия кнопки "Кто ссылается?"
    $('#x47z_bt').click(function () {
        var m1 = logif2("--> нажата кнопка Кто ссылается");

        $('#x47z_res').html("");

        //thxidfz текущей страницы
        var thxidfzCurrPage = yg54g_Storages_nameCurrPage();

        //thxidz текущей страницы
        var thxidzCurrPage = yg54g_Storages_nameCurrPage_B();

        //thxidfz всех страниц wiki
        //var thxidfzAll = yg54g_Storages_getNamesAllFilesOfDir_B(pathRoot, 0, "^p_\\d+_p.html$");
        var thxidfzAll = yg54g_Storages_getCrips(g_stProjectRootPath, 0);

        //получение массива с номерами страниц упоминающих текушую страницу
        var arr = [];
        //  и массива с абсолютными путями таких страниц
        var arrAbs = [];
        for (var i = 0; i < thxidfzAll.length; i++) {
            var elem = thxidfzAll[i];

            //полный путь
            var fullPath = g_stProjectRootPath + "\\\\" + elem;

            //файл содержит строку с именем текущей страницы
            var b = yg54g_Storages_isConsistText(thxidfzCurrPage, fullPath);

            if (b) {
                arr.push(elem);
                arrAbs.push(fullPath);
            }
        }

        //вывод информации о страницах ссылающихся на текущую страницу внутри себя
        for (var i1 = 0; i1 < arr.length; i1++) {
            //заголовок страницы
            var title = yg54g_Storages_getTagValue(arrAbs[i1], "title");

            $('#x47z_res').append('<li><a href="' + arr[i1] + '">'
                + title + '</a></li>');
        }


    });

    //отработка нажатия кнопки "Run ActiveX"
    $("#x25z_id_bt").click(function () {
        var m1 = logif2('--> нажата кнопка Run ActiveX');

        yx28z_activXObject = new ActiveXObject("Scripting.FileSystemObject");

        //применение к ссылкам технологии m81m
        $("a").each(function () {
            //применение к ссылкам техники m81m
            var a = $(this).attr('href');
            //
            //если есть + на конце
            var e = /.*\+$/.exec(a);
            if (e !== null && e.length > 0) {
                //адрес без "+" на конце
                var ap = a.replace(/\+$/, "");

                //путь к корню проекта
                var pathRoot = yg54g_Storages_getPaFd_clear('');
                //полный путь страницы на которую указывает ссылка
                var pathF = pathRoot + "\\\\" + ap;

                //заголовок страницы
                var t = yg54g_Storages_getTagValue(pathF, "title");

                $(this).attr('href', ap);
                $(this).text(t);

                $('.x27z').text('/+/');
            }
        });

        //имена всех файлов корневой папки - массив
        var arFiNms = yg54g_Storages_getCrips(g_stProjectRootPath, 0);
        //проверка ссылок на наличие страниц на которые они ссылаются
        $("a").each(function () {
            var thLHref = $(this).attr('href');
            var linkExist = false;
            for (var i = 0; i < arFiNms.length; i++) {
                if (thLHref.toLowerCase() == arFiNms[i].toLowerCase()) {
                    linkExist = true;
                    break;
                }
            }

            //если страница по ссылке не существует И она не пустая И соответствуе xPz
            if (!linkExist && !/^\s*$/.test(thLHref) && yis_xPz(thLHref)) {
                $(this).after(' <span class="x29z">/?/</span>');
            }

        });

    });


    yx41z_blocks_html = '<div id="x41z_blocks"></div>';

    //добавление заголовка для блока ссылок
    $('#x44z_links').prepend('<h1>Ссылки</h1>');

}); //$.when...

/**
 * Возвращает TRUE если текущий скрипт запущен в браузере Internet Explorer
 */
function fnIsCurrentBrowserIE() {
    var stInfo = navigator.userAgent;
    //---
    if (stInfo.indexOf('Firefox') !== -1) {
        return false;
    }
    if (stInfo.indexOf('Chrome') !== -1) {
        return false;
    }
    //---
    return true;
}

function fnSnippetPressHandle(view) {
    if ($(view).hasClass("snippetStylePress")) {
        $(view).removeClass("snippetStylePress");
    } else {
        $(view).addClass("snippetStylePress");
    }
}

/**
 * Очистка области последних поисковых запросов
 */
function g1_clear() {
    $('#' + G1_ID_LAST_FIND_W74W).html('');
    docCookies.setItem(G1_COOK_LAST_FIND_W73W, "");
}

function updateShowLastFind() {
    if (docCookies.getItem(G1_COOK_LAST_FIND_W73W)) {
        var clf = docCookies.getItem(G1_COOK_LAST_FIND_W73W);
        var arr = clf.split(G1_SEPARATOR_W72W);
        $('#' + G1_ID_LAST_FIND_W74W).html(''); //очистка
        for (var ii = 0; ii < arr.length; ii++) {
            $('#' + G1_ID_LAST_FIND_W74W).append('<span class="w75w" onclick="g1_fn(this.innerHTML);">' + arr[ii] + '</span>');
        }
    }
}

/**
 *
 * @param txt
 */
function g1_fn(txt) {

    //=== перемещение нажатого элемента в конец списка
    var clf = docCookies.getItem(G1_COOK_LAST_FIND_W73W);
    var arr = clf.split(G1_SEPARATOR_W72W);

    var pos = arr.indexOf(txt);
    if (pos != arr.length - 1) {
        var v1 = arr[pos];
        arr.push(v1);
        arr.splice(pos, 1);
    }
    $('#' + G1_ID_LAST_FIND_W74W).html(''); //очистка
    for (var ii = 0; ii < arr.length; ii++) {
        $('#' + G1_ID_LAST_FIND_W74W).append('<span class="w75w" onclick="g1_fn(this.innerHTML);">' + arr[ii] + '</span>');
    }
    var join = arr.join(G1_SEPARATOR_W72W);
    docCookies.setItem(G1_COOK_LAST_FIND_W73W, join);

    //===
    $('#x42z_tf').val(txt);
    basefnFind('', txt, $('#x42z_cb_case').prop('checked'));
}

function fn_test() {
    console.log("--> fn_test()");

}

/**
 * Создание индекса
 */
function basefnIndexCreate(m105m) {
    fzizLog('basefnIndexCreate', ODPO_OPEN);
    if (fnIsCurrentBrowserIE()) {


        var m1 = '';

        //--- получение массива имен ([dtof]s) всех статей
        var arrFileNames = yg54g_Storages_getCrips_B(g_stProjectRootPath, 0, stEinp);
        //---
        var stTitle = '';
        var stComm = '';
        var stIntersect = '';

        //--- [pker]
        var arrPker = new Array();

        //--- цикл по абсолютным именам статей
        for (var i = 0; i < arrFileNames.length; i++) { //LOOP
            //"Карточка" статьи
            var stFileName = arrFileNames[i];
            var cxkk = fnCxkkGet(
                i + '^' + m1,
                g_stProjectRootPath + G1_DIV + stFileName,
                stFileName
            );
            arrPker.push(cxkk);
        } //LOOP

        //---
        var stPker = JSON.stringify(arrPker);

        //--- сохранение в файл-индекс (заменой)
        yg54g_Storages_rpFi_node(
            m1,
            g_stMnuaCrip,
            stPker,
            yg54g_Storages_getFileSystemObject_node(m1)
        );

        //---
        fzizLog('', ODPO_CLOSE);

        alert('Индекс создан');
    } else {
        fnAjaxRequest('//190813-170800', 'indexCreate', function (stResponse) {
            fzizLog('stResponse [' + stResponse + '] //190813-195500', ODPO_IN);
            alert('Индекс создан');
        });
    }
    fzizLog('', ODPO_CLOSE);
}

/**
 * Преобразует селектор (1) в строку для RegExp (ThRxStbb).
 * @param aSr (1) -- селектор типа ThSelC, например "div", ".name", "div.name"
 * @retruns {string} строка для использования в конструкции "new RegExp(.., ..)", например "\\<\\s*div"
 */
function yg54g_Strings_html_SrToRx(aSr) {
    //селектор в виде объекта спец. формата
    var ojSr = yg54g_Strings_html_convertSr_B(aSr);
    //:{tag: "div", comma: "id", name: "test"}

    var sRx;
    if (ojSr.tag && ojSr.comma && ojSr.name) {
        var tag1 = ojSr.tag + "\\s+";
        var tag2 = ojSr.tag;
        var attr = "[^\\<\\>]*?" + ojSr.comma + "\\s*=\\s*\"*'*" + ojSr.name;
        var x2 = "[\\s\"']";
        sRx = "\\<\\s*" + tag1 + attr
            + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";
    }
    if (ojSr.tag && !ojSr.comma && !ojSr.name) {
        var tag1 = ojSr.tag;
        var tag2 = ojSr.tag;
        var attr = "";
        var x2 = "\\s+";
        sRx = "\\<\\s*" + tag1 + attr
            + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";

    }
    if (!ojSr.tag && ojSr.comma && ojSr.name) {
        var tag1 = "([^\\<\\>]*?)\\s+";
        var tag2 = "\\1";
        var attr = "[^\\<\\>]*?" + ojSr.comma + "\\s*=\\s*\"*'*" + ojSr.name;
        var x2 = "[\\s\"']";

        sRx = "\\<\\s*" + tag1 + attr + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";
    }

    return sRx;
}

/**
 * Преобразует селектор (1) в строку для RegExp (ThRxStbb).
 * От А отличается добавлением закрвающих конструкций (тегов) в количестве (2).
 * @param aSr (1) -- селектор типа ThSelC, например "div", ".name", "div.name"
 * @param aCtClose (2) -- количество закрывающих конструкций которые нужно добавить
 * @retruns {string} строка для использования в конструкции "new RegExp(.., ..)", например "\\<\\s*div"
 */
function yg54g_Strings_html_SrToRx_B(aSr, aCtClose) {
    //селектор в виде объекта спец. формата
    var ojSr = yg54g_Strings_html_convertSr_B(aSr);
    //:{tag: "div", comma: "id", name: "test"}

    var sRx;
    if (ojSr.tag && ojSr.comma && ojSr.name) {
        var tag1 = ojSr.tag + "\\s+";
        var tag2 = ojSr.tag;
        var attr = "[^\\<\\>]*?" + ojSr.comma + "\\s*=\\s*\"*'*" + ojSr.name;
        var x2 = "[\\s\"']";
        sRx = "\\<\\s*" + tag1 + attr
            + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";
    }
    if (ojSr.tag && !ojSr.comma && !ojSr.name) {
        var tag1 = ojSr.tag;
        var tag2 = ojSr.tag;
        var attr = "";
        var x2 = "\\s+";
        sRx = "\\<\\s*" + tag1 + attr
            + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";

    }
    if (!ojSr.tag && ojSr.comma && ojSr.name) {
        var tag1 = "([^\\<\\>]*?)\\s+";
        var tag2 = "\\1";
        var attr = "[^\\<\\>]*?" + ojSr.comma + "\\s*=\\s*\"*'*" + ojSr.name;
        var x2 = "[\\s\"']";

        sRx = "\\<\\s*" + tag1 + attr + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";
    }

    //добавление закрывающих конструкций
    for (var i = 0; i < aCtClose; i++) {
        var tag;
        if (ojSr.tag) {
            tag = ojSr.tag;
        } else {
            tag = "\\1";
        }
        sRx = sRx + "[\\s\\S]*?\\<\\s*/\\s*" + tag + "\\s*\\>";
    }

    return sRx;

}

/**
 * Возвращает TRUE если (1) это имя страницы удовлетворяющее шаблону имени страницы в рамках проекта (xPz)
 * @param aThLHref (1) -- ThLHref
 * @returns boolean
 */
function yis_xPz(aThLHref) {
    var res = false;
    for (var i = 0; i < yx23z_ranges.length; i++) {
        var re = new RegExp("^" + yx23z_ranges[i] + "_\\d*?_" + yx23z_ranges[i] + "\\.html", "");
        if (re.test(aThLHref)) {
            res = true;
            break;
        }
    }

    return res;
}

/**
 * Обработчик нажатия на "создать" рядом с пустой ссылкой
 *
 * @param aTxLink (1) -- текст ссылки
 * @param aLink (2) -- элемент управления "создать"
 */
function x12z_create(m105m, aTxLink, aLink) {
    var m1 = logif('--> x12z_create', m105m);
    //---
    var bTxLink = aTxLink;

    //--- раскладывание текста ссылки по знаку "|" (техника m87m)
    var txSplit = aTxLink.split("|");
    if (txSplit[1]) {
        bTxLink = txSplit[1];
        if (txSplit[2]) {
            bTxLink += "|" + txSplit[2];
        }
    }

    //--- определение максимального значения PID
    var maxTplus = x52c.ranges_getPIDMax(m1, 't') - 0 + 1;
    var maxPplus = x52c.ranges_getPIDMax(m1, 'p') - 0 + 1;
    var maxQplus = x52c.ranges_getPIDMax(m1, 'q') - 0 + 1;
    //---
    fn03(maxTplus, maxPplus, maxQplus, aLink, bTxLink, aTxLink, m1);

}

/**
 *
 * @param maxTplus
 * @param maxPplus
 * @param maxQplus
 * @param aLink
 * @param _stLinkBody1 () -- текст тела тега 'a' для которого мы собираемся создать новую страницу
 * @param _stLinkBody2 () -- текст тела тега 'a' для которого мы собираемся создать новую страницу
 * @param m1
 */
function fn03(maxTplus, maxPplus, maxQplus, aLink, _stLinkBody1, _stLinkBody2, m1) {
    //--- имена страниц для создания
    var pgT = "t_" + maxTplus + "_t.html";
    var pgP = "p_" + maxPplus + "_p.html";
    var pgQ = "q_" + maxQplus + "_q.html";

    //--- начальный checked (значение из конфигурационного файла ([kmne]))
    var stDiapSymbol;
    if (fnIsCurrentBrowserIE()) {
        stDiapSymbol = fnConfigFileValueGet(yx46z_config_fi, yx46z_key_last_diap);
    } else {
        fnAjaxRequest('//190810-172100', 'asrz', function (stResponse) { //[asrz]
            stDiapSymbol = stResponse;
            console.log('stDiapSymbol [' + stDiapSymbol + '] //190810-174500');
        });
    }
    //---
    var ch_t, ch_p, ch_q = '';
    if (stDiapSymbol === null || stDiapSymbol === "t") ch_t = 'checked="checked"';
    if (stDiapSymbol === "p") ch_p = 'checked="checked"';
    if (stDiapSymbol === "q") ch_q = 'checked="checked"';

    aLink.after('<div class="x13z">' +
        '<form id="x17z">' +
        '<b>Создание новой страницы [' + _stLinkBody1 + ']:</b>' +
        '<br><i>Выбор пространства имен:</i>' +
        '<br><input type="radio" id="w41w_t" name="diap" value="' + pgT + '" ' + ch_t + '/> ' + pgT + ' - диапазон t' +
        '<br><input type="radio" id="w41w_p" name="diap" value="' + pgP + '" ' + ch_p + '/> ' + pgP + ' - диапазон p' +
        '<br><input type="radio" id="w41w_q" name="diap" value="' + pgQ + '" ' + ch_q + '/> ' + pgQ + ' - диапазон q' +
        '<br><input type="button" value="Создать" onclick=' + "'" + 'basefnPageCreate("--> нажатие Создать когда уже выбран диапазон", "'
        + _stLinkBody2 + '")' + "'" + ' />' +
        '</form>' +
        '</div>');

    //получение последнего диапазона в котором создавалась страница
    var lastDiap = JSON.parse(x52c.getJSON(m1)).ranges['last_diap'];
    switch (lastDiap) {
        case 'p' :
            $("#w41w_p").prop('checked', 'checked');
            break
        case 'q' :
            $("#w41w_q").prop('checked', 'checked');
            break
        case 't' :
            $("#w41w_t").prop('checked', 'checked');
            break
    }

    //скрытие всех ЭУ "создать"
    $('.x11z').hide();
}

/**
 * Выполняет синхронный AJAX GET-запрос. Передаёт серверу строку (2), ответ сервера передаёт в функцию обратного вызова (3)
 *
 * @param stDesctiption (1) -- указанный здесь текст будет выведен в логе в случае ошибки запроса
 * @param stSignal (2) -- строка передаваемая серверу
 * @param fnResponse (3) -- это должна быть функция вида fn(string){}
 */
function fnAjaxRequest(stDesctiption, stSignal, fnResponse) {
    var req = new XMLHttpRequest();
    req.open('GET', stSignal, false);
    req.send();
    //---
    if (req.status != 200) {
        alert(req.status + ': ' + req.statusText + ' ' + stDesctiption);
    } else {
        fnResponse(req.responseText);
    }
}

/**
 * Выполняет синхронный AJAX POST-запрос. Передаёт серверу строку (2) как 'сигнал' и строку (3) как 'тело',
 * ответ сервера передаёт в функцию обратного
 * вызова (4)
 *
 * @param stDesctiption (1) -- указанный здесь текст будет выведен в логе в случае ошибки запроса
 * @param stSignal (2) -- строка передаваемая серверу
 * @param stBody (3) -- строка передаваемая серверу
 * @param fnResponse (4) -- это должна быть функция вида fn(string){}
 */
function fnAjaxRequestPost(stDesctiption, stSignal, stBody, fnResponse) {
    var req = new XMLHttpRequest();
    req.open('POST', stSignal, false);
    req.send(stBody);
    //---
    if (req.status != 200) {
        alert(req.status + ': ' + req.statusText + ' ' + stDesctiption);
    } else {
        fnResponse(req.responseText);
    }
}

/**
 * Получает из конфигурационного файла (1) значение по ключу (2).
 * Работает с форматом хранения "key: value"
 * @param _stFileNameRelative (1) -- относительное имя файла, например "folder\\file.txt"
 * @param _stKey (2) -- ключ по которому ищется значение
 * @returns {string} найденное значение (например: "t" или "") или null при нештате
 */
function fnConfigFileValueGet(_stFileNameRelative, _stKey) {
    var m1 = null;

    //абсолютное имя файла
    var _stFileNameAbs = this.yg54g_Storages_getPaFd_clear('') + '\\' + _stFileNameRelative;

    //--- проверка существования файла
    var fso;
    if (fnIsCurrentBrowserIE()) {
        //объект файловой системы
        fso = new ActiveXObject("Scripting.FileSystemObject");
    }
    //-
    if (!yg54g_Storages_isFiExist_node(_stFileNameAbs, fso)) {
        console.log("(!) file not exist");
        return null;
    }

    //---
    if (fnIsCurrentBrowserIE()) {
        var regExp = new RegExp("^\\s*" + _stKey + "\\s*:\\s*(.*?)\\s*$", "m");
        //---
        //1 - открытие файла только для чтения
        // false - если файла нет, то он не создается
        var textStream = fso.OpenTextFile(_stFileNameAbs, 1, false, g_encoding);
        var line = "";
        //noinspection JSUnresolvedVariable
        while (!textStream.AtEndOfStream) {
            //считывание следующей строки
            var line = textStream.ReadLine();

            var ex;
            if (ex = regExp.exec(line)) {
                textStream.Close();
                return ex[1];
            }
        }
        textStream.Close();
        return null;
    } else {
        //...
    }
}

/**
 * Обработчик КНОПКИ "Создать" нажимаемой пользователем для создания новой страницы
 *
 * @param _stPageTitle (1) -- title для новой страницы; может быть составным (техника m87m)
 */
function basefnPageCreate(_st_m105m, _stPageTitle) {
    fzizLog('basefnPageCreate', ODPO_OPEN);
    var m1 = logif('-->x16z_createPg', _st_m105m);

    //заголовок который будет у созданной страницы
    var title = _stPageTitle;
    //комментарий заголовка который будет у созданной страницы
    var commTitle = "";
    //текст который будет у ссылки
    var stLinkText = _stPageTitle;

    //далее переменные приведённые выше уточняются

    //выделение текста для заголовка и блока комментария к заголовку (техника m87m)
    var sp = _stPageTitle.split("|");
    if (sp[1]) {
        title = sp[1];
        stLinkText = sp[0];
        if (sp[2]) {
            commTitle = sp[2];
        }
    }
    //на случай если второй элемент пустой, например "text||comment"
    if (sp[2]) {
        title = sp[0];
        stLinkText = sp[0];
        commTitle = sp[2];
    }

    //получение value выбранного в группе radio
    //это value содержит ThFiNm11 страницы которую необходимо создать
    var stPageName = yg54g_DOMs_getRadioVal(m1, 'x17z', 'diap');


    //МАССИВ строк с содержимым новой страницы
    var arrHtml = [];
    arrHtml.push('<html>');
    arrHtml.push('<head>');
    arrHtml.push('<meta charset="utf-8">');
    arrHtml.push('<title>' + title + '</title>');
    arrHtml.push('<script language="JavaScript" type="text/javascript" src="_js/jquery-1.11.0.js"></script>');
    arrHtml.push('<script language="JavaScript" type="text/javascript" src="_js/main.js"></script>');
    arrHtml.push('<link rel="stylesheet" href="_styles/main.css" type="text/css">');
    arrHtml.push('</head>');
    arrHtml.push('<body>');
    arrHtml.push('<div id="shapka"></div>');
    if (commTitle) {
        arrHtml.push('<div id="x44z_comm">' + commTitle + '</div>');
    }
    arrHtml.push('');
    arrHtml.push('');
    arrHtml.push('');
    arrHtml.push('<div id="podval"></div>');
    arrHtml.push('<div id="x41z_blocks"> <a href="' + yg54g_Storages_nameCurrPage_C() + '">' + $("title").text() + '</a> </div>'); //rgx
    arrHtml.push('</body>');
    arrHtml.push('</html>');

    //--- создание страницы
    //абсолютное имя создаваемого файла
    var stPageNameAbs = fnPathJoin(this.yg54g_Storages_getPaFd_clear(''), stPageName)
    fzizLog('stPageNameAbs [' + stPageNameAbs + '] //190811-110800', ODPO_IN);
    //--
    var iRespCode = -1;
    if (fnIsCurrentBrowserIE()) {
        iRespCode = fnFileCreate(m1, stPageNameAbs, arrHtml);
    } else {
        //--- преобразуем массив в строку
        var stHtml = "";
        for (var i = 0; i < arrHtml.length - 1; i++) {
            stHtml += arrHtml[i] + '\n';
        }
        //--- формируем [mcny]-формат
        stHtml = stPageNameAbs + '^' + stHtml;
        //---
        fnAjaxRequestPost('//190810-180300', 'cmdFileCreate', stHtml, function (stResponse) {
            fzizLog('//190811-112100 stResponse [' + stResponse + ']', ODPO_IN);
            iRespCode = stResponse - 0;
        });
    }
    fzizLog('iRespCode [' + iRespCode + '] //190811-112101', ODPO_IN);


    //---
    if (iRespCode == 1) {
        alert("(!) Файл [" + stPageName + "] уже существует");
    }
    if (iRespCode == 0) {
        alert("(!) Файл [" + stPageName + "] создан пустым");
    }
    if (iRespCode == 2) {
        //обновление информации в конфиг-файле
        //цифра из PID
        var iNumber = yPIDClass.getPIDNumber(m1, stPageName);
        //литера из PID
        var stLitera = yPIDClass.getPIDLit(m1, stPageName);
        //обновление
        x52c.fnRangesInfoUpdate(m1, stLitera, iNumber);

        logif2("обновлен конфиг-файл");
        logif2("файл успешно создан");
    }

    //--- --- ВСТАВКА НА ТЕКУЩУЮ страницу ссылки на вновь созданную страницу
    //--- считывание файла как строки
    fzizLog('ЧИТАЕМ ФАЙЛ; [' + g_stPageCurrName + '] //190811-184600', ODPO_OPEN);
    var stBody = yg54g_Storages_readFi_B_node(
        m1,
        g_stPageCurrNameAbs,
        yg54g_Storages_getFileSystemObject_node(m1),
        SGTO_UTF8
    );

    var isExist02 = false;
    if (stBody !== null && stBody !== undefined) {
        isExist02 = stBody.indexOf('<html') !== -1;
    }
    fzizLog('!!!!!!!!! 1 isExist02 [' + isExist02 + ']', ODPO_IN);
    //---
    if (!isExist02) {
        var stBody = yg54g_Storages_readFi_B_node(
            m1,
            g_stPageCurrNameAbs,
            yg54g_Storages_getFileSystemObject_node(m1)
        );
    }
    var isExist03 = false;
    if (stBody !== null && stBody !== undefined) {
        isExist03 = stBody.indexOf('<html') !== -1;
    }
    fzizLog('!!!!!!!!! 2 isExist03 [' + isExist03 + ']', ODPO_IN);

    fzizLog(('//190811-164800 stBody [' + stBody + ']').substr(0, 100) + '...', ODPO_IN);
    fzizLog('', ODPO_CLOSE);

    var v24 = stBody.indexOf('title') === -1;
    console.log('v24 [' + v24 + ']');

    //--- замена нужного тега
    fzizLog('ЗАМЕНА ТЕГА //190811-194200', ODPO_OPEN);
    var stBodyAfterReplaceTag = yg54g_Strings_html_tagReplace(
        m1,
        stBody,
        'a',
        'href',
        '',
        stPageName,
        _stPageTitle,
        stLinkText
    );
    fzizLog('', ODPO_CLOSE);



    //--- перезапись файла
    fzizLog('ПЕРЕЗАПИСЬ ФАЙЛА //190811-194201', ODPO_OPEN);
    yg54g_Storages_rpFi_node(
        m1,
        g_stPageCurrNameAbs,
        stBodyAfterReplaceTag,
        yg54g_Storages_getFileSystemObject_node(m1),
        SGTO_UTF8
    );
    fzizLog('', ODPO_CLOSE);
    //--- ---
    fzizLog('', ODPO_CLOSE);

    //--- перезагрузка страницы
    yg54g_DOMs_reloadPg(m1);

}

/**
 * Возвращает объект для работы с файловой системой
 * @returns {ActiveXObject} new ActiveXObject("Scripting.FileSystemObject");
 */
function yg54g_Storages_getFileSystemObject_node(m105m) {
    var m1 = logif('--> yg54g_Storages_getFileSystemObject', m105m);
    if (fnIsCurrentBrowserIE()) {
        return new ActiveXObject("Scripting.FileSystemObject");
    }
    return null;
}

/**
 * Ищет в строке (1) первый тег вида &lt;(2) (3)=(4)&gt;(6)&lt;/(2)&gt; и заменяет (4) на (5) и (6) на (7).
 * Критерием совпадения является точное равенство (6) строки (1) и (6) заданного, а также равенство (4) строки (1) и (4) заданного
 * <i>(последнее равенство учитывает только непрерывную последовательность символов (4) после знака = в которые не входят пробелы и кавычки ' ",
 * например будут считаться равными строки "href = 'text '" и "href=  text  ")</i>
 *
 * @param _stTxSource (1) -- строка в которой выполняется поиск и замена
 * @param _stTagName (2) -- имя тега
 * @param _stAttrName (3) -- имя атрибута
 * @param _stAttrValueCurrent (4) -- текущее значение атрибута
 * @param _stAttrValueNew (5) -- текст для замены (4)
 * @param _stTagTextCurrent (6) -- текущий текст тега
 * @param _stTagTextNew (7) -- текст для замены (6)
 * @return {string} новая строка; если замен не было, то исходная строка
 */
function yg54g_Strings_html_tagReplace(m105m,
                                       _stTxSource,
                                       _stTagName,
                                       _stAttrName,
                                       _stAttrValueCurrent,
                                       _stAttrValueNew,
                                       _stTagTextCurrent,
                                       _stTagTextNew) {
    var m1 = logif('--> yg54g_Strings_html_rpTag', m105m);
    console.log('_stTxSource [' + _stTxSource + ']');
    console.log('_stTagName [' + _stTagName + ']');
    console.log('_stAttrName [' + _stAttrName + ']');
    console.log('_stAttrValueCurrent [' + _stAttrValueCurrent + ']');
    console.log('_stAttrValueNew [' + _stAttrValueNew + ']');
    console.log('_stTagTextCurrent [' + _stTagTextCurrent + ']');
    console.log('_stTagTextNew [' + _stTagTextNew + ']');

    var res = _stTxSource;

    //--- "гашение" спец. символов
    var bTgNm = yg54g_Strings_dismissRegexpSymbols(m1, _stTagName);
    var bAttrNm = yg54g_Strings_dismissRegexpSymbols(m1, _stAttrName);
    var bCuAttrVa = yg54g_Strings_dismissRegexpSymbols(m1, _stAttrValueCurrent);
    var bCuThText = yg54g_Strings_dismissRegexpSymbols(m1, _stTagTextCurrent);

    //--- "разбивка" 1-го порядка
    var rx = new RegExp("(\\<\\s*)(" + bTgNm + ")([^\\<\\>]*?)\\>(" + bCuThText + ")(\\<\\s*/\\s*\\2\\s*\\>)", "gi");
    var ex = rx.exec(_stTxSource);
    var r0, r0_new;
    var b = true;
    if (ex) {
        //весь тег
        r0 = ex[0];

        //элементы тега
        var r1 = RegExp.$1;
        var r2 = RegExp.$2;
        //часть с атрибутами
        var attrs = RegExp.$3;
        var r31 = ">";
        var r4 = RegExp.$4;
        var r5 = RegExp.$5;

        //"разбивка" 2-го порядка - разбивка части с атрибутами, и замена значения атрибута
        var rxA = new RegExp("(\\s+" + bAttrNm + "\\s*=\\s*[\"']?\\s*)([^\"'\\<\\>\\s]*)([\\s\"']?[\\s\"']?)", "gi");
        var exA = rxA.exec(attrs);
        if (exA) {
            var cuVa = exA[2];
            var r1a = RegExp.$1;
            var r3a = RegExp.$3;

            var rx8 = new RegExp("^" + bCuAttrVa + "$", "i");
            //если значение атрибута заданное пользователем и фактическое совпадают, то выполняем замену
            if (rx8.test(cuVa)) {
                attrs = attrs.replace(rxA, r1a + _stAttrValueNew + r3a);
            } else {
                b = false;
            }
        }

        //формирование тега с выполненными заменами (если есть совпадение по значению атрибута)
        if (b) {
            r0_new = r1 + r2 + attrs + r31 + _stTagTextNew + r5;
        }
    }

    //итоговая замена
    if (r0 && r0_new) {
        res = res.replace(r0, r0_new);
    }

    return res;
}


/**
 * Перезагрузка страницы
 */
function yg54g_DOMs_reloadPg(m105m) {
    var m1 = logif('--> yg54g_DOMs_reloadPg', m105m);
    location.reload();
}

/**
 * Создание файла (1) со строками (2). Файл не создается если он уже существует.
 *
 * @param _stFileNameAbs (1) -- абсолютное имя файла, например "F:\\Folder\\File.html"
 * @param aArr (2) -- массив строк для добавления в файл (1), например ['text1', 'text2', ...] или null
 * или пустой массив, тогда файл будет пустым
 * @return int 2 - если успешно; 1 - если файл (1) уже существует; 0 - или если массив (2) null или пустой
 */
function fnFileCreate(m105m, _stFileNameAbs, _arrLines) {
    var m1 = logif('--> yg54g_Storages_createFi', m105m);

    //объект для работы с файловой системой
    var fsObj = new ActiveXObject("Scripting.FileSystemObject");

    //проверка - если такой файл уже существует
    if (fsObj.FileExists(_stFileNameAbs)) {
        return 1;
    }

    //создание файла - открытие текстового потока для записи
    //
    //see http://stackoverflow.com/questions/2840252/writing-utf8-text-to-file
    //=== var utf8Enc = new ActiveXObject("Utf8Lib.Utf8Enc");
    //
    //1 - false, если такой файл уже есть, то он не заменяется
    //2 - true: кодировка Unicode; false: кодировка ANSI
    var textStream = fsObj.CreateTextFile(_stFileNameAbs, false, true);

    //проверка - если массив пуст, то и файл остается пустым
    if (_arrLines == null || _arrLines.length < 1) {
        textStream.Close();
        return 0;
    }

    //запись в файл
    for (var i = 0; i < _arrLines.length; i++) {
        textStream.WriteLine(_arrLines[i]);
    }

    textStream.Close();
    return 2;
}

/**
 * Заменяет всё содержимое файла (1) данными из (2)
 *
 * @param _stFileNameAbsTarget (1) -- абсолютное имя файла, например "F:\\Folder\\File.html"
 * @param _stText (2) -- строка с разделителями строк \n
 * @param _activeXObject (3) -- (используется с IE) объект файловой системы JScript
 * @param _stSgtoConst (4) -- (не используется с IE) [sgto]; если здесь SGTO_UTF8 то перед перезаписью файла текст
 * подвергается перекодировке UCS2->UTF8
 * @returns int 2 - если успешно; 1 - если файл не существует; 0 - если строка для записи пуста (файл становится пустым)
 */
function yg54g_Storages_rpFi_node(m105m, _stFileNameAbsTarget, _stText, _activeXObject, _stSgtoConst) {
    fzizLog('--> yg54g_Storages_rpFi_node; _stFileNameAbsTarget [' + _stFileNameAbsTarget + ']; _stText [' + _stText + ']', ODPO_OPEN);
    var m1 = '';

    if (fnIsCurrentBrowserIE()) {
        //---
        if (_activeXObject == null) alert("null");
        //--- проверка существования файла
        if (!_activeXObject.FileExists(_stFileNameAbsTarget)) {
            //файл не существует
            fzizLog('', ODPO_CLOSE);
            return 1;
        }

        //--- открытие текстового потока для записи
        //2 - false, если такой файл уже есть, то он не заменяется
        //3 - true: кодировка Unicode; false: кодировка ANSI
        var textStream = _activeXObject.CreateTextFile(_stFileNameAbsTarget, true, true);

        //преобразование строки в массив по разделителю
        var arrStLines = _stText.split(/\n/igm);

        //проверка - если массив пуст, то и файл остается пустым
        if (arrStLines == null || arrStLines.length < 1) {
            textStream.Close();
            fzizLog('', ODPO_CLOSE);
            return 0;
        }

        //запись строк
        for (var i = 0; i < arrStLines.length; i++) {
            textStream.WriteLine(arrStLines[i]);
        }

        textStream.Close();
        fzizLog('', ODPO_CLOSE);
        return 2;
    } else {
        var iResult = -1;
        fnAjaxRequestPost('190811-124000', 'cmdFileExist', _stFileNameAbsTarget, function (stResponse) {
            if (stResponse === 'true') {
                fzizLog('OK - файл существует [' + _stFileNameAbsTarget + '] //190811-124300', ODPO_IN);
                var stMcny = _stFileNameAbsTarget + '^' + _stText; //[mcny] - см. Notion
                //---
                var stSignal = 'cmdFileReplace';
                if (_stSgtoConst === SGTO_UTF8) {
                    stSignal = 'cmdFileReplace_B';
                }
                //---
                fnAjaxRequestPost('//190811-123900', stSignal, stMcny, function (stResponse) {
                    fzizLog('stResponse [' + stResponse + '] cmdFileReplace', ODPO_IN);
                });
            } else {
                iResult = 1;
            }
        });
        fzizLog('', ODPO_CLOSE);
        return iResult;
    }
}

/**
 * Ищет форму (1), в ней группу radio (2), определяет какой из radio отмечен и возвращает его value
 * @param aFormId (1) -- id формы, например "forma"
 * @param aNmRadios (2) -- name группы radio, например "radios" (у группы radio name должен быть одинаковыми)
 * @return
 */
function yg54g_DOMs_getRadioVal(m105m, aFormId, aNmRadios) {
    var m1 = logif('--> yg54g_DOMs_getRadioVal', m105m);

    var form = document.forms[aFormId];

    var val;
    var radios = form.elements[aNmRadios];

    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked == true) {
            val = radios[i].value;
            break;
        }
    }
    return val;
}

//ВЫВОД на экран
function fnShowFindResult_x2(arOjs, m1, stFindText) {
    //блок с различной общей информацией о результатах поиска
    var jResBlockInfo = $('<div class="x42z_res_block_info"></div>').appendTo('#x42z_find_result');
    //информация о количестве совпавших страниц
    var jResInfoCount =
        $('<div id="x42z_res_info_count">Найдено: ' + arOjs.length + ' стр. </div>').appendTo(jResBlockInfo);
    //
    //блок с отдельными поисковыми блоками
    var jResBlocks = $('<div class="x42z_res_blocks"></div>').appendTo('#x42z_find_result');
    //три подблока
    //для соответствий в заголовке
    var jResBlocksMatchTitle = $('<div id="x42z_res_blocks_match_title"><div id="x42z_css_title_title">В ЗАГОЛОВКЕ</div></div>').appendTo(jResBlocks);
    //для соответствий в комментарии
    var jResBlocksMatchComm = $('<div id="x42z_res_blocks_match_comm"><div id="x42z_css_title_comm">В КОММЕНТАРИИ</div></div>').appendTo(jResBlocks);
    //для соответствий в теле страницы
    var jResBlocksMatchBody = $('<div id="x42z_res_blocks_match_body"><div id="x42z_css_title_body">В ТЕЛЕ</div></div>').appendTo(jResBlocks);
    //
    //вывод каждой карточки
    var ctTitle = 0, ctComm = 0, ctBody = 0;
    logif2('-- перед циклом вывода каждой Карточки');
    for (var i = 0; i < arOjs.length; i++) {
        //Jq-блок с карточкой-результатом
        var j = x_fn_block(i + '^' + m1, arOjs[i], stFindText, "p_find");

        if (arOjs[i].isTitle) {
            j.appendTo(jResBlocksMatchTitle);
            ctTitle++;
        } else {
            if (arOjs[i].isComm) {
                j.appendTo(jResBlocksMatchComm);
                ctComm++;
            } else {
                j.appendTo(jResBlocksMatchBody);
                ctBody++;
            }
        }
    }

    //количество совпадений в заголовках групп вывода
    $('#x42z_css_title_title').append(' (' + ctTitle + ')');
    $('#x42z_css_title_comm').append(' (' + ctComm + ')');
    $('#x42z_css_title_body').append(' (' + ctBody + ')');

    var delta = new Date().getTime() - w39w;
    logif2('-- время поиска и вывода = ' + delta);
}

/**
 * Отфильтровка
 *
 * @param stPker
 * @param aCheckedCase
 * @param stFindText
 * @param arOjs
 * @param m1
 */
function fnFilterFind_x2(stPker, aCheckedCase, stFindText, arOjs, m1) {
    //преобразование строки в массив объектов ([pker])
    var arPker = JSON.parse(stPker);
    //=
    for (var i18 = 0; i18 < arPker.length; i18++) { //ЦИКЛ
        var ojCxkk = arPker[i18];
        var stPath = g_stProjectRootPath + G1_DIV + ojCxkk.stZxuw;

        //учет "галок" фильтрации наборов (t, p, q)
        //= yx23z_re=^[q]_\d+_[q].html$
        //= yx23z_re2=^(.+)([q]_\d+_[q].html)$
        var re = new RegExp(yx23z_re.substring(1), 'i');
        var m = re.exec(stPath);
        if (m == null) {
            continue;
        }

        var stTitle = ojCxkk.txTitle;
        if (!aCheckedCase) stTitle = stTitle.toLowerCase();
        if (stTitle.indexOf(stFindText) !== -1) {
            ojCxkk.isTitle = true;
        }

        var comm = ojCxkk.txComm;
        if (!aCheckedCase) comm = comm.toLowerCase();
        //
        if (comm.indexOf(stFindText) !== -1) {
            ojCxkk.isComm = true;
        }

        if (ojCxkk.isTitle || ojCxkk.isComm) {
            arOjs.push(ojCxkk);
        }
    } //ЦИКЛ

    fnShowFindResult_x2(arOjs, m1, stFindText);
}

/**
 * Нажата кнопка "Поиск"
 * @param _stFindText (1) -- текст из поля поиска
 * @param _checkedCase (2) -- галочка "Учитывать регистр"
 */
function basefnFind(m105m, _stFindText, _checkedCase) {
    fzizLog('--> basefnFind', ODPO_OPEN);
    var m1 = '';
    w39w = new Date().getTime();

    yx7z_case = _checkedCase;

    if (!_checkedCase) {
        _stFindText = _stFindText.toLowerCase();
    }

    //проверка что хотябы что-то было введено
    if (_stFindText.length < 1) {
        alert("Введите текст для поиска");
        return; //=====X
    }

    //===
    var clf = docCookies.getItem(G1_COOK_LAST_FIND_W73W);
    var arr = [];
    if (clf) {
        arr = clf.split(G1_SEPARATOR_W72W);
    }
    var ix = arr.indexOf(_stFindText);
    if (ix == -1) {
        arr.push(_stFindText);
        if (arr.length > G1_LAST_FIND_MAX) {
            arr.shift(); //удаление 1-го элемента массива
        }
        var join = arr.join(G1_SEPARATOR_W72W);
        docCookies.setItem(G1_COOK_LAST_FIND_W73W, join);
        updateShowLastFind();
    }
    //===

    //очистка поля вывода результата
    $('#x42z_find_result').text('');

    var arOjs = [];


    //если вкл. галка "искать в индексе"
    if ($('#x50h').prop('checked')) {
        //получение строки индекса из файла-индекса
        var stPker = "";
        if (ixwaMode === G1_IXWA_UASK) {
            console.log('-- режим [uask]');
            $.get(G1_MNUA_URL, function (stData, textStatus, jqXHR) {
                stPker = stData;
                fnFilterFind_x2(stPker, _checkedCase, _stFindText, arOjs, m1);
            }).fail(function () {
                alert('ошибка: недоступен файл индекса');
                console.error('ошибка загрузки файла индекса');
            });
        } else {
            stPker = yg54g_Storages_readFi_C_node(m1, g_stMnuaCrip);
            fnFilterFind_x2(stPker, _checkedCase, _stFindText, arOjs, m1);
        }

    } else if (!$('#x50h').prop('checked')) {
        //^ если обычный поиск, т.е. без использования Индекса

        //массив [crip]s всех страниц проекта
        var fiNms = yg54g_Storages_getCrips_B(g_stProjectRootPath, 3, yx23z_re);

        //ПОЛУЧЕНИЕ массива с объектами содержащими результаты поиска
        arOjs = yx42z_getConsistText(m1, fiNms, _stFindText, yx7z_case);

        fnShowFindResult_x2(arOjs, m1, _stFindText);
    }
    fzizLog('', ODPO_CLOSE);
}

/**
 * Реализация нажатия на кноку добавления результата поиска как тег в область тегов
 * @param aOj
 */
function x41z_fn_add_tag(aOj) {
    var m1 = null;

    //ПРОВЕРКА есть ли уже на странице блок тегов
    var b = $('body').find($x41z_block_tags).is($x41z_block_tags);

    //если блока нет, то создаем его над блоком поиска
    var jBlockTags;
    if (!b) {
        jBlockTags = $('<div id="x41z_block_tags">');
        $('.x42z_form_class').before(jBlockTags);

        var title = $('<div id="x41z_block_tags_title">Блок тегов</div>').appendTo(jBlockTags);
    } else {
        jBlockTags = $('body').find($x41z_block_tags);
    }

    //ДОБАВЛЯЕМ запись в блок
    //шаблон записи
    var jElem = $('<div class="x41z_block_tags_elem"></div>');
    var jElemTitle = $('<div class="x41z_block_tags_elem_title"></div>');
    var jElemComm = $('<div class="x41z_block_tags_elem_comm"></div>');
    var jElemThxx = $('<div class="x41z_block_tags_elem_thxx"></div>');
    jElemTitle.appendTo(jElem);
    jElemComm.appendTo(jElem);
    jElemThxx.appendTo(jElem);
    //
    //НАПОЛНЕНИЕ записи
    //обработка пересечений
    var thxx = aOj.data.txThxx;
    if (thxx) {
        var jx = $('<div></div>');
        jx.append(thxx);
        jx.find('a').each(function () {
            $(this).before('&bull; ');
            $(this).after(' &nbsp; ');
        });
        var jxh = jx.html();
        jElemThxx.html(jxh);
    }
    //
    //заголовок
    var title = aOj.data.txTitle;
    var hr = aOj.data.stZxuw;
    //превращение абсолютной ссылки в относительную
    hr = hr.replace(g_stProjectRootPath + '\\\\', '');
    //удаление html на конце для отображения
    hr1 = hr.replace(/\.html$/i, '');
    //замена слеэшей
    hr = hr.replace(/\\+/g, '/').replace(/\/+/g, '/');
    $(jElemTitle).append('<a href="' + hr + '">' + title + '</a>' + ' <span class="x41z_block_tags_elem_title_href">' + hr1 + '</span>');
    //
    //комментарий
    jElemComm.html(aOj.data.txComm);
    //
    //добавление записи
    jElem.appendTo(jBlockTags);

    //ДАЕМ команду на перестроение блока результатов поиска
    //очистка блока поиска
    $('.x42z_res_blocks').html('');
    //получение массива href отобранных ссылок (тегов)
    var arHrefs = [];
    $('.x41z_block_tags_elem_title > a').each(function () {
        var href = $(this).attr('href');
        arHrefs.push(href);
    });
    //
    //определение тегодержателей и ассоциатов
    var oj = x41z_fn_getArTagholders(arHrefs);
    //массив ThFiNm11 тегодержателей
    var arTagholders = oj.tagholders;
    //массив ThFiNm11 ассоциатов
    var arAssociats = oj.associats;
    //сортировка и схлопывание массива
    arAssociats = yg54g_Ars_removeDublicatesAaSort(arAssociats, "");

    //добавление блока тегодержателей
    var jResBlockTagholders = $('<div id="x42z_res_tagholders"></div>').appendTo('.x42z_res_blocks');
    jResBlockTagholders.append('<div id="x42z_css_title_tagholders">ТЕГОДЕРЖАТЕЛИ (' + arTagholders.length + ')</div>');
    //добавление блока ассоциатов
    var jResBlockAssociats = $('<div id="x42z_res_associats"></div>').appendTo('.x42z_res_blocks');
    jResBlockAssociats.append('<div id="x42z_css_title_associats">АССОЦИАТЫ (' + arAssociats.length + ')</div>');

    //вывод тегодержателей в блок поиска
    for (var i32 = 0; i32 < arTagholders.length; i32++) {
        //получения объекта с данными тегодержателя
        var oj = fnCxkkGet(null, g_stProjectRootPath + '\\\\' + arTagholders[i32], null);
        //получение карточки тегодержателя
        var jBlock = x_fn_block(i32 + '^' + m1, oj, "", "p_tagholders");
        $(jResBlockTagholders).append(jBlock);
    }
    //вывод ассоциатов в блок поиска
    for (var i33 = 0; i33 < arAssociats.length; i33++) {
        //получения объекта с данными ассоциата
        var oj = fnCxkkGet(null, g_stProjectRootPath + '\\\\' + arAssociats[i33], null);
        //получение карточки ассоциата
        var jBlock = x_fn_block(i33 + '^' + m1, oj, "", "p_tagholders");
        $(jResBlockAssociats).append(jBlock);
    }

}

/**
 * Получение массива тегодержателей тегов (1), а также их ассоциатов
 * @param aThFiNm11s (1) -- массив имен файлов из блока тегов
 * @returns {objext} объект из двух свойств-массивов,
 * {tagholders: [массив_href_тегодержателей], associats: [массив_href_ассоциатов]}
 */
function x41z_fn_getArTagholders(aThFiNm11s) {

    var m1 = null;

    //массив ассоциатов
    var arAssociats = [];

    //ПОЛУЧЕНИЕ массива тегодержаталей, с повторениями
    //получение массива имен файлов проекта
    var a = yx23z_ranges.toString().replace(/,/g, '');
    //:ptq
    var arFis = yg54g_Storages_getCrips_B(g_stProjectRootPath, 0, "^[ptq]_\\d+_[ptq].*");

    //этап 1 - проход по всем файлам, отделение файлов которые упоминают каждую искомую ссылку.
    //Упоминание может быть в любом месте файла, не обязательно в блоке персечений. То что попадает в блок пересечений будет
    //отсеяно на этапе 2
    var ar = [];
    //
    var fso = yg54g_Storages_getFileSystemObject_node(m1);
    for (var i = 0; i < arFis.length; i++) {
        //всмомогательный массив - первичное заполнение
        var arExists = [];
        for (var i7 = 0; i7 < aThFiNm11s.length; i7++) {
            arExists[i7] = false;
        }

        //1 - открываем файл только для чтения    //false - если файла нет, то он не создается
        var textStream = fso.OpenTextFile(g_stProjectRootPath + '\\' + arFis[i], 1, false, g_encoding);
        //пока не достигнут конец файла
        //noinspection JSUnresolvedVariable
        while (!textStream.AtEndOfStream) {
            //очередная строка
            var line = textStream.ReadLine();

            //проверка наличия в строке тегов
            for (var i2 = 0; i2 < aThFiNm11s.length; i2++) {
                //если присутствует
                if (line.indexOf(aThFiNm11s[i2]) !== -1) {
                    arExists[i2] = true;
                }
            }
        }
        textStream.Close();

        //проверка все ли ссылки встретились в файле
        for (var i3 = 0; i3 < arExists.length; i3++) {
            if (!arExists[i3]) {
                arExists.length = 0;
                break;
            }
        }
        //если все
        if (arExists.length > 0) {
            ar.push(arFis[i]);
        }
    }

    //ЭТАП 2 - просмотр отобранных страниц для определения какие из них содержат искомые теги в блоке пересечений
    var ar2 = [];
    logif2('-- перед циклом (--> yg54g_Storages_readFi_B, --> yg54g_Strings_html_getTg_C)')
    for (var i8 = 0; i8 < ar.length; i8++) {
        //всмомогательный массив - первичное заполнение - подразумевает начальное остуствие всех искомых ссылок
        var arExists2 = [];
        for (var i9 = 0; i9 < aThFiNm11s.length; i9++) {
            arExists2[i9] = false;
        }

        //файл в виде строки
        var fiSt = yg54g_Storages_readFi_B_node(
            null,
            g_stProjectRootPath + '\\' + ar[i8],
            fso
        );
        if (!fiSt) continue;

        //блок пересечений как строка
        var stThxx = yg54g_Strings_html_getTg_C(m1, fiSt, "div#x41z_blocks", "p_outerHTML").blockOuter;
        if (!stThxx) continue;

        var arTempAssociats = [];
        //перечисление href каждой ссылки блока пересечений
        $(stThxx).find('a').each(function () {
            var h = $(this).attr('href');

            arTempAssociats.push(h);

            //сравнение с искомыми ссылками
            for (var i10 = 0; i10 < aThFiNm11s.length; i10++) {
                if (aThFiNm11s[i10] === h) {
                    arExists2[i10] = true;
                }
            }
        });

        //проверка вспомогательного массива, что все его элементы == true
        for (var i22 = 0; i22 < arExists2.length; i22++) {
            if (!arExists2[i22]) {
                arExists2.length = 0;
                break;
            }
        }

        //если все искомые ссылки в блоке пересечений содержаться
        if (arExists2.length > 0) {
            ar2.push(ar[i8]);
            //
            arAssociats = arAssociats.concat(arTempAssociats);
        }
    }
    return {tagholders: ar2, associats: arAssociats};

}

/**
 * Получение "Карточки" страницы (1) представленной объектом [cxkk]
 *
 * @param _stFileNameAbs (1) -- абсолютное имя страницы, формат [crip], например "F:\\Folder\\index.html"
 * @param _stFileName (2) -- {optional} имя файла страницы, формат [dtof], например "index.html"
 * @retruns {object} объект
 */
function fnCxkkGet(m105m, _stFileNameAbs, _stFileName) {
    var m1 = '';
    _stFileName = _stFileName || null;
    //--- файл в виде строки
    var stFileBody = yg54g_Storages_readFi_B_node(m1, _stFileNameAbs, yg54g_Storages_getFileSystemObject_node(m1));
    if (!stFileBody) {
        return;
    }
    //---
    var title = yg54g_Strings_html_getTg_C(m1, stFileBody, "title", "p_innerHTML").blockInner;
    var comm = yg54g_Strings_html_getTg_C(m1, stFileBody, "#x44z_comm", "p_innerHTML").blockInner;
    var thxx = yg54g_Strings_html_getTg_C(m1, stFileBody, "div#x41z_blocks", "p_innerHTML").blockInner;
    //--- объект [[cxkk]]
    var cxkk = {
        isTitle: false,
        txTitle: title,
        isComm: false,
        txComm: comm,
        txThxx: thxx,
        //[[zxuw]] - тут находится либо полный путь к странице ([crip]) либо только имя страницы ([stDtof])
        stZxuw: _stFileName === null ? _stFileNameAbs : _stFileName,
        arSts: []
    };
    //---
    return cxkk;
}

/**
 * Возвращает готовый к выводу на экран блок.
 * В режиме "p_find" (см. (3)), если задан текст (2) то выполняется подсветка данного текста в "заголовке" и "комментарии к заголовку".
 * Данный метод используется для получения блоков для вывода результата текстового поиска (режим "p_find") и для вывода тегодержателей (режим "p_tagholders").
 * @param aOj (1) -- объект с информацией для формирования блока, {isTitle"":, txTitle"":, isComm"":, txComm:"", txThxx:"", ThFiNm111:"", arSts:[]}
 * @param aTxFind (2) -- текст для подсветки в "заголовке" и "комментарии к заголовоку"
 * @param aMod (3) -- режим работы: "p_find" для формирования блока результатов текстового поиска; "p_tagholders" для формирования блока тегодержателя;
 * при любом другом значении будет возвращено null
 * @returns {string}  Jq объект или null при нештате
 */
function x_fn_block(m105m, aOj, aTxFind, aMod) {
    var m1 = logif('--> x_fn_block', m105m);

    if (aMod !== "p_find" && aMod !== "p_tagholders") {
        return null;
    }

    var modFind = (aMod === "p_find") ? true : false;
    var modAssociats = (aMod === "p_tagholders") ? true : false;

    //если заголовок содержит (2)
    var isTitle = aOj.isTitle;
    //заголовок
    var title = aOj.txTitle;
    //если комментарий содержит (2)
    var isComm = aOj.isComm;
    //комментарий
    var comm = aOj.txComm;
    //линки блока пересечений, например "<a href="1.html">text</a><a href="2.html">text</a>..."
    var thxx = aOj.txThxx;
    //абсолютное имя страницы
    var ThFiNm111 = aOj.stZxuw;
    //массив строк содержащих (2)
    var arSts = aOj.arSts;

    //контейнер
    var jResBlock = $('<div class="x42z_res_block"></div>');

    var jResTitle = $('<div class="x42z_res_title"></div>');
    //имя файла справа от заголовка-ссылки
    var jResFiNm = $('<span class="x41z_res_href"></span>');
    var jResComm = $('<div class="x42z_res_comm"></div>');
    var jResThxx = $('<div class="x42z_res_thxx"></div>');
    var jResSts = $('<div class="x42z_res_sts"></div>');

    jResFiNm.appendTo(jResTitle);

    //заполнение заголовка
    if (title) {
        //подсветка
        if (modFind) {
            title = yg54g_Strings_html_rpForHg(m1, title, aTxFind, 'x42z_hg', yx7z_case);
        }
        jResTitle.appendTo(jResBlock);
    }
    //
    //href
    var hr = ThFiNm111;
    //превращение абсолютной ссылки в относительную
    hr = hr.replace(g_stProjectRootPath + '\\\\', '');
    //удаление html на конце для отображения
    hr1 = hr.replace(/\.html$/i, '');
    //замена слеэшей
    hr = hr.replace(/\\+/g, '/').replace(/\/+/g, '/');
    //
    $(jResTitle).prepend('<a href="' + hr + '">' + title + '</a>');
    $(jResFiNm).append(' &nbsp;' + hr1);
    //
    //кнопка "Добавить в пересечения"
    var jBt = $('<input class="x41z_bt_plus" type="button" value="+ i" title="Добавить в пересечения" />')
        .appendTo(jResTitle);
    //добавление обработчика - см. http://ruseller.com/lessons.php?rub=32&id=700
    $(jBt).bind("click", aOj, x41z_fn_add);
    //кнопка "Добавить как тег в блок тегов"
    var jBtAddTg = $('<input class="x41z_bt_add_tg" type="button" value="+ t" title="Добавить как тег в блок тегов" />')
        .appendTo(jResTitle);
    $(jBtAddTg).bind("click", aOj, x41z_fn_add_tag);

    //КОММЕНТАРИЙ заголовка
    if (comm) {
        //подстветка
        if (modFind) {
            comm = yg54g_Strings_html_rpForHg(m1, comm, aTxFind, 'x42z_hg', yx7z_case);
        }
        jResComm.append(comm);
        jResComm.appendTo(jResBlock);
    }

    //ПЕРЕСЕЧЕНИЯ
    if (thxx) {
        var tmp = $('<div></div>');
        tmp.append(thxx);
        tmp.find('a').each(function () {
            $(this).before('&bull; ');
            $(this).after(' &nbsp; ');
        });
        var jxh = tmp.html();
        jResThxx.append(jxh);
        jResThxx.appendTo(jResBlock);
    }

    //строки
    if (arSts.length > 0 && modFind) {
        for (var i1 = 0; i1 < arSts.length; i1++) {
            var t = arSts[i1];
            //подстветка
            if (t) {
                t = yg54g_Strings_html_rpForHg(m1, t, aTxFind, 'x42z_hg', yx7z_case);
            }
            $('<div class="x42z_res_st">' + t + '</div>').appendTo(jResSts);

        }
        jResSts.appendTo(jResBlock);
    }

    return jResBlock;
}

/**
 * Реализация нажатия на кнопку добавления пересечения (x41z_bt_plus)
 * @param oj (1) -- объект с данными поиска
 */
function x41z_fn_add(oj) {

    //делаем кнопку disabled
    $(this).prop('disabled', 'false');

    //формирование блока для вставки
    //var jBlock = $('<div class="x41z_block"></div>');
    //var jLink = $('<a href="' + oj.data.ThFiNm111 + '">' + oj.data.txTag + '</a>'); //.appendTo(jBlock);
    //
    //var block = jBlock.get(0).outerHTML;
    var hr = oj.data.stZxuw;
    hr = hr.replace(g_stProjectRootPath + "\\\\", "");

    var lnk = '<a href="' + hr + '">' + oj.data.txTitle + '</a>';
    //удаление подсвечиваний
    var lnk = yg54g_Strings_html_unwrapTg(lnk, "span");
    //
    var block = $(lnk);

    //ДОБАВЛЕНИЕ пересечения в файл страницы
    //проверка наличия блока пересечений (xXz) в файле
    var ctXxz = yg54g_Storages_html_isConsistEm(g_stPageCurrName, "div#x41z_blocks");
    //добавление блока пересечений если его нет
    var rs1;
    if (ctXxz < 1) {
        rs1 = yg54g_Storages_html_addEmIntoFi(g_stPageCurrName, "div#podval", yx41z_blocks_html, "p_after");
    }
    //добавление пересечения в блок пересечений
    var rs = yg54g_Storages_html_addEmIntoFi(g_stPageCurrName, "div#x41z_blocks", block, "p_append");

    //показ/обновление блока пересечений без обновления страницы

    if (rs == 2) {
        //если блок пересечений есть
        if ($('div').is($x41z_blocks)) {
            //добавление пересечения
            $($x41z_blocks).append(block);

        } else {
            $(yx41z_blocks_html).appendTo($podval).append(block);
        }
        //обновление блока пересечений
        x41z_fn_udAp();
    }
}

/**
 * Ищет в файле (1) элементы удовлетворяющие селектору (2). Возвращает количество таких элементов
 * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
 * @param aSelector (2) -- селектор типа ThSelA
 * @returns {int} -1 при неполадках
 */
function yg54g_Storages_html_isConsistEm(aThFiNm111, aSelector) {
    var m1 = null;

    //преобразование селектора в массив
    var arS = yg54g_Strings_html_convertSr(aSelector);
    var tag = arS[0];
    var id_class = arS[1];
    var name = arS[2];

    //получение файла в виде строки
    var fiSt = yg54g_Storages_readFi_B_node(m1, aThFiNm111, yg54g_Storages_getFileSystemObject_node(m1));
    if (!fiSt) {
        return -1;
    }
    if (fiSt.length < 1) {
        return 0;
    }

    //шаблон регулярного выражения
    var rx = new RegExp("\\<\\s{0,}"
        + tag + "\\s{1,}.{0,}?" + id_class + "\\s{0,}=\\s{0,}[\"']{0,}"
        + name + "(?:[\"'\\s][\\s\\S]{0,}?\\>|\\>)", "igm");
    var res = fiSt.match(rx);
    if (res) {
        return res.length;
    }

    return 0;
}

/**
 * Ищет в файле (1) первый элемент с селектором (2) и в зависимости от модификатора (4) выполняет вставку до, после и т.д.
 * @param aThFiNm111 {string} (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
 * @param aEmSr (2) -- селектор опорного элемента, например "div#name" или "div.name"
 * @param aEmHtml (3) -- добавляемый элемент, например "<span>ttt<span>"
 * @param aMod (4) --
 * <b>"p_append"</b> для .append (добавления в конец);
 * <b>"p_prepend"</b> для .prepend (добавления в начало);
 * <b>"p_after"</b> для .after (добавления сразу после);
 * <b>"p_before"</b> для .before (добавления перед)
 * @returns {int} 2 - если успешно, 0 - при неудачах
 */
function yg54g_Storages_html_addEmIntoFi(aThFiNm111, aEmSr, aEmHtml, aMod) {
    var m1 = null;

    if (aMod !== "p_append" && aMod !== "p_prepend" && aMod !== "p_after" && aMod !== "p_before") {
        return 0;
    }

    //файл в виде строки
    var fiSt = yg54g_Storages_readFi_B_node(m1, aThFiNm111, yg54g_Storages_getFileSystemObject_node(m1));
    if (!fiSt) {
        return 0;
    }

    //обновление html-строки
    var newSt = yg54g_Strings_html_addEmAToEmB(fiSt, aEmHtml, aEmSr, aMod);
    if (!newSt) {
        return 0;
    }

    //запись обновленной строки обратно в файл
    var res = yg54g_Storages_rpFi_node(m1, aThFiNm111, newSt, yg54g_Storages_getFileSystemObject_node(m1));
    if (res > 1) {
        return 2;
    }

    return 0;

}

/**
 * Ищет в html-строке (1) элемент (3) добавляет html-строку (2) в зависимости от
 * модификатора (4). Возвращает новую строку
 * @param aHtml (1) -- html-строка
 * @param aEmA (2) -- html-строка для добавления, например "&lt;div>ttt</div>"
 * @param aEmBSr (3) -- селектор опорного элемента,
 * например "div#name" или "div.class"
 * @param aMod (4) -- "p_append" для .append (добавления в конец); "p_prepend" для .prepend (добавления в начало);
 * "p_after" для .after (добавления сразу после); "p_before" для .before (добавления перед)
 * @returns {string} новую строку или "" при неудачах
 */
function yg54g_Strings_html_addEmAToEmB(aHtml, aEmA, aEmBSr, aMod) {
    //извлечение опорного элемента
    var tagStrong = yg54g_Strings_html_getTg(aHtml, aEmBSr);
    if (tagStrong.length < 1) {
        return "";
    }

    //извлечение этого же элемента, но в причесанном виде, формат Jq-Oj
    var jTagDress = yg54g_Strings_html_getTgJq(aHtml, aEmBSr);

    var udTag = "";
    if (aMod === "p_append") {
        udTag = jTagDress.append(aEmA).get(0).outerHTML;
    }
    if (aMod === "p_prepend") {
        udTag = jTagDress.prepend(aEmA).get(0).outerHTML;
    }
    if (aMod === "p_after") {
        var parent = $('<div></div>');
        $(jTagDress).appendTo(parent);
        $(aEmA).appendTo(parent);
        udTag = parent.html();
    }
    if (aMod === "p_before") {
        var parent = $('<div></div>');
        $(aEmA).appendTo(parent);
        $(jTagDress).appendTo(parent);
        udTag = parent.html();
    }

    var newSt = aHtml.replace(tagStrong, udTag);

    return newSt;
}

/**
 * Извлечение из (1) outerHTML первого тега (2) удовлетворяющего селектору (3).
 * Опции:
 * А) извлекается только первый встретившийся тег.
 * B) {ОТЛИЧИЕ ОТ A} Извлечение идет НЕ строго в таком виде в каком тег
 * содержится в (1) - испльзуется jQuery который выполняет "причесывание".
 * C) Теги (2) могут быть сложенными друг в друга.
 * @param aSt (1) -- строка из которой извлекается тег
 * @param aSelector (2) -- селектор, например "div#name" или "div.class"
 * @returns {jQuery} {ОТЛИЧИЕ ОТ А} jQuery объект
 */
function yg54g_Strings_html_getTgJq(aSt, aSelector) {
    //вспомогательный оберточный элемент
    var wrap = $('<div></div>');
    //"скармливание" нашей строки
    wrap.html(aSt);

    //извлечение нужного нам элемента, по селектору, в контексте wrap
    var res = $(aSelector, wrap).eq(0);
    return res;
}

/**
 * Возвращает ThHtmlIdPar на базе селектора
 * @param aSelector (1) -- селектор типа ThSelA
 * вместо # и . ничего другого быть не может
 * @returns {array} массив ThHtmlIdPar, например ["div", "id", "nameId"]
 */
function yg54g_Strings_html_convertSr(aSelector) {
    //var rx = new RegExp("\\s*([\\.#])(\\S+)", "i");
    var rx = new RegExp("(.{0,})([\\.#])(.{0,})", "i");
    var match = rx.exec(aSelector);
    //: ["div.nameClass", "div", ".", "nameClass"]
    //
    var a = match[2];
    if (a === ".") {
        a = "class";
    }
    if (a === "#") {
        a = "id";
    }
    //
    var b = match[3];
    var c = match[1];

    //формирование выходного массива
    var arRes = [];
    arRes.push(c);
    arRes.push(a);
    arRes.push(b);

    return arRes;
}

/**
 * Возвращает ThHtmlIdPar на базе селектора. Отличается от А только тем что возвращает в виде объекта, а не массива;
 * также тем, что селектор может быть типа ThSelC
 *
 * @param aSelector (1) -- селектор типа ThSelС
 * вместо # и . ничего другого быть не может
 * @returns {object} объект ThHtmlIdPar, например {tag: "div", comma: "id", name: "nameId"}
 */
function yg54g_Strings_html_convertSr_B(aSelector) {
    var rx = new RegExp("(.{0,})([\\.#])(.{0,})", "i");
    var match = rx.exec(aSelector);
    //---
    var name = "", comma = "", tag = "";
    if (match) {
        name = match[2];
        if (name === ".") {
            name = "class";
        }
        if (name === "#") {
            name = "id";
        }
        //
        comma = match[3];
        tag = match[1];
    } else {
        if (aSelector.length > 0) {
            tag = aSelector;
        }
    }
    //--- формирование выходного объекта
    var ojRes = {tag: "", comma: "", name: ""};
    ojRes.tag = tag;
    ojRes.comma = name;
    ojRes.name = comma;
    //---
    return ojRes;
}

/**
 * Определение наличия в (1) текста (2). Возврат объекта-описания в случае наличия поисковых совпадений, иначе возврат undefined
 * @param fiSt (1) -- строка в которой ищется текст (2)
 * @param aTxFind (2) -- искомый текст
 * @param aConsiderCase (3) -- учитывать или нет регистр
 * @param aFiNm (4) -- имя файла содержимое которого представлено в (1)
 * @returns объект {
 *  isTitle: true/false есть ли совпадение в теге title,
 *  txTitle: содержимое title - вне зависимости было или нет совпадение,
 *  isComm: true/false если ли совпадение в блоке #x44z_comm,
 *  txComm: содержимое блока #x44z_comm - вне зависимости есть совпадение или нет,
 *  txThxx: содержимое блока div#x41z_blocks
 *  ThFiNm111: имя файла,
 *  arSts: массив строк имеющих совпадения, из тела body
 * }
 */
function fn_getDescOj(m105m, fiSt, aTxFind, aConsiderCase, aFiNm) {

    var m1 = logif('--> fn_getDescOj', m105m);

    var r_txTitle = "";
    var r_isTitle = false;
    var r_txComm = "";
    var r_isComm = false;
    var r_txThxx = "";
    var r_ThFiNm111 = "";
    //
    var r_arSts = [];

    //извлечение с вырезанием блока title
    var ojTitle = yg54g_Strings_html_getTg_C(m1, fiSt, "title", "p_innerHTML");
    //обновление дальнейшей строки
    fiSt = ojTitle.newst;
    //console.log("fiSt after title=["+fiSt + "]");
    var txTitle = ojTitle.blockInner;
    //обработка
    txTitle = yg54g_Strings_delSpaces_B(txTitle);
    txTitle = yg54g_Strings_zipSpaces(txTitle);
    //
    if (txTitle) {
        r_txTitle = txTitle;
        //проверка совпадения
        r_isTitle = yg54g_Strings_equalSts_A(txTitle, aTxFind, aConsiderCase);
    }

    //извлечение с вырезанием блока #x44z_comm
    var ojComm = yg54g_Strings_html_getTg_C(m1, fiSt, "#x44z_comm", "p_innerHTML");
    //обновление дальнейшей строки
    fiSt = ojComm.newst;
    var txComm = ojComm.blockInner;
    //обработка
    txComm = yg54g_Strings_delSpaces(txComm);
    txComm = yg54g_Strings_zipSpaces(txComm);
    if (txComm) {
        r_txComm = txComm;
        //проверка совпадения
        r_isComm = yg54g_Strings_equalSts_A(txComm, aTxFind, aConsiderCase);
    }

    //извлечение с вырезанием блока div#x41z_blocks
    var ojThxx = yg54g_Strings_html_getTg_C(m1, fiSt, "div#x41z_blocks", "p_innerHTML");
    //обновление дальнейшей строки
    fiSt = ojThxx.newst;
    var txThxx = ojThxx.blockInner;
    //обработка
    txThxx = yg54g_Strings_delSpaces(txThxx);
    txThxx = yg54g_Strings_zipSpaces(txThxx);
    if (txThxx) {
        r_txThxx = txThxx;
    }

    //извлечение с вырезанием body
    var ojBody = yg54g_Strings_html_getTg_C(m1, fiSt, "body", "p_innerHTML");
    //обновление дальнейшей строки
    fiSt = ojBody.newst;
    var txBody = ojBody.blockInner;
    //обработка
    //txBody = yg54g_Strings_delSpaces(txBody);
    //txBody = yg54g_Strings_zipSpaces(txBody);
    //удаление HTML тегов
    txBody = yg54g_Strings_html_delHtmlTags(txBody);
    //
    //ФОРМИРОВАНИЕ массива match-строк из body
    //"убиваем" спецсимволы
    var bTxFind = yg54g_Strings_dismissRegexpSymbols(m1, aTxFind);
    //
    var re3 = new RegExp("^.*" + bTxFind + ".*$", (aConsiderCase) ? 'gm' : 'gim');
    var ex;
    while (ex = re3.exec(txBody)) {
        r_arSts.push(yg54g_Strings_delSpaces_B(ex[0]));
    }

    //формирование объекта-результата
    var res;
    if (r_isTitle || r_isComm || r_arSts.length > 0) {
        //конструктор объекта
        res = {
            isTitle: r_isTitle,
            txTitle: r_txTitle,
            isComm: r_isComm,
            txComm: r_txComm,
            txThxx: r_txThxx,
            ThFiNm111: aFiNm,
            arSts: r_arSts
        };
    }

    return res;
}

/**
 * Возвращает массив с объектами содержащими результаты поиска в файлах (1).
 *
 * @param aFiNms (1) -- массив абсолютных имен ThFiNm111 файлов в которых будет осуществляться поиск, например [F://file1.html,
 * F://file2.html, ...]
 * @param aTxFind (2) -- искомый текст. Он ищется в тексте файла и в том числе в (2)
 * @param aConsiderCase {boolean} (3) -- TRUE чтобы учитывать регистр, иначе FALSE
 * @returns {array} массив объектов
 * {
 *  isTitle: true/false есть ли совпадение в теге title,
 *  txTitle: содержимое title - вне зависимости было или нет совпадение,
 *  isComm: true/false если ли совпадение в блоке #x44z_comm,
 *  txComm: содержимое блока #x44z_comm - вне зависимости есть совпадение или нет,
 *  txThxx: содержимое блока div#x41z_blocks
 *  ThFiNm111: имя файла,
 *  arSts: массив строк имеющих совпадения из тела body
 * }
 */
function yx42z_getConsistText(m105m, aFiNms, aTxFind, aConsiderCase) {
    var m1 = logif('--> yx42z_getConsistText', m105m);

    //FileSystemObject
    var fso;
    if (!$('#x51h').prop('checked')) {
        fso = yg54g_Storages_getFileSystemObject_node(m1);
    }

    //результирующий массив объектов
    var arRes = [];

    //проход по файлам
    //aFiNms.length = 10;
    logif2('-- цикл по файлам /внутри yx42z_getConsistText/');
    for (var i = 0; i < aFiNms.length; i++) {

        //получение содержимого файла
        var fiSt = '';
        // если стоит галка "использовать технику m104m"
        if ($('#x51h').prop('checked')) {
            var fe = aFiNms[i];

            var linda = 'file:///' + fe;

            $.ajax({
                url: linda, success: function (data) {
                    //содержимое страницы
                    fiSt = data;
                }, dataType: 'html'
            });

        } else {
            fiSt = yg54g_Storages_readFi_B_node(i + '^' + m1, aFiNms[i], fso);
        }

        //проверка наличия поискового совпадения
        // и формирование объекта-описания совпадения
        var res = fn_getDescOj(i + '^' + m1, fiSt, aTxFind, aConsiderCase, aFiNms[i]);

        //добавление объекта-резульата в массив объектов-результатов
        if (res) {
            arRes.push(res);
        }
    }
    logif2('-- циклов = ' + i + ' /внутри yx42z_getConsistText/');

    return arRes;

}

/**
 * Удаляет все теги оставляя только текст
 * @param aSt (1) -- строки из которой нужно удалить теги
 * @returns {string] строка без тегов
 */
function yg54g_Strings_html_delHtmlTags(aSt) {
    return aSt.replace(/<.*?>/ig, "");
}

/**
 * Извлечение из (1) outerHTML или innerHTML первого тега удовлетворяющего селектору (2).
 * Возвращает объект формата
 * {
 * newst: строка (1) без блока (2),
 * blockOuter: outerHTML блока (2),
 * blockInner: innerHTML блока (2)
 * }
 * Опции:
 * А) извлекается только первый встретившийся тег.
 * B) Извлечение идет строго в таком виде в каком тег
 * содержится в (1) - jQuery не используется.
 * C) ThTTag (2) могут быть вложенными друг в друга.
 * <b>ОТЛИЧИЯ ОТ А:</b>
 * 1) возвращает и искомый блок и исходную строку без данного блока
 * @param aSt (1) -- строка из которой извлекается тег
 * @param aSelector (2) -- селектор типа ThSelC, например "#name" или "div"
 * @param aMod (3) -- "p_innerHTML" или "p_outerHTML"* по умолчанию (* или что угодно)
 * @returns {object} если блок не находит, то возвращает объект типа {newst: "$исходная строка aThFiSt$", blockOuter: "", blockInner: ""}
 */
function yg54g_Strings_html_getTg_C(m105m, aThFiSt, aSr, aMod) { //TODO обновить в библиотеке

    var m1 = logif('--> yg54g_Strings_html_getTg_C', m105m);

    //результирующий объект
    var res = {newst: "", blockOuter: "", blockInner: ""};

    //разбивка селектора
    var ojSr = yg54g_Strings_html_convertSr_B(aSr);

    var thRxStbb = yg54g_Strings_html_SrToRx(aSr);
    var rx1 = new RegExp(thRxStbb, "gim");

    //используется техника m85m (циклическое добавление закрывающей конструкции (тега))
    var ex;
    var ct = 1;
    var matchSt;
    while (ex = rx1.exec(aThFiSt)) {
        //:m84m140422185300

        matchSt = ex[0];

        var xTag = ojSr.tag;
        //для случая когда в селекторе не указан тег
        if (ex[1]) {
            xTag = ex[1];
        }

        //определение количества открывающих тегов в отобранном
        var rx2 = new RegExp("\\<\\s*" + xTag + "[\\s\\>]+", "gim");
        //количество совпадений
        var ctOpenTags = matchSt.match(rx2).length;

        //определение количества закрывающих тегов в отобранном
        var rx3 = new RegExp("\\<\\s{0,}/" + xTag + "\\s{0,}\\>", "igm");
        var ctCloseTags = matchSt.match(rx3).length;

        if (ctOpenTags !== ctCloseTags) {
            //строка для RegExp с дополнительной закрывающей конструкцией на конце
            var newRx = yg54g_Strings_html_SrToRx_B(aSr, ct);

            var rx1 = new RegExp(newRx, "gim");
            ct++;
        } else {
            break;
        }
    }

    if (matchSt) {
        bThFiSt = aThFiSt.replace(matchSt, "");

        res.newst = bThFiSt;
        res.blockOuter = matchSt;
        if (aMod === "p_innerHTML") {
            //выделяется все что внутри parent-конструкции <x>..</x>
            var regex = new RegExp("^\\<[\\s\\S]*?\\>([\\s\\S]*)\\r*\\n*\\<[\\s\\S]*?\\>$", "i");
            var ex = regex.exec(matchSt);
            if (ex) {
                res.blockInner = ex[1];
            }
        }
    } else {
        res.newst = aThFiSt;
    }

    return res;
}

/**
 * Извлечение из (1) outerHTML первого тега удовлетворяющего селектору (2).
 * Опции:
 * А) извлекается только первый встретившийся тег.
 * B) Извлечение идет строго в таком виде в каком тег
 * содержится в (1) - jQuery не используется.
 * C) ThTTag (2) могут быть вложенными друг в друга.
 * @param aSt (1) -- строка из которой извлекается тег
 * @param aSelector (2) -- селектор типа ThSelA, например "div#name" или "div.class"
 * @returns {string} "" при отсутсвии тега и различных неудачах
 */
function yg54g_Strings_html_getTg(aSt, aSelector) {
    //преобразование селектора в ThHtmlIdPar
    var arSel = yg54g_Strings_html_convertSr(aSelector);
    //:["div", "#", "name"]

    var tag = arSel[0];
    var id_class = arSel[1];
    var name = arSel[2];

    //первое получение
    //: \<\s*tag\s+[^\<\>]*?class\s*=\s*"*'*name(?:\>|[\s"'][^\<\>]*?\>)[\s\S]*?\<\s*\/\s*tag\s*\>
    var sRx = "\\<\\s*" + tag + "\\s+[^\\<\\>]*?" + id_class + "\\s*=\\s*\"*'*" + name
        + "(?:\\>|[\\s\"'][^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag + "\\s*\\>";
    var rx1 = new RegExp(sRx, "gim");

    var ex;
    while (ex = rx1.exec(aSt)) {
        //:m84m140422185300

        ex = ex[0];

        //определение количества открывающих тегов в отобранном
        var rx2 = new RegExp("\\<\\s{0,}" + arSel[0] + "[\\s\\>]{1,}", "gim");
        //количество совпадений
        var ctOpenTags = ex.match(rx2).length;

        //определение количества закрывающих тегов
        var rx3 = new RegExp("\\<\\s{0,}/" + arSel[0] + "\\s{0,}\\>", "igm");
        var ctCloseTags = ex.match(rx3).length;

        if (ctOpenTags !== ctCloseTags) {
            //рег.выр. закрывающего тега
            var rxAdding = "[\\s\\S]{0,}?\\<\\s{0,}/\\s{0,}" + arSel[0] + "\\s{0,}\\>";
            sRx += rxAdding;
            var rx1 = new RegExp(sRx, "gim");
        } else {
            break;
        }
    }


    return ex;
}

/**
 * TRUE если aSt2 содержится в aSt1 1+ раз. Иначе FALSE
 * @param aSt1 {string} (1) -- строка 1, например "aaBBccDD"
 * @param aSt2 {string} (2) -- строка 2, например "Вс"
 * @param aConsiderCase {boolean} (3) -- если TRUE то регистр учитывается
 */
function yg54g_Strings_equalSts_A(aSt1, aSt2, aConsiderCase) {
    //учет/неучет регистра
    if (aConsiderCase !== true) {
        aSt1 = aSt1.toLowerCase();
        aSt2 = aSt2.toLowerCase();
    }
    //если содержит
    if (aSt1.indexOf(aSt2) !== -1) {
        return true;
    }
    return false;
}

/**
 * Подсветка в тексте (1) текста (2) если он там есть. Подсветка выполняется
 * за счет оборачивания в блок SPAN с class==(3)
 *
 * Пример: yg54g_Strings_html_rpForHg("tttAAtttaattt", "AA", "BB", "ignoreCase"), вернет строку
 * "ttt<span class=BB>AA</span>ttt<span class=BB>aa</span>ttt"
 *
 * @param aText (1) -- текст в котором ищется текст (2)
 * @param aFind (2) -- текст который ищется с тексте (1)
 * return подсвеченный текст или исходный текст
 * @param aClassNm (3) -- класс span
 * @param aMode (4) -- если "ignoreCase" или FALSE то регистр не учитывается, при любом другом
 * значении - учитывается
 * @returns {string] строка с выполненными заменами, или исходная строка если ничего не заменялось
 */
function yg54g_Strings_html_rpForHg(m105m, aText, aFind, aClassNm, aMode) {

    var m1 = logif('--> yg54g_Strings_html_rpForHg', m105m);

    //"убиваем" спец. символы RegExp в искомом тексте
    var bFind = yg54g_Strings_dismissRegexpSymbols(m1, aFind);

    //учет/неучет регистра
    var cases = "g";
    if (aMode == "ignoreCase" || aMode === false) {
        cases = "ig";
    }

    //подсветка
    var re = new RegExp(bFind, cases);
    var ret = aText.replace(re, '<span class="' + aClassNm + '">$&</span>');

    return ret;
}

/**
 * Возврат содержимого файла в виде строки с разделителями "\n"
 * @param aRelativeNmFi - относительное имя файла, например "_files\\testFile.txt" или "testFile.txt"
 * @return содержимое файла в виде строки с разделителями "\n"
 */
function yg54g_Storages_readFi(aRelativeNmFi) {
    var m1 = null;

    var fso = new ActiveXObject("Scripting.FileSystemObject"); //создаем объект файловой системы
    var f = fso.OpenTextFile(this.yg54g_Storages_getPaFd_B() + '\\' + aRelativeNmFi, 1, false, g_encoding);
    //up   1 - открываем файл только для чтения    //false - если файла нет, то он не создается
    var d2 = "";
    var n = "";
    //noinspection JSUnresolvedVariable
    while (!f.AtEndOfStream) {
        var d = f.ReadLine(); //считывание следующей строки
        d2 = d2 + n + d; //добавление новой строки к уже считанным строкам
        n = "\n";
    }
    f.Close();
    return d2;
}

/**
 * Возвращает TRUE если файл (1) существует
 * @param _stFileNameAbs (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
 * @param _ojFso (2) -- объект файловой системы, например через new ActiveXObject("Scripting.FileSystemObject");
 * @returns {boolean} null при неполадках
 */
function yg54g_Storages_isFiExist_node(_stFileNameAbs, _ojFso) {
    fzizLog('--> yg54g_Storages_isFiExist_node; _stFileNameAbs [' + _stFileNameAbs + '] //190811-171801', ODPO_OPEN)
    if (_stFileNameAbs === null || _stFileNameAbs === undefined || _stFileNameAbs.length < 1) {
        fzizLog('!!!!!!!!!-25 //190811-172500', ODPO_IN);
        fzizLog('', ODPO_CLOSE);
        return null;
    }
    //---
    if (fnIsCurrentBrowserIE()) {
        if (_ojFso === null || _ojFso == undefined) {
            fzizLog('_ojFso is null or undefined //190811-172200', ODPO_IN);
            fzizLog('', ODPO_CLOSE);
            return null;
        }
        //---
        var ret = _ojFso.FileExists(_stFileNameAbs);
        fzizLog('', ODPO_CLOSE);
        return ret;
    } else {
        var bRet = false;
        fnAjaxRequestPost('//190810-191700', 'cmdFileExist', _stFileNameAbs, function (stResponse) {
            fzizLog('stResponse [' + stResponse + '] //190810-191800'); //de, ODPO_INl
            bRet = stResponse === 'true';
        });
        fzizLog('', ODPO_CLOSE);
        return bRet;
    }
    fzizLog('', ODPO_CLOSE);
}

/**
 * Возврат содержимого файла в виде строки с разделителями "\n".
 * Отличается от А тем что (1) это абсолютный путь, и что получает ActiveXObject
 *
 * @param _stFileNameAbs (1) -- абсолютное имя файла, например "F:\\folder\\_files\\testFile.txt"
 * @param _fso (2) -- (используется только в IE) объект файловой системы, например полученный через
 * new ActiveXObject("Scripting.FileSystemObject");
 * @param _stSgtoConst (3) -- [sgto]; кодировка файла (1); по умолчанию использует SGTO_UCS2
 * @returns {string} содержимое файла в виде строки с разделителями "\n"; null - при неполадках (например при отсутствии файла)
 */
function yg54g_Storages_readFi_B_node(_m105m, _stFileNameAbs, _fso, _stSgtoConst) {
    fzizLog('--> yg54g_Storages_readFi_B_node; _stFileNameAbs [' + _stFileNameAbs + '] //190811-192900', ODPO_OPEN);

    var m1 = '';

    //--- проверка существования файла
    fzizLog('ищем файл [' + _stFileNameAbs + ']', ODPO_OPEN);
    var bExist = yg54g_Storages_isFiExist_node(_stFileNameAbs, _fso);
    if (!bExist) {
        fzizLog('(найден/не найден) не найден [' + _stFileNameAbs + '] //190811-084900', ODPO_IN);
        fzizLog('', ODPO_CLOSE);
        return null;
    } else {
        fzizLog('(найден/не найден) найден', ODPO_IN);
    }
    fzizLog('', ODPO_CLOSE);

    //---
    if (fnIsCurrentBrowserIE()) {
        var textStream = _fso.OpenTextFile(_stFileNameAbs, 1, false, g_encoding);
        //up   1 - открываем файл только для чтения    //false - если файла нет, то он не создается
        var stRet = "";
        var stN = "";
        //noinspection JSUnresolvedVariable
        while (!textStream.AtEndOfStream) {
            var stLine = textStream.ReadLine(); //считывание следующей строки
            stRet = stRet + stN + stLine; //добавление новой строки к уже считанным строкам
            stN = "\n";
        }
        textStream.Close();
        fzizLog('', ODPO_CLOSE);
        return stRet;
    } else {
        var stRet2 = "";
        //---
        var stSignal = 'cmdFileGet';
        if (_stSgtoConst === SGTO_UTF8) {
            stSignal = 'cmdFileGet_B';
        }
        //---
        fnAjaxRequestPost('//190811-082700', stSignal, _stFileNameAbs, function (stResponse) {
            //fzizLog('stResponse [' + stResponse + '] //190811-084200', ODPO_IN);
            fzizLog('stResponse [--//--] //190811-084200', ODPO_IN);
            stRet2 = stResponse;
        });
        fzizLog('', ODPO_CLOSE);
        return stRet2;
    }
    fzizLog('', ODPO_CLOSE);
}

/**
 * Дописывает в конец файла (1) строку (2)
 *
 * @param stNameFile (1) -- относительное имя файла в который будет
 *            осуществляться запись, например "_files\\testFile.txt" или "testFile.txt"
 * @param stValue (2) -- текстовая строка которую нужно записать
 */
function yg54g_Storages_addToFile(stPathFile, stValue) { //TODO
    var ojFileSystemObject = new ActiveXObject("Scripting.FileSystemObject");
    //8 - открытие для добавления; 1 - в кодировке Unicode
    var ojTextStream = ojFileSystemObject.OpenTextFile(stPathFile, 8, true, -1);
    ojTextStream.WriteLine(stValue);
    ojTextStream.Close();
}

/**
 * Возврат абсолютного имени сейчас отображаемой страницы
 * @return например "D:\\Working\\file.html"
 */
function yg54g_Storages_getPaFi() {
    var a = window.location.href;
    a = a.replace(/file:\/\/\//i, "").replace(/%20/g, " ").replace(/\//g, '\\\\');
    return a;
}

/**
 * Возврат имени сейчас отображаемой страницы.
 *
 * @return например "file.html"
 */
function yg54g_Storages_getPaFi_B() {
    //--- путь, пример - может быть так "/F:/Folder1/file.html" или даже так "/D:\Working\index.html"
    var stPath = document.location.pathname;
    //--- преобразуем к правильному виду, пример "F:\\Folder1"
    stPath = stPath.replace(/[\/\\]/g, "\\\\");
    stPath = stPath.replace(/[\/\\]+/, "");
    //---
    if (fnIsCurrentBrowserIE()) {
        var ix = stPath.lastIndexOf('\\');
        if (ix === -1) {
            ix = stPath.lastIndexOf('/');
        }
        //---
        if (ix !== -1) {
            stPath = stPath.substr(ix + 1);
        }
    }
    //---
    return stPath;
}

/**
 * Возвращает имя текущей страницы. Например: index.html
 */
function yg54g_Storages_nameCurrPage() {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f = fso.GetFile(this.yg54g_Storages_getPaFi());
    //noinspection JSUnresolvedVariable
    return f.Name;
}

/**
 * Возвращает имя текущей страницы. Например: index.html.
 * Отличается от А и B тем что не использует ActiveX
 */
function yg54g_Storages_nameCurrPage_C() {
    //путь, пример - может быть так "/F:/Folder1/file.html" или даже так "/D:\Working\index.html"
    var pa = document.location.pathname;

    var re = /^(.*)[\\\/](.*?)$/;
    var ex = re.exec(pa);
    if (ex !== null) {
        pa = ex[2];
    }

    return pa;

}

/**
 * У пути (1) отбрасывает последний слэш '\' или '/' и всё что после него следует
 *
 * @param stPathfile
 * @returns {string}
 */
function fnPathDropTail(stPathfile) {
    var regExp = new RegExp('\/[^\/]+$');
    var stRet = stPathfile.replace(regExp, '');
    //---
    var regExp2 = new RegExp('[\\\\]+[^\\\\]+$');
    var stRet = stRet.replace(regExp2, '');
    //---
    return stRet;
}

/**
 * Возвращает путь к папке в которой находится файл html который сейчас отображается
 *
 * @return пример "F:\\Dropbox\\_Web\\wiki"
 */
function yg54g_Storages_getPaFd_clear(m105m) {
    if (fnIsCurrentBrowserIE()) {
        var stFilePath = this.yg54g_Storages_getPaFi();
        var ret = fnPathDropTail(stFilePath);
        return ret;
    } else {
        var stRet = "";
        fnAjaxRequest('//190811-100400', 'pathWiki', function (stPathWiki) {
            console.log('stPathWiki [' + stPathWiki + '] //190811-100401');
            stRet = stPathWiki;
        });
        stRet = stRet.replace('\\', '\\\\');
        return stRet;
    }
}

/**
 * Возврат пути к папке в которой находится файл html который сейчас отображается.
 * От yg54g_Storages_getPaFd отличается тем что не задействует ActiveX.
 * @return string например "F:\\Dropbox\\_Web\\wiki"
 */
function yg54g_Storages_getPaFd_B() {

    return yg54g_Storages_getPaFd_clear('') + '';
}

/**
 * Возвращает короткое имя текущей страницы. Например: index
 */
function yg54g_Storages_nameCurrPage_B() {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f = fso.GetFile(this.yg54g_Storages_getPaFi());
    //noinspection JSUnresolvedVariable
    var name = f.Name;

    //удаление расшения
    name = name.replace(/\.[^\.]*?$/, "");

    return name;
}

/**
 * Возвращает массив имен файлов папки (1) - только файлов, без папок
 * @param stAznf {string} (1) -- абсолютное имя папки,
 *  например "D:\\Working\\Barannikov\\WORKS\\SaM-146\\Pilot\\Справка\\Site-testers\\11 0 1216-A"
 * @param nmMod {number} (2) -- модификатор:
 *   0: в возвращаемом массиве будут имена файлов включая расширения, например "[name1.html, name2.html, ..]"
 *   1: в возвращаемом массиве будут имена файлов без расширения, например "[name1, name2, ..]";
 *   2: в возвращаемом массиве будут имена файлов без расширения (name) и следом расширения (ext),
 *     например "[name1, ext1, name2, ext2, ..]"
 * @return {Array} массив с данными в зависимости от модификатора (2)
 *
 * Старые названия: yg54g_Storages_getNamesAllFilesOfDir
 */
function yg54g_Storages_getCrips(stAznf, nmMod) {
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var folder = fso.GetFolder(stAznf);
    //файлы папки
    //noinspection JSUnresolvedVariable
    var files = new Enumerator(folder.Files);
    //var s = "";
    var arr = new Array();

    for (; !files.atEnd(); files.moveNext()) {
        var name;
        var ext;
        //noinspection JSUnresolvedVariable
        name = files.item().Name;

        switch (nmMod) {
            case 1:
                //удаление расшения
                name = name.replace(/\.[^\.]*?$/, "");
                arr.push(name);
                break;
            case 2:
                //имя без расширения
                var nameNoExt = name.replace(/\.[^\.]*?$/, "");
                //расширение
                ext = name.replace(/.*\./, "");
                arr.push(nameNoExt);
                arr.push(ext);
                break;
            default:
                arr.push(name);
                break;
        }
    }
    return arr;
}

/**
 * Возвращает массив имен ([crip]s) файлов папки (1). Возвращены будут только имена удовлетворяющие шаблону (3).
 *
 * От А отличается наличием параметра (3) для отбора имен по шаблону, и доп. опцией 3 в (2)
 *
 * @param _stAznf (1) -- имя папки в формате [aznf], например "D:\\Справка\\Site-testers\\11 0 1216-A"
 * @param _iNameMode (2) -- модификатор:
 *   <b>если == 0</b>, то в возвращаемом массиве будут полные имена файлов (формат [dtof]), например "[name1.html, name2.html, ..]"
 *   <b>если == 1</b>, то в возвращаемом массиве будут имена файлов без расширения ([gazp]), например "[name1, name2, ..]";
 *   <b>если == 2</b>, то в возвращаемом массиве будут имена файлов без расширения (формат [gazp]) и следом расширения ([zaak])(ext),
 *     например "[name1, ext1, name2, ext2, ..]"
 *   <b>если == 3</b>, то в возвращаемом массиве будут абсолютные имена файлов (формат [vmgk]), например "[F:\\Work\\file1.html, ...]"
 * @param _regExp (3) -- строка для регулярного выражения, например "^p_\\d+_p.html$"
 * @return array массив с именами файлов, формат зависит от (2)
 *
 * Старые названия: yg54g_Storages_getNamesAllFilesOfDir_B
 */
function yg54g_Storages_getCrips_B(_stAznf, _iNameMode, _regExp) {
    fzizLog('--> yg54g_Storages_getCrips_B', ODPO_OPEN);
    fzizLog(' L _stAznf [' + _stAznf + ']; _iNameMode [' + _iNameMode + ']; _reqExp [' + _regExp + ']', ODPO_IN);
    //---
    var arrRet = new Array();
    //---
    if (fnIsCurrentBrowserIE()) {
        var fso = new ActiveXObject("Scripting.FileSystemObject");
        var ojFolder = fso.GetFolder(_stAznf);
        //--- файлы папки, итератор
        //noinspection JSUnresolvedVariable
        var iterOjFiles = new Enumerator(ojFolder.Files);
        //---
        for (; !iterOjFiles.atEnd(); iterOjFiles.moveNext()) {
            //--- имя файла ([dtof]), например 'file.txt'
            //noinspection JSUnresolvedVariable
            var stFileName = iterOjFiles.item().Name;
            //---
            fn07(stFileName, _iNameMode, _regExp, _stAznf, arrRet, iterOjFiles);
        }
    } else {
        fnAjaxRequestPost('190812-192800', 'cmdFileNamesFolder', g_stProjectRootPath, function (stResponse) {
            var arrFileNames = JSON.parse(stResponse);
            for (var i = 0; i < arrFileNames.length; i++) {
                var stFileName = arrFileNames[i];
                fn07(stFileName, _iNameMode, _regExp, _stAznf, arrRet, null);
            }
        });
    }
    fzizLog('файлов [' + arrRet.length + ']', ODPO_IN);
    fzizLog('', ODPO_CLOSE);
    //---
    return arrRet;
}

/**
 * Обрабатывает иходное имя файла (1) и если оно проходит условия то добавляет запись в массив (3)
 *
 * @param _stFileName (1) -- имя файла исходное
 * @param _iNameMode (2) --
 * @param _regExp (3) --
 * @param _stAznf (4) --
 * @param _arrRetBack (5) --
 */
function fn07(_stFileName, _iNameMode, _regExp, _stAznf, _arrRetBack) {

    //---
    switch (_iNameMode) {
        case 1: //имя файла без расширения, например 'fileName'
            //--- удаление расширения
            _stFileName = _stFileName.replace(/\.[^\.]*?$/, "");
            //--- удовлетворяет шаблону?
            var regExp19 = new RegExp(_regExp);
            var st19 = regExp19.exec(_stFileName);
            //---
            if (st19 !== null) {
                _arrRetBack.push(_stFileName);
            }
            //---
            break;
        case 2:
            //--- имя без расширения
            var stFileNameNoExt = _stFileName.replace(/\.[^\.]*?$/, "");
            //--- расширение
            var stFileExt = _stFileName.replace(/.*\./, "");
            //--- удовлетворяет шаблону?
            var regExp19_2 = new RegExp(_regExp);
            var st19_2 = regExp19_2.exec(_stFileName);
            //---
            if (st19_2 !== null) {
                _arrRetBack.push(stFileNameNoExt);
                _arrRetBack.push(stFileExt);
            }
            //---
            break;
        case 3:
            var regExp26 = new RegExp(_regExp);
            if (regExp26.exec(_stFileName) !== null) {
                _arrRetBack.push(_stAznf + "\\\\" + _stFileName);
            }
            break;
        default:
            //имя удовлетворяет шаблону?
            var regExp19_03 = new RegExp(_regExp);
            var st19_3 = regExp19_03.exec(_stFileName);
            if (st19_3 !== null) {
                _arrRetBack.push(_stFileName);
            }
            break;
    }
}

/**
 * Возвращение содержимого тега (2) расположенного в файле (1). Открывающий и закрывающий тег
 * должны быть в одной строке и пр. - см. в коде
 * @param aFullNameFile (1) -- полное имя файла в котором ищется тег (3), например "D:\\Working\\Barannikov\\_index_00.html"
 * @param aNameTag (2) -- имя тега, например "title"
 * @return "file does not exist" если файл (1) не существует;
 * "" если тег (2) отсутствует или его содержимое пустое
 */
function yg54g_Storages_getTagValue(aFullNameFile, aNameTag) {
    var ret = "^no title^";

    var fso = new ActiveXObject("Scripting.FileSystemObject");

    //проверка существования файла
    var e = fso.FileExists(aFullNameFile);
    if (!e) {
        return "^file does not exist^";
    }

    //открытие файла
    //1 - только для чтения, false - если файла нет то он не создается
    var file = fso.OpenTextFile(aFullNameFile, 1, false, g_encoding);

    //цикл по строкам файла
    //noinspection JSUnresolvedVariable
    while (!file.AtEndOfStream) {
        var str = file.ReadLine(); //считывание следующей строки

        var r = new RegExp("<" + aNameTag + ">(.*?)</" + aNameTag + ">", "i");
        var s = r.exec(str);

        if (s !== null) {
            file.Close();
            return s[1];
        }
    }
    file.Close();

    return ret;
}

/**
 * Возвращает TRUE если файл (2) содержит хотябы одну строку СОДЕРЖАЩУЮ текст (1)
 * @param aText (1) -- текст для поиска, например p_1_p.html
 * @param aFile (2) -- абсолютное имя файла, например D:\\Working\\Barannikov\\_index_00.html
 */
function yg54g_Storages_isConsistText(aText, aFile) {
    //объект файловой системы
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f = fso.OpenTextFile(aFile, 1, false, g_encoding);
    //up   1 - открываем файл только для чтения    //false - если файла нет, то он не создается
    //noinspection JSUnresolvedVariable
    while (!f.AtEndOfStream) {
        //считывание следующей строки
        var line = f.ReadLine();
        var ind = line.indexOf(aText);
        if (ind != -1) {
            f.Close();
            return true;
        }
    }
    f.Close();
    return false;
}

/**
 * От А отличается тем что требуется ПОЛНОЕ СОВПАДЕНИЕ строки файла и (1)
 *
 * @param aText (1) -- текст для поиска, например p_1_p.html
 * @param aFile (2) -- абсолютное имя файла, например D:\\Working\\Barannikov\\_index_00.html
 */
function yg54g_Storages_isConsistText_B(aText, aFile) {
    //объект файловой системы
    var fso = new ActiveXObject("Scripting.FileSystemObject");
    var f = fso.OpenTextFile(aFile, 1, false, g_encoding);
    //up   1 - открываем файл только для чтения    //false - если файла нет, то он не создается
    //noinspection JSUnresolvedVariable
    while (!f.AtEndOfStream) {
        //считывание следующей строки
        var line = f.ReadLine();
        if (line === aText) {
            f.Close();
            return true;
        }
    }
    f.Close();
    return false;
}

/**
 * Ищет в строке (1) тег с именем (2), первое вхождение.
 * @param aSt (1) -- строка в которой выполняется поиск
 * @param aTgNm (2) -- имя тега, например 'a'
 * @returns object объект описания парного тега (g54g_Type002) или null при нештате (если тег не найден и пр.)
 */
function yg54g_Strings_html_getTgTxOne_ByTgNm(aSt, aTgNm) {
    //g8g
    //http://regex101.com/r/vG1xR5/1
    var re = RegExp('<\\s*(' + aTgNm + ')(?:\\s+[^<>]*>|>)([^<>]*)(<\\s*\\/\\s*\\1\\s*>)', 'i');
    var m = re.exec(aSt);
    if (!m) return null;

    var oj = yg54g_Types_getType002();
    oj.ThTag = m[0];  //вся конструкция тега целиком
    oj.ThTTag = aTgNm; //имя тега
    oj.ThTText = m[0].substring(m[0].length - m[3].length - m[2].length, m[0].length - m[3].length);  //текст тега
    oj.ThTLeft = m[0].substring(0, m[0].length - m[3].length - m[2].length);
    oj.ThTRight = m[0].substring(m[0].length - m[3].length, m[0].length);
    oj.ThTIxLeS = m.index;  //индекс окрытия тега
    oj.ThTIxLeE = m.index + m[0].length - m[3].length - m[2].length; //индекс окончания окрывающей части тега
    oj.ThTIxRiS = m.index + m[0].length - m[3].length; //индекс начала закрывающей части тега
    oj.ThTIxRiE = m.index + m[0].length; //индекс конца тега

    return oj;
}

/**
 * Возврат содержимого файла в виде строки с разделителями "\n".
 * Отличается от B только тем что не требует в параметрах получения ActiveXObject
 * @param m105m (1)
 * @param _stFileNameAbs (2) -- абсолютное имя файла (ThFiNmK11), например "F:\\folder\\_files\\testFile.txt"
 * @returns {string} содержимое файла в виде строки с разделителями "\n"; null - при неполадках (например при отсутствии файла)
 */
function yg54g_Storages_readFi_C_node(m105m, _stFileNameAbs) {
    console.log('--> yg54g_Storages_readFi_C_node; _stFileNameAbs [' + _stFileNameAbs + ']');

    var fso;
    if (fnIsCurrentBrowserIE()) {
        fso = yg54g_Storages_getActiveXObjectFileSystem();
    }

    return yg54g_Storages_readFi_B_node('', _stFileNameAbs, fso);
}

/**
 * ДУБЛЕР для yg54g_Storages_getFileSystemObject
 * @returns {ActiveXObject} new ActiveXObject("Scripting.FileSystemObject");
 */
function yg54g_Storages_getActiveXObjectFileSystem() {
    var m1 = null;
    return yg54g_Storages_getFileSystemObject_node(m1);
}

/**
 * Заменяет в строке (1) диапазоны указанные в (2) текстом указанным в (2).
 * @param aSt string (1) -- строка в которой выполняются замены, например 'aa11cc22ee'
 * @param aArOjs object (2) -- массив объектов. Объекты имеют формат {ixStart: , ixEnd: , stForRp: }, где ixStart - индекс начала диапазона цепочка символов которого заменяется, ixEnd - индекс конца диапазона цепочка символов которого заменяется, stForRp - текст которым заменяется цепочка символов. Диапазоны не должны пересекаться. ixStart должен только увеличиваться. Например [{ixStart: 2, ixEnd: 4, stForRp: 'bbb'}, {ixStart: 6, ixEnd: 8, stForRp: 'ddd'}]
 * @returns string строку с выполненными заменами или null при нештате, например 'aabbbccdddee'
 */
function yg54g_Strings_rpTxsDiaps(aSt, aArOjs) {
    if (!aSt || !aArOjs || aArOjs.length < 1) {
        return null;
    }

    if (aArOjs.length > 1) {
        //проверка что ixStart только увеличивается
        for (var i = 1; i < aArOjs.length; i++) {
            if (aArOjs[i].ixStart < aArOjs[i - 1].ixStart) {
                console.warn(':info: ixStart does not increase consistenty ! (yg54g_Strings_rpTxsDiaps)');
                return null;
            }
        }
        //проверка что ixStart next всегда больше или равен ixEnd prev
        for (var i = 1; i < aArOjs.length; i++) {
            if (aArOjs[i].ixStart < aArOjs[i - 1].ixEnd) {
                console.warn(':info: ixStart next < ixEnd prev ! (yg54g_Strings_rpTxsDiaps)');
                return null;
            }
        }
    }

    //провера что окончание диапазона всегда больше начала
    for (var i = 0; i < aArOjs.length; i++) {
        if (aArOjs[i].ixEnd < aArOjs[i].ixStart) {
            console.warn(':info: ixEnd > isStart ! (yg54g_Strings_rpTxsDiaps)');
            return null;
        }
    }

    var ret = '';
    var ar = [];
    var chIx = 0;
    for (var i = 0; i < aArOjs.length; i++) {
        ar.push(aSt.substring(chIx, aArOjs[i].ixStart));
        ar.push(aArOjs[i].stForRp);
        chIx = aArOjs[i].ixEnd;
    }

    //обработка "хвоста"
    if (aSt.length > aArOjs[aArOjs.length - 1].ixEnd) {
        ar.push(aSt.substring(aArOjs[aArOjs.length - 1].ixEnd));
    }

    return ar.join('');
}

/**
 * Возвращает объект описания парного тега
 * @returns yg54g_Type002
 */
function yg54g_Types_getType002() {
    return new yg54g_Type002();
}

/**
 * Объект описания парного тега
 */
function yg54g_Type002() {
    this.ThTag = undefined; //вся конструкция тега целиком, например '<tag>text</tag>'
    this.ThTTag = undefined; //имя тега, например 'tag'
    this.ThTLeft = undefined; //открывающая часть, например '<tag>'
    this.ThTRight = undefined; //закрывающая часть, например '</tag>'
    this.ThTText = undefined; //текст тега, например 'text'
    this.ThTIxLeS = undefined; //индекс окрытия тега, например '0'
    this.ThTIxLeE = undefined; //индекс окончания окрывающей части тега, например '5'
    this.ThTIxRiS = undefined; //индекс начала закрывающей части тега, например '9'
    this.ThTIxRiE = undefined; //индекс конца тега, например '15'
}

/**
 * Удаление пробелов в начале и конце
 * @param aString (1) -- строка
 * @return String Строка без пробелов в начале и конце
 */
function yg54g_Strings_delSpaces(aString) {
    aString = aString.replace(/^\s*/, "");
    aString = aString.replace(/\s*$/, "");
    return aString;
}

/**
 * Удаляет пробелы и переносы строк в начале и в конце
 * @param aSt (1) -- строка которую нужно обработать
 * @returns {string} строка без пробелов и переносов строк в начале и конце
 */
function yg54g_Strings_delSpaces_B(aSt) {

    //удаление пробелов и переносов в конце
    var re2 = new RegExp("[\\s\\r\\n]*$", "gi");
    bSt = aSt.replace(re2, "");

    //удаление пробелов и переносов в начале
    var re3 = new RegExp("^[\\s\\r\\n]*", "gi");
    cSt = bSt.replace(re3, "");

    return cSt;
}

/**
 * Заменяет все следующие друг за другом пробелы и переносы строк одним пробелом
 * @param aSt (1) -- строка у которой нужно "сжать" пробелы
 * @returns {string} строка со "сжатыми" пробелами
 */
function yg54g_Strings_zipSpaces(aSt) {
    return aSt.replace(/\s+/gm, " ");
}

/**
 * "убивание" специальных-символов-рег.выражений которые могут быть в
 * тесте поиска введенном пользователем - волняется их экранирование двумя обратными
 * слэшами, наприме, до "[[privet", после "\\[\\[privet"
 * @param aTx (1) -- текст который нужно изменить
 * @return String измененный текст
 */
function yg54g_Strings_dismissRegexpSymbols(m105m, aTx) {
    var m1 = logif('--> yg54g_Strings_dismissRegexpSymbols', m105m);

    return aTx.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "\\$&");
}

/**
 * Ищет в строке (1) теги (2) типа ThTag (т.е. без вложенных тегов) и заменяет их на ThTText данных тегов.
 * Возвращает измененную строку
 * @param aSt (1) -- html-строка, например "<div><span>text</span></div>"
 * @param aTgNm (2) -- имя тега, например "span"
 * @returns {string} например "<div>text</div>"
 */
function yg54g_Strings_html_unwrapTg(aSt, aTgNm) {
    var rx = new RegExp("\\<\\s{0,}" + aTgNm + "(?:\\>|[^\\<\\>]{0,}\\>)([\\s\\S]{0,}?)\\<\\s{0,}/" + aTgNm + "\\s{0,}\\>", "igm");
    var res = aSt.replace(rx, "$1");
    return res;
}

/**
 * Обновление внешнего вида блока пересчений
 */
function x41z_fn_udAp() {
    //если блок пересечений отсутствует на странице
    if (!$('div').is($x41z_blocks)) {
        return;
    }

    //добавление заголовка
    //проверка наличия
    var b = $($x41z_blocks + ' ' + $x41z_blocks_title).is($x41z_blocks_title);
    //если отсутствует - добавляем
    if (!b) {
        $('<div id="x41z_blocks_title">Пересечения</div>').prependTo($($x41z_blocks));
    }

    //ОБРАБОТКА ссылок-пересечений
    //оборачивание в div
    var $block = $('<div class="x41z_block"></div>');

    $($x41z_blocks + ' a').each(function () {
        //в блоке?
        var b = $(this).parent().is('.x41z_block');
        //если не в блоке
        if (!b) {
            //"оборачивание"
            $(this).wrap($block);
            var $parent2 = $(this).parent();

            //добавление кнопки удаления пересечения
            var $delXxz = $('<input type="button" value=" - " class="x41z_bt_del" />');
            //привязка обработчика
            //: см. http://ruseller.com/lessons.php?rub=32&id=700
            $($delXxz).bind("click", {}, x41z_fn_del);
            //
            $parent2.append($delXxz);
        }
    });

    /*
     $($x41z_blocks + ' a').wrap($block);
     //добавление кнопки удаления пересечения
     var $delXxz = $('<input type="button" value=" - " class="x41z_bt_del" />');
     //: см. http://ruseller.com/lessons.php?rub=32&id=700
     $($delXxz).bind("click", {}, x41z_fn_del);
     $('.x41z_block').append($delXxz);
     */
}

/**
 * Удаление отдельного пересечения
 * @param oj -- не используется
 * @returns
 */
function x41z_fn_del(oj) {
    //нажатая кнопка
    var $bt = $(this);
    var $pr = $bt.parent(':first');
    var ix = $pr.index();
    //удаление из блока пересечений
    $pr.remove();

    //физическое удаление пересечения из файла
    var rs = yg54g_Storages_html_delEmFromFi(g_stPageCurrName, "div" + $x41z_blocks, "a:eq(" + (ix - 1) + ")");
    if (!rs) {
        return;
    }


}

/**
 * Ищет в файле (1) элемент (2) и удаляет из него прямого потомка (3) расположенного в позиции указанной в
 * также в (3)
 * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
 * @param aEmBaseSr (2) -- серектор типа ThSelA, например "div#name"
 * @param aEmDelSr (3) -- селектор (типа ThSelB) элемента который должен быть удален,
 * например ".aa:eq(1)" соответствует второму элементу класса aa
 * @param {int} 1 - если успешно, undefined при неудаче
 */
function yg54g_Storages_html_delEmFromFi(aThFiNm111, aEmBaseSr, aEmDelSr) {
    var m1 = null;

    //получение ThFiSt
    var fiSt = yg54g_Storages_readFi_B_node(m1, aThFiNm111, yg54g_Storages_getFileSystemObject_node(m1));
    if (!fiSt) {
        return;
    }

    //тег в виде строгого текста
    var tgStrong = yg54g_Strings_html_getTg(fiSt, aEmBaseSr);
    if (!tgStrong) {
        return;
    }

    var $tgDress = yg54g_Strings_html_getTgJq(fiSt, aEmBaseSr);
    var h1 = $tgDress.get(0).outerHTML;
    $(aEmDelSr, $tgDress).remove();
    var h2 = $tgDress.get(0).outerHTML;

    var newSt = fiSt.replace(tgStrong, h2);

    //обновление файла
    var rs = yg54g_Storages_rpFi_node(m1, aThFiNm111, newSt, yg54g_Storages_getFileSystemObject_node(m1));
    if (!rs) {
        return;
    }
    return 1;
}

/**
 * Сортировка массива (1) в лексографическом порядке и удаление дубликатов
 * @param aAr (1) -- массив, например ["a", "b", ..]
 * @param aMod (2) -- порядок сортировки, если не указано или =="p_up" или !=="p_down", то по возврастанию,
 * если =="down", то по убыванию
 * @returns array отсортированный массив без дубликатов
 */
function yg54g_Ars_removeDublicatesAaSort(aAr, aMod) {
    if (aAr.length < 2) {
        return aAr;
    }

    //сортировка
    var ar = yg54g_Ars_sort(aAr, aMod);

    var res = [];
    res.push(ar[0])
    for (var i = 1; i < ar.length; i++) {
        if (ar[i] !== ar[i - 1]) {
            res.push(ar[i]);
        }
    }

    return res;
}

/**
 * Сортировка массива (1) в лексографическом порядке
 * @param aAr (1) -- массив, например ["a", "b", ..]
 * @param aMod (2) -- порядок сортировки, если не указано или =="p_up" или !=="p_down", то по возврастанию,
 * если =="down", то по убыванию
 * @returns array отсортированный массив
 */
function yg54g_Ars_sort(aAr, aMod) {
    if (aMod == "p_down") {
        return aAr.sort(function (a, b) {
            if (String(a) > String(b))
                return -1;
            if (String(a) < String(b))
                return 1;
            return 0;

        });
    }
    return aAr.sort();
}

/**
 * Вывод информации (1) в лог если глоб. переменная yLogif == TRUE. РЕАЛИЗУЕТ ТЕХНИКУ m105m
 * @param aSt (1) -- строка для вывода
 * @param m105m (2) -- информация о том откуда вызван метод; a) если =null или т.п., то вывод в консоль не производится;
 *  б) если содержит одну или несолько управляющих последовательностей 'x^', где x>0 то также вывод в консоль не производится
 *  (это применяется чтобы из циклов вывести только один раз, когда x=0)
 */
function logif(aSt, m105m) { //TODO добавить в библиотеку
    //return;
    if (!yLogif) return;
    if (!m105m) return;

    var cycle = '';
    //препарирование на предмет меток цикла, для показа только если все метки = 0
    var firstCycle = false;
    var m;
    var re = new RegExp('(\\d+)\\^', 'g');
    while ((m = re.exec(m105m)) !== null) {
        if (m[1] != 0) {
            return;
        }
        firstCycle = true;
    }
    if (firstCycle) {
        cycle = '*cycle*';
    }

    console.log(yLogifPristavka + ' --> ' + aSt + ' ::from ' + cycle + m105m);
    return aSt + cycle;
}

function logif2(aSt) { //TODO добавить в библиотеку
    if (!yLogif) return;
    console.log(yLogifPristavka + ' ' + aSt);
    return aSt;
}


/*\
 |*|
 |*|  :: cookies.js ::
 |*|
 |*|  A complete cookies reader/writer framework with full unicode support.
 |*|
 |*|  Revision #1 - September 4, 2014
 |*|
 |*|  https://developer.mozilla.org/en-US/docs/Web/API/document.cookie
 |*|  https://developer.mozilla.org/User:fusionchess
 |*|
 |*|  This framework is released under the GNU Public License, version 3 or later.
 |*|  http://www.gnu.org/licenses/gpl-3.0-standalone.html
 |*|
 |*|  Syntaxes:
 |*|
 |*|  * docCookies.setItem(name, value[, end[, path[, domain[, secure]]]])
 |*|  * docCookies.getItem(name)
 |*|  * docCookies.removeItem(name[, path[, domain]])
 |*|  * docCookies.hasItem(name)
 |*|  * docCookies.keys()
 |*|
 \*/
var docCookies = {
    getItem: function (sKey) {
        if (!sKey) {
            return null;
        }
        return decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=\\s*([^;]*).*$)|^.*$"), "$1")) || null;
    },
    setItem: function (sKey, sValue, vEnd, sPath, sDomain, bSecure) {
        if (!sKey || /^(?:expires|max\-age|path|domain|secure)$/i.test(sKey)) {
            return false;
        }
        var sExpires = "";
        if (vEnd) {
            switch (vEnd.constructor) {
                case Number:
                    sExpires = vEnd === Infinity ? "; expires=Fri, 31 Dec 9999 23:59:59 GMT" : "; max-age=" + vEnd;
                    break;
                case String:
                    sExpires = "; expires=" + vEnd;
                    break;
                case Date:
                    sExpires = "; expires=" + vEnd.toUTCString();
                    break;
            }
        }
        document.cookie = encodeURIComponent(sKey) + "=" + encodeURIComponent(sValue) + sExpires + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "") + (bSecure ? "; secure" : "");
        return true;
    },
    removeItem: function (sKey, sPath, sDomain) {
        if (!this.hasItem(sKey)) {
            return false;
        }
        document.cookie = encodeURIComponent(sKey) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" + (sDomain ? "; domain=" + sDomain : "") + (sPath ? "; path=" + sPath : "");
        return true;
    },
    hasItem: function (sKey) {
        if (!sKey) {
            return false;
        }
        return (new RegExp("(?:^|;\\s*)" + encodeURIComponent(sKey).replace(/[\-\.\+\*]/g, "\\$&") + "\\s*\\=")).test(document.cookie);
    },
    keys: function () {
        var aKeys = document.cookie.replace(/((?:^|\s*;)[^\=]+)(?=;|$)|^\s*|\s*(?:\=[^;]*)?(?:\1|$)/g, "").split(/\s*(?:\=[^;]*)?;\s*/);
        for (var nLen = aKeys.length, nIdx = 0; nIdx < nLen; nIdx++) {
            aKeys[nIdx] = decodeURIComponent(aKeys[nIdx]);
        }
        return aKeys;
    }
};

/**
 * Класс для работы с конфиг-файлом (find config)
 *
 */
var x52c = {
    /**
     * Получение JSON-строки всего конфиг-файла
     */
    getJSON: function (m105m) {
        var m1 = logif('--> x52c.getJSON', m105m);
        return yg54g_Storages_readFi_C_node(m1, fnPathJoin(g_stProjectRootPath, g_stConfigFileName));
    }
    /**
     * Возвращает наибольшее число страницы (xnz) из пространства (2) (наибольшая цифра из PID диапазона (2))
     * @param aDiap (2) -- пространство имен страниц, возможные значения : "p", "t", "q"
     * @return number 0 если нет ни одного файла удовлетворяющего условиям
     */, ranges_getPIDMax: function (m105m, aDiap) {
        var m1 = logif('--> x52c.ranges_getPIDMax', m105m);

        //чтение содержимого конфиг-файла
        var stConfFile = yg54g_Storages_readFi_C_node(m1, fnPathJoin(g_stProjectRootPath, g_stConfigFileName));
        console.log('stConfFile [' + stConfFile + '] //190811-084700');

        var oj = JSON.parse(stConfFile + '');
        var val = oj.ranges[aDiap];

        return val;
    },
    /**
     * Обновление информации о PID после создания новой страницы
     * @param m105m
     * @param _stLitera (2) -- буква диапазона в котором была создана страница, например 'p'
     * @param _iNumber (3) -- цифра PID созданной страницы, например '999'
     */
    fnRangesInfoUpdate: function (m105m, _stLitera, _iNumber) {
        var m1 = logif('--> fnRangesInfoUpdate', m105m);

        //--- абсолютное имя конфиг-файла
        var stFileNameAbs = fnPathJoin(g_stProjectRootPath, g_stConfigFileName)

        //--- чтение содержимого
        var stConf = yg54g_Storages_readFi_C_node(m1, stFileNameAbs);
        //преобразование в объект
        var oj = JSON.parse(stConf);
        //внесение изменений в объект
        oj.ranges[_stLitera] = _iNumber;
        oj.ranges['last_diap'] = _stLitera;

        //--- превращение объекта в строку
        var stBody = JSON.stringify(oj);

        //--- запись обратно в конфиг-файл
        yg54g_Storages_rpFi_node(
            m1,
            stFileNameAbs,
            stBody,
            yg54g_Storages_getFileSystemObject_node(m1)
        );

    }

}

/**
 * Класс для работы с PID
 */
var yPIDClass = {
    /**
     * Извлечение из PID (2) числа
     * @param m105m (1)
     * @param aPID (2) -- например 'p_1_p.html'
     * @returns например '1'
     */
    getPIDNumber: function (m105m, aPID) {
        var m1 = logif('--> yPIDClass.getPIDNumber', m105m);

        var m = /_(\d+)_/.exec(aPID);
        if (!m) console.warn('ошибка w40w');

        return m[1];
    },
    /**
     * Извлечение из PID (2) литеры диапазона
     * @param m105m (1)
     * @param aPID (2) -- например 'p_1_p.html'
     * @returns например 'p'
     */
    getPIDLit: function (m105m, aPID) {
        var m1 = logif('--> yPIDClass.getPIDLit', m105m);

        return aPID.substring(0, 1);
    }
}


/**
 * '#shapka' - Шапка страницы
 * @type {string}
 */
$shapka = '#shapka';
/**
 * '#podval' - Подвал страницы
 * @type {string}
 */
$podval = '#podval';
/**
 * '#x41z_blocks' - Блок пересечений
 * @type {string}
 */
$x41z_blocks = '#x41z_blocks';
/**
 * '#x41z_blocks_title' - Заголовок блока пересечений
 * @type {string}
 */
$x41z_blocks_title = '#x41z_blocks_title';
/**
 * Блок тегов
 * @type {string}
 */
$x41z_block_tags = '#x41z_block_tags';
/**
 * Файл конфигурации
 * @type {string}
 */
yx46z_config_fi = "_js\\x46z_config_fi.txt";
/**
 * Диапазон который последний раз был выбран при создании файла
 * @type {string}
 */
yx46z_key_last_diap = "x46z_last_diap";

/**
 * Бизнес-уровень
 */
var m80m_bus = function () {
    return {
        /**
         * Возвращает @имя-файла-статьи всех @статей в виде массива
         * @param m105m
         * @retuns {Array}
         */
        bus_articlesAll: function (m105m) {
            return yg54g_Storages_getCrips_B(g_stProjectRootPath, 0, yx23z_re);
        },

        /**
         * _@m80m. Получение @текста-статьи по @имени-файла-статьи
         * @param m105m
         * @param nm (2) -- @имя-файла-статьи, например 'p_10_p.html'
         * @returns
         */
        bus_articleText: function (m105m, nm) {
            return yg54g_Storages_readFi(nm);
        },

        /**
         * Получение m80m@obinter
         * @param m105m
         * @param aNm (2) -- m80m@имя-файла-статьи
         * @returns {object} m80m@obinter (объект-блока-пересечений)
         */
        bus_articleBinter: function (m105m, aNm) {

        },

        /**
         * Получение текста заголовка статьи (тег title) по имени-файла-статьи (1)
         * @param articleFileName (1) -- имя-файла-статьи, например "p_47_p.html"
         */
        bus_getTitle: function (articleFileName) {

        }
    }
}();

