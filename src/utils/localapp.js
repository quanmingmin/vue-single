import {EpetJs} from '@/utils/epetsdk'
/**
 * JS调用 原生规则
 */
export const EpetApp = {
    /**
     * 协议
     * [详细协议见文档：http://doc.epet.com/index.php?s=/Jasen&page_id=565 ]
     */
    protocols : {
        goods           :   'goods',        //1.普通商品
        goodsExtend     :   'goods_extend', //2.活动商品
        web             :   'web',          //3.网页
        goWap           :   'webpage_hidden_header',    //4.可定义隐藏webview头部
        templatePage    :   'index_single', //5.模板页面
        image           :   'image',        //6.图片预览
        back            :   'back',         //7.返回操作
        addcart         :   'addcart',      //8.添加购物车
        toast           :   'toast',        //9.toast提示
        alert           :   'alert',        //10.alert提示
        alertCallback   :   'alert_callback',//11.选择弹窗提示
        register        :   'register',     //13.注册
        login           :   'login',        //14.登录
        clearWare       :   'clear_ware',   //16.清仓
        miaoSha         :   'miaosha',      //17.每日疯抢列表
        goodsList       :   'goods_list',   //18.商品列表
        knowledgeList   :   'knowledge_list',//19.新宠课堂知识列表
        brandList       :   'brand_list',   //20.品牌列表
        cart            :   'cart',         //21.购物车
        myMsg           :   'my_msg',       //22.消息中心
        myPaper         :   'my_paper',     //23.我的现金券
        friendFunds     :   'friend_funds', //24.好友基金
        addPet          :   'add_pet',      //25.添加宠物
        settingInfo     :   'setting_info', //26.设置页面
        orderList       :   'order_list',   //27.我的订单列表
        order           :   'order',        //28.订单详情
        delivery        :   'wuliu',        //29.物流信息
        bindPhone       :   'bind_phone',   //30.绑定电话
        serveEvaluation :   'serve_evaluation',//31.服务评价列表
        expertList      :   'expert_list',  //32.专家课堂、专家列表
        close           :   'close',        //33.关闭界面
        download        :   'download',     //34.下载文件
        sharetowx       :   'sharetowx',    //35.分享到微信
        myEmoney        :   'my_emoney',    //36.我的E宠币
        myCredits       :   'my_credits',    //37.我的积分
        myBalance       :   'my_balance',    //30.我的余额
        myReplys        :   'my_replys',     //39.我的评价
        myAsks          :   'my_asks',       //40.我的咨询
        myCollects      :   'my_collects',   //50.我的收藏
        myAddress       :   'my_address',    //51.我的地址
        shareTo         :   'shareto',       //52.自定义分享
        myAccount       :   'my_account',    //53.我的钱包
        new_pay          :   'new_pay',       //54.支付
        editOrder       :   'edit_order',   //55.结算页面
        payResult       :   'payresult',    //56.支付成功页
        alertWeb        :   'alert_web',     //57.网页弹窗
        payChoose       :   'paychoose',    //58.调起支付
        newPayChoose   :   'new_paychoose', //59.新支付
        payAccount     :   'pay_account',   //60.支付列表获取
        backToHome      :   'backtohome',   //61.回首页
        brandHome       :   'brand_homepage',//62.品牌首页页
        openStore       :   'open_store',   //63.去下载(更新)
    },

    /**
     * 移动端本地js方法名
     */
    jsFuncNames : {
        getCookie   :   'jsCallNativeGetCookies',   //获取APP本地cookie
        getUuid     :   'jsCallNativeGetUUID',      //获取设备唯一识别吗
    },

    /**
     * js调原生统一方法 [不常用的调用未单独封装方法，可用该方法直接调用]
     * @param mode 跳转mode
     * @param param 跳转所需参数
     * @param callback 完成后的回调函数，仅能传函数名，不能使用匿名函数
     */
    go : function(mode, param, callback) {
        return this._call({'mode':mode, 'param':param, 'callback':callback});
    },

    //========================原生操作相关=============================
    /**
     * 关闭界面
     * @param callback 关闭后的回调函数
     */
    close : function(callback){
        this.go(this.protocols.close, '',callback);
    },

    /**
     * toaet提示
     */
    toast : function (str){
        this.go(this.protocols.toast,str,'');
    },

    /**
     * 弹窗提示
     */
    alert : function(str){
        this.go(this.protocols.alert,str,'');
    },

    /**
     * 选择弹窗
     * @param title 标题(新弹窗已废弃)
     * @param content内容
     * @param yes 确认按钮文字
     * @param no 取消按钮文字
     * @param callback 点按钮后的回调函数，参数为'yes'或者'no'
     */
    alert_callback : function (title, content, yes, no, callback){
        this.go(this.protocols.alertCallback, {'title':title, 'content':content, 'yes':yes, 'no':no}, callback);
    },

    /**
     * 下载文件
     * @param url 文件地址
     */
    downLoad : function(url){
        this.go(this.protocols.download,url,'');
    },

    /**
     * 查看图片
     * @param url 图片地址
     */
    image : function(url){
        var urls = url.split(',');
        this.go(this.protocols.image, urls, '');
    },

    /**
     * 添加购物车
     * @param paramObj 商品参数
     * @param callback 添加成功的回调函数
     */
    addCart : function(paramObj, callback) {
        this.go(this.protocols.addcart, paramObj, callback);
    },

    /**
     * 分享微信 [已废弃，建议用EpetApp.shareTo]
     */
    sharetowx : function(title, content, url, image) {
        this.go(this.protocols.sharetowx, {'title':title, 'content':content, 'url':url, 'image':image}, '');
    },

    /**
     * 分享到第三方平台 types
     * @param title 分享标题
     * @param content 分享描述
     * @param url 链接地址
     * @param image 图片
     * @param types 类型，值为 weixin、weixin_ring、qq、qzone、sina  (多个用逗号连接)
     * @param callback
     */
    shareTo :   function(title, content, url, image,types,callback){
        types = types ? types : '';
        this.go(this.protocols.shareTo, {'title':title, 'content':content, 'url':url, 'image':image,'types':types}, callback);
    },

    //========================个人中心相关=============================
    /**
     * 订单详情详情页
     * @param orderid 订单编号
     */
    order : function(orderid){
        this.go(this.protocols.order, orderid, '');
    },

    /**
     * 消息中心
     */
    my_msg : function(){
        this.go(this.protocols.myMsg,'','');
    },

    /**
     * 我的E宠物币
     */
    my_emoney : function(){
        this.go(this.protocols.myEmoney,'','');
    },

    /**
     * 我的积分
     */
    my_credits : function(){
        this.go(this.protocols.myCredits,'','');
    },

    /**
     * 我的现金券
     */
    my_paper : function(){
        this.go(this.protocols.myPaper,'','');
    },

    /**
     * 我的余额
     */
    my_balance : function(){
        this.go(this.protocols.myBalance,'','');
    },

    /**
     * 我的评价
     */
    my_replys : function(){
        this.go(this.protocols.myReplys,'','');
    },

    /**
     * 我的咨询
     */
    my_asks : function(){
        this.go(this.protocols.myAsks,'','');
    },

    /**
     * 我的收藏
     */
    my_collects : function(){
        this.go(this.protocols.myCollects,'','');
    },

    /**
     * 收货地址
     */
    my_address : function(){
        this.go(this.protocols.myAddress,'','');
    },

    /**
     * 订单列表
     */
    order_list : function(str){
        this.go(this.protocols.orderList,str,'');
    },

    /**
     * 查看订单物流信息
     */
    wuliu : function(orderid){
        this.go(this.protocols.delivery,orderid,'');
    },

    /**
     * 我的钱包
     */
    my_account : function(){
        this.go(this.protocols.myAccount,'', '');
    },

    /**
     * 添加宠物页面
     */
    addPet : function(){
        this.go(this.protocols.addPet,'', '');
    },

    /**
     * 绑定手机号码页面
     */
    BindPhone : function () {
        var callback = arguments[0] ? arguments[0] : '';
        this.go(this.protocols.bindPhone,'', callback);
    },

    /**
     * 我要代言[已废弃]
     */
    daiyan : function(gid){
        this.go('daiyan',gid,'');
    },

    //========================其他原生页面=============================

    /**
     * 关闭网页弹窗并执行回调,参数为回调 参数
     */
    closeAlertWeb : function(mode, param){
        var paramStr = "";
        if(mode){
            param = param ? param : "";
            var jsonPattern = /^\{.*\}$/;
            if(jsonPattern.test(param)){//json字符串的情况
                paramStr = '{"mode":"'+mode+'","param":'+param+',"callback":""}';
            }else{
                paramStr = '{"mode":"'+mode+'","param":"'+param+'","callback":""}';
            }
        }
        this._closeAndCall(paramStr);
    },

    /**
     * 登录
     */
    Login : function(){
        var callback = arguments[0] ? arguments[0] : '';
        this.go(this.protocols.login,'', callback);
    },

    /**
     * 注册
     */
    Register : function(){
        var callback = arguments[0] ? arguments[0] : '';
        this.go(this.protocols.register,'', callback);
    },

    /**
     * 普通商品详情
     * @param gid 商品编号
     */
    goGoods : function(gid){
        this.go(this.protocols.goods, gid, '');
    },

    /**
     * 活动商品详情
     * @param gid 商品编号
     * @param buytype 购买模式
     * @param json params 额外参数 {"buytype":"discount","tid":103}
     */
    goGoodsExtend:function(gid,buytype,params){
        var params = $.extend({'buytype':buytype}, params);
        var extend_pam = '';
        $.each(params,function(name,val){
            extend_pam += (extend_pam ? '|' : '')+name+':'+val;
        });
        this.go(this.protocols.goodsExtend, {'gid':gid,'extend_pam':extend_pam}, '');
    },

    /**
     * 打开一个网页（新开一个webview）
     * @param url
     */
    web : function(url){
        this.go(this.protocols.web,url,'');
    },

    /**
     * 打开一个网页
     * @param hideHeader 是否隐藏webview的头部，默认不隐藏
     */
    goWap : function(url,hideHeader){
        hideHeader = hideHeader ? hideHeader : 0;
        if(hideHeader){
            this.go(this.protocols.goWap,url,'');
        }else{
            this.go(this.protocols.web,url,'');
        }
    },

    /**
     * 清仓特价页面
     */
    clear_ware : function(){
        this.go(this.protocols.clearWare,'','');
    },

    /**
     * 一键购买页面[已废弃]
     */
    one_key : function(){
        this.go('one_key','','');
    },

    /**
     * 零元夺宝页面[已废弃]
     */
    duobao : function(){
        this.go('duobao','','');
    },

    /**
     * 一折秒杀页面[已废弃]
     */
    tiyan : function(){
        this.go('tiyan','','');
    },

    /**
     * 多件优惠页面[已废弃]
     */
    dazhe : function(){
        this.go('dazhe','','');
    },

    /*
     * 商品列表页
     * string extend_pam 参数格式 keyword:keyword|cateid:cateid|brandid:brandid|linkid:linkid|extends_str:1,2,3 没有的参数项科研不加
     * 例如 EpetApp.goods_list('cateid:1')、EpetApp.goods_list('cateid:1|linkid:2')
     */
    goods_list : function(extend_pam){
        this.go(this.protocols.goodsList,extend_pam,'');
    },

    /**
     * 商品详情页(old)
     */
    goods : function(gid){
        this.go(this.protocols.goods,gid,'');
    },

    /**
     * 商品评论列表[已废弃]
     */
    goods_replys : function (gid){
        this.go('goods_replys',gid,'');
    },

    /**
     * 商品咨询列表[已废弃]
     */
    goods_asks : function (gid){
        this.go('goods_asks',gid,'');
    },

    /**
     * 商品代言列表[已废弃]
     */
    goods_daiyan : function(gid){
        this.go('goods_daiyan',gid,'');
    },

    /**
     * 购物车页面
     */
    cart : function (){
        this.go(this.protocols.cart,'','');
    },

    /**
     * 结算页面
     */
    edit_order : function (){
        this.go(this.protocols.editOrder,'','');
    },

    /**
     * 收藏商品[已经废弃]
     */
    collect_goods : function(orderid){
        this.go('collect_goods',orderid,'');
    },

    /**
     * 支付成功页
     */
    payResult : function(state, tip){
        this.go(this.protocols.payResult, {'state':state, 'tip':tip}, '');
    },

    /**
     * 支付
     */
    pay : function(oid,need_pay,singlepay,paytype){
        this.go(this.protocols.paychoose,{'oid':oid,'need_pay':need_pay,'singlepay':singlepay,'paytype':paytype},'paySuccess');
    },

    /**
     * 支付[新]
     */
    new_pay : function(oid,need_pay,paytype,params){
        this.go(this.protocols.newPayChoose,{'oid':oid,'need_pay':need_pay,'paytype':paytype,'params':params},'paySuccess');
    },

    /**
     * 支付列表获取
     */
    getPayAccount : function(oid,need_pay,params){
        this.go(this.protocols.payAccount,{'oid':oid,'need_pay':need_pay,'param':params},'');
    },

    /**
     * 去首页
     */
    backToHome : function(){
        this.go(this.protocols.backToHome,'', '');
    },

    /**
     * 品牌馆详情页
     */
    brand_homepage : function(brandid){
        this.go(this.protocols.brandHome, brandid, '');
    },

    /**
     * 下载按钮[ios不需要参数，直接跳转应用商店，andrOid根据下载地址直接下载]
     * 该方法仅适用与在网页弹窗中的按钮！
     */
    openStore : function(downloadUrl){
        this._closeAndCall({'mode':this.protocols.openStore, 'param':downloadUrl, 'callback':''});
    },

    /**
     * 打开网页弹窗[弹窗里展示网页]
     */
    alertWeb : function(url){
        this.go(this.protocols.alertWeb,url,'');
    },

    /**
     * webview的分享按钮触发的函数(点分享即会触发该函数)
     */
    wapShareTo : function(){
        if(typeof diyShare === 'function'){
            //页面自定义的分享方法
            diyShare();
        }else{//默认
            var title = $("title").html();
            var content = $('meta[name="description"]').attr('content');
            content = content ? content : title;
            var sUrl = location.href;
            sUrl = sUrl.replace(/[\&]?fw=[\d]/,'');
            var img = 'http://static.epetbar.com/static_wap/group/images/favicon.png';
            this.shareTo(title,content,sUrl,img,'','');
        }
    },

    /**
     * 调用本地的js方法 （version >= 345 版本可用）
     * @param $funcName 方法名称
     * @param $param 调用方法所需参数，字符串,如果是json字符串，则必须是 callLocalJs('test','{"a":"11","b":"22"}');注意双引号！
     */
    callLocalJs : function($funcName,$param){
        return eval("window.native."+$funcName+"('"+$param+"')");
    },

    //========================私有方法=============================
    /**
     * 调用移动端本地方法
     */
    _call : function(json) {
        var jsonstr = '';
        if (EpetApp._isJson(json)) {
            jsonstr = JSON.stringify(json);
        } else {
            jsonstr = json;
        }
        try{
            if (fw == 1) {//ios
                if(typeof native != 'undefined' && typeof native.JSCallNativeMethodByJson != 'undefined'){
                    window.native.JSCallNativeMethodByJson(jsonstr);//V345版本 ios的js方法名修改
                }else{
                    CallLocal(jsonstr);
                }
            } else if (fw == 2) {//android
                if(typeof epetmall != 'undefined'){
                    epetmall.CallLocal(jsonstr);
                }else{
                    window.native.CallLocal(jsonstr);
                }
            }
        }catch (e){
            console.log('Something went wrong! Place open it in APP!');
        }
    },

    /**
     * 关闭网页弹窗，同时调用本地方法
     */
    _closeAndCall : function(json){
        var jsonstr = '';
        if (EpetApp._isJson(json)) {
            jsonstr = JSON.stringify(json);
        } else {
            jsonstr = json;
        }
        setTimeout(function(){
            try{
                if(fw == 2 && typeof epetmall != 'undefined'){
                    epetmall.closeAlertWebViewAndCallTargetByJson(jsonstr);
                }else{
                    window.native.closeAlertWebViewAndCallTargetByJson(jsonstr);
                }
            }catch (e){}
        },800);
    },

    /**
     * 判断是否是JSON对象
     */
    _isJson : function(obj){
        return typeof(obj) == 'object' && Object.prototype.toString.call(obj).toLowerCase() == '[object object]' && !obj.length;
    },
};

/**
 * android端手动触发初始化方法
 */
$(document).ready(function(){
    if (EpetJs.Const.FW == 2) {
        loadPage();
    }
});

/**
 * 页面加载完执行的初始化方法[adroid手动、ios自己调用]
 */
function loadPage() {
    try {
        if(typeof(eval('loadedPageFunctions')) == 'function'){
            loadedPageFunctions();
        }
    } catch (e) {}
}

/**
 * 同步登录回调函数 [3.1+版本取消了同步登录，移动端通过同步cookie实现！]
 */
function callBackLogin(pam){
    window.location.reload();
}

/**
 * 添加购物车成功，默认回调函数
 */
function toCartSucceed(){
    EpetApp.alert_callback('添加成功', '成功添加到购物车', '查看购物车', '继续逛逛', 'selectToCart');
}

/**
 * 添加购物车成功，点击按钮的回调
 */
function selectToCart(pam) {
    if (pam == 'yes') {
        EpetApp.cart();
    }
}

/**
 * 支付成功回调
 */
function paySuccess(status){
    if (status == 1) {
        var backurl = $("input[name=backurl]").val();
        window.location.href=backurl;
    }
}
