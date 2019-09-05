//Библиотека m112m
//Версия : 1.0.0
//Стабильность : создающаяся
//Разработчик : surrsoft (Баранников Евгений, г.Рыбинск)
//Дата создания версии : 06.12.2014
//Дата последнего изменения : 06.12.2014
//Зависимости : g54g_3.0.0
//Терминология по умолчанию : m108m
//
//Описание : превращает HTML-строку в JSON

//============= ОПИСАНИЯ


//=============

var m112m = function () {

    /**
     * Все парные теги
     */
    var tagListPair = ['address', 'blockquote', 'center', 'div', 'fieldset', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'menu', 'ol', 'pre', 'table', 'ul', 'a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'cite', 'code', 'dfn', 'em', 'font', 'i', 'kbd', 'label', 'q', 's', 'samp', 'select', 'small', 'span', 'strike', 'strong', 'sub', 'sup', 'textarea', 'tt', 'u', 'var', 'article', 'aside', 'audio', 'bdi', 'canvas', 'datalist', 'details', 'figcaption', 'figure', 'footer', 'header', 'hgroup', 'keygen', 'main', 'mark', 'meter', 'nav', 'output', 'progress', 'ruby', 'section', 'summary', 'time', 'video', 'applet', 'button', 'del', 'iframe', 'ins', 'object', 'dir', 'listing', 'xmp', 'legend', 'optgroup', 'style', 'title', 'map', 'noscript', 'script', 'dl', 'caption', 'form', 'frameset', 'noframes', 'pre', 'blink', 'comment', 'marquee', 'multicol', 'nobr', 'noembed', 'head', 'html', 'dd', 'dt', 'li', 'colgroup', 'tbody', 'td', 'tfoot', 'th', 'thead', 'tr', 'p', 'bgsound', 'plaintext', 'spacer', 'rp', 'rt', 'body', 'script', 'style'];
    /**
     * @m108m @тег-имена @тегов-одиночек
     */
    var tagListOnces = ['br', 'hr', 'input', 'isindex', 'basefont', 'command', 'embed', 'source', 'wbr', 'track', 'link', 'meta', '!doctype', 'area', 'img', 'param', 'base', 'col', 'frame'];
    /**
     * m108m@тег-имена-известные
     */
    var tagListAll = function () {
        return tagListPair.concat(tagListOnces);
    }();

    /**
     * @m108m. Возвращает TRUE если @тег-имя (1) это имя @тега-парного и (1) является @тег-именем-известным
     * @param tgNm
     */
    function tagPair(tgNm) { //тегПарный
        return tagListPair.indexOf(tgNm.toLowerCase()) !== -1;
    }

    /**
     * @m108m. Возвращает TRUE если (1) это @тег-имя-известное
     * @param tgNm (1) -- .тег-имя
     */
    function tagKnow(tgNm) { //тегИзвестный
        return tagListAll.indexOf(tgNm.toLowerCase()) !== -1;
    }

    /**
     * @m108m. Возвращает TRUE если (1) это @тег-имя-одиночное
     * @param tgNm
     */
    function tagAlone(tgNm) { //тегОдиночка
        return tagListOnces.indexOf(tgNm.toLowerCase()) !== -1;
    }

    /**
     * Возвращает TRUE если (1) является .тегом-самозакрывающимся
     */
    function tagSameCloses() {

    }


    /**
     * Ничего с (1) не делает - функция справочная
     */
    var block = function (oj) {

        // tg_comm - @тег-комментарий,
        // tg_comm_lom - @тег-комментарий-ломаный
        // tg_neizv - @тег-имя-неизвестное;
        // tg_super_comm - если .тег-комментарий
        // tg_super_script - если .супер-тег script
        // tg_super_style - если .супер-тег style
        // ende

        return oj;
    };

    /**
     * Возвращает TRUE если (1) соответствует корректному парному тегу
     * @param yTpAr (1) -- массив типов, Y_TP
     */
    var tgCorrectParn = function (yTpAr) {
        //console.log('yTpAr=' + JSON.stringify(yTpAr));
        return (yTpAr.indexOf(TG_IS) !== -1
            && yTpAr.indexOf(TG_PARN) !== -1
            && yTpAr.indexOf(TGPART_NOCLOSE) === -1
            && yTpAr.indexOf(TGPART_NONAME) === -1
            && yTpAr.indexOf(TGPART_NOOPEN) === -1);
    };

    /**
     * @тег-часть-закрывающая в месте где она не ожидается
     * @type {string}
     */
    var TGPART_NOOPEN = "tgn";
    /**
     * @тег-часть-открывающая @тега-парного - если .тег-часть-закрывающая не найдена
     * @type {string}
     */
    var TGPART_NOCLOSE = "tgpart_noclose";
    /**
     * если внутри угловых скобок "<>" не найдено .тег-имени
     * @type {string}
     */
    var TGPART_NONAME = "tgpart_noname";
    /**
     * .межтекст
     * @type {string}
     */
    var MEGTEXT = "mt";
    /**
     * .тег-парный
     * @type {string}
     */
    var TG_PARN = "tgp";
    /**
     * .тег-известный
     * @type {string}
     */
    var TG_IZV = "tgi";
    /**
     * .тег-имя-неизвестное
     * @type {string}
     */
    var TG_NEIZV = "tg_neizv";
    /**
     * .тег-одиночка
     * @type {string}
     */
    var TG_ODIN = 'tgo';
    /**
     * .супер-тег
     * @type {string}
     */
    var TG_SUPER = 'tgs';
    /**
     * Любой .тег
     * @type {string}
     */
    var TG_IS = "tg";

    /**
     * Свойство хранящее тип элемента
     * @type {string}
     */
    var Y_TP = "yTp";
    /**
     * Свойство хранящее индекс начала межтекста, тега
     * @type {string}
     */
    var Y_IXSA = "yIxSa";
    /**
     * Свойство хранящее индекс конца межтекста, тега
     * @type {string}
     */
    var Y_IXED = "yIxEd";
    /**
     * Свойство хранящее индекс начала внутренностей тега
     * @type {string}
     */
    var Y_IXSAIN = "yIxSaIn";
    /**
     * Свойство хранящее индекс окончания внутренностей тега
     * @type {string}
     */
    var Y_IXEDIN = "yIxEdIn";
    /**
     * Свойство хранящее строку если межтекст, или неправильный тег
     * @type {string}
     */
    var Y_ST = "ySt";
    /**
     * Свойство хранящее имя тега
     * @type {string}
     */
    var Y_NM = "yNm";
    /**
     * Свойство хранящее объект описыващий аттрибуты тега
     * @type {string}
     */
    var Y_ATTRS = "yAttrs";
    /**
     * Свойство хранящее массив объектов .блоков
     * @type {string}
     */
    var Y_BLOCKS = "yBlocks";


    /**
     * Ищет в строке (1) ближайший @блок начиная с индекса (2). Возвращает @блок-объект
     * @param html (1) -- строка в которой расположен @блок
     * @param ixStart (2) -- индекс начиная с которого ищется @блок
     * @returns {object} null если @блок не найден, и при нештате
     */
    var blockNext = function (html, ixStart, ixEnd) {
        //console.log('--> blockNext; ixStart='+ixStart+'; ixEnd='+ixEnd);
        if (!ixEnd || ixEnd === -1) {
            ixEnd = html.length;
        }
        if (ixStart >= html.length || ixStart === ixEnd || ixStart > ixEnd) {
            return null;
        }
        var sub = html.substring(ixStart, ixEnd);
        var m = /^[^<]+/.exec(sub); //определение .межтекста в начале
        if (m) {
            var ojm = {};
            ojm[Y_TP] = [MEGTEXT];
            ojm[Y_IXSA] = ixStart;
            ojm[Y_IXED] = m.index + m[0].length + ixStart;
            ojm[Y_ST] = m[0];
            return block(ojm);
        }

        var oj = {};
        oj[Y_TP] = [];

        m = /^<([^<]*)>/.exec(sub); //определение .тега
        if (m) { //оформление @тега
            var ix2 = m[0].length + ixStart; //индекс после ">"
            oj = {};
            oj[Y_TP] = [];
            oj[Y_IXSA] = m.index + ixStart;

            //ОПРЕДЕЛЕНИЕ @тег-имени
            var mt = /\s*([\/]?)\s*([^\s]*)\s*(.*)\s*/.exec(m[1]);
            if (mt) {
                if (mt[2]) {//если имя найдено
                    oj[Y_NM] = mt[2].toLowerCase();
                }
                if (mt[3]) { //часть с аттрибутами
                    oj[Y_ATTRS] = attrsAsOj(mt[3]);
                }
            }

            //если встречен прямой слэш
            if (mt[1]) { //обработка закрывающей части не имеющей открывающей
                oj[Y_TP].push(TG_IS);
                oj[Y_TP].push(TGPART_NOOPEN);
                oj[Y_IXED] = ix2;
                if (!oj[Y_NM]) {
                    oj[Y_TP].push(TGPART_NONAME);
                }
                return block(oj);
            }

            if (oj[Y_NM]) { //если @тег-имя определено
                if (oj[Y_NM].indexOf('!--') === 0) { //если комментарий
                    //поиск индекса конца комментария
                    var sub2 = html.substring(ixStart + 4);
                    var ix3 = sub2.search(/--\s*>/);
                    if (ix3 === -1) { //если конец комментария не найден
                        //то все до конца строки оформляется как .межтекст
                        oj[Y_IXED] = html.length;
                        oj[Y_TP].push(MEGTEXT);
                        return block(oj);
                    } else { //если конец комментария успешно найден
                        oj[Y_TP].push(TG_IS);
                        oj[Y_TP].push(TG_IZV);
                        oj[Y_TP].push(TG_ODIN);
                        oj[Y_TP].push(TG_SUPER);
                        oj[Y_TP].push('tg_super_comm');
                        oj[Y_IXED] = html.indexOf('>', ixStart + 4 + ix3) + 1;
                        return block(oj);
                    }
                }
                if (oj[Y_NM] === 'script') {
                    var m2 = /<\/script\s*>/.exec(sub);
                }
                if (oj[Y_NM] === 'style') {
                    m2 = /<\/style\s*>/.exec(sub);
                }
                if (m2) { //script style
                    oj[Y_TP].push(TG_IS);
                    oj[Y_TP].push(TG_IZV);
                    oj[Y_TP].push(TG_PARN);
                    oj[Y_TP].push(TG_SUPER);
                    oj[Y_IXSA] = ixStart;
                    oj[Y_IXSAIN] = ix2;
                    oj[Y_IXEDIN] = ixStart + m2.index;
                    oj[Y_IXED] = ixStart + m2.index + m2[0].length;
                    return block(oj);
                }
                oj[Y_TP].push(TG_IS);
                if (tagKnow(oj[Y_NM])) { //если @тег-имя-известное
                    oj[Y_TP].push(TG_IZV);
                    if (tagPair(oj[Y_NM])) { //если @тег-имя-парное
                        oj[Y_TP].push(TG_PARN);
                        var ojIx = ixTgpartClose(html, oj[Y_NM], ix2);
                        if (!ojIx) { //если закрывающая часть тега не найдена
                            oj[Y_TP].push(TGPART_NOCLOSE);
                            oj[Y_IXED] = ix2;
                            return block(oj);
                        }

                        oj[Y_IXSAIN] = ix2;
                        oj[Y_IXEDIN] = ojIx.ixStart;
                        oj[Y_IXED] = ojIx.ixEnd;
                        //используется для "подразбора"
                        oj.yTmpIx = [oj[Y_IXSAIN], oj[Y_IXEDIN]];
                    }
                    if (tagAlone(oj[Y_NM])) { //если @тег-имя-одиночное
                        oj[Y_TP].push(TG_ODIN);
                        oj[Y_IXED] = ix2;
                    }
                } else { //если .тег-имя-неизвестное
                    oj[Y_TP].push(TG_NEIZV);
                    //поиск закрывающей пары
                    var ojIxN = ixTgpartClose(html, oj[Y_NM], ix2);
                    if (!ojIxN) { //если закрывающая пара не найдена - оформление как тега-одиночки
                        oj[Y_TP].push(TG_ODIN);
                        oj[Y_IXED] = ix2;
                    } else { //если найдена - оформление как парного тега
                        oj[Y_TP].push(TG_PARN);
                        oj[Y_IXSAIN] = ix2;
                        oj[Y_IXEDIN] = ojIxN.ixStart;
                        oj[Y_IXED] = ojIxN.ixEnd;
                        //используется для "подразбора"
                        oj.yTmpIx = [oj[Y_IXSAIN], oj[Y_IXEDIN]];
                    }
                }
            } else { //если нутри угловых скобок не найдено имени
                oj[Y_TP].push(TG_IS);
                oj[Y_TP].push(TGPART_NONAME);
                oj[Y_IXED] = ix2;
            }
            return block(oj);
        } else { //.теги-взломанные попадают сюда как простой .межтекст
            oj[Y_TP].push(MEGTEXT);
            oj[Y_TP].push('ende');
            oj[Y_IXSA] = ixStart;
            oj[Y_IXED] = ixEnd;
            oj[Y_ST] = html.substring(oj[Y_IXSA], oj[Y_IXED]);
            return block(oj);
        }
        return null;
    };

    /**
     * Парсит строку (1), извлекает из неё аттрибуты, и возвращает их в виде объекта с набором свойств
     * @param attrsSt (1) -- строка с аттрибутами, например 'aaa=bbb ccc=2 enable'
     * @returns {Object} -- например {"aaa":"bbb", "ccc":2, "enable":[]}
     */
    var attrsAsOj = function (attrsSt) { //аттрибутыКакОбъект
        var re = new RegExp("(\\w+)\\s*=\\s*([" + '"' + "']{1})(.+)\\2|(\\w+)\\s*=\\s*(\\w+)|\\w+", "ig");
        var m;
        var res = {};
        while (m = re.exec(attrsSt)) {
            if (m[0].indexOf("=") == -1) {
                res[m[0]] = [];
            } else {
                if (m[0].indexOf("'") !== -1 || m[0].indexOf('"') !== -1) {
                    res[m[1]] = m[3];
                } else {
                    res[m[4]] = m[5];
                }
            }
        }
        return res;
    };

    /**
     * Ищет @тег-часть-закрывающую с учетом вложенностей и @супер-тегов.
     * Возвращает объект с описанием найденного
     * @param html
     * @param tgNm
     * @param ixNachalny
     * @returns {object} Объект вида {ixStart:, ixEnd} .null если ничего не найдено
     */
    var ixTgpartClose = function (html, tgNm, ixNachalny, temp) { //индексТегЧастиЗакрывающей
        //выделение подстроки
        var sub = html.substring(ixNachalny);
        var re = new RegExp('\\<\\s*(\\/)?\\s*' + tgNm + '\\s*\\>', 'gi');
        var m = null;
        var ctOpening = 0; //счетчикОткрывающих
        var ctClosing = 0; //счетчикЗакрывающих
        var ret = null;
        if (temp) {
            //console.log('============================');
        }
        while (m = re.exec(sub)) {
            if (ixInSuperDiaps(m.index + ixNachalny, varTgSuperDiaps)) {
                re.lastIndex = m.index + 1;
                continue;
            }

            if (m[1]) {
                ctClosing++;
            } else {
                ctOpening++;
            }
            if (ctClosing > ctOpening) {
                ret = {};
                ret.ixStart = m.index + ixNachalny;
                ret.ixEnd = m.index + ixNachalny + m[0].length;
                break;
            }
        }
        return ret;
    };

    var ctIds = 1;
    var ctParentIds = 0;
    /**
     * Преобразует HTML-строку (1) в массив m112m@блок-объектов @элементов.в.у.
     * @param html
     * @returns {Array}
     */
    var blocks = function (html, ixCorrect, ixStart, ixEnd, idParent) {
        //console.log('--> blocks; ixCorrect='+ixCorrect+"; ixStart="+ixStart+"; ixEnd="+ixEnd);
        if (!ixCorrect) ixCorrect = 0;
        if (!ixEnd || ixEnd === -1) {
            ixEnd = html.length;
        }
        var ret = [];
        var ixStart2 = ixStart;
        do {
            var oj = blockNext(html, ixStart2, ixEnd);
            if (!oj) {
                break;
            }
            ixStart2 = oj[Y_IXED];
            oj.yId = ctIds;
            oj.yIdPr = idParent;
            ctIds++;
            ret.push(oj);
            if (!ixStart2) {
                break;
            }
        } while (oj);
        return ret;
    };

    /**
     * Возвращает массив объектов m109m@js-type-2 описывающих диапазоны в которых находятся @супер-теги (script, style, !--) в (1)
     * @param html (1) -- HTML-строка
     * @returns {object} [{a:, b:, t:}, ...], где a - индекс начала диапазона, b - индекс окончания диапазона, t - тип диапазона (comm|script|style).
     * При нештате возвращает пустой массив
     */
    var tgSuperDiaps = function (html) {
        var ret = [];
        if (!html || html.length < 1) return ret;
        var sub, ixComm, ixScript, ixStyle, ix1, re1, c, end;
        var ix = 0;
        while (ix < html.length) {
            sub = html.substring(ix);
            //индекс начала комментария
            ixComm = function () {
                var p = sub.indexOf('<!--');
                return (p === -1) ? p : p + ix;
            }();
            //индекс начала тега SCRIPT
            ixScript = function () {
                var p = sub.search(/<\s*script(?:\s+[^<>]*>|>)/i);
                return (p === -1) ? p : p + ix;
            }();
            //индекс начала тега STYLE
            ixStyle = function () {
                var p = sub.search(/<\s*style(?:\s+[^<>]*>|>)/i);
                return (p === -1) ? p : p + ix;
            }();
            //определение ближайшего к началу строки индекса
            var mn = Math.min((ixComm === -1) ? html.length : ixComm,
                (ixScript === -1) ? html.length : ixScript,
                (ixStyle === -1) ? html.length : ixStyle);
            if (mn === html.length) { //если ни одного из @тегов не найдено
                break;
            }
            if (mn === ixComm) { //если первей всех @тег-комментарий
                //ищем закрытие комментария
                re1 = new RegExp('--\\s*>', 'g');
                c = re1.exec(sub);
                if (c) { //если закрытие комментария найдено
                    end = c.index + c[0].length + ix;
                    ret.push({a: ixComm, b: end, t: "comm"});
                    ix = end;
                } else { //считаем комментарием всё до конца строки
                    ret.push({a: ixComm, b: html.length, t: "comm"});
                    break;
                }
                continue;
            }
            if (mn === ixScript) {
                //ищем конец тега script
                re1 = new RegExp('</script\\s*>', 'g');
                c = re1.exec(sub);
                if (c) {
                    end = c.index + c[0].length + ix;
                    ret.push({a: ixScript, b: end, t: "script"});
                    ix = end;
                } else {
                    ret.push({a: ixScript, b: html.length, t: "script"});
                    return ret;
                }
                continue;
            }
            if (mn === ixStyle) {
                //ищем конец тега script
                re1 = new RegExp('</style\\s*>', 'g');
                c = re1.exec(sub);
                if (c) {
                    end = c.index + c[0].length + ix;
                    ret.push({a: ixStyle, b: end, t: "style"});
                    ix = end;
                } else {
                    ret.push({a: ixStyle, b: html.length, t: "style"});
                    break;
                }
            }
        }
        return ret;
    };

    /**
     * Возвращает 0 если (1) не попадает ни в один из диапазонов занимаемых m108m@супер-тегами.
     * Иначе вовзращает индекс окончания @супер-тега в который произошло попадание.
     * @param ix {int} (1) -- индекс
     * @param diaps {Array} (2) -- массив возвращаемый функцией test_tgSuperDiaps
     * @returns {int} при нештате также вовзращает 0
     */
    var ixInSuperDiaps = function (ix, diaps) {
        if (!diaps || diaps.length < 1) return 0;
        var ret = 0;
        for (var i = 0; i < diaps.length; i++) {
            var e = diaps[i];
            if (ix >= e.a && ix < e.b) {
                ret = e.b;
                break;
            }
        }
        return ret;
    };

    /**
     * Диапазоны @супер-тегов (результат работы метода test_tgSuperDiaps
     */
    var varTgSuperDiaps;

    /**
     * Превращает @текст в @текст-несупер
     * @param html
     */
    var textNoSuper = function (html) {
        //преобразование m109m@js-type-1 ==> m109m@js-type-2
        var type_2 = [];
        var e;
        for (var i = 0; i < varTgSuperDiaps.length; i++) {
            e = varTgSuperDiaps[i];
            type_2.push({ixStart: e.a, ixEnd: e.b, stForRp: ''});
        }

        return g54g.STR.stRpDiaps('', html, type_2);
    };


    /**
     * Возвращает объект имена свойств у которого совпадают с подстроками из (1), значения равны true
     * @param str (1) -- строка с разделителем ',', например 'text1,text2,text3,...'
     * @returns {{}} объект, например {text1: true, text2: true, ...}
     */
    function yg54g_Strings_makeMap_m94m(str) {
        var obj = {};
        var items = str.split(",");
        for (var i = 0; i < items.length; i++)
            obj[ items[i] ] = true;
        return obj;
    }

    var arrayObjectsToStringForPrint = function (ar) { //массивОбъектовВСтрокуДляПечати
        var ret = "";
        var inn = "";
        for (var i = 0; i < ar.length; i++) {
            inn = "{";
            var ct = 0;
            for (var f in ar[i]) {
                if (ct > 0) inn += ", ";
                inn += f;
                inn += ':' + ar[i][f];
                ct++;
            }
            inn += "}";
            ret += inn;
            if (i < ar.length - 1) {
                ret += ", ";
            }
        }
        return "[" + ret + "]";

    };

    /**
     *
     * @param ar (1) -- массив объектов
     */
    var drifter = function (ar) { //проходчик
        //console.log('--> проходчик');
        var e;
        for (var i = 0; i < ar.length; i++) {
            e = ar[i];
            if (e[Y_BLOCKS]) {
                drifter(e[Y_BLOCKS]);
                continue;
            }
            //если ещё неразбрано
            if (e[Y_TP] && e[Y_TP].indexOf(TG_PARN) > -1
                && e.yTmpIx && e.yTmpIx.length === 2 && !e[Y_BLOCKS]) {

                e[Y_BLOCKS] = blocks(htmlSource, 0, e.yTmpIx[0], e.yTmpIx[1], e.yId);
                delete e.yTmpIx;
                i--;
            }
        }
        return ar;
    };

    var f = function (p, oj) {
        console.log("p=" + p + "; oj[p]=" + oj[p]);
    };

    var f2 = function (oj, source) {
        console.log('oj' + source + ' = ' + JSON.stringify(oj));
    };

    var chp = 0;
    var passerPrint2 = function (oj) {
        //console.log('--> passerPrint2');
        chp++;
        var chp2 = chp;

        for (var k in oj) {
            //console.log('chp2 ['+chp2+']');
            if (oj[k] instanceof Object) {
                f2(oj[k], 0);
                passerPrint2(oj[k][Y_BLOCKS]);
            } else {
                //f2(oj[k], 1);
            }
        }
    };

    /**
     * Преобразует объект атрибутов (1) в вид пригодный для вставки в HTML
     * @param attrsOj (1) -- объект с атрибутами
     */
    var attrsOjToSt = function (attrsOj) {
        var ret = "";
        var e;
        for (var k in attrsOj) {
            e = attrsOj[k];
            if (!(e instanceof Array)) {
                ret += " " + k + '="' + e + '"';

            } else {
                ret += " " + k;
            }
        }
        return ret;
    };

    /**
     * Вставляет в строку (1) строку (2) в позицию по индексу (3)
     * @param aTx (1) -- строка в которую выполняется вставка, например "aacc"
     * @param aStIns (2) -- строка которая вставляется, например "bb"
     * @param aIxIns int (3) -- индекс по которому вставляется, например 2.
     * @returns string строка со вставленным текстом, например "aabbcc", или null при неполадках
     */
    var stInsert2 = function (aTx, aStIns, aIxIns) {
        console.log('--> stInsert2; aIxIns=' + aIxIns);
        var aa = aTx.substr(0, aIxIns);
        var cc = aTx.substr(aIxIns);
        return aa + aStIns + cc;
    };

    /**
     *
     * @param oj
     * @param aIxIns (2) -- если 0, то вставка в retJ осуществляется в конец, если > 0 то в указанный индекс
     */
    var jsonToHtml2 = function (oj) {
        console.log('--> jsonToHtml2;');
        var retJ = "";
        var e;
        for (var k in oj) {
            e = oj[k];
            if (e.hasOwnProperty(Y_TP)) {
                if (e[Y_TP].indexOf(MEGTEXT) !== -1) {
                    retJ += e[Y_ST];
                }
                if (e[Y_TP].indexOf(TG_ODIN) !== -1) { //тег-одиночка
                    retJ += "<" + e[Y_NM];
                    if (e[Y_ATTRS]) {
                        retJ += attrsOjToSt(e[Y_ATTRS]);
                    }
                    if (e[Y_NM] !== "!--") {
                        retJ += ">";
                    } else {
                        retJ += "-->";
                    }
                }
                if (tgCorrectParn(e[Y_TP])) { //корректный парный тег
                    retJ += "<" + e[Y_NM];
                    if (e[Y_ATTRS]) {
                        retJ += attrsOjToSt(e[Y_ATTRS]);
                    }
                    retJ += ">";
                    if (e.hasOwnProperty(Y_BLOCKS)) {
                        retJ += jsonToHtml2(e[Y_BLOCKS]);
                    }
                    retJ += "</" + e[Y_NM] + ">";
                }
            }
        }
        return retJ;
    };

    /**
     * Удаление индексов
     * @param arOjs
     * @returns {*}
     */
    var removeIxs = function (arOjs) {
        var e;
        for (var k in arOjs) {
            e = arOjs[k];
            delete e[Y_IXSA];
            delete e[Y_IXED];
            delete e[Y_IXSAIN];
            delete e[Y_IXEDIN];
            if (e.hasOwnProperty(Y_BLOCKS)) {
                removeIxs(e[Y_BLOCKS]);
            }
        }
        return arOjs;
    };

    var each2 = function(oj, fn){
        for (var k in oj) {
            fn(oj[k]);
            if (oj[k][Y_BLOCKS]) {
                each2(oj[k][Y_BLOCKS], fn);
            }
        }
    };

    /**
     * Извлекает из m112m@объект-m112m m112m.блок-объект у которого yId == (2)
     * @param oj (1) -- m112m@объект-m112m
     * @param yid (2) -- yId
     */
    var elemByYID = function(oj, yid){
        var ret;
        each2(oj, function(oj2){
            if(oj2.yId === yid){
                ret = oj2;
            }
        });
        return ret;
    };

    var htmlSource = "";
    return {
        /**
         * Главный метод. Преобразует HTML-строку (2) в JSON-строку (или объект)
         * @param m105m (1) -- для логгирования
         * @param html (2) -- html-строка которую необходимо превратить в JSON-строку
         * @param mode (3) -- если == 0 - возвращается JSON-строка, если == 1 - возвращается объект
         * @returns {string|object} возвращает m112m@объект-m112m
         */
        htmlToJSON: function (html, mode) {
            //console.log("==============---=================---==========");
            if (mode < 0 || mode > 1 || !html || html.length < 1) return ''; //проверки

            htmlSource = html;

            varTgSuperDiaps = tgSuperDiaps(html);
            var make = false;
            var bs = blocks(html, 0, 0, -1, 0);
            var ar = drifter(bs);
            var ar = removeIxs(ar); //удаление индексов
            //return JSON.stringify(ar);
            return ar;

        },

        /**
         * Процесс обратный методу htmlToJSON
         * @param oj (1) -- m112m@объект-m112m
         */
        jsonToHtml: function (oj) {
            var ret = jsonToHtml2(oj);
            console.log('========================');
            console.log('ret [' + ret + ']');
        },

        passerPrint: function (oj) {
            console.log('--> passerPrint');

            passerPrint2(oj);
        },

        test_tgSuperDiaps: function (html) {

            return tgSuperDiaps(html);
        },

        test_textNoSuper: function (html) {
            return textNoSuper(html);
        },

        test_blockNext: function (html, ixStart, ixEnd) {
            return blockNext(html, ixStart, ixEnd);
        },

        test_blocks: function (html, ixCorrect, ixStart, ixEnd) {
            varTgSuperDiaps = tgSuperDiaps(html);
            //var hh = массивОбъектовВСтрокуДляПечати(varTgSuperDiaps);
            return blocks(html, ixCorrect, ixStart, ixEnd);
        },

        test_ixTgpartClose: function (html, tgNm, ixStart, temp) {
            varTgSuperDiaps = tgSuperDiaps(html);
            return ixTgpartClose(html, tgNm, ixStart, temp);
        },

        test_attrsAsOj: function (st) {
            return attrsAsOj(st);
        },

        /**
         * Получение m112m@блок-объектов по @тег-именам. Полученные объекты передаются в функцию (3)
         * @param oj
         * @param tgNm
         * @param fn
         */
        tgNms: function (oj, tgNm, fn) {
            for (var k in oj) {
                if (oj[k][Y_NM] && oj[k][Y_NM] === tgNm) {
                    fn(oj[k]);
                }
                if (oj[k][Y_BLOCKS]) {
                    this.tgNms(oj[k][Y_BLOCKS], tgNm, fn);
                }
            }
        },


        attrs: function (ojAttrs, fn) {
            if (ojAttrs == null) return;
            for (var k in ojAttrs) {
                fn(k, ojAttrs[k]);
            }
        },

        /**
         * Для каждого m112m@блок-объекта вызывает функцию (2) передавая в нее этот объект
         * @param oj
         * @param fn
         */
        each: function (oj, fn) {
            each2(oj, fn);
        },

        /**
         * Возвращает родителя (m109m@parent) элемента (2)
         * @param ojM112M
         * @param oj
         * @returns {Object}
         */
        parent: function(ojM112M, oj){
            if (oj.yIdPr === 0) { //если родителя нет (т.е. если это элемент верхнего уровня)
                return ojM112M;
            }
            return elemByYID(ojM112M, oj.yIdPr);
        },

        /**
         * Свойство хранящее тип элемента
         * @type {string}
         */
        Y_TP: Y_TP,
        /**
         * Свойство хранящее индекс начала межтекста, тега
         * @type {string}
         */
        Y_IXSA: Y_IXSA,
        /**
         * Свойство хранящее индекс конца межтекста, тега
         * @type {string}
         */
        Y_IXED: Y_IXED,
        /**
         * Свойство хранящее индекс начала внутренностей тега
         * @type {string}
         */
        Y_IXSAIN: Y_IXSAIN,
        /**
         * Свойство хранящее индекс окончания внутренностей тега
         * @type {string}
         */
        Y_IXEDIN: Y_IXEDIN,
        /**
         * Свойство хранящее строку если межтекст, или неправильный тег
         * @type {string}
         */
        Y_ST: Y_ST,
        /**
         * Свойство хранящее имя тега
         * @type {string}
         */
        Y_NM: Y_NM,
        /**
         * Свойство хранящее объект описыващий аттрибуты тега
         * @type {string}
         */
        Y_ATTRS: Y_ATTRS,
        /**
         * Свойство хранящее массив объектов .блоков
         * @type {string}
         */
        Y_BLOCKS: Y_BLOCKS

    }
}();
