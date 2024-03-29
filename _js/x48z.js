//техника m93m - актуализация ссылок

//массив с объектами вида {
// pgNm: 'ThFiNm11 страницы в которой нужно выполнить замену',
// stForRp: 'текст для замены',
// isStart: 'индекс начала диапазона замены',
// ixEnd: 'индекс окончания диапазона замены'}
var yx48z_ArNoEq = [];

/**
 * Определение соответствия линков в пересечениях
 */
function x48z_fn(){

    var m1 = null;

    //имена всех страниц проекта
    var nms = yg54g_Storages_getCrips_B(g_stProjectRootPath, 0, yx23z_re);
    //console.log("nms=["+nms+"]");

    var fso = yg54g_Storages_getFileSystemObject_node(m1);

    var arTrs = [];
    yx48z_ArNoEq = [];

    var ch = 1;
    logif2('-- перед циклом /внутри x48z_fn/');
    for (var i = 0; i < nms.length; i++) {
        var im = nms[i];

        //получение содержимого страницы по ссылке в виде строки
        var st = yg54g_Storages_readFi_B_node(m1, g_stProjectRootPath+'\\'+im,fso);
        //извлечение содержимого тега title
        var oj = yg54g_Strings_html_getTgTxOne_ByTgNm(st,'title');
        var title = oj.ThTText;

        //проверка грубая на наличие блока пересечений
        if(st.indexOf('x41z_blocks') === -1) continue;

        //парсинг содержимого страницы, преобразование в массив объектов по технике m94m
        var ar = m94m_getTreeAsAr(st);
        console.log("--");
        console.log("ar.length==["+ar.length+"]");

        //массив объектов ссылок вида {ixStart: ixEnd: stForRp:} расположенных внутри блока пересечений. На месте stForRp располагается HREF ссылки
        var ojs = m94m_get01(ar, 'a', 'x41z_blocks', im);


        for (var i1 = 0; i1 < ojs.length; i1++) {
            var im1 = ojs[i1];
            //текст ссылки на странице-хранителе-ссылки [[SHS]]
            var s = st.substring(im1.ixStart, im1.ixEnd);

            //ИЗВЛЕЧЕНИЕ title страницы-на-которую-указывает-ссылка [[SUS]] на базе ссылки на странице [SHS]
            //получение содержимого страницы
            var st1 = yg54g_Storages_readFi_B_node(null, g_stProjectRootPath+'\\'+im1.stForRp, fso);
            //получение title
            var oj1 = yg54g_Strings_html_getTgTxOne_ByTgNm(st1,'title');
            var title1 = oj1.ThTText;
            if(!title1) {
                console.log("title1 is null");
                continue;
            }

            var eq = '+';
            var eq2 = ' class="eq" ';
            if(title1 !== s) {
                eq = 'no equal';
                eq2 = '';
                im1.stForRp = title1;
                yx48z_ArNoEq.push(im1);
            }

            var tr = '<tr'+eq2+'><td>'+ ch++ +'</td><td><a href="'+im+'">'+im+'</a></td><td>'+s+'</td><td>'+title1+'</td><td>'+eq+'</td></tr>';
            arTrs.push(tr);
        }
    }

    $('#x48z_res_table').css('visibility', 'visible');
    for (var i3 = 0; i3 < arTrs.length; i3++) {
        $('#x48z_res_table').append(arTrs[i3]);
    }

    var en = '';
    if(yx48z_ArNoEq.length < 1) {
        en = ' disabled="disabled" ';
    }
    $('#x48z_res_table').before('<br><div>Количество несоответствий: '+yx48z_ArNoEq.length+'</div>');
    $('#x48z_res_table').before('<input type="button" '+en+' value="Устранить несоответствия" onclick="x48z_fn_rp();" />');
    $('#x48z_res_table').before('<br><input type="checkbox" '+en+' onclick="if(this.checked) { $('+"'.eq'"+').hide();} else {$('+"'.eq'"+').show();}"  /> отобразить только несоответствия');
    $('#x48z_res_table').before('<br><br>');

}

function x48z_fn_rp(){
    var m1 = null;
    console.log("yx48z_ArNoEq=["+yx48z_ArNoEq.length+"]");

    var fso = yg54g_Storages_getActiveXObjectFileSystem();
    var ch2 = 0;
    for (var i = 0; i < yx48z_ArNoEq.length; i++) {
        var im = yx48z_ArNoEq[i];

        var a = im.ixStart;
        var b = im.ixEnd;
        var c = im.stForRp;
        var d = im.pgNm;
        console.log("a=["+a+"]");
        console.log("b=["+b+"]");
        console.log("c=["+c+"]");
        console.log("d=["+d+"]"); //g8g

        var stPg = yg54g_Storages_readFi_C_node(m1, g_stProjectRootPath+'\\'+d);
        //console.log("stPg=["+stPg+"]");
        var newSt;
        if(stPg){
            newSt = yg54g_Strings_rpTxsDiaps(stPg, [im]);
        }
        console.log("newSt=["+newSt+"]");

        //замена файла обновленным содержимым
        yg54g_Storages_rpFi_node(i+'^'+m1, null, g_stProjectRootPath+'\\'+d, newSt, fso);
        ch2++;
    }
    alert('Выполнено '+ch2+' замен');
}


//=============================
