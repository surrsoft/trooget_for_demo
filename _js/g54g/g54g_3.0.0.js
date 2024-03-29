//Библитека: g54g + g64g
//Версия: 3.0.0 (нестабильная)
//Дата создания версии: 29.11.2014
//Дата последнего изменения: 29.11.2014
//Разработчик: surrsoft (Баранников Евгений, г.Рыбинск)
//Зависимости: jQuery 1.11.0

var g54g = new function () {
    //контекст корня модуля; используется внутри модуля
    var th = this;
    //в какой кодировке открывать файлы (0 - ASCII, -1 - Unicode, -2 - system default)
    var w38w = -1;
    //
    var yLogif = true;
    //
    var yLogifPristavka = ':i-j:';
    //
    var yLogifDelay = 0;

    //==== переменные только для описаний
    var yg54g_st1st = 'testing.html';
    //====

    this.TEST = function () {
        return {
            bbb: function () {
                return 'bbb';
            }
        }
    }();

    //================= Logging ===================
    this.LOG = function () {
        /**
         * Вставляет разделитель в лог если был простой больше 1 секунды
         */
        var logifDivider = function () {
            if ((new Date().getTime() - yLogifDelay) > 1000) {
                console.log(yLogifPristavka + " = = = = = =");
            }
            yLogifDelay = new Date().getTime();
        };

        return {

            /**
             * Вывод информации (1) в лог если глоб. переменная yLogif == TRUE. РЕАЛИЗУЕТ ТЕХНИКУ m105m
             * @param aSt (1) -- строка для вывода
             * @param m105m (2) -- информация о том откуда вызван метод; a) если =null или т.п., то вывод в консоль не производится;
             *  б) если содержит одну или несолько управляющих последовательностей 'x^', где x>0 то также вывод в консоль не производится
             *  (это применяется чтобы из циклов вывести только один раз, когда x=0)
             */
            logif: function (aSt, m105m) {
                if (!yLogif) return '';
                if (!m105m) return '';

                var cycle = '';
                //препарирование на предмет меток цикла, для показа только если все метки = 0
                var firstCycle = false;
                var m;
                var re = new RegExp('(\\d+)\\^', 'g');
                while ((m = re.exec(m105m)) !== null) {
                    if (m[1] != 0) {
                        return '';
                    }
                    firstCycle = true;
                }
                if (firstCycle) {
                    cycle = '*cycle*';
                }

                logifDivider();

                console.log(yLogifPristavka + ' --> ' + aSt + ' ::FROM ' + cycle + m105m);
                //console.log(yLogifPristavka + ' '+m105m+' '+cycle +'::--> ' + aSt);

                //удаление комментариев
                var st2 = aSt.replace(/\s*\/\/.*/g, '');

                return st2 + cycle;
            },

            logif2: function (aSt) {
                if (!yLogif) return '';

                logifDivider();

                console.log(yLogifPristavka + ' ' + aSt);

                //удаление комментариев
                var st2 = aSt.replace(/\s*\/\/.*/g, '');

                return yLogifPristavka + ' ' + st2;
            }
        }
    }();


    // =============== Storages ==============
    this.FI = function () {
        return {

            /**
             * Возвращает массив с объектами содержащими результаты поиска в файлах (1).
             * @param aFiNms (1) -- массив абсолютных имен ThFiNm111 файлов в которых будет осуществляться поиск, например [F://file1.html,
             * F://file2.html, ...]
             * @param aTagPrior (2) -- тег являющийся приоритетным. Результат для него является отдельным.
             * Например &lt;title&gt;text&lt;/title&gt;.
             * Если один раз был найден, то больше не ищется
             * @param aTxFind (3) -- искомый текст. Он ищется в тексте файла и в том числе в (2)
             * @param aConsiderCase {boolean} (4) -- TRUE чтобы учитывать регистр, иначе FALSE
             * @param aClassHg (5) -- совпадения будут обернуты в SPAN с данным именем класса
             * @returns array массив объектов
             * {
             *  matchTag: true/false есть ли совпадение в теге (2),
             *  txTag: содержимое тега (2) - вне зависимости было или нет совпадение,
             *  ThFiNm111: имя файла,
             *  arSts: массив строк имеющих совпадения
             * }
             */
            fiContent_D: function (m105m, aFiNms, aTagPrior, aTxFind, aConsiderCase, aClassHg) {
                //FileSystemObject
                var fso = th.FI.sysFSO('');

                //результирующий массив объектов
                var arRes = [];

                //проход по файлам
                for (var i = 0; i < aFiNms.length; i++) {

                    var res = {
                        matchTag: false,
                        txTag: "",
                        stZxuw: aFiNms[i],
                        arSts: []
                    };

                    //1 - открываем файл только для чтения    //false - если файла нет, то он не создается
                    var textStream = fso.OpenTextFile(aFiNms[i], 1, false, g_encoding);
                    //пока не достигнут конец файла
                    //noinspection JSUnresolvedVariable
                    while (!textStream.AtEndOfStream) {
                        //очередная строка
                        var line = textStream.ReadLine();

                        //РАБОТА с тегом (2)
                        if (!res.txTag) { //если тег (2) еще не был найден
                            //содержимое тега (2) если он в строке есть, иначе ""
                            res.txTag = th.HTML.tgExist('', line, 'title');
                            //оборачивание в span совпадений
                            res.txTag = th.HTML.stWrap_B('', res.txTag, aTxFind, aClassHg, aConsiderCase);
                            //определение наличия совпадения в thTText тега
                            if (res.txTag) { //если тег в строке есть
                                //если есть совпадение
                                if (th.STR.stIsInSt('', line, aTxFind, aConsiderCase)) {
                                    res.matchTag = true;
                                }
                                continue;
                            }
                        }

                        //удаление HTML
                        var line2 = line.replace(/<.*?>/ig, "");

                        if (th.STR.stIsInSt('', line2, aTxFind, aConsiderCase)) {
                            //оборачивание в span совпадений
                            line2 = th.HTML.stWrap('', line2, aTxFind, aClassHg, aConsiderCase);
                            res.arSts.push(line2);
                        }
                    }
                    textStream.Close();

                    //добавление в результирующий массив объектов -- если в теге (2) что-то найдено или
                    // в остальном тексте
                    if (res.matchTag === true || res.arSts.length > 0) {
                        arRes.push(res);
                    }

                }

                return arRes;

            },

            /**
             * Возврат содержимого файла в виде строки с разделителями "\n"
             * @param aRelativeNmFi - относительное имя файла, например "_files\\testFile.txt" или "testFile.txt"
             *   или "subfolder/p_173_p.html"
             * @return {string} содержимое файла в виде строки с разделителями "\n"
             */
            fiContent: function (m105m, aRelativeNmFi) {
                var fso = new ActiveXObject("Scripting.FileSystemObject"); //создаем объект файловой системы
                var f = fso.OpenTextFile(th.FI.fdPa('') + '\\' + aRelativeNmFi, 1, false, g_encoding);
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
            },

            /**
             * Возврат содержимого файла (1) в виде массива строк
             * @param nameFile (1) - относительное имя файла, например "_files\\testFile.txt" или "testFile.txt"
             * @return Array
             */
            fiContentAsAr: function (m105m, nameFile) {
                var fso = new ActiveXObject("Scripting.FileSystemObject"); //создаем объект файловой системы
                var file = fso.OpenTextFile(th.FI.fdPa('') + '\\' + nameFile, 1, false, g_encoding);
                //up   1 - открываем файл только для чтения    //false - если файла нет, то он не создается
                var array = [];
                //noinspection JSUnresolvedVariable
                while (!file.AtEndOfStream) {
                    var string = file.ReadLine(); //считывание следующей строки
                    array.push(string); //добавление новой строки к уже считанным строкам
                }
                file.Close();
                return array;
            },


            /**
             * Считывает файл (1), добавляет в конец каждой строки символы (2) и записывает все в новый файл (3)
             * @param aNameFile (1) -- относительное имя файла-источника, например "_files\\testFile.txt" или "testFile.txt"
             * @param aString (2) -- текст дописываемый к концу строки
             * @param aNameNewFile (3) -- относительное имя файла вывода, например "_files\\testFile.txt" или "testFile.txt"
             */
            fiStringsAddToEnd: function (m105m, aNameFile, aString, aNameNewFile) {
                //получение массива строк
                var arrayString = th.FI.fiContentAsAr('', aNameFile);
                //добавление текста в конец строк
                for (var i = 0; i < arrayString.length; i++) {
                    arrayString[i] = arrayString[i] + aString;
                }
                th.FI.fiCreateFromAr('', aNameNewFile, arrayString);
            },

            /**
             * Создание файла (1) со строками (2). Файл не создается если он уже существует.
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\File.html"
             * @param aAr (2) -- массив строк для добавления в файл (1), например ['text1', 'text2', ...] или null
             * или пустой массив, тогда файл будет пустым
             * @return int 2 - если успешно; 1 - если файл (1) уже существует; 0 - или если массив (2) null или пустой
             */
            fiCreate: function (m105m, aThFiNm111, aAr) { //TODO

                //объект для работы с файловой системой
                var fsObj = new ActiveXObject("Scripting.FileSystemObject");

                //проверка - если такой файл уже существует
                if (fsObj.FileExists(aThFiNm111)) {
                    return 1;
                }

                //создание файла - открытие текстового потока для записи
                //1 - абсолютное имя файла
                //2 - false, если такой файл уже есть, то он не заменяется
                //3 - true: кодировка Unicode; false: кодировка ANSI
                var textStream = fsObj.CreateTextFile(aThFiNm111, false, false);

                //проверка - если массив пуст, то и файл остается пустым
                if (aAr == null || aAr.length < 1) {
                    textStream.Close();
                    return 0;
                }

                //запись в файл
                for (var i = 0; i < aAr.length; i++) {
                    textStream.WriteLine(aAr[i]);
                }

                textStream.Close();
                return 2;
            },

            /**
             * Запись массива строк (3) в файл (2). Если файла (2) нет, то он автоматически создается.
             * Если файл уже существовал, то он перезаписывается.
             * @param m105m (1) -- для логгирования
             * @param aNameFile (2) -- относительное имя файла в который будет
             *            осуществляться запись, например "_files\\testFile.txt" или "testFile.txt"
             * @param aArray (1) -- массив строк
             * @returns {boolean} true если успешно, иначе false
             */
            fiCreate_b: function (m105m, aNameFile, aArray) { //TODO
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var thFiNm111 = th.FI.fdPa('') + '\\' + aNameFile;

                //2 - открываем файл для перезаписи   //true - если файла нет то он создается
                var file = fso.OpenTextFile(thFiNm111, 2, true, g_encoding);
                for (var i = 0; i < aArray.length; i++) {
                    file.WriteLine(aArray[i]);
                }
                file.Close();
                return true;
            },

            /**
             * Возвращает TRUE если файл (1) существует
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
             * @param aFso (2) -- объект файловой системы, например через new ActiveXObject("Scripting.FileSystemObject");
             * @returns {boolean} null при неполадках
             */
            fiExist: function (m105m, aThFiNm111, aFso) {
                if (aThFiNm111 === null || aThFiNm111 === undefined || aThFiNm111.length < 1) {
                    return null;
                }
                if (aFso === null || aFso == undefined) {
                    return null;
                }

                var ret = aFso.FileExists(aThFiNm111);
                return ret;
            },

            /**
             * Просматривает в файле (1) строки. Если находит подобное &lt;a href=LLL&gt;(2)&lt;/a&gt; то заменяет LLL на (3), а вместо (2) вставляет (4).
             * В итоге файл изменяется если были замены.
             * Отличается от А только опцией вставки (4) вместо (2).
             * @param aThFiNm111 (1) -- абсолютное имя страницы
             * @param aTxLink (2) -- текст внутри <a>
             * @param aNewHref (3) -- текст для замены LLL
             * @param aNewTxLink (4) -- текст для замены текста ссылки (2)
             */
            html_substringRp_B: function (m105m, aThFiNm111, aTxLink, aNewHref, aNewTxLink) {
                //объект файловой системы
                var axo = new ActiveXObject("Scripting.FileSystemObject");

                //текущая страница в виде строки с переносами в виде \n
                var st = th.FI.fiContent_B('', aThFiNm111, axo);

                //замена ссылки (ThLHref)
                var st = th.HTML.tgAttrRp('', st, aTxLink, aNewHref);

                var res = th.FI.fiRp('', aThFiNm111, st, axo);
            },


            /**
             * Просматривает в файле (1) строки. Если находит подобное &lt;a href=LLL&gt;(2)&lt;/a&gt; то заменяет LLL на (3).
             *  В итоге файл изменяется если были замены.
             * @param aThFiNm111 (1) -- абсолютное имя страницы
             * @param aTxLink (2) -- текст внутри <a>
             * @param aTxForRp (3) -- текст для замены LLL
             */
            html_substringRp: function (m105m, aThFiNm111, aTxLink, aTxForRp) {
                //объект файловой системы
                var axo = new ActiveXObject("Scripting.FileSystemObject");

                //текущая страница в виде строки с переносами в виде \n
                var st1 = th.FI.fiContent_B('', aThFiNm111, axo);

                //замена ссылки (ThLHref)
                var st = th.HTML.tgAttrRp('', st1, aTxLink, aTxForRp);

                var res = th.FI.fiRp('', aThFiNm111, st, axo);
            },

            /**
             * Заменяет всё содержимое файла (1) данными из (2). Файл должен существовать
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\File.html"
             * @param aStRp (2) -- строка с разделителями строк \n
             * @param aActiveXObject (3) -- объект файловой системы JScript
             * @returns int 2 - если успешно; 1 - если файл не существует;
             * 0 - если строка для записи пуста (файл становится пустым)
             */
            fiRp: function (m105m, aThFiNm111, aStRp, aActiveXObject) {
                if (aActiveXObject == null) alert("null");
                //проверка существования файла
                if (!aActiveXObject.FileExists(aThFiNm111)) {
                    //файл не существует
                    return 1;
                }
                //открытие текстового потока для записи
                //2 - false, если такой файл уже есть, то он не заменяется
                //3 - true: кодировка Unicode; false: кодировка ANSI
                var textStream = aActiveXObject.CreateTextFile(aThFiNm111, true, false);
                //преобразование строки в массив по разделителю
                var arSts = aStRp.split(/\n/igm);
                //проверка - если массив пуст, то и файл остается пустым
                if (arSts == null || arSts.length < 1) {
                    textStream.Close();
                    return 0;
                }
                //запись строк
                for (var i = 0; i < arSts.length; i++) {
                    textStream.WriteLine(arSts[i]);
                }
                textStream.Close();
                return 2;
            },

            /**
             * Выполняет создание файла (1) и замену его содержимого в зависимости от режимов. Это глубокая переработка версии А fiRp(...)
             * @param fiNm (1) -- в режиме (3) "p_relative" это относительный путь (например file.txt), в режиме (3) "p_abs" это абс. путь (например N:\\folder\\file.txt)
             * @param st (2) -- строка для записи
             * @param mode (3) -- режим: "p_relative" (по умолч.) - (1) интерпретируетя как относительный путь, "p_abs" - (1) интерпретируется как абсолютный путь (см. (1))
             * @param encode (4) -- "p_unicode" (по умолч.) - кодировка Unicode, "p_ansi" - кодировка ANSI
             * @param create (5) -- "p_force" (по умолч.) - если файла нет, то он будет создан; "p_no force" - если файла нет то он создан не будет, будет сообщение в консоль об ошибке
             * @returns {int} 1 если успешно, иначе 0
             */
            fiRp_B: function (fiNm, st, mode, encode, create) {
                if (st == null) return 0;
                var encode2 = true;
                if (encode === "p_ansi")   encode2 = false;
                var create2 = 1;
                if (create === "p_no force")   create2 = 0;
                var mode2 = 0;
                if (mode === "p_abs") mode2 = 1;

                var fso = th.FI.sysFSO(''); //FileSystemObject
                var path = th.FI.fdPa_B(''); //путь к папке
                if (mode2 === 0) { //преобразование относительного пути в абсолютный
                    fiNm = path + "\\" + fiNm;
                }
                if (!fso.FileExists(fiNm)) { //если файла не существует
                    if (!create2) { //если файл не должен создаваться если его нет
                        console.warn("!!! ФАЙЛ " + fiNm + " НЕ СУЩЕCТВУЕТ")
                        return 0;
                    }
                }
                //открытие текстового потока для записи
                //2 - false, если такой файл уже есть, то он не заменяется; true разрешает перезапись
                //3 - true: кодировка Unicode; false: кодировка ANSI
                var textStream = fso.CreateTextFile(fiNm, true, encode2);
                //преобразование строки в массив по разделителю
                var arSts = st.split(/\n/igm);
                //проверка - если массив пуст, то и файл остается пустым
                if (arSts == null || arSts.length < 1) {
                    textStream.Close();
                }
                //запись строк
                for (var i = 0; i < arSts.length; i++) {
                    textStream.WriteLine(arSts[i]);
                }
                textStream.Close();
                return 1;
            },

            /**
             * Возврат содержимого файла в виде строки с разделителями "\n".
             * Отличается от А тем что (1) это абсолютный путь, и что получает ActiveXObject
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\folder\\_files\\testFile.txt"
             * @param aFso (2) -- объект файловой системы, например через new ActiveXObject("Scripting.FileSystemObject");
             * @returns {string} содержимое файла в виде строки с разделителями "\n"; null - при неполадках (например при отсутствии файла)
             */
            fiContent_B: function (m105m, aThFiNm111, aFso) {
                //проверка существования файла
                if (!th.FI.fiExist('', aThFiNm111, aFso)) {
                    return null;
                }

                var textStream = aFso.OpenTextFile(aThFiNm111, 1, false, g_encoding);
                //up   1 - открываем файл только для чтения    //false - если файла нет, то он не создается
                var d2 = "";
                var n = "";
                //noinspection JSUnresolvedVariable
                while (!textStream.AtEndOfStream) {
                    var d = textStream.ReadLine(); //считывание следующей строки
                    d2 = d2 + n + d; //добавление новой строки к уже считанным строкам
                    n = "\n";
                }
                textStream.Close();
                return d2;
            },

            /**
             * Возврат содержимого файла в виде строки с разделителями "\n".
             * Отличается от B только тем что не требует в параметрах получения ActiveXObject
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\folder\\_files\\testFile.txt"
             * @param aFso (2) -- объект файловой системы, например через new ActiveXObject("Scripting.FileSystemObject");
             * @returns {string} содержимое файла в виде строки с разделителями "\n"; null - при неполадках
             * (например при отсутствии файла)
             */
            fiContent_C: function (m105m, aThFiNm111) {
                var fso = th.FI.sysFSO('');

                return th.FI.fiContent_B('', aThFiNm111, fso);
            },


            /**
             * Возврат абсолютного имени сейчас отображаемой страницы
             * @return {string} например "D:\\Working\\file.html"
             */
            fiPa: function (m105m) {
                var a = window.location.href;
                a = a.replace(/file:\/\/\//i, "").replace(/%20/g, " ").replace(/\//g, '\\\\');
                return a;
            },

            /**
             * Возврат абсолютного имени сейчас отображаемой страницы.
             * По результату ничем не отличается от fiPa
             * @return {string} например "D:\\Working\\file.html"
             */
            fiPa_B: function (m105m) {
                //путь, пример - может быть так "/F:/Folder1/file.html" или даже так "/D:\Working\index.html"
                var pa = document.location.pathname;

                //преобразуем к правильному виду, пример "F:\\Folder1"
                pa = pa.replace(/[\/\\]/g, "\\\\");
                pa = pa.replace(/[\/\\]+/, "");

                return pa;
            },

            /**
             * Возврат пути к папке в которой находится файл html который сейчас отображается
             * @return пример "F:\\Dropbox\\_Web\\wiki"
             */
            fdPa: function (m105m) {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var t = fso.GetFile(th.FI.fiPa(''));
                //noinspection JSUnresolvedVariable
                var p = t.ParentFolder.Path; //ParentFolder возвращает объект Folder являющийся путем к папке в
                // которой лежит файл, Path объект Folder превращает в обычный текст
                p = p.replace(/\\/g, '\\\\'); //приведение к правильному виду
                return p;
            },

            /**
             * Возврат пути к папке в которой находится файл html который сейчас отображается.
             * От fdPa отличается тем что не задействует ActiveX.
             * @return string например "F:\\Dropbox\\_Web\\wiki"
             */
            fdPa_B: function (m105m) {
                //путь, например "/F:/Folder1/file.html" или пример с работы "/D:\Working\index.html"
                var pa = document.location.pathname;

                //ПРЕОБРАЗУЕМ к правильному виду, например "F:\\Folder1"
                //удаление имени файла на конце
                var ix = pa.lastIndexOf("/");
                var ix2 = pa.lastIndexOf("\\");
                if (ix2 > ix) {
                    ix = ix2;
                }
                pa = pa.substring(0, ix);
                //
                pa = pa.replace(/[\/\\]/g, "\\\\");
                pa = pa.replace(/[\/\\]+/, "");

                return pa;
            },

            /**
             * Просматривает все файлы корня проекта которые имеют имя соответствующее шаблону (1).
             * Ищет в данных файлах ссылки у которых ThLHref соответствуют шаблону (2).
             * Возвращает 4-х рядный массив [ThLHref ссылки, ThLText ссылки, ThFiNm11-страницы, title-страницы, ...повтор]
             * @param aPatternFiNm (1) -- регулярное выражение для имен файлов
             * @param aPatternThLHref (2) -- регулярное выражение для ThLHref ссылок
             * @returns array
             */
            fiLinks: function (m105m, aPatternFiNm, aPatternThLHref) {
                var axo = new ActiveXObject("Scripting.FileSystemObject");

                //абсолютный путь к корню проекта
                var paRoot = th.FI.fdPa_B('');

                //массив ThFiNm11 файлов проекта
                var arFiNms = th.FI.fiNmsOfFd_B('', paRoot, 0, aPatternFiNm);
                //alert("arFiNms=["+arFiNms+"]");

                var arRes = [];
                var re = new RegExp(aPatternThLHref, "i");
                for (var i = 0; i < arFiNms.length; i++) {
                    //содержимое файла в виде строки
                    var fiSt = th.FI.fiContent_B('', paRoot + "\\\\" + arFiNms[i], axo);
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

            },


            /**
             * Возвращает имя текущей страницы. Например: index.html
             */
            pgChNm: function (m105m) {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var f = fso.GetFile(th.FI.fiPa(''));
                //noinspection JSUnresolvedVariable
                return f.Name;
            },

            /**
             * Возвращает короткое имя текущей страницы. Например: index
             */
            pgChNm_B: function (m105m) {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var f = fso.GetFile(th.FI.fiPa(''));
                //noinspection JSUnresolvedVariable
                var name = f.Name;

                //удаление расшения
                name = name.replace(/\.[^\.]*?$/, "");

                return name;
            },


            /**
             * Возвращает имя текущей страницы. Например: index.html.
             * Отличается от А и B тем что не использует ActiveX
             */
            pgChNm_C: function (m105m) {
                //путь, пример - может быть так "/F:/Folder1/file.html" или даже так "/D:\Working\index.html"
                var pa = document.location.pathname;

                var re = /^(.*)[\\\/](.*?)$/;
                var ex = re.exec(pa);
                if (ex !== null) {
                    pa = ex[2];
                }

                return pa;

            },

            /**
             * Возвращает массив имен файлов папки (1) - только файлов, без папок
             * @param aThFiNm111_Fd (1) -- абсолютное имя папки, например "D:\\Working\\Barannikov\\WORKS\\SaM-146\\Pilot\\Справка\\Site-testers\\11 0 1216-A"
             * @param aMod (2) -- модификатор:
             * если == 0, то в возвращаемом массиве будут имена файлов включая расширения, например "[name1.html, name2.html, ..]"
             * если == 1, то в возвращаемом массиве будут имена файлов без расширения, например "[name1, name2, ..]";
             * если == 2, то в возвращаемом массиве будут имена файлов без расширения (name) и следом расширения (ext), например "[name1, ext1, name2, ext2, ..]"
             * @return массив с данными в зависимости от модификатора (2)
             */
            fiNmsOfFd: function (m105m, aThFiNm111_Fd, aMod) {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var folder = fso.GetFolder(aThFiNm111_Fd);
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

                    switch (aMod) {
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
            },

            /**
             * Возвращает массив имен ThFiNm11 файлов папки (1). Возвращены будут только имена удовлетворяющие шаблону (3).
             * @param aNameFolder (1) -- имя папки, например "D:\\Справка\\Site-testers\\11 0 1216-A"
             * @param aMod (2) -- модификатор:
             * <b>если == 0</b>, то в возвращаемом массиве будут имена файлов (ThFiNm11), например "[name1.html, name2.html, ..]"
             * <b>если == 1</b>, то в возвращаемом массиве будут имена файлов (ThFiNm10), например "[name1, name2, ..]";
             * <b>если == 2</b>, то в возвращаемом массиве будут имена файлов без расширения (name) и следом расширения (ext), например "[name1, ext1, name2, ext2, ..]"
             * <b>если == 3</b>, то в возвращаемом массиве будут абсолютные имена файлов (ThFiNm111), например "[F:\\Work\\file1.html, ...]"
             * @param aRegExp (3) -- строка для регулярного выражения, например "^p_\\d+_p.html$"
             * @return {Array} массив с именами файлов, формат зависит от (2)
             */
            fiNmsOfFd_B: function (m105m, aNameFolder, aMod, aRegExp) {
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                var folder = fso.GetFolder(aNameFolder);
                //файлы папки
                //noinspection JSUnresolvedVariable
                var files = new Enumerator(folder.Files);
                //var s = "";
                var arr = [];

                for (; !files.atEnd(); files.moveNext()) {
                    var name;
                    var ext;
                    //имя файла (ThFiNm11)
                    //noinspection JSUnresolvedVariable
                    name = files.item().Name;

                    switch (aMod) {
                        case 1: //ThFiNm10
                            //удаление расшения
                            name = name.replace(/\.[^\.]*?$/, "");

                            //удовлетворяет шаблону?
                            var r3 = new RegExp(aRegExp);
                            var s3 = r3.exec(name);

                            if (s3 !== null) {
                                arr.push(name);
                            }

                            break;
                        case 2:
                            //имя без расширения
                            var nameNoExt = name.replace(/\.[^\.]*?$/, "");
                            //расширение
                            ext = name.replace(/.*\./, "");

                            //удовлетворяет шаблону?
                            r3 = new RegExp(aRegExp);
                            s3 = r3.exec(name);

                            if (s3 !== null) {
                                arr.push(nameNoExt);
                                arr.push(ext);
                            }

                            break;
                        case 3:
                            var r4 = new RegExp(aRegExp);
                            if (r4.exec(name) !== null) {
                                arr.push(aNameFolder + "\\\\" + name);
                            }
                            break;
                        default:
                            //имя удовлетворяет шаблону?
                            r3 = new RegExp(aRegExp);
                            s3 = r3.exec(name);

                            if (s3 !== null) {
                                arr.push(name);
                            }
                            break;
                    }
                }
                return arr;
            },

            /**
             * Возвращение содержимого тега (2) расположенного в файле (1). Открывающий и закрывающий тег
             * должны быть в одной строке и пр. - см. в коде
             * @param aFullNameFile (1) -- полное имя файла в котором ищется тег (3), например "D:\\Working\\Barannikov\\_index_00.html"
             * @param aNameTag (2) -- имя тега, например "title"
             * @return "file does not exist" если файл (1) не существует;
             * "" если тег (2) отсутствует или его содержимое пустое
             */
            html_tgContent: function (m105m, aFullNameFile, aNameTag) {
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
            },

            /**
             * Возвращает из файла (1) тег (2) (первое вхождение).
             * @param aRelativeNmFi (1) -- относительное имя файла, например "_files\\testFile.txt" или "testFile.txt"
             * @param aTag (2) -- имя тега, например "div"
             * @param aMode (3) -- 0: весь тег, например "&lt;title>111&lt;/title>"; 1: только внутренность тега, например "111"
             * @return см. aMode
             */
            html_tgContent_B: function (aRelativeNmFi, aTag, aMode) {

                //содержимое файла в виде строки
                var fiSt = th.FI.fiContent('', aRelativeNmFi);

                var re = new RegExp("(<.*?" + aTag + ".*?>)(.*?)(<.*?\\/" + aTag + ".*?>)", "igm");

                var s = re.exec(fiSt);
                if (s !== null) {
                    var v = s.index;
                    var s1 = s[1];
                    var s2 = s[2];
                    var s3 = s[3];
                    if (aMode = 0)
                        return s[0];
                    return s[2];
                }
                return '';
            },

            /**
             * Возвращает объект для работы с файловой системой (FileSystemObject)
             * @returns {ActiveXObject} new ActiveXObject("Scripting.FileSystemObject");
             */
            sysFSO: function (m105m) {
                return new ActiveXObject("Scripting.FileSystemObject");
                //справка http://msdn.microsoft.com/en-us/library/x23stk5t(v=vs.84).aspx
            },

            /**
             * Возвращает TRUE если файл (2) содержит хотябы одну строку с текстом (1)
             * @param aText (1) -- текст для поиска, например p_1_p.html
             * @param aFile (2) -- абсолютное имя файла, например D:\\Working\\Barannikov\\_index_00.html
             */
            fiConsist: function (m105m, aText, aFile) {
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
            },

            /**
             * Возвращает массив строк файла (2) которые содержат текст (1).
             * Массив будет пустым если таких строк в файле нет.
             * Поиск внутри тегов (служебная часть) не выполняется.
             * @param aText (1) -- текст для поиска, например p_1_p.html
             * @param aFile (2) -- абсолютное имя файла, например D:\\Working\\Barannikov\\_index_00.html
             * @param aCase (3) -- true/false - учитывать/не учитывать регистр
             * @returns {array}
             */
            fiStsSome: function (m105m, aText, aFile, aCase) {
                var res = [];

                //нижний регистр
                var textLC = aText.toLowerCase();

                //объект файловой системы
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                //1 - открываем файл только для чтения    //false - если файла нет, то он не создается
                var file = fso.OpenTextFile(aFile, 1, false, g_encoding);
                //пока не достигнут конец файла
                //noinspection JSUnresolvedVariable
                while (!file.AtEndOfStream) {
                    //считывание следующей строки
                    var line = file.ReadLine();
                    //нижний регистр
                    var lineLC = line.toLowerCase();

                    //удаление тегов
                    line = line.replace(/<.*?>/igm, "");
                    lineLC = lineLC.replace(/<.*?>/igm, "");

                    //учет регистра
                    var cases = 'i';
                    if (aCase) {
                        cases = '';
                    }

                    //индекс первого вхождения
                    var ix = -1;
                    //если учитывать регистр
                    if (aCase) {
                        ix = line.indexOf(aText);
                    } else {
                        ix = lineLC.indexOf(textLC);
                    }

                    //занесение строки в результирующий массив
                    if (ix !== -1) {
                        //ВЫДЕЛЕНИЕ найденного текста
                        var txReg = aText + "";

                        //"убивание" специальных-символов-рег.выражений которые могут быть в тесте поиска введенном пользователем
                        //txReg = txReg.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "\\$&");
                        txReg = th.STR.rx_spcSymbolsDismiss('', txReg);

                        var r2 = new RegExp(txReg, cases + 'g');
                        line = line.replace(r2, "<span class=x5z>$&</span>");

                        res.push(line);
                    }
                }
                file.Close();
                return res;
            },

            /**
             * Ищет в файле (1) элементы удовлетворяющие селектору (2). Возвращает количество таких элементов
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
             * @param aSelector (2) -- селектор типа ThSelA
             * @returns {int} -1 при неполадках
             */
            html_EmConsist: function (m105m, aThFiNm111, aSelector) {
                //преобразование селектора в массив
                var arS = th.HTML.srConvert('', aSelector);
                var tag = arS[0];
                var id_class = arS[1];
                var name = arS[2];

                //получение файла в виде строки
                var fiSt = th.FI.fiContent_B('', aThFiNm111, th.FI.sysFSO(''));
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
            },

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
            html_fiEmAdd: function (m105m, aThFiNm111, aEmSr, aEmHtml, aMod) {

                if (aMod !== "p_append" && aMod !== "p_prepend" && aMod !== "p_after" && aMod !== "p_before") {
                    return 0;
                }

                //файл в виде строки
                var fiSt = th.FI.fiContent_B('', aThFiNm111, sysFSO());
                if (!fiSt) {
                    return 0;
                }

                //обновление html-строки
                var newSt = th.HTML.emAdd('', fiSt, aEmHtml, aEmSr, aMod);
                if (!newSt) {
                    return 0;
                }

                //запись обновленной строки обратно в файл
                var res = th.FI.fiRp('', aThFiNm111, newSt, sysFSO());
                if (res > 1) {
                    return 2;
                }

                return 0;

            },


            /**
             * Ищет в файле (1) элемент (2) и удаляет из него прямого потомка (3) расположенного в позиции указанной в (3)
             * @param aThFiNm111 (1) -- абсолютное имя файла, например "F:\\Folder\\file.html"
             * @param aEmBaseSr (2) -- серектор типа ThSelA, например "div#name"
             * @param aEmDelSr (3) -- селектор (типа ThSelB) элемента который должен быть удален,
             * например ".aa:eq(1)" соответствует второму элементу класса aa
             * @param {int} 1 - если успешно, undefined при неудаче
             */
            html_fiEmDel: function (m105m, aThFiNm111, aEmBaseSr, aEmDelSr) {
                //получение ThFiSt
                var fiSt = th.FI.fiContent_B('', aThFiNm111, sysFSO());
                if (!fiSt) {
                    return;
                }

                //тег в виде строгого текста
                var tgStrong = th.HTML.tg('', fiSt, aEmBaseSr);
                if (!tgStrong) {
                    return;
                }

                var $tgDress = th.HTML.tg_E('', fiSt, aEmBaseSr);
                $(aEmDelSr, $tgDress).remove();
                var h2 = $tgDress.get(0).outerHTML;

                var newSt = fiSt.replace(tgStrong, h2);

                //обновление файла
                var rs = th.FI.fiRp('', aThFiNm111, newSt, sysFSO());
                if (!rs) {
                    return;
                }
                return 1;
            },

            /**
             * Возвращает массив из 2-х массивов.
             *
             * 1-й массив - это массив из 1 или 0 элементов; элемент - это "текст" строки файла (2) если он содержит подстроку (1)
             * и находится внутри тега (3).
             *
             * Во втором массиве прочие строки файла (2) содержащие текст (1).
             *
             * Поиск внутри тегов (служебная часть) не выполняется.
             *
             * @param aText (1) -- текст для поиска, например "p_1_p.html"
             * @param aFile (2) -- абсолютное имя файла, например "D:\\Working\\Barannikov\\_index_00.html"
             * @param aTag (3) -- имя тега в котором ищется текст (1), например "title"
             * @param aCase (4) -- true/false - учитывать/не учитывать регистр
             */
            fiStsSome_B: function (m105m, aText, aFile, aTag, aCase) {

                //1-й массив
                var res1 = [];
                //2-й массив
                var res2 = [];
                //основной массив
                var res = [res1, res2];

                //нижний регистр
                var bTextLC = aText.toLowerCase();

                //объект файловой системы
                var fso = new ActiveXObject("Scripting.FileSystemObject");

                //1 - открываем файл только для чтения    //false - если файла нет, то он не создается
                var file = fso.OpenTextFile(aFile, 1, false, g_encoding);
                //пока не достигнут конец файла
                //noinspection JSUnresolvedVariable
                while (!file.AtEndOfStream) {
                    //считывание следующей строки
                    var line = file.ReadLine();
                    //нижний регистр
                    var lineLC = line.toLowerCase();

                    //строка содержит тег (3)?
                    var isConsistTag = (lineLC.indexOf("<" + aTag.toLowerCase()) != -1);

                    //удаление HTML сроки
                    line = line.replace(/<.*?>/igm, "");
                    lineLC = lineLC.replace(/<.*?>/igm, "");

                    //учет регистра
                    var cases = 'i';
                    if (aCase) {
                        cases = '';
                    }

                    //индекс первого вхождения
                    var ix = -1;
                    //если учитывать регистр
                    if (aCase) {
                        ix = line.indexOf(aText);
                    } else {
                        ix = lineLC.indexOf(bTextLC);
                    }

                    //занесение строки в результирующий массив
                    if (ix !== -1) {
                        //ВЫДЕЛЕНИЕ найденного текста
                        var txReg = aText + "";

                        //"убивание" специальных-символов-рег.выражений которые могут быть в тесте поиска введенном пользователем
                        //txReg = txReg.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "\\$&");
                        txReg = th.STR.rx_spcSymbolsDismiss('', txReg);

                        var r2 = new RegExp(txReg, cases + 'g');
                        line = line.replace(r2, '<span style="color:red">$&</span>');

                        //если это строка с тегом (3)
                        if (isConsistTag) {
                            res1.push(line);
                        } else {
                            res2.push(line);
                        }
                    }
                }
                file.Close();
                return res;
            }

        }

    }();

    this.HTML = function () {
        return {
            /**
             * Возвращает массив объектов m109m@js-type-2 описывающих диапазоны в которых находятся @супер-теги (script, style, !--) в (2)
             * @param m105m (1) -- для логгирования
             * @param html (2) -- HTML-строка
             * @returns {object} [{a:, b:, t:}, ...], где a - индекс начала диапазона, b - индекс окончания диапазона, t - тип диапазона (comm|script|style).
             * При нештате возвращает пустой массив
             * @desc есть метод тестирования (см. yg54g_st1st)
             */
            tgSuperDiaps: function (m105m, html) {
                var ret = [];
                if (!html || html.length < 1) return ret;
                var sub, ixComm, ixScript, ixStyle, ix1, re1, c, end;
                var ix = 0;
                while (ix < html.length) {
                    console.log('ix [' + ix + ']');
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
                    console.log('mn [' + mn + ']');
                    if (mn === ixComm) { //если первей всех @тег-комментарий
                        //ищем закрытие комментария
                        re1 = new RegExp('--\\s*>', 'g');
                        c = re1.exec(sub);
                        if (c) { //если закрытие комментария найдено
                            end = c.index + c[0].length + ix;
                            console.log('end [' + end + ']');
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
                        console.log('style');
                        //ищем конец тега script
                        re1 = new RegExp('</style\\s*>', 'g');
                        console.log('c [' + c + ']');
                        c = re1.exec(sub);
                        if (c) {
                            end = c.index + c[0].length + ix;
                            ret.push({a: ixStyle, b: end, t: "style"});
                            ix = end;
                        } else {
                            console.log('html.length [' + html.length + ']');
                            ret.push({a: ixStyle, b: html.length, t: "style"});
                            break;
                        }
                    }
                }
                console.log('break');
                return ret;
            },

            /**
             * Возвращает 0 если (2) не попадает ни в один из диапазонов занимаемых m108m@супер-тегами.
             * Иначе вовзращает индекс окончания @супер-тега в который произошло попадание.
             * @param m105m (1) -- для логгирования
             * @param ix {int} (2) -- индекс
             * @param diaps {Array} (3) -- массив возвращаемый функцией tgSuperDiaps
             * @returns {int} при нештате также вовзращает 0
             */
            tgSuperDiapsIn: function (m105m, ix, diaps) {
                if (!diaps || diaps.length < 1) return 0;
                var ret = 0;
                for (var i = 0; i < diaps.length; i++) {
                    var e = diaps[i];
                    if (ix >= e.a && ix <= e.b) {
                        ret = e.b;
                        break;
                    }
                }
                return ret;
            },

            /**
             * Ищет в строке первый тег вида &lt;(2) (3)=(4)&gt;(6)&lt;/(2)&gt; и заменяет (4) на (5) и (6) на (7).
             * Критерием совпадения является точное равенство (6) строки (1) и (6) заданного, а также равенство (4) строки (1) и (4) заданного
             * <i>(последнее равенство учитывает только непрерывную последовательность символов (4) после знака = в которые не входят пробелы и кавычки ' ",
             * например будут считаться равными строки "href = 'text '" и "href=  text  ")</i>
             * @param aTxSource (1) -- строка в которой выполняется поиск и замена
             * @param bTgNm (2) -- имя тега
             * @param bAttrNm (3) -- имя атрибута
             * @param aCuAttrVa (4) -- текущее значение атрибута
             * @param aNwAttrVa (5) -- текст для замены (4)
             * @param aCuThTText (6) -- текущий текст тега
             * @param aNwThTText (7) -- текст для замены (6)
             * @return {string} новая строка; если замен не было, то исходная строка
             */
            tgRp_H: function (m105m, aTxSource, aTgNm, aAttrNm, aCuAttrVa, aNwAttrVa, aCuThTText, aNwThTText) {
                var res = aTxSource;

                //"гашение" спец. символов
                var bTgNm = th.STR.rx_spcSymbolsDismiss('', aTgNm);
                var bAttrNm = th.STR.rx_spcSymbolsDismiss('', aAttrNm);
                var bCuAttrVa = th.STR.rx_spcSymbolsDismiss('', aCuAttrVa);
                var bCuThText = th.STR.rx_spcSymbolsDismiss('', aCuThTText);

                //"разбивка" 1-го порядка
                var rx = new RegExp("(\\<\\s*)(" + bTgNm + ")([^\\<\\>]*?)\\>(" + bCuThText + ")(\\<\\s*/\\s*\\2\\s*\\>)", "gi");
                var ex = rx.exec(aTxSource);
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
                            attrs = attrs.replace(rxA, r1a + aNwAttrVa + r3a);
                        } else {
                            b = false;
                        }
                    }

                    //формирование тега с выполненными заменами (если есть совпадение по значению атрибута)
                    if (b) {
                        r0_new = r1 + r2 + attrs + r31 + aNwThTText + r5;
                    }
                }

                //итоговая замена
                if (r0 && r0_new) {
                    res = res.replace(r0, r0_new);
                }

                return res;
            },

            /**
             * Создает пустой html-элемент на базе селектора (1)
             * @param aSelector (1) -- селектор, например "div#name" или "div.name" (селектор должен быть именно таким трехзвенным)
             * @returns {string} например <div id="name"></div> или <div class="name"></div>
             */
            emCfFromSr: function (m105m, aSelector) {
                var se = th.HTML.srConvert('', aSelector);
                var res = '<' + se[0] + ' ' + se[1] + '="' + se[2] + '"></' + se[0] + '>';
                return res;
            },

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
            tg_E: function (m105m, aSt, aSelector) {
                //вспомогательный оберточный элемент
                var wrap = $('<div></div>');
                //"скармливание" нашей строки
                wrap.html(aSt);

                //извлечение нужного нам элемента, по селектору, в контексте wrap
                return $(aSelector, wrap).eq(0);
            },

            /**
             * Возвращает ThHtmlIdPar на базе селектора
             * @param aSelector (1) -- селектор типа ThSelA
             * вместо # и . ничего другого быть не может
             * @returns {array} массив ThHtmlIdPar, например ["div", "id", "nameId"]
             */
            srConvert: function (m105m, aSelector) {
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
            },

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
             * @param aSelector (2) -- селектор типа ThSelA, например "div#name" или "div.class"
             * @param aMod (3) -- "p_innerHTML" или "p_outerHTML"* по умолчанию (* или что угодно)
             * @returns {object} если блок не находит, то возвращает объект типа {newst: "$исходная строка aThFiSt$", blockOuter: "", blockInner: ""}
             */
            tg_C: function (m105m, aThFiSt, aSr, aMod) {
                //результирующий объект
                var res = {newst: "", blockOuter: "", blockInner: ""};

                //разбивка селектора
                var ojSr = th.HTML.srConvert_B('', aSr);

                var thRxStbb = th.HTML.srToRx('', aSr);
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
                        var newRx = th.HTML.srToRx_B('', aSr, ct);

                        rx1 = new RegExp(newRx, "gim");
                        ct++;
                    } else {
                        break;
                    }
                }

                if (matchSt) {
                    res.newst = aThFiSt.replace(matchSt, "");
                    res.blockOuter = matchSt;
                    if (aMod === "p_innerHTML") {
                        //выделяется все что внутри parent-конструкции <x>..</x>
                        var regex = new RegExp("^\\<[\\s\\S]*?\\>([\\s\\S]*)\\r*\\n*\\<[\\s\\S]*?\\>$", "i");
                        ex = regex.exec(matchSt);
                        if (ex) {
                            res.blockInner = ex[1];
                        }
                    }
                } else {
                    res.newst = aThFiSt;
                }

                return res;
            },


            /**
             * Извлечение из (1) outerHTML или innerHTML первого тега удовлетворяющего селектору (2).
             * Возвращает объект формата {newst: строка (1) без блока (2), block: outerHTML или innerHTML блока (2)}
             * Опции:
             * А) извлекается только первый встретившийся тег.
             * B) Извлечение идет строго в таком виде в каком тег
             * содержится в (1) - jQuery не используется.
             * C) ThTTag (2) могут быть вложенными друг в друга.
             * <b>ОТЛИЧИЯ ОТ А:</b>
             * 1) возвращает и искомый блок и исходную строку без данного блока
             * @param m105m ()
             * @param aThFiSt (1) -- строка из которой извлекается тег
             * @param aSr (2) -- селектор типа ThSelA, например "div#name" или "div.class"
             * @param aMod (3) -- "p_innerHTML" или "p_outerHTML"* по умолчанию (* или что угодно)
             * @returns {object} при нештате возвращает объект с пустыми строками, например {newst: "", block: ""}
             */
            tg_B: function (m105m, aThFiSt, aSr, aMod) {
                //результирующий объект
                var res = {newst: "", block: ""};

                //преобразование селектора в ThHtmlIdPar
                var arSel = th.HTML.srConvert('', aSr);
                //:["div", "#", "name"]
                //
                var tag = arSel[0];
                var id_class = arSel[1];
                var name = arSel[2];

                //первое получение
                //: \<\s*tag\s+[^\<\>]*?class\s*=\s*"*'*name(?:\>|[\s"'][^\<\>]*?\>)[\s\S]*?\<\s*\/\s*tag\s*\>
                var sRx = "\\<\\s*" + tag + "\\s+[^\\<\\>]*?" + id_class + "\\s*=\\s*\"*'*" + name
                    + "(?:\\>|[\\s\"'][^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag + "\\s*\\>";
                var rx1 = new RegExp(sRx, "gim");

                //используется техника m85m
                var ex;
                while (ex = rx1.exec(aThFiSt)) {
                    //:m84m140422185300

                    ex = ex[0];

                    //определение количества открывающих тегов в отобранном
                    var rx2 = new RegExp("\\<\\s{0,}" + arSel[0] + "[\\s\\>]{1,}", "gim");
                    //количество совпадений
                    var ctOpenTags = ex.match(rx2).length;

                    //определение количества закрывающих тегов в отобранном
                    var rx3 = new RegExp("\\<\\s{0,}/" + arSel[0] + "\\s{0,}\\>", "igm");
                    var ctCloseTags = ex.match(rx3).length;

                    if (ctOpenTags !== ctCloseTags) {
                        //рег.выр. закрывающего тега
                        sRx += "[\\s\\S]{0,}?\\<\\s{0,}/\\s{0,}" + arSel[0] + "\\s{0,}\\>";
                        rx1 = new RegExp(sRx, "gim");
                    } else {
                        break;
                    }
                }

                if (ex) {
                    aThFiSt = aThFiSt.replace(ex, "");

                    res.newst = aThFiSt;
                    res.block = ex;
                }

                return res;
            },


            /**
             * Удаляет все теги оставляя только текст
             * @param aSt (1) -- строки из которой нужно удалить теги
             * @returns {string] строка без тегов
            */
            tgDeMult: function (m105m, aSt) {
                return aSt.replace(/<.*?>/ig, "");
            },


            /**
             * Возвращает ThHtmlIdPar на базе селектора. Отличается от А только тем что возвращает в виде объекта, а не массива;
             * также тем, что селектор может быть типа ThSelC
             * @param aSelector (1) -- селектор типа ThSelС
             * вместо # и . ничего другого быть не может
             * @returns {object} объект ThHtmlIdPar, например {tag: "div", comma: "id", name: "nameId"}
             */
            srConvert_B: function (m105m, aSelector) {
                //var rx = new RegExp("\\s*([\\.#])(\\S+)", "i");
                var rx = new RegExp("(.{0,})([\\.#])(.{0,})", "i");
                var match = rx.exec(aSelector);
                //: ["div.nameClass", "div", ".", "nameClass"]
                //
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

                //формирование выходного объекта
                var ojRes = {tag: "", comma: "", name: ""};
                ojRes.tag = tag;
                ojRes.comma = name;
                ojRes.name = comma;

                return ojRes;
            },


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
            emAdd: function (m105m, aHtml, aEmA, aEmBSr, aMod) {
                //извлечение опорного элемента
                var tagStrong = th.HTML.tg('', aHtml, aEmBSr);
                if (tagStrong.length < 1) {
                    return "";
                }

                //извлечение этого же элемента, но в причесанном виде, формат Jq-Oj
                var jTagDress = th.HTML.tg_E('', aHtml, aEmBSr);

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
                    parent = $('<div></div>');
                    $(aEmA).appendTo(parent);
                    $(jTagDress).appendTo(parent);
                    udTag = parent.html();
                }

                return aHtml.replace(tagStrong, udTag);
            },


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
            tg: function (m105m, aSt, aSelector) {
                //преобразование селектора в ThHtmlIdPar
                var arSel = th.HTML.srConvert('', aSelector);
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
                        sRx += "[\\s\\S]{0,}?\\<\\s{0,}/\\s{0,}" + arSel[0] + "\\s{0,}\\>";
                        rx1 = new RegExp(sRx, "gim");
                    } else {
                        break;
                    }
                }


                return ex;
            },


            /**
             * Ищет в строке (1) теги (2) типа ThTag (т.е. без вложенных тегов) и заменяет их на ThTText данных тегов.
             * Возвращает измененную строку
             * @param aSt (1) -- html-строка, например "&lt;div&gt;&lt;span&gt;text&lt;/span&gt;&lt;/div&gt;"
             * @param aTgNm (2) -- имя тега, например "span"
             * @returns {string} например "&lt;div&gt;text&lt;/div&gt;"
             */
            tgUnwrapMult: function (m105m, aSt, aTgNm) {
                var rx = new RegExp("\\<\\s{0,}" + aTgNm + "(?:\\>|[^\\<\\>]{0,}\\>)([\\s\\S]{0,}?)\\<\\s{0,}/" + aTgNm + "\\s{0,}\\>", "igm");
                return aSt.replace(rx, "$1");
            },

            /**
             * Извлекает из строки (1) значение аттрибута (2), например значение 'someid' аттрибута 'id' из примера в (1)
             * {qunit}
             * @param aSt (1) -- строка содержащая тег, например ' < tag id="someid" >'
             * @param aAttr (2) -- аттрибут, например 'id'
             * @returns array ['', -1] при нешататах, массив вида ['найденное_значение','индекс_начала значения'], например ['someid', 11]
             */
            tgAttr: function (m105m, aSt, aAttr) {
                if (!aSt) return ['', -1];
                if (!aAttr) return ['', -1];

                //если не удается корректно получить тег
                var tg = th.HTML.tgNm('', aSt);
                if (!tg) {
                    return ['', -1];
                }

                //new http://regex101.com/r/zS3cF5/1
                //new 2 http://regex101.com/r/sW6fC2/1

                //двойные кавычки  http://regex101.com/r/lW0nS8/1
                var re = new RegExp("(\\s{1,}" + aAttr + "\\s{0,}=\\s{0,}\")([^'\"=\\>]{0,})\"", '');
                var m = re.exec(aSt);
                if (m) {
                    return [m[2], m.index + m[1].length];
                }

                //одинарные кавычки
                var re1 = new RegExp("(\\s{1,}" + aAttr + "\\s{0,}=\\s{0,}')([^'\"=\\>]{0,})'", '');
                var m1 = re1.exec(aSt);
                if (m1) {
                    return [m1[2], m1.index + m1[1].length];
                }

                //без кавычек  http://regex101.com/r/lW0nS8/2
                var re2 = new RegExp("(\\s{1,}" + aAttr + "\\s{0,}=\\s{0,})([^'\"=\\>\\s]{1,})", '');
                var m2 = re2.exec(aSt);
                if (m2) {
                    return [m2[2], m2.index + m2[1].length];
                }

                return ['', -1];

                /*
                 //http://regex101.com/r/rO2uY0
                 var re = new RegExp('(\\s+' + aAttr + "\\s*=\\s*([\"']*)\\s*)([^\\<\\>\\s'\"]+)\\s*\\2", '');
                 var m = re.exec(aSt);
                 if (m) {
                 return [m[3], m.index + m[1].length];
                 } else {
                 return ['', -1];
                 }
                 */
            },

            /**
             * Извлечение имени тега из строки (1). Рассматривается только первый тег из строки (1)
             * {qunit}
             * @param aSt (1) -- строка любого вида, например '< tag >', '< / tag >'
             * @returns {*} '!--' если тег-комментарий, '' при нештатах
             */
            tgNm: function (m105m, aSt) {
                //проверка на комментарий
                var m = /<!--[\s\S]*?>/.exec(aSt);
                if (m) return '!--';

                //fail http://regex101.com/r/yV1bO3
                //http://regex101.com/r/pS3lZ7
                var m1 = /<\s*[\/]?\s*([A-Za-z0-9!_-]*)([^<>]*)>/.exec(aSt);
                if (m1) {
                    if (m1[1].indexOf('!--') !== -1) {
                        return '';
                    }
                    //проверка что после тега не идет знак '='
                    var eq = /\s*=/.exec(m1[2]);
                    if (eq && eq.index === 0) {
                        return '';
                    }
                    return m1[1];
                } else {
                    return '';
                }
            },

            /**
             * Проверяет наличие в строке ThTag c ThTTag == (2). Если отсутствует, то возвращает пустую строку "",
             * если есть, то возвращает ThTText первого найденного соответствия.
             * @param aSt (1) -- строка которая проверяется на наличие (2)
             * @param aTag (2) -- ThTTag, например "title"
             * @returns string например если (1) == "<title>TTT</title>" то вернет "TTT"
             */
            tgExist: function (m105m, aSt, aTag) {
                var res = "";
                var rx = new RegExp("\\<\\s{0,}" + aTag + "(?:\\s{1,}[^\\<\\>]{0,}?\\>|\\>)([^\\<\\>]{0,})\\<\\s{0,}/\\s{0,}" + aTag + "\\s{0,}\\>", "im");
                var r = rx.exec(aSt);
                if (r !== null) {
                    res = r[1];
                }

                return res;
            },

            /**
             * Проверяет наличие в строке ThTag c ThTTag == (2). Если отсутствует, то возвращает пустую строку "",
             * если есть, то возвращает ThTText первого найденного соответствия.
             * Отличается от А только тем что используется jQuery.
             * @param aSt (1) -- строка которая проверяется на наличие (2)
             * @param aTag (2) -- ThTTag, например "title"
             * @returns string например если (1) == "<title>TTT</title>" то вернет "TTT"
             */
            tgExist_B: function (m105m, aSt, aTag) {

                var bSt = '<br>' + aSt;
                return $(bSt).filter(aTag).text();

            },


            /**
             * Подсветка в тексте (1) текста (2) если он там есть. Подсветка выполняется
             * за счет оборачивания в блок SPAN с class==(3)
             *
             * Пример: stWrap("tttAAtttaattt", "AA", "BB", "ignoreCase"), вернет строку
             * "ttt<span class=BB>AA</span>ttt<span class=BB>aa</span>ttt"
             *
             * @param aText (1) -- текст в котором ищется текст (2)
             * @param aFind (2) -- текст который ищется с тексте (1)
             * return подсвеченный текст или исходный текст
             * @param aClassNm (3) -- class элемента span, например "nm"
             * @param aMode (4) -- если "ignoreCase" или FALSE то регистр не учитывается, при любом другом
             * значении - учитывается
             * @returns {string] строка с выполненными заменами, или исходная строка если ничего не заменялось
 */
            stWrap: function (m105m, aText, aFind, aClassNm, aMode) {

                //"убиваем" спец. символы RegExp в искомом тексте
                var bFind = th.STR.rx_spcSymbolsDismiss('', aFind);

                //учет/неучет регистра
                var cases = "g";
                if (aMode == "ignoreCase" || aMode === false) {
                    cases = "ig";
                }

                //подсветка
                var re = new RegExp(bFind, cases);
                return aText.replace(re, '<span class="' + aClassNm + '">$&</span>');
            },

            /**
             * Подсветка в тексте (1) текста (2) если он там есть. Подсветка выполняется
             * за счет оборачивания в блок SPAN с class==(3). Отличается от А тем, что если замен не проиводилось,
             * то возвращается пустая строка
             *
             * Пример: stWrap("tttAAtttaattt", "AA", "BB", "ignoreCase"), вернет строку
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
            stWrap_B: function (m105m, aText, aFind, aClassNm, aMode) { //__HTML__

                //"убиваем" спец. символы RegExp в искомом тексте
                var bFind = th.STR.rx_spcSymbolsDismiss('', aFind);

                //учет/неучет регистра
                var cases = "g";
                if (aMode == "ignoreCase" || aMode === false) {
                    cases = "ig";
                }

                var ret = "";

                //подсветка
                var re = new RegExp(bFind, cases);
                if (re.test(aText)) {
                    ret = aText.replace(re, '<span class="' + aClassNm + '">$&</span>');
                }

                return ret;
            },


            /**
             * Преобразует селектор (1) в строку для RegExp (ThRxStbb).
             * @param aSr (1) -- селектор типа ThSelC, например "div", ".name", "div.name"
             * @retruns {string} строка для использования в конструкции "new RegExp(.., ..)", например "\\<\\s*div"
             */
            srToRx: function (m105m, aSr) {
                //селектор в виде объекта спец. формата
                var ojSr = th.HTML.srConvert_B('', aSr);
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
                    tag1 = ojSr.tag;
                    tag2 = ojSr.tag;
                    attr = "";
                    x2 = "\\s+";
                    sRx = "\\<\\s*" + tag1 + attr
                    + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";

                }
                if (!ojSr.tag && ojSr.comma && ojSr.name) {
                    tag1 = "([^\\<\\>]*?)\\s+";
                    tag2 = "\\1";
                    attr = "[^\\<\\>]*?" + ojSr.comma + "\\s*=\\s*\"*'*" + ojSr.name;
                    x2 = "[\\s\"']";

                    sRx = "\\<\\s*" + tag1 + attr + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";
                }

                return sRx;


            },

            /**
             * Преобразует селектор (1) в строку для RegExp (ThRxStbb).
             * От А отличается добавлением закрывающих конструкций (тегов) в количестве (2).
             * @param aSr (1) -- селектор типа ThSelC, например "div", ".name", "div.name"
             * @param aCtClose (2) -- количество закрывающих конструкций которые нужно добавить
             * @retruns {string} строка для использования в конструкции "new RegExp(.., ..)", например "\\<\\s*div"
             */
            srToRx_B: function (m105m, aSr, aCtClose) {
                //селектор в виде объекта спец. формата
                var ojSr = th.HTML.srConvert_B('', aSr);
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
                    tag1 = ojSr.tag;
                    tag2 = ojSr.tag;
                    attr = "";
                    x2 = "\\s+";
                    sRx = "\\<\\s*" + tag1 + attr
                    + "(?:\\>|" + x2 + "[^\\<\\>]*?\\>)[\\s\\S]*?\\<\\s*/\\s*" + tag2 + "\\s*\\>";

                }
                if (!ojSr.tag && ojSr.comma && ojSr.name) {
                    tag1 = "([^\\<\\>]*?)\\s+";
                    tag2 = "\\1";
                    attr = "[^\\<\\>]*?" + ojSr.comma + "\\s*=\\s*\"*'*" + ojSr.name;
                    x2 = "[\\s\"']";

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

            },


            /**
             * Ищет в строке (1) ссылки подобные &lt;a href="A"&gt;B&lt;/a&gt; у которых B==(2) /строгое соответствие/
             * и заменяет в них A на (3)
             * @param aTxSource (1) -- строка в которой выполняется поиск и замена,
             * например "&lt;a href=link.html&gt;TTT&lt;/a&gt;"
             * @param aTxLink (2) -- TTT из примера в (1)
             * @param aNewHref (3) -- новое содержимое для замены link.html из примера в (1)
             * @return новая строка
             */
            tgAttrRp: function (m105m, aTxSource, aTxLink, aNewHref) {
                var res = aTxSource;

                //"гашение" спец. символов
                var bTxLink = th.STR.rx_spcSymbolsDismiss('', aTxLink);

                //когда линк в двойных кавычках, например грубо <a href="link" taget=_blank>textLink</a>
                //var re1 = /(<\s*a\s+href\s*=\s*")([^<>"]*)("[^<>]*>)(.*?)(<\s*\/\s*a\s*>)/igm;
                var re1 = new RegExp("(\\<\\s{0,}a\\s{1,}href\\s{0,}=\\s{0,}\")([^\\<\\>\"]{0,})(\"[^\\<\\>]{0,}\\>)(" + bTxLink + ")(\\<\\s{0,}/\\s{0,}a\\s{0,}\\>)", "gim");
                res = res.replace(re1, "$1" + aNewHref + "$3$4$5");

                //когда линк в одинарных кавычках, например грубо <a href='link' taget=_blank>textLink</a>
                //var re2 = /(<\s*a\s+href\s*=\s*')([^<>']*)('[^<>]*>)(.*?)(<\s*\/\s*a\s*>)/igm;
                var re2 = new RegExp("(\\<\\s{0,}a\\s{1,}href\\s{0,}=\\s{0,}')([^\\<\\>']{0,})('[^\\<\\>]{0,}\\>)(" + bTxLink + ")(\\<\\s{0,}/\\s{0,}a\\s{0,}\\>)", "gim");
                res = res.replace(re2, "$1" + aNewHref + "$3$4$5");

                //когда линк без кавычек, например грубо <a href= link taget=_blank>textLink</a>
                //var re3 = /(<\s*a\s+href\s*=\s*)([^'<>"\s]+)([^<>]*>)(.*?)(<\s*\/\s*a\s*>)/igm;
                var re3 = new RegExp("(\\<\\s{0,}a\\s{1,}href\\s{0,}=\\s{0,})([^'\\<\\>\"\\s]{1,})([^\\<\\>]{0,}\\>)(" + bTxLink + ")(\\<\\s{0,}/\\s{0,}a\\s{0,}\\>)", "gim");
                res = res.replace(re3, "$1" + '"' + aNewHref + '"' + "$3$4$5");

                //когда линк пустой, например грубо <a href= >textLink</a>
                //var re4 = /(<\s*a\s+href\s*=)(\s*)(>.*?)(<\s*\/\s*a\s*>)/igm;
                var re4 = new RegExp("(\\<\\s{0,}a\\s{1,}href\\s{0,}=)(\\s{0,})(\\>" + bTxLink + ")(\\<\\s{0,}/\\s{0,}a\\s{0,}\\>)", "gim");
                res = res.replace(re4, "$1" + '"' + aNewHref + '"' + "$3$4");

                return res;
            },

            /**
             * Замена ThLHref ссылки с помощью jQuery.
             * Ищет в строке (1) первый  ThLLink, заменяет в нем значение ThLHref на (2) и возвращает только данный ThLLink.
             * @param aSt (1) -- строка с ThLLink; должна обязательно начинаться с любого рабочего тега,
             * например "<br>" или "<tt></tt>"; пример строки
             * "<br><a href='ah1'>at1</a> tt1 <a href='ah2' target=_blank>at2</a>"
             * @param aTxRp (2) -- текст которым будет замен текст "ah1" из примера выше
             * @returns {string|outerHTML|*} например "<a href='newHref'>at1</a>"
             */
            tgAttrRp_B: function (m105m, aSt, aTxRp) {

                var g = $(aSt).filter('a');

                var j = g.eq(0);
                var f = j.attr('href', aTxRp).toArray()[0].outerHTML;
                return f;
            },

            /**
             * Ищет в строке (1) тег с именем (2), первое вхождение.
             * @param aSt (1) -- строка в которой выполняется поиск
             * @param aTgNm (2) -- имя тега, например 'a'
             * @returns object объект описания парного тега (type002) или null при нештате (если тег не найден и пр.)
             */
            tg_D: function (m105m, aSt, aTgNm) {
                //g8g
                //http://regex101.com/r/vG1xR5/1
                var re = new RegExp('<\\s*(' + aTgNm + ')(?:\\s+[^<>]*>|>)([^<>]*)(<\\s*\\/\\s*\\1\\s*>)', 'i');
                var m = re.exec(aSt);
                if (!m) return null;

                var oj = th.TYPS.type002('');
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
        }
    }();

    this.STR = function () {
        return {
            /**
             * Вывод на страницу информации об exec. Отличается от А только тем что выводит в консоль.
             * @param aRegExp (1) -- регулярное выражение, например /regexp/igm
             * @param aSt (2) -- строка к которой будет применен (1)
             * @param aComment (3) -- комментарий к данной печати, будет выведен первым
             */
            rx_execPrint_B: function (m105m, aRegExp, aSt, aComment) {
                console.log('');
                console.log('===start print exec, comment [' + aComment + ']===');
                var c = 0;
                var ex;
                while (ex = aRegExp.exec(aSt)) {
                    console.log('===' + (++c) + '===');
                    console.log('ex.length=[' + ex.length + ']');
                    for (var i = 0; i < ex.length; i++) {
                        console.log('ex[' + i + ']=[' + ex[i] + ']');
                    }
                }
                console.log('===end print exec, comment [' + aComment + ']===');
            },


            /**
             * Удаляет пробелы и переносы строк в начале и в конце
             * @param aSt (1) -- строка которую нужно обработать
             * @returns {string} строка без пробелов и переносов строк в начале и конце
             */
            spacesDe_B: function (m105m, aSt) {

                //удаление пробелов и переносов в конце
                var re2 = new RegExp("[\\s\\r\\n]*$", "gi");
                var bSt = aSt.replace(re2, "");

                //удаление пробелов и переносов в начале
                var re3 = new RegExp("^[\\s\\r\\n]*", "gi");
                var cSt = bSt.replace(re3, "");

                return cSt;
            },

            /**
             * Заменяет все следующие друг за другом пробелы и переносы строк одним пробелом
             * @param aSt (1) -- строка у которой нужно "сжать" пробелы
             * @returns {string} строка со "сжатыми" пробелами
             */
            spacesRp: function (m105m, aSt) {
                return aSt.replace(/\s+/gm, " ");
            },

            /**
             * Сначала заменяет в (1) все переносы строк на пустую строку, затем заменяет 1+ пробелы на 1 пробел и в конце удаляет пробелы в начале и конце если они есть
             * @param aSt (1) -- любая строка, в том числе с переносами строк
             * @returns string -- строка с выполненными заменами
             */
            spacesRp_B: function (m105m, aSt) {
                var x = aSt.replace(/\n/g, '');
                x = x.replace(/\s+/g, '');
                x.trim();
                return x;
            },

            /**
             * Замена отдельных (специальных) символов в строке (1).
             * Заменяется символ "меньше" (&lt;) на "&_lt;" (без _ )
             * @param aSt (1) -- любая строка, например "text"
             * @returns string строка с выполненными заменами
             */
            charsRpSpc: function (m105m, aSt) {
                var x = aSt.replace(/</g, '&lt;');
                return x;
            },

            /**
             * Ищет в строке (1) все подстроки которые: а) соответствуют рег.выр. (3), б) находятся после индекса (4). Заменяет найденные цепочки на текст (2)
             * @param aSt (1) -- строка в которой выполняется поиск и замена, например 'aa33bb55cc'
             * @param aStRp (2) -- строка для замены, например '44'
             * @param aRe (3) -- объект RegExp, модификатор g обязателен, например 'new RegExp('\\d\\d', 'g');'
             * @param aIx (4) -- индекс начиная с которого выполняется замена, например '4'
             * @returns string строка с выполненными заменами или null если нештат или замены не выполнялись
             */
            stRp: function (m105m, aSt, aStRp, aRe, aIx) {
                if (!aSt || !aRe || aIx < 0 || aIx > aSt.length || aIx < 0) {
                    return null;
                }

                //парный массив. Пара 'индекс начала совпадения' - 'длина совпадения'
                var ms = [];
                //
                var m = [];
                while (m = aRe.exec(aSt)) {
                    if (m.index < aIx) continue;
                    ms.push(m.index);
                    ms.push(m[0].length);
                }

                if (!ms || ms.length < 1) return null;

                var res = '';
                var start = 0;
                for (var i = 0; i < ms.length; i += 2) {
                    res += aSt.substring(start, ms[i]);
                    res += aStRp;
                    start = ms[i] + ms[i + 1];
                }

                //если есть "хвост"
                var x = ms[ms.length - 2] + ms[ms.length - 1];
                if (x < aSt.length) {
                    res += aSt.substring(x);
                }

                return res;
            },

            /**
             * Заменяет в строке (1) диапазоны указанные в (2) текстом указанным тоже в (2).
             * @param aSt string (1) -- строка в которой выполняются замены, например 'aa11cc22ee'
             * @param aArOjs object (2) -- массив объектов (типа type001). Объекты имеют формат {ixStart: , ixEnd: , stForRp: }, где ixStart - индекс начала диапазона цепочка символов которого заменяется, ixEnd - индекс конца диапазона цепочка символов которого заменяется, stForRp - текст которым заменяется цепочка символов. Диапазоны не должны пересекаться. ixStart должен только увеличиваться. Например [{ixStart: 2, ixEnd: 4, stForRp: 'bbb'}, {ixStart: 6, ixEnd: 8, stForRp: 'ddd'}]
             * @returns string строку с выполненными заменами или null при нештате, например 'aabbbccdddee'
             */
            stRpDiaps: function (m105m, aSt, aArOjs) {
                if (!aSt || !aArOjs || aArOjs.length < 1) {
                    return null;
                }

                if (aArOjs.length > 1) {
                    //проверка что ixStart только увеличивается
                    for (var i = 1; i < aArOjs.length; i++) {
                        if (aArOjs[i].ixStart < aArOjs[i - 1].ixStart) {
                            console.warn(':info: ixStart does not increase consistenty ! (stRpDiaps)');
                            return null;
                        }
                    }
                    //проверка что ixStart next всегда больше или равен ixEnd prev
                    for (i = 1; i < aArOjs.length; i++) {
                        if (aArOjs[i].ixStart < aArOjs[i - 1].ixEnd) {
                            console.warn(':info: ixStart next < ixEnd prev ! (stRpDiaps)');
                            return null;
                        }
                    }
                }

                //провера что окончание диапазона всегда больше начала
                for (i = 0; i < aArOjs.length; i++) {
                    if (aArOjs[i].ixEnd < aArOjs[i].ixStart) {
                        console.warn(':info: ixEnd > isStart ! (stRpDiaps)');
                        return null;
                    }
                }

                var ar = [];
                var chIx = 0;
                for (i = 0; i < aArOjs.length; i++) {
                    ar.push(aSt.substring(chIx, aArOjs[i].ixStart));
                    ar.push(aArOjs[i].stForRp);
                    chIx = aArOjs[i].ixEnd;
                }

                //обработка "хвоста"
                if (aSt.length > aArOjs[aArOjs.length - 1].ixEnd) {
                    ar.push(aSt.substring(aArOjs[aArOjs.length - 1].ixEnd));
                }

                return ar.join('');
            },

            /**
             * Ищет в строке (1) подстроку соответствующую рег. выражению (2) начиная с индекса (3) включительно
             * @param aSt (1) -- строка в которой выполняется поиск, например 'aa22bb33cc55dd'
             * @param aRe (2) -- рег. выр., модификатор доступа g обязателен, например 'new RegExp('\\dd\\dd', 'g');'
             * @param aIx (3) -- индекс с которого будет начат поиск, например '3'
             * @returns array массив из двух элементов ['индекс найденного соответствия по отношению к строке (1)', 'длина найденного соответствия']. При нештате или если ничего не найдено возвращается null. Например '[6, 2]'
             */
            stFs: function (m105m, aSt, aRe, aIx) {
                if (!aSt || !aRe || aIx < 0 || aIx > aSt.length) {
                    return null;
                }
                var ms = [];
                var m = [];
                while (m = aRe.exec(aSt)) {
                    if (m.index < aIx) continue;
                    ms.push(m.index, m[0].length);
                    break;
                }
                if (ms.length > 0) {
                    return ms;
                }
                return null;
            },

            /**
             * Поиск в строке (1) @подстроки-закрывающей (3) для @подстроки-открывающей (2)
             * @param aSt (1) -- строка
             * @param aStOpen
             * @param aStClose
             * @param aIxStart
             */
            _work_stFsCloseSu: function (m105m, aSt, aStOpen, aStClose, aIxStart) {

            },

            /**
             * Возвращает объект имена свойств у которого совпадают с подстроками из (1), а значения равны true
             * @param str (1) -- строка с разделителем ',', например 'text1,text2,text3,...'
             * @returns {{}} объект, например {text1: true, text2: true, ...}
             */
            mapMake: function (m105m, str) {
                var obj = {}, items = str.split(",");
                for (var i = 0; i < items.length; i++)
                    obj[items[i]] = true;
                return obj;
            },


            /**
             * Вернет TRUE только в случаях: 1) текст (1) имеет 1+ символов; 2) не содержит пробелов; 3) состоит из символов латиницы A-Za-z или цифр 0-9 или символа подчеркивания "_"
             * @param aSt (1) - любой текст
             */
            stVerifLatins: function (m105m, aSt) {
                if (!aSt) return false;

                var res = /^[a-zA-Z0-9_]+$/.test(aSt);
                return res;
            },

            /**
             * Разбивает строку (1) по разделителю (2) превращая в массив строк и возвращая его
             * @param aString (1) -- строка для разбивки
             * @param aDiv (2) -- разделитель по которому идет разбивка на строки
             * @return Array
             */
            stSplitAr: function (m105m, aString, aDiv) {
                //удаление пробелов в начале
                aString = aString.replace(/^\s*/, "");
                //удаление пробелов в конце
                aString = aString.replace(/\s*$/, "");

                //добавление разделителя в начало если его нет
                var regExp1 = new RegExp("^" + aDiv);
                if (!regExp1.test(aString)) {
                    aString = aDiv + aString;
                }
                //добавление разделителя в конец если его нет
                var regExp3 = new RegExp(aDiv + "$");
                if (!regExp3.test(aString)) {
                    aString = aString + aDiv;
                }

                //получение массива строк
                var regExp = new RegExp(aDiv + ".*?" + "(?=" + aDiv + ")", "igm");
                var array = new Array();
                //получение массива строк
                array = aString.match(regExp);

                //удаление разделителей
                for (var i = 0; i < array.length; i++) {
                    var regExp2 = new RegExp(aDiv, "ig");
                    array[i] = array[i].replace(regExp2, "");
                }

                return array;
            },

            /**
             * Возвращает TRUE если строка (1) является пустонулевой (термин ThStEmpty)
             * @param aSt (1) -- любая строка, в том числе с переносами строк
             */
            stIsEmpty: function (m105m, aSt) { //17.08.2014
                if (/^[\s\n]*$/.test(aSt)) {
                    return true;
                }
                return false;
            },

            /**
             * TRUE если aSt2 содержится в aSt1 1+ раз. Иначе FALSE
             * @param aSt1 {string} (1) -- строка 1, например "aaBBccDD"
             * @param aSt2 {string} (2) -- строка 2, например "Вс"
             * @param aConsiderCase {boolean} (3) -- если TRUE то регистр учитывается
             */
            stIsInSt: function (m105m, aSt1, aSt2, aConsiderCase) {
                //учет/неучет регистра
                if (aConsiderCase !== true) {
                    aSt1 = aSt1.toLowerCase();
                    aSt2 = aSt2.toLowerCase();
                }
                //если содержит
                return aSt1.indexOf(aSt2) !== -1;
            },


            /**
             * Вывод на страницу информации об exec
             * @param aRegExp (1) -- регулярное выражение, например /regexp/igm
             * @param aSt (2) -- строка к которой будет применен (1)
             * @param aComment (3) -- комментарий к данной печати, будет выведен первым
             */
            rx_execPrint: function (m105m, aRegExp, aSt, aComment) {
                document.write('<br>');
                document.write('<br><xmp>===print exec, comment [' + aComment + ']===</xmp>');
                var c = 0;
                var ex;
                while (ex = aRegExp.exec(aSt)) {
                    document.write('<br><xmp>===' + (++c) + '===</xmp>');
                    document.write('<br><xmp>ex.length=[' + ex.length + ']</xmp>');
                    for (var i = 0; i < ex.length; i++) {
                        document.write('<br><xmp>ex[' + i + ']=[' + ex[i] + ']</xmp>');
                    }
                }
            },


            /**
             * Возвращает число вхождений сроки (2) в строку (1)
             * @param aStr (1) -- строка в которой ищется
             * @param aFind (2) -- строка которая ищется
             * @returns int [0..]
             */
            stCt: function (m105m, aStr, aFind) {

                var res = 0;
                var ln = aFind.length;
                var start = 0;
                var ix = -1;
                do {
                    ix = aStr.indexOf(aFind, start);
                    if (ix !== -1) {
                        res++;

                    }
                    start = ix + ln;
                } while (ix !== -1);

                return res;
            },

            /**
             * Ищет в строке текст ограниченный скобками (2) и (3) и возвращает такие тексты в виде массива.
             * Например this("aa[bb]cc[dd]ee", "[", "]") вернет массив {"bb", "dd"}
             * @param aTx (1) -- исходная строка
             * @param aLeBracket (2) -- символ левого ограничителя текста, например "["
             * @param aRiBracket (3) -- символ правого ограничителя текста, например "]"
             * @returns {array} пустой массив при нештате
             */
            stInBrackets: function (m105m, aTx, aLeBracket, aRiBracket) {
                //"тушение" спец. символов рег. выражений
                var bLe = th.STR.rx_spcSymbolsDismiss('', aLeBracket);
                var bRi = th.STR.rx_spcSymbolsDismiss('', aRiBracket);

                var rx = new RegExp(bLe + '([^' + bLe + bRi + ']*?)' + bRi, "g");
                var ar = [];
                var x;
                while (x = rx.exec(aTx)) {
                    ar.push(x[1]);
                }
                return ar;
            },

            /**
             * Вставляет в строку (1) строку (2) в позицию по индексу (3)
             * @param aTx (1) -- строка в которую выполняется вставка, например "aacc"
             * @param aStIns (2) -- строка которая вставляется, например "bb"
             * @param aIxIns int (3) -- индекс по которому вставляется, например 2
             * @returns string строка со вставленным текстом, например "aabbcc", или null при неполадках
             */
            stInsert: function (m105m, aTx, aStIns, aIxIns) {

                if (aTx == null || aStIns == null || aIxIns === undefined) return null;
                if (aIxIns < 0 || aTx.length < aIxIns) return null;

                if (aTx.length === 0 && aIxIns === 0) {
                    return aStIns;
                }

                var aa = aTx.substr(0, aIxIns);
                var cc = aTx.substr(aIxIns);
                return aa + aStIns + cc;

            },

            /**
             * Множественная вставка в одну строку других строк.
             * Вставляет в строку (1) строки из (2) в заданные позиции (индексы)
             * @param aTx string (1) -- строка, например "aaccee"
             * @param aMap object (2) -- ассоциативный массив, пример общий {индекс1:строка1, ...}, пример конкретный {4:"bb", 2:"dd"}. Ключи (индексы) должны быть уникальными
             * @returns string строка с заменами, например "aabbccddee". NULL при неудачах
             */
            stInsertMult: function (m105m, aTx, aMap) { //create 19.08.2014

                //массив ключей - индексов вставки текста; выделяем ключи и упорядочиваем по возрастанию
                var keys = [];
                for (key in aMap) {
                    keys.push(key);
                }
                keys.sort();

                //проверки
                if (keys.length < 1) return null;
                if (keys[keys.length - 1] > aTx.length) return null;

                var res = '';
                var start = 0;
                var i = 0;
                for (var k in aMap) {
                    res += aTx.substring(start, keys[i]);
                    res += aMap[keys[i]];

                    start = keys[i];
                    i++;
                }

                //хвост
                i--;
                if (keys[i] < aTx.length) {
                    res += aTx.substr(keys[i]);
                }

                return res;

            },

            /**
             * Удаление пробелов в начале и конце строки (1)
             * @param aString (1) -- строка
             * @return String Строка без пробелов в начале и конце
             */
            spacesDe: function (m105m, aString) {
                aString = aString.replace(/^\s*/, "");
                aString = aString.replace(/\s*$/, "");
                return aString;
            },

            /**
             * "убивание" специальных-символов-рег.выражений которые могут быть в
             * тесте поиска введенном пользователем - выполняется их экранирование двумя обратными
             * слэшами, например, до "[[privet", после "\\[\\[privet"
             * @param aTx (1) -- текст который нужно изменить
             * @return String измененный текст
             */
            rx_spcSymbolsDismiss: function (m105m, aTx) {
                return aTx.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/g, "\\$&");
            }

        }
    }();


    // =============== DOMs ==============

    this.DOMX = function () {
        return {
            /**
             * Ищет форму (1), в ней группу radio (2), определяет какой из radio отмечен и возвращает его value
             * @param aFormId (1) -- id формы, например "forma"
             * @param aNmRadios (2) -- name группы radio, например "radios" (у группы radio name должен быть одинаковыми)
             * @return
             */
            getRadioVal: function (m105m, aFormId, aNmRadios) {
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
            },
            /**
             * Возвращает позицию которая сечас выбрана в выпадающем списке SELECT.
             * Используется jQuery
             * @param aIdSel (1) -- id списка SELECT, например '#nameSelect'
             * @returns {int} позиция 0..n, -1 при нештате
             */
            getSelectSelectedPos: function (m105m, aIdSel) {
                var ret = -1;

                var ct = 0;
                $(aIdSel + ' option').each(function () {
                    if ($(this).get(0).selected) {
                        ret = ct;
                        return;
                    }
                    ct++;
                });

                return ret;
            },
            /**
             * Перезагрузка страницы
             */
            reloadPg: function (m105m) {
                location.reload();
            },
            /**
             * Выводит в консоль свойства (со значениями) объекта (1)
             * @param oj (1) -- объект
             */
            printPropOj: function (m105m, oj) {
                for (var p in oj) {
                    console.log(p + '=' + oj[p]);
                }
            }
        };
    }();


    // =============== Ars - Массивы ==============

    this.ARS = function () {

        return {
            /**
             * Сортировка массива (1) в лексографическом порядке
             * @param aAr (1) -- массив, например ["a", "b", ..]
             * @param aMod (2) -- порядок сортировки, если не указано или =="p_up" или !=="p_down", то по возврастанию,
             * если =="down", то по убыванию
             * @returns {array} отсортированный массив
             */
            arSortMult: function (m105m, aAr, aMod) {
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
            },

            /**
             * Функция помогающия в формировании массива из строк, например формирует массив вида '["elem1", "elem2", "elem3"]'
             * Работает внутри циклов.
             * @param aSt (1) -- очередная строка
             * @param aI (2) -- текущий индекс
             * @param aLenght (3) -- общая длина массива
             * @param aStartIx (4) -- значение стартового индекса
             * @return {string} строка для добавления в формируюемую строку массива, например "[" или "\"elem1\", "
             */
            arForming: function (m105m, aSt, aI, aLenght, aStartIx) {
                var ret = '';
                if (aI === aStartIx) ret += '[';
                ret += '"' + aSt + '"';
                if (aI < aLenght - 1) ret += ', ';
                if (aI === aLenght - 1) ret += ']';
                return ret;
            },

            /**
             * Сортировка массива (1) в лексографическом порядке и удаление дубликатов
             * @param aAr (1) -- массив, например ["a", "b", ..]
             * @param aMod (2) -- порядок сортировки, если не указано или =="p_up" или !=="p_down", то по возврастанию,
             * если =="down", то по убыванию
             * @returns Array отсортированный массив без дубликатов
             */
            arRemoveDublicatesAaSortMult: function (m105m, aAr, aMod) {
                if (aAr.length < 2) {
                    return aAr;
                }

                //сортировка
                var ar = th.ARS.arSortMult('', aAr, aMod);

                var res = [];
                res.push(ar[0]);
                for (var i = 1; i < ar.length; i++) {
                    if (ar[i] !== ar[i - 1]) {
                        res.push(ar[i]);
                    }
                }

                return res;
            }
        };
    }();


    // =============== Events - События ==============
    this.EVENT = function () {
        return {

            /**
             * G63G-функция : Запуск поиска по нажатию Enter
             */
            startByEnter: function (m105m) {
                //данная конструкция срабатывает при каждом изменении в поле ввода
                $('#someId').keypress(function () { //как правило - поле ввода
                    var e = event.keyCode;
                    if (e == 13) {  //код соответствующий клавише Enter
                        someFunction(); //функция которая будет выполнена по нажатию Enter
                        //далее инструкция чтобы браузер не выполнял действий, иначе результат поиска не будет выведен
                        // в консоли и будет сообщение f140f
                        return false;
                    }
                });
            }
        }
    }();


    // =============== Types - Типы ==============
    this.TYPS = function () {
        return {
            /**
             * Тип. Используется при заменах текста
             * @returns {{ixStart: number, ixEnd: number, stForRp: string}}
             */
            type001: function (m105m) {
                return {ixStart: -1, ixEnd: -1, stForRp: ''};
            },

            /**
             * Объект описания парного тега
             */
            type002: function (m105m) {
                return {
                    ThTag: undefined, //вся конструкция тега целиком, например '<tag>text</tag>'
                    ThTTag: undefined, //имя тега, например 'tag'
                    ThTLeft: undefined, //открывающая часть, например '<tag>'
                    ThTRight: undefined, //закрывающая часть, например '</tag>'
                    ThTText: undefined, //текст тега, например 'text'
                    ThTIxLeS: undefined, //индекс окрытия тега, например '0'
                    ThTIxLeE: undefined, //индекс окончания окрывающей части тега, например '5'
                    ThTIxRiS: undefined, //индекс начала закрывающей части тега, например '9'
                    ThTIxRiE: undefined //индекс конца тега, например '15'
                };
            }
        }
    }();

    // =============== jQuery =================

    this.JQ = function () {
        return {
            /**
             * Если (2) это m108m@тег, то возвращает его outerHTML, если (2) это m108m@межтекст, то возвращает строку данного @межтекста
             * @param m105m (1)
             * @param jqOj (2) -- jQuery-объект описывающий единичный m108m@тег-юнит
             * @returns {string|outerHTML|*}
             */
            emContent: function (m105m, jqOj) { //в работе
                var h = jqOj.get(0).outerHTML;
                if (!h) h = jqOj.text();
                return h;
            },

            /**
             * Терминология: m108m. Возвращает строку состоящую из конкатенации @тег-юнит-строк всех элементов из (2)
             * @param m105m
             * @param jqOj (2) -- набор элементов, объект jQuery
             * @param mode (3) -- если =1, то каждая @тег-юнит-строка начинается с новой строки, и предваряется порядковым номером с двоеточием, например "1 : <br>"
             * @returns {string}
             * @deprecated ограниченно корректная работа. Вместо этого следует использовать метод html_c
             */
            html_b: function (m105m, jqOj, mode) {
                var ret = '';
                if (jqOj.length < 2) {
                    return ((mode) ? '1 : ' : '') + th.JQ.emContent('', jqOj);
                } else { //если набор элементов
                    var ct = 0;
                    jqOj.each(function () {
                        ct++;
                        ret += ((mode) ? ('\n' + ct + ' : ') : '') + th.JQ.emContent('', $(this));
                    });
                    return ret;
                }
            },

            /**
             * {терминология: m108m} Возвращает строку состоящую из конкатенации @тег-юнит-строк элементов из (2)
             * @param m105m (1) -- для логгирования
             * @param jqOj (2) -- набор элементов, объект jQuery
             * @param mode (3) -- если <> 0, то вовщращает в виде одной строки; если =1, то каждая @тег-юнит-строка начинается с новой строки, и предваряется порядковым номером
             * с двоеточием, например "1 : <br>"
             * @returns {string}
             */
            html_c: function (m105m, jqOj, mode) {
                var ret = '';
                var ar = jqOj.toArray();
                for (var i = 0; i < ar.length; i++) {
                    var e = ar[i];
                    var h = '';
                    switch (e.nodeType) {
                        case 1:
                            h = e.outerHTML;
                            break;
                        case 3:
                            h = e.data;
                            break;
                        case 8:
                            h = '<!' + '--' + e.textContent + '--' + '>';
                            break; //в IE можно просто взять .data, а в FF и Chrome это не работает
                    }
                    if (h) {
                        //h = h.replace(/</g, '&lt;');
                    }
                    ret += ((mode) ? ('\n' + (i + 1) + ' : ') : '') + h;
                }
                return ret;
            },

            /**
             * Преобразует (2) в m108m@п-объект и возвращает его
             * @param m105m (1) --
             * @param html (2) -- любая HTML-строка
             * @param mode (3) -- не используется
             * @returns {} m108m@п-объект
             */
            pObject: function (m105m, html, mode) {
                return $(th.JQ.tgMixEnable('', html, 0));
            },

            /**
             * Возвращает информацию обо всех элементах (2) в виде HTML-таблицы
             * @param m105m
             * @param jqOj (2) -- jQuery-объект
             * @param mode (3) -- не используется
             */
            infoTable: function (m105m, jqOj, mode) {
                var ret = '<table border="1"><tr>' +
                    '<th>@блок-строка</th>' +
                    '<th>nodeType</th>' +
                    '<th>nodeName</th>' +
                    '<th>text</th>' +
                    '<th>data</th>' +
                    '<th>textContent</th>' +
                    '<th>innerHTML</th>' +
                    '<th>innerText</th>' +
                    '<th>outerHTML</th>' +
                    '<th>outerText</th>' +
                    '</tr>';
                var ar = jqOj.toArray();
                for (var i = 0; i < ar.length; i++) {
                    var e = ar[i];
                    var h = ar[i].outerHTML;
                    if (!h) h = ar[i].textContent;
                    h = h.replace(/</g, '&lt;');

                    var nodeType = (ar[i].nodeType) ? ar[i].nodeType : '';
                    var nodeName = (e.nodeName) ? e.nodeName : '';
                    var text = (e.text) ? e.text.replace(/</g, '&lt;') : '';
                    var data = (e.data) ? e.data.replace(/</g, '&lt;') : '';
                    var textContent = (e.textContent) ? e.textContent.replace(/</g, '&lt;') : '';
                    var innerHTML = (e.innerHTML) ? e.innerHTML.replace(/</g, '&lt;') : '';
                    var innerText = (e.innerText) ? e.innerText.replace(/</g, '&lt;') : '';
                    var outerHTML = (e.outerHTML) ? e.outerHTML.replace(/</g, '&lt;') : '';
                    var outerText = (e.outerText) ? e.outerText.replace(/</g, '&lt;') : '';

                    ret += '<tr>' +
                    '<td>' + h + '</td>' +
                    '<td>' + nodeType + '</td>' +
                    '<td>' + nodeName + '</td>' +
                    '<td>' + text + '</td>' +
                    '<td>' + data + '</td>' +
                    '<td>' + textContent + '</td>' +
                    '<td>' + innerHTML + '</td>' +
                    '<td>' + innerText + '</td>' +
                    '<td>' + outerHTML + '</td>' +
                    '<td>' + outerText + '</td>' +
                    '</tr>';
                }
                ret += '</table>';
                return ret;
            },

            /**
             * Выполнение m108m@подмешивания-тип-1 в HTML-строке (2) (выполняется замена последних символов @тегов-hhb на "_")
             * @param m105m (1) -- для логгирования
             * @param html (2) -- HTML-строка
             * @param mode (3) -- не используется
             */
            tgMixEnable: function (m105m, html, mode) {
                var ret = html.replace(/(<\s*)html/gi, '$1htm_');
                ret = ret.replace(/(<\s*\/\s*)html/gi, '$1htm_');

                ret = ret.replace(/(<\s*)head/gi, '$1hea_');
                ret = ret.replace(/(<\s*\/\s*)head/gi, '$1hea_');

                ret = ret.replace(/(<\s*)body/gi, '$1bod_');
                ret = ret.replace(/(<\s*\/\s*)body/gi, '$1bod_');

                return ret;
            },

            /**
             * Выполняет @удаление-подмешивания (@подмешивания-тип-1) из HTML-строки (2)
             * @param m105m (1) -- для логгирования
             * @param html (2) -- HTML-cтрока
             * @param mode (3) -- не используется
             */
            tgMixDisable: function (m105m, html, mode) {
                var ret = html.replace(/(<\s*)htm_/gi, '$1html');
                ret = ret.replace(/(<\s*\/\s*)htm_/gi, '$1html');

                ret = ret.replace(/(<\s*)hea_/gi, '$1head');
                ret = ret.replace(/(<\s*\/\s*)hea_/gi, '$1head');

                ret = ret.replace(/(<\s*)bod_/gi, '$1body');
                ret = ret.replace(/(<\s*\/\s*)bod_/gi, '$1body');

                return ret;
            },

            /**
             * _@m108m. Получение из (2) jQuery-объекта с @селект-угодниками (3) при условии что
             *   они расположены на @первом-уровне @селект-угодников (4)
             * @summary короче говоря, возвращает указанных @детей указанных @родителей вне зависимости от расположения в иерархии этих родителей
             * @param m105m (1) --
             * @param jq (2) -- jQuery-объект
             * @param srChild (3) -- @селектор искомых элементов
             * @param srParent (4) -- @селектор @родителей искомых элементов
             * @returns {object} jQuery-объект (набор)
             */
            match: function (m105m, jq, srChild, srParent) {
                var jq1 = jq.find(srParent).children(srChild);
                return jq.filter(srParent).children(srChild).add(jq1);
            },

            /**
             * Извлечение из (2) всех @селект-угодников (3)
             * @param m105m
             * @param jq (2) -- jQuery-обхект
             * @param sr (3) -- селектор, например "a"
             * @returns {object} jQuery-объект
             */
            matchAll: function (m105m, jq, sr) {
                var jq1 = jq.find(sr);
                return jq.filter(sr).add(jq1);
            }
        }
    }();

    // =============== jQuery =================
    this.JSONM = function () {
        /*
         var j = {
         "a":"111",
         "j":[],
         "b":{
         "c":"222",
         "g":{
         "h":"999"
         }
         },
         "d":[{
         "e":"333",
         "i":"777"
         }, {
         "f":"444"
         }]
         };
         */
        /*
         var j = [
         {"a": 1, "b": [
         {"c": 2},
         {"d": 3}
         ]}
         ];
         */
        var f = function (p, oj) {
            console.log("p=" + p + "; oj[p]=" + oj[p]);

        };

        return {
            passer: function (oj) {
                var k;
                for (k in oj) {
                    if (oj[k] instanceof Object) {
                        //console.log(k+" is object");
                        th.JSONM.passer(oj[k]);
                    } else {
                        f(k, oj);
                    }
                }
            }
        }

    }();

    // =============== Misc - Разное ==============
    this.MISC = function () {
        return {

            /**
             * Возвращает количество свойств объекта (1)
             * @param obj (1) -- объект
             * @returns {number}
             */
            propertiesCt: function (m105m, obj) {
                var count = 0;
                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop))
                        ++count;
                }
                return count;
            },

            /**
             * Преобразование массива объектов в строку для возможности вывести в консоль
             * @param ar (1) -- массив объектов
             * @returns {string}
             */
            массивОбъектовВСтрокуДляПечати: function (ar) {
                var ret = "";
                var inn = "";
                for (var i = 0; i < ar.length; i++) {
                    inn = "{";
                    var ct = 0;
                    for (var f in ar[i]) {
                        if (ct > 0) inn += ", ";
                        inn += f;
                        inn += ': ' + ar[i][f];
                        ct++;
                    }
                    inn += "}";
                    ret += inn;
                    if (i < ar.length - 1) {
                        ret += ", ";
                    }
                }
                return "[" + ret + "]";
            }

        }
    }();


    //==================================================
    //===============Библиотека g64g====================
    //==================================================
    this.G64G = function () {
        return {

            /**
             * Получает из конфигурационного файла (1) значение по ключу (2).
             * Работает с форматом хранения "key: value"
             * @param aThFiNmR11 (1) -- относительное имя файла, например "folder\\file.txt"
             * @param aKey (2) -- ключ по которому ищется значение
             * @returns {string} найденное значение (например: "t" или "") или null при нештате
             */
            yg64g_getVa: function (m105m, aThFiNmR11, aKey) {
                //объект файловой системы
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                //абсолютное имя файла
                var thFiNm111 = th.FI.fdPa('') + '\\' + aThFiNmR11;
                //проверка существования файла
                if (!th.FI.fiExist('', thFiNm111, fso)) {
                    console.log("(!) file not exist");
                    return null;
                }

                var rx = new RegExp("^\\s*" + aKey + "\\s*:\\s*(.*?)\\s*$", "m");

                //1 - открытие файла только для чтения
                // false - если файла нет, то он не создается
                var textStream = fso.OpenTextFile(thFiNm111, 1, false, g_encoding);
                var line = "";
                //noinspection JSUnresolvedVariable
                while (!textStream.AtEndOfStream) {
                    //считывание следующей строки
                    var line = textStream.ReadLine();

                    var ex;
                    if (ex = rx.exec(line)) {
                        textStream.Close();
                        return ex[1];
                    }
                }
                textStream.Close();
                return null;
            },

            /**
             * Обновляет в конфигурационном файле (1) значение ключа (2) значением (3).
             * Работает с форматом хранения "key: value".
             * @param aThFiNmR11 (1) -- относительное имя файла, например "folder\\file.txt"
             * @param aKey (2) -- ключ по которому ищется значение
             * @param aVa (3) -- значение для обновления
             * @returns {boolean} true если находит ключ и успешно выполняет перезапись, false во всех остальных случаях
             */
            yg64g_udVa: function (m105m, aThFiNmR11, aKey, aVa) {
                //объект файловой системы
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                //абсолютное имя файла
                var thFiNm111 = th.FI.fdPa('') + '\\' + aThFiNmR11;
                //проверка существования файла
                if (!th.FI.fiExist('', thFiNm111, fso)) {
                    console.log("(!) file not exist");
                    return false;
                }

                var rx = new RegExp("^\\s*" + aKey + "\\s*:.*$", "m");

                var arLines = [];
                var exist = false;

                //ФОРМИРОВАНИЕ временного массива строк
                //1 - открытие файла только для чтения
                // false - если файла нет, то он не создается
                var textStream = fso.OpenTextFile(thFiNm111, 1, false, g_encoding);
                var line = "";
                //noinspection JSUnresolvedVariable
                while (!textStream.AtEndOfStream) {
                    //считывание следующей строки
                    var line = textStream.ReadLine();

                    if (!exist && rx.test(line)) {
                        arLines.push(aKey + ": " + aVa);
                        exist = true;
                    } else {
                        arLines.push(line);
                    }
                }
                textStream.Close();

                if (!exist) {
                    return false;
                }

                return th.FI.fiCreateFromAr('', aThFiNmR11, arLines);
            },

            /**
             * Проверка наличия в конфигурационном файла (2) ключа (3).
             * Работает с форматом хранения "key: value".
             * @param m105m (1)
             * @param aThFiNmR11 (2) -- относительное имя файла, например "folder\\file.txt"
             * @param aKey (3) -- ключ
             * @returns {boolean} true если находит ключ, false во всех остальных случаях
             */
            yg64g_verifyKeyExist: function (m105m, aThFiNmR11, aKey) {
                //объект файловой системы
                var fso = new ActiveXObject("Scripting.FileSystemObject");
                //абсолютное имя файла
                var thFiNm111 = th.FI.fdPa('') + '\\' + aThFiNmR11;

                //проверка существования файла
                if (!th.FI.fiExist('', thFiNm111, fso)) {
                    console.log("(!) file not exist");
                    return false;
                }

                var rx = new RegExp("^\\s*" + aKey + "\\s*:.*$", "m");

                //ФОРМИРОВАНИЕ временного массива строк
                //1 - открытие файла только для чтения
                // false - если файла нет, то он не создается
                var textStream = fso.OpenTextFile(thFiNm111, 1, false, g_encoding);
                var line = "";
                //noinspection JSUnresolvedVariable
                while (!textStream.AtEndOfStream) {
                    //считывание следующей строки
                    var line = textStream.ReadLine();

                    if (rx.test(line)) {
                        textStream.Close();
                        return true;
                    }
                }
                textStream.Close();

                return false;
            }
        }
    }();

};
