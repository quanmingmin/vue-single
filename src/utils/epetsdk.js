import {EpetApp} from '@/utils/localapp'
import axios from 'axios'

axios.defaults.timeout = 5000;
axios.interceptors.request.use(
    config =>{
        const token = EpetJs.Common.getcookie('session');
        config.data = JSON.stringify(config.data);
        config.headers = {
        'Content-Type':'application/x-www-form-urlencoded'
        }
        if(token){
            config.params = {'token':token}
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
)

export const EpetJs = {
    Const : {
            PROTOCOL:'http',//协议(http、https)
            DOMAIN:'.epet.com',//域名
            RESOURCE_URL:'',//静态资源路径
            API_PATH:'mall.api',//接口URL头
            PlAFORM:'wap',//平台(android|iphone|wap|pc|weixin)
            VERSION:0,//版本号
            FW:0,
            ENV:'product',//开发环境(dev、sx、local)
            PORT:{
                wap:8080,
                sale:9090,
                hk:1010
            },


    },
    Common : {
        post:function(url,params={}){
            var dev = EpetJs.Helper.getUrlParam('dev');
            var noDev =  EpetJs.Helper.getUrlParam('noDev');
            var version = params['version'] ? params['version'] :'303';
            if(dev != null && noDev == null){
                data.dev = dev;
            }
            params = $.extend(params, {'isWeb':1,'system':'wap','version':version});
            if(params.issite){
                 var apirules = JSON.parse(sessionStorage.getItem('apirules'));
                 if(apirules){
                     return EpetJs.Helper.postApiurl(url,apirules,params)  
                 }else{
                    return EpetJs.Common.get('main.html?do=appInit',{version:params.version})
                    .then((res) =>{
                        return EpetJs.Helper.postApiurl(url,res,params);
                    })
                 }
            }else{
                var urlValue = EpetJs.Helper.createApiUrl(url);
                return EpetJs.Helper.ajaxRequest(urlValue,params,'POST');

            }
        },
        get : function (url,params={}) {
            var dev = EpetJs.Helper.getUrlParam('dev');
            var noDev =  EpetJs.Helper.getUrlParam('noDev');
            var version = params['version'] ? params['version'] :'303';
            if(dev != null && noDev == null){
                data.dev = dev;
            }
            params = $.extend(params, {'system' : 'wap','isWeb' : 1,'version':version});
            if(params.issite){
                 var apirules = JSON.parse(sessionStorage.getItem('apirules'));
                  if(apirules){
                    return EpetJs.Helper.getApiurl(url,apirules,params)  
                  }else{
                    return EpetJs.Common.get('main.html?do=appInit',{version:params.version})
                    .then((res) =>{
                        return EpetJs.Helper.getApiurl(url,res,params);
                    })
                  }

            }else{
                 var urlValue = EpetJs.Helper.createApiUrl(url);
                 return EpetJs.Helper.ajaxRequest(urlValue,params,'GET');
             }
        
        },
        createUrl : function(app,arg={}){
            var apps = app.split(":");
            var domain = location.host, app = apps[0];
            var cookDomain = EpetJs.Const.DOMAIN;
            var port = app ? ':'+EpetJs.Const.PORT[app] : '';
            if( apps.length > 1){
                if(app == 'hk'){
                   if(EpetJs.Const.ENV == 'local'){
                        cookDomain = '.local.epetht.com' + port;
                   } else if(EpetJs.Const.ENV == 'dev'){
                        cookDomain = '.hk.epet.com';
                   }else{
                        cookDomain = '.epetht.com';
                   }
                }else{
                    if(EpetJs.Const.ENV == 'local'){
                        cookDomain = '.local.epet.com' + port;
                    } else if(EpetJs.Const.ENV == 'dev'){
                        cookDomain = '.dev.epet.com';
                    }else if(EpetJs.Const.ENV == 'sx'){
                        cookDomain = '.sx.epet.com';
                    }else{
                        cookDomain = '.epet.com';
                    }
                }
                domain = apps[0] + cookDomain;
                app = apps[1];
            }
           
            return EpetJs.Common.formatUrl(EpetJs.Const.PROTOCOL + '//' + domain + '/' + app,arg);
        },
        /*
        * 添加到购物车
        * @param {json} data json对象，添加到购物车需要的参数
        * @param {function} callback 添加到购物车后的回调方法
        **/
        addCart : function(data,callback){
            if(EpetJs.Const.FW!=0){//如果在原生APP里边，就执行原生加入购物车方法
                return EpetApp.addCart(data,callback);
            }
            EpetJs.Common.post('cart.html?do=addToCart',data,function(sucessData){
                if(sucessData.code == 'confirm'){
                    Vue.$vux.confirm.show({
                        title:'',
                        content:sucessData.msg,
                        confirmText:'去购物车',
                        cancelText:'继续购物',
                        onConfirm(){
                            location.href = EpetJs.Common.createUrl("wap:cart");
                        },
                        onCancel(){
                             callback && callback(sucessData);
                        }
                    })
                }else if(sucessData.code == 'alert'){
                    Vue.$vux.alert.show({
                        title:'',
                        content:sucessData.msg
                    })
                }else if (sucessData.code == 'not_login'){
                    Vue.$vux.comfirm.show({
                        title:'',
                        content:sucessData.msg,
                        onConfirm(){
                            EpetJs.Common.locationTo('wap:login');
                        },
                        onCancel(){
                             callback ? callback() : '';
                        }
                    })
                }
            })
        },
        
        /**
        * 格式化一个地址（拼接fw、拼接地址栏参数）
        *@param {string} url url地址
        *@param {object} arg 将要拼结的参数对象
        *用法示例：EpetJs.Common('list/goods.html','pet_type')
        */
        formatUrl : function(url,arg){
            var devParam = EpetJs.Helper.getUrlParam('dev');
            if(url == ''|| url == undefined) return "";
            if(typeof (arg) != "object") arg = {};
            if(EpetJs.Helper.getUrlParam('dev',url) == null && devParam != null) arg.dev = devParam;
            var linkPrams = (url.indexOf('?') > 0) ? "&" : "?";
            url =  EpetJs.Helper.isEmptyObject(arg) ? url : url + linkPrams;
                for(var index in arg){
                    url += index + "=" + arg[index] + "&";
                }
                    return url.replace(/&$/,'');
        },
        locationTo : function(url,strJson,callback){
            var relurl = document.location.href;
            if(EpetJs.Const.FW != 0 &&  url.split(":")[1] == "login"){
                return EpetApp.Login(callback);
                
            }else{
             return window.location.href =  EpetJs.Common.formatUrl(EpetJs.Common.createUrl(url,strJson),{'referrer':escape(relurl)});
            }
        },
        /**
         * [getImg description]
         * @param  {[string]} url    [原图片地址]
         * @param  {[int]} width  [图片宽度]
         * @param  {[int||string]} height  [图片高度] height为“”空，表示高宽一样
         * @param  {[string]} type   [裁剪类型：a=缩放，c=裁剪，b=补白,s = 索引按高度切割]
         * @param  {[bool]} gifFilter  为true 表示对gif图片不进行裁剪处理
         * @return {[type]}        [新的图片地址]
         */
        getCutImage : function(url,width,height,type,gifFilter){
            if(url==''|| typeof url == 'undefined') return '';
            var reg = /@!water/;
            if(reg.test(url)){
                 url = url.replace(/@!water/g,'');
            }
            if(gifFilter && /\.(gif)$/.test(url)){
                return url;
            }
            var fillUrl = url+"?x-oss-process=style/fill&$1=" + width + "&$2=";
            var cutUrl = url+"?x-oss-process=style/cut&$1=" + width + "&$2=";
            var aUrl = url+"?x-oss-process=style/waterfall&$1=" + width;
            var sUrl = url+"?x-oss-process=style/index_y&$1=" + height + "&$2=";
            switch(type){
                case 'b':
                if(typeof height == "number"){
                    return fillUrl + height;
                }
                return fillUrl + width;
                break;
                case 'a':
                return aUrl;
                break;
                case 's':
                return sUrl;
                break;
                default:
                    if(typeof height == "number"){
                            return cutUrl + height;//一般性裁剪
                    }
                        return cutUrl + width;
            }
        },
        getGoodsImage : function(url,width){
            return EpetJs.Common.getCutImage(url,width,0,'b');
        },
        /**
        * 同步APP的cookies 到 wap
        * @param {int} time 设置cookie的过期时间
        * @param {function} callback cookies同步成功后的回调方法
        */
        syncAppcookieToWap : function(time,callback){
            setTimeout(function(){
                var cookeis = JSON.parse(window.native.jsCallNativeGetCookies())||JSON.parse(epetmall.jsCallNativeGetCookies());
                $.each(cookeis, function (key, cookie) {
                    EpetJs.Common.setcookie(cookie.name, cookie.value,time);
                });
                    callback && callback();
            },500)
        },
      
        logOut: function () {
            EpetJs.Common.post('login.html?do=logout',function(data){
                Vue.$vux.alert.show({
                    title:'',
                    content:data.msg,
                    onHide(){
                        location.href = EpetJs.Common.createUrl('wap:');
                    }
                })
            })
        },
        

        /**
        * 返回静态资源完整路径
        *@param {string} urlName 静态资源的一个相对url地址
        *示例：EpetJs.Common.resUrl('wap/images/img.png')
        **/
        resUrl:function(urlName){
            var urlName = urlName || "";
            return EpetJs.Const.RESOURCE_URL + urlName;
        },

        /**
        * 获取页面cookie值
        * @param {string} name cookie的key
        * */
        getcookie : function(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
            if(arr=document.cookie.match(reg)){
                return unescape(arr[2]);
            }else {
                 return null;
            }
        },

        /**
         * 设置页面cookie
         * @param {string} cookieName cookie的key
         * @param {string} cookieValue cookie值
         * @param {string} time cookie的过期时间
         * *s20是代表20秒  h是指小时，如12小时则是：h12  d是天数，30天则：d30
         * */
        setcookie : function(cookieName, cookieValue, time){
            var strsec;
            var str1 = time.substring(1,time.length)*1;
            var str2 = time.substring(0,1);
            var path = cookiepath ? cookiepath:'/'
            if (str2=="s") {
                strsec =  str1*1000;
            } else if (str2 == "h") {
                strsec =  str1*60*60*1000;
            } else if (str2 == "d") {
                strsec =  str1*24*60*60*1000;
            }
            var exp = new Date();
            exp.setTime(exp.getTime() + strsec*1);
            document.cookie = cookieName + "="+ escape (cookieValue) + ";expires=" + exp.toGMTString() + ";path="+path;
        },

        /**
         *字符串转json对象
         *@param{string} str json字符串
         *@param {string} line json字符串分隔符
         **/
        strToJson : function(str,line){
            var arr = str.split(line);
            var jsonObj = {};
                for(var i = 0; i<arr.length; i++){
                    var list =  arr[i].split(":")
                    var key = list[0];
                    var value = list[1]
                    jsonObj[key] = value ;
                }
                    return jsonObj;
        }
    },
    Helper : {
        /**
         * 生成api接口请求地址
         * @param {string} apiName 接口相对地址
         * */
        createApiUrl : function(apiName,res){
            var apiurl = '';
            var domain = EpetJs.Const.DOMAIN;
            var apipath = EpetJs.Const.API_PATH;
            var apps = apiName.split(":");
            var evn = apps[0];
            var apiName = apps[1] ? apps[1] : apiName;
            if(evn == 'hk') return res.index.hk_domain.dynamic + '/v3/' + apiName;

             apiurl= EpetJs.Const.PROTOCOL + '//' + apipath + domain +'/v3/'+apiName;/*普通地址头*/
             return apiurl;
        },
        getApiurl : function(url,res,data){
            var urlValue = '';
            sessionStorage.setItem('apirules', JSON.stringify(res));
            res.index.hk_rules.map(function(val,index){
                if(val.url.indexOf(url) != -1){
                    val.rules.map(function(rules,i){
                        rules.map(function(rule){
                            var reg2 =  new RegExp("^"+rule.pattern.prefix+'.*'+rule.pattern.suffix+"$");
                           
                            if(data.hasOwnProperty(rule.key) && data[rule.key].toString().length >= rule.pattern.min_length && reg2.test(data[rule.key]) && data[rule.key].toString().length <= ((rule.pattern.max_length == -1)?1000: rule.pattern.max_length)){
                        
                                url = "hk:" +url;
                                data.ishk = true;
                            }  
                        })
                    })
                }
            })
            urlValue = EpetJs.Helper.createApiUrl(url,res);
            return EpetJs.Helper.ajaxRequest(urlValue,data,'GET');
        },
         postApiurl : function(url,res,data){
            var urlValue = '';
            sessionStorage.setItem('apirules', JSON.stringify(res));
            res.index.hk_rules.map(function(val,index){
                if(val.url.indexOf(url) != -1){
                    val.rules.map(function(rules,i){
                        rules.map(function(rule){
                            var reg2 =  new RegExp("^"+rule.pattern.prefix+'.*'+rule.pattern.suffix+"$");
                           
                            if(data.hasOwnProperty(rule.key) && data[rule.key].toString().length >= rule.pattern.min_length && reg2.test(data[rule.key]) && data[rule.key].toString().length <= ((rule.pattern.max_length == -1)?1000: rule.pattern.max_length)){
                        
                                url = "hk:" +url;
                                data.ishk = true;
                            } 
                               
                        })
                    })
                }
            })
            urlValue = EpetJs.Helper.createApiUrl(url,res);
            return EpetJs.Helper.ajaxRequest(urlValue,data,'POST');
        },
        /**
         * ajax请求
         * @param {string} url 请求的接口地址
         * @param {object} data 向服务器发送的请求数据
         * @param {function} callback 请求成功后的回调方法
         * */
        ajaxRequest:function(url,params={},type){
            return new Promise((resolve,reject) =>{
                axios(url,{
                    data:params,
                    params:params,
                    method:type
                })
                .then(response =>{
                    resolve(response);
                })
                .catch(err =>{
                    reject(err)
                })

            })
                 
        },
        /**
         * 是否被定义
         * */
        isset : function(val){
            return typeof(val) != 'undefined';
        },

        /**
         * 获取所有地址栏参数字符串
         * a=1&b=2&c=3
         * @returns {string}
         */
        getLocationQueryString : function(){
            var queryString = window.location.search;
            return queryString ? decodeURI(queryString.substr(1)) : "";
        },

        /**
         * 将URl参数字符串转换为json格式，
         * a=1&b=2&c=3 转换为  {a="1", b="2", c="3"}
         * @param data
         * @returns {{}}
         */
        locationQueryStringToJson : function(url_str){
            var reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g, ret = {}, result;
            while ((result = reg_para.exec(url_str)) != null) {
                ret[result[1]] = result[2];
            }
                return ret;
        },


        /**
         * 获取URL某个参数
         * @param {string} name url地址中的某个参数key
         * @param {string} url url地址（为空的时候，表示从当前页面url地址中获取参数）
         * 使用示例：EpetJs.Common.getUrlParam(name,[url])
         */
        getUrlParam : function(name,url){
            var items = null;
            if(url){
                var pattern = new RegExp("[?&]"+name+"\=([^&]+)", "g");
                var matcher = pattern.exec(url);
                if(null != matcher){
                    try{
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                    }catch(e){
                        try{
                            items = decodeURIComponent(matcher[1]);
                        }catch(e){
                                items = matcher[1];
                        }
                    }
                }
            }else{
                var params = EpetJs.Helper.locationQueryStringToJson( EpetJs.Helper.getLocationQueryString() );
                items = params[name] ? params[name] : null;
            }
                return items;
        },
        isEmptyObject : function(obj){
            for(var key in obj){
                return false;/*有值*/
            }
                return true;/*无值*/
        },

        /**
         * 图片懒加载
         * 示例：<img src0='https://static.epetbar.com/mept/images/logo.jpg' src='https://static.epetbar.com/mept/images/blank.jpg'>
         * **/
        lazyload:function(){
            var nodes=document.querySelectorAll('img[src0]');
            for(var i=0,len=nodes.length;i<len;i++){
                var elem=nodes[i];
                if((elem.getBoundingClientRect().top < document.documentElement.clientHeight)&&!elem.loaded){
                    (function(elem){
                        elem.loaded = true;
                        var img = new Image();
                        img.onload = function(){
                            setTimeout(function(){
                                elem.src = img.src;
                            },500)
                        }
                            img.src = elem.getAttribute('src0');
                    })(elem)
                }
            }
        },
        objTokey : function (obj, keys){
            var n = keys.length,
            key = [];
            while(n--){
                key.push(obj[keys[n]]);
            }
                return key.join('|');
        },

        /**
         * 数组对象数据去重复
         * @param  {[array]} array    需要去重的数组
         * @param  {[string]} keys    比较对象的key值，如果有一样的就去重复
         * **/
        uniqeByKeys : function(array,keys){
            var _self = this;
            var arr = [];
            var hash = {};
            for (var i = 0, j = array.length; i < j; i++) {
                var k = EpetJs.Helper.objTokey(array[i], keys);
                if (!(k in hash)) {
                    hash[k] = true;
                    arr .push(array[i]);
                }
            }
                return arr ;

        },
        disableZoom : function(){
            /*ios10 safari禁止网页缩放*/
            document.addEventListener('gesturestart', function (e) {/*手势缩放*/
                e.preventDefault();
            });
            document.addEventListener('dblclick', function (e) {/*双击*/
                e.preventDefault();
            });
            document.addEventListener('touchstart', function (event) {
                if (event.touches.length > 1) {
                    event.preventDefault();
                }
            });
            var lastTouchEnd = 0;
            document.addEventListener('touchend', function (event) {
                var now = (new Date()).getTime();
                if (now - lastTouchEnd <= 300) {
                    event.preventDefault();
                }
                    lastTouchEnd = now;
            }, false);
        }
    },
    Init : function(){
        var http = location.protocol;
        var host = location.host;
        EpetJs.Const.PROTOCOL = http;
        if(host.indexOf('sx')!=-1 && host.indexOf('local')!=-1 && host.indexOf('dev')!=-1){
            EpetJs.Const.RESOURCE_URL = '//static.epetbar.com';
            EpetJs.Const.ENV = 'product';
        };

        if(host.indexOf('sx')!=-1){
            EpetJs.Const.API_PATH = 'mallapi';
            EpetJs.Const.DOMAIN = '.sx.epet.com'; 
            EpetJs.Const.RESOURCE_URL = '//static.dev.gutou.com';
            EpetJs.Const.ENV = 'sx';
        }

        if(host.indexOf('dev')!=-1){
            EpetJs.Const.API_PATH = 'mallapi';
            EpetJs.Const.DOMAIN = '.dev.epet.com'; 
            EpetJs.Const.RESOURCE_URL = '//static.dev.gutou.com';
            EpetJs.Const.ENV = 'dev';
        }

        if(host.indexOf('local')!=-1){
            EpetJs.Const.API_PATH = 'mallapi';
            EpetJs.Const.DOMAIN = '.local.epet.com'; 
            EpetJs.Const.RESOURCE_URL = '//static.local.epet.com';
            EpetJs.Const.ENV = 'local';
        }

        /**
         * 开发平台初始化
         * PlAFORM
         */
        var fwInit = {wap:0,iphone:1,android:2,pc:3,weixin:0};
        var agent = navigator.userAgent.toLowerCase();
        var reg = /epetbrowser\((android|iphone)\s(\d+)\)/g; //匹配版本号
        var userAgentArr = reg.exec(agent);
        var bIsIpad = agent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = agent.match(/iphone os/i) == "iphone os";
        var bIsMidp = agent.match(/midp/i) == "midp";
        var bIsUc7 = agent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = agent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = agent.match(/android/i) == "android";
        var bIsCE = agent.match(/windows ce/i) == "windows ce";
        var bIsWM = agent.match(/windows mobile/i) == "windows mobile";
        var isQQ = /(?:MQQBrowser|QQ)/.test(agent);

        /**
         *判断是不是pc平台上
         */
        if (!(bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM)) {
            EpetJs.Const.PlAFORM = 'pc';
            EpetJs.Const.FW = fwInit[EpetJs.Const.PlAFORM];
        }

        /**判断原生app*/
        if($.type(userAgentArr) == 'array'){
            EpetJs.Const.PlAFORM = userAgentArr[1];
            EpetJs.Const.VERSION = userAgentArr[2];
            EpetJs.Const.FW = fwInit[EpetJs.Const.PlAFORM];
        }

        /**判断是否在微信内*/
        if(agent.match(/MicroMessenger/i) == 'micromessenger'){
            EpetJs.Const.PlAFORM = 'weixin';
            EpetJs.Const.FW = fwInit[EpetJs.Const.PlAFORM];
        }

        if(EpetJs.Const.FW > 0 && EpetJs.Const.VERSION == 0){//兼容老版本fw判断有误的情况
            EpetJs.Const.FW = 0;
        }
            
        /*禁止网页缩放*/
        EpetJs.Helper.disableZoom();

        /*图片懒加载执行*/
        $(window).scroll(function(){
            EpetJs.Helper.lazyload();
        })

        window.onload =  EpetJs.Helper.lazyload;    
    }

}

EpetJs.Init();