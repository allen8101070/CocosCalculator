
var MainMenuLayer = cc.Layer.extend({
    sprite:null,
    vars : {"var1":100, "var2":200},
    ctor:function () {
        this._super();
        var size = cc.winSize;

        this.initMenu();

        return true;
    },

    //
    initMenu : function () {
       var test1 = new cc.MenuItemFont("Sprite Menu Test",this.menuTest1,this);
       var test2 = new cc.MenuItemFont("Pass Parameter Test",this.menuTest2,this);
       var test3 = new cc.MenuItemFont("Change Scene Test",this.menuTest3,this);
       var test4 = new cc.MenuItemFont("Layer Life Cycle Test",this.menuTest4,this);

       var menu =   new cc.Menu(test1, test2, test3, test4);
       menu.alignItemsVertically();
       this.addChild(menu);
    },

    menuTest1 : function () {
        cc.director.pushScene(new Test1Scene());
    },
    menuTest2 : function () {
        cc.director.pushScene(new Test2Scene(123, this.vars));
    },
    menuTest3 : function () {
        cc.director.pushScene(new Test3Scene());
    },
    menuTest4 : function () {
        cc.director.pushScene(new Test4Scene());
    },

});

var MainMenuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new MainMenuLayer();
        this.addChild(layer);
    }
});

