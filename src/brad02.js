var Brad02Layer = cc.Layer.extend({
    dx: 2,
    nums: new Array(10),
    rects: new Array(10),
    back: null,
    enter: null,
    mesg : null,
    winner:null,
    loser : null,
    input : null,
    valueA: null,//暫存第一次輸入的數字
    sign: 0,//暫存運算符號
    inputString: '',// string var 計算機上顯示的數字
    ctor: function () {
        this._super();
        var size = cc.winSize;

        var myTitle = new cc.LabelTTF("摳摳斯計算機", "微軟正黑體", 34);
        myTitle.x = size.width / 2;
        myTitle.y = size.height * 8 / 9;
        myTitle.setColor(cc.color(0, 245, 255));
        this.addChild(myTitle, 0, "myTitle");

        this.initSprit();
        this.mymouseListener(this);
        this.scheduleUpdate();

        return true;
    },

    initSprit: function () {
        var frameCache = cc.spriteFrameCache;
        frameCache.addSpriteFrames(
            res.number_plist, res.number_png);
        for (i = 0; i < this.nums.length; i++) {
            this.nums[i] = new cc.Sprite("#number" + i + ".png");
            var px, py;
            if (i == 0) {
                px = 2;
                py = 1;
            } else {
                px = (i - 1) % 3 + 2;
                py = parseInt((i - 1) / 3) + 2;
            }
            this.nums[i].attr({
                x: cc.winSize.width * px / 7,
                y: cc.winSize.height * py / 8
            });
            this.addChild(this.nums[i]);

            // 順便取得各Sprite的範圍區域
            this.rects[i] = new cc.Rect(
                this.nums[i].x-this.nums[i].width/2,
                this.nums[i].y-this.nums[i].height/2,
                this.nums[i].width,
                this.nums[i].height);

        }

        //引入在resource.js定義的enter_png
        this.enter = new cc.Sprite(res.enter_png);
        this.enter.attr({
            x: cc.winSize.width * 4 / 7,
            y: cc.winSize.height / 8
        });
        this.addChild(this.enter);

        //加符號：引入在resource.js定義的plus_png
        this.plus = new cc.Sprite(res.plus_png);
        this.plus.attr({
            x: cc.winSize.width * 5 / 7,
            y: cc.winSize.height * 4 / 8
        });
        this.addChild(this.plus);


        //減符號：引入在resource.js定義的less_png
        this.less = new cc.Sprite(res.less_png);
        this.less.attr({
            x: cc.winSize.width * 5 / 7,
            y: cc.winSize.height * 3 / 8
        });
        this.addChild(this.less);


        //乘符號：引入在resource.js定義的xxx_png
        this.xxx = new cc.Sprite(res.xxx_png);
        this.xxx.attr({
            x: cc.winSize.width * 5 / 7,
            y: cc.winSize.height * 2 / 8
        });
        this.addChild(this.xxx);

        //除符號：引入在resource.js定義的division_png
        this.division = new cc.Sprite(res.division_png);
        this.division.attr({
            x: cc.winSize.width * 5 / 7,
            y: cc.winSize.height / 8
        });
        this.addChild(this.division);


        //C符號：引入在resource.js定義的c_png
        this.c = new cc.Sprite(res.c_png);
        this.c.attr({
            x: cc.winSize.width * 3 / 7,
            y: cc.winSize.height  / 8
        });
        this.addChild(this.c);

        this.input = new cc.LabelTTF("","",50);
        this.input.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height *6/8
        });
        this.addChild(this.input);

        //訊息區
        this.mesg = new cc.LabelTTF("輸入數字計算","微軟正黑體",34);
        this.mesg.attr({
            x: cc.winSize.width / 2,
            y: cc.winSize.height *5/8
        });
        this.addChild(this.mesg);
    },

    mymouseListener: function(layer){
        if ('mouse' in cc.sys.capabilities){
            // mouse listener
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function(event){
                    var x = event.getLocationX();
                    var y = event.getLocationY();
                    var point = new cc.Point(x,y);


                    //定義按鈕圖片加號範圍 和layer綁定再一起
                    var btn_plus = new cc.Rect(layer.plus.x-layer.plus.width/2,
                        layer.plus.y-layer.plus.height/2,
                        layer.plus.width,
                        layer.plus.height);
                    //當綁定圖片加號的layer被點擊...
                    if (cc.rectContainsPoint(btn_plus, point)) {
                        cc.log("加");
                        btnA('+');
                    }

                    //定義按鈕圖片減號範圍 和layer綁定再一起
                    var btn_less = new cc.Rect(layer.less.x-layer.less.width/2,
                        layer.less.y-layer.less.height/2,
                        layer.less.width,
                        layer.less.height);
                    //當綁定圖片減號的layer被點擊...
                    if (cc.rectContainsPoint(btn_less, point)) {
                        cc.log("減");
                        btnA('-');
                    }

                    //定義按鈕圖片乘號範圍 和layer綁定再一起
                    var btn_xxx = new cc.Rect(layer.xxx.x-layer.xxx.width/2,
                        layer.xxx.y-layer.xxx.height/2,
                        layer.xxx.width,
                        layer.xxx.height);
                    //當綁定圖片乘號的layer被點擊...
                    if (cc.rectContainsPoint(btn_xxx, point)) {
                        cc.log("乘");
                        btnA('*');
                    }

                    //定義按鈕圖片除號範圍 和layer綁定再一起
                    var btn_division = new cc.Rect(layer.division.x-layer.division.width/2,
                        layer.division.y-layer.division.height/2,
                        layer.division.width,
                        layer.division.height);
                    //當綁定圖片除號的layer被點擊...
                    if (cc.rectContainsPoint(btn_division, point)) {
                        cc.log("除");
                        btnA('/');
                    }

                    //定義按鈕圖片C範圍 和layer綁定再一起
                    var btn_c = new cc.Rect(layer.c.x-layer.c.width/2,
                        layer.c.y-layer.c.height/2,
                        layer.c.width,
                        layer.c.height);
                    //當綁定圖片C的layer被點擊...
                    if (cc.rectContainsPoint(btn_c, point)) {
                        cc.log("按C歸0");
                        buttonC();
                    }
                    //定義按鈕圖片=範圍 和layer綁定再一起
                    var btn_enter = new cc.Rect(layer.enter.x-layer.enter.width/2,
                        layer.enter.y-layer.enter.height/2,
                        layer.enter.width,
                        layer.enter.height);
                    //當綁定圖片除號的layer被點擊...
                    if (cc.rectContainsPoint(btn_enter, point)) {
                        cc.log("等於");
                        btnB();
                    }


                    //以下函式---------------------------------------------------------------//

                    // 此處判斷是否輸入數字鍵
                    for (i=0; i<layer.rects.length; i++){
                        if (cc.rectContainsPoint(layer.rects[i], point) ){
                            cc.log(i);
                            layer.inputString += i;
                            layer.input.setString(layer.inputString);
                            break;
                        }
                    }

                    //當加減乘除符號按下...
                    function btnA(str) {
                        //把第一次輸入的數字從layer.inputString丟進valueA保存
                        valueA = layer.inputString;
                        cc.log("暫存第一次的值"+valueA+"到valueA");
                        //把按下的加減乘除符號也丟進sign保存
                        sign = str;
                        //把layer.inputString清空
                        layer.inputString = "";
                        layer.input.setString(layer.inputString);
                    }

                    //當等於符號按下...
                    function btnB() {
                        switch (sign) {
                            case "+":
                                layer.inputString =
                                    Number(valueA) + Number(layer.inputString);
                                cc.log(layer.inputString);
                                layer.input.setString(layer.inputString);
                                break;
                            case "-":
                                layer.inputString =
                                    Number(valueA) - Number(layer.inputString);
                                cc.log(layer.inputString);
                                layer.input.setString(layer.inputString);
                                break;
                            case "*":
                                layer.inputString =
                                    Number(valueA) * Number(layer.inputString);
                                cc.log(layer.inputString);
                                layer.input.setString(layer.inputString);
                                break;
                            case "/":
                                layer.inputString =
                                    Number(valueA) / Number(layer.inputString);
                                cc.log(layer.inputString);
                                layer.input.setString(layer.inputString);
                                break;
                            default:
                                break;
                        }
                        //把符號清空，不然會很可怕
                        sign = null;
                    }

                    //當C符號按下...就全部歸0
                    function buttonC(){
                        sign=0;
                        layer.inputString = "";
                        layer.input.setString(layer.inputString);
                    }
                }
            }
        };
        cc.eventManager.addListener(mouseListener,this);
    },

    update: function () {
        var myTitle = this.getChildByName("myTitle");
//        var myTitle = this.getChildByTag(123);
        if (myTitle.x + myTitle.width / 2 >= cc.winSize.width ||
            myTitle.x - myTitle.width / 2 <= 0) {
            this.dx *= -1
        }
        myTitle.x += this.dx;
    }
});

var Brad02Scene = cc.Scene.extend({
    onEnter: function () {
        this._super();
        var layer = new Brad02Layer();
        this.addChild(layer);
    }
});

