var ToolBox = function(){
    this.init();
}

ToolBox.prototype = {
    init:function(){
        this.setGlobalMethods()
    },
    setGlobalMethods: function(){
        var _this = this;
        // 事件兼容
        Element.prototype.addEvent = function(type,handler){                
            if(this.addEventListener){
                this.addEventListener(type,handler,false);
            }else if(this.attachEvent){
                this.attachEvent("on"+type,handler);
            }else{
                this["on"+type] = handler;
            }
        };
        window.getDom = function(eName,space){
            var method,
            space = space || document;
            if(eName.substr(0,1)==='.'){
                method = 'getElementsByClassName';
                return space[method](eName.substr(1));
            }else if(eName.substr(0,1)==='#'){
                method = 'getElementById';
                return space[method](eName.substr(1));
            }else{
                method = 'getElementsByTagName';
                return space[method](eName);
            }; 
        },
        // 给元素本身添加获取DOM的方法
        Element.prototype.getDom = function(eName){
            _this.getDom(eName,this);             
        }
        //··添加、删除指定class名的方法
        //第一步：判断元素是否有已含有指定的class名  
        Element.prototype.hasClass = function(cls){
            cls = cls || "";    //若不传入cls参数，则cls值为空
            var reg = new RegExp(cls);     
            if(cls.replace(/\s/g,"").length == 0){
                return false;     
            }else if(reg.test(this.className)){
                return true;
            }else{
                return false;
            };
        };
        //第二步：添加指定class名
        Element.prototype.addClass=function(cls){
            if(!this.hasClass(cls)){
                this.className = this.className == "" ? cls : this.className + " " + cls;
            }else{
                return null;
            }
        };
        //第三步：删除指定class名
        Element.prototype.removeClass = function(cls){
            // alert(1);
            if(this.hasClass(cls)){            
                this.className = this.className.replace(cls,"");            
            }
        };
        // ..给某个子元素添加指定CLASS名同时删除所有兄弟元素的该class名
        Element.prototype.addOnlyClass = function(cls){
            if(!this){
                return
            }
            if(!this.hasClass(cls)){
                var parent = this.parentNode;
                var brothers = parent.childNodes;
                brothers.forEach((item)=>{
                    item.removeClass(cls);
                })
                this.addClass(cls);
            }else{
                return null;
            }
        }

        //··删除指定节点的方法
        function removeDom(eName){    
            if(eName.substr(0,1)==='.'){        
                var doms = getDom(eName),
                    len = doms.length;
                for(var i=len-1;i>=0;i--){
                    doms[i].parentNode.removeChild(doms[i]);
                }
            }else if(eName.substr(0,1)==='#'){
                var dom = getDom(eName);
                dom.parentNode.removeChild(dom);
            }
        };
        //··获取或设定元素的data属性值
        Element.prototype.data = function(name,val){
            var prefix = 'data-';
            if(val){
                return this.setAttribute(prefix+name,val)
            }else{
                return this.getAttribute(prefix+name)
            }
        };

        // ·取得数组中的最大值和最小值
        Array.prototype.getMin = function(){
            var x = typeof this[0] ==='number' ? this[0] : 999;
            for(i in this){
                if(typeof this[i]==='number' && this[i]<x){
                    x = this[i];
                }else if(typeof this[i] !== 'number'){
                    continue;
                }
            };
            return x;
        };
        Array.prototype.getMax = function(){
            var x = 0;
            for(i in this){
                if(typeof this[i]==='number' && this[i]>x){
                    x = this[i];
                }else if(typeof this[i] !== 'number'){
                    continue;
                }
            };
            return x;
        };
        // 数组随机排序
        Array.prototype.shuffle = function(){            
            let _arr = this.slice()
            
            for (let i = 0; i < _arr.length; i++) {
                let j = Math.getRandom(0, i)
                let t = _arr[i]
                _arr[i] = _arr[j]
                _arr[j] = t
            }            
            return _arr  
        };
        // 生成指定范围内的随机数
        Math.getRandom = function(x,y){
            var max = Math.max(x,y),
                min = Math.min(x,y),
                diff = max - min +1,
                number = Math.floor(Math.random()*diff + min);
            return number;
        }
    },
    
    setTabPic: function(param){        
        new Tab(param);
    },
    
};


// 轮播图
var Tab = function(param){
    this.navs = param.navs;
    this.contents = param.contents;
    this.cls1 = param.cls1;
    this.cls2 = param.cls2;
    this.type = param.type;
    this.time = param.autoTime || null; 
    this.init();   
};
Tab.prototype = {    
    init:function(){
        // navs参数为传入的导航标签数组，contents为传入的相应显示内容数组，
        // cls1/cls2分别为触发事件时两者对应的class值，type为触发的事件类型,time为自动轮播的时间间隔。    
        var navs = this.navs,
            contents = this.contents,
            cls1 = this.cls1,
            cls2 = this.cls2,
            type = this.type;
            time = this.time;
        // alert(type);
        this.tabEvent(navs,contents,cls1,cls2,type,time);
        this.buttonEvent();
        this.auto(navs,contents,cls1,cls2,time);   
    },
    tabEvent:function(navs,contents,cls1,cls2,type,time){
        _this = this;        
        for(var i = 0;i<navs.length;i++){            
            navs[i].i = i;
            navs[i]["on"+type] = function(){                  
                clearInterval(_this.timed);
                //首先调用方法删除所有元素的对应class                
                _this.allRemove(navs,contents,cls1,cls2);
                //然后给被点击的tab标签及对应图片加上class
                this.addClass(cls1);
                contents[this.i].addClass(cls2);
                _this.auto(navs,contents,cls1,cls2,time);
            } 
        }
    },
    auto:function(navs,contents,cls1,cls2,time){
        _this = this;
        var len =navs.length;
        //首先获取当前显示的图片（也就是获取有对应cls1的标签元素）在数组中的索引值
        var o = navs[0].parentNode.getElementsByClassName(cls1)[0];        
        for(var i=0;i<navs.length;i++){
            navs[i].index = i;            
        }  
        var x = o.index;
        if(time){
            this.timed = setInterval(            
                function(){
                    _this.allRemove(navs,contents,cls1,cls2);
                    x=x<len-1?x+1:0;
                    navs[x].className = cls1;
                    contents[x].className = cls2;
                },
                time
            )
        } 
    },
    buttonEvent:function(){

    },
    allRemove:function(navs,contents,cls1,cls2){
        //默认方法，删除数组内所有元素的相应CLASS
        for(var n = 0;n<navs.length;n++){
            navs[n].removeClass(cls1);
            contents[n].removeClass(cls2);                                
        };
    }
};


var tool = new ToolBox;
export default tool
