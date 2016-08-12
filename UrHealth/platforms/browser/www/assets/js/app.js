'use strict'

var app = angular.module('app', ['onsen']);
app.config(function($controllerProvider,$compileProvider,$filterProvider,$provide){

    var providers = {};
    providers.$controllerProvider = $controllerProvider;
    providers.$compileProvider = $compileProvider;
    providers.$filterProvider = $filterProvider;
    providers.$provide = $provide;

    $provide.constant('providers',providers);
    $provide.constant('appname','fitenesse');
    $provide.constant('approot','html');
    $provide.constant('componentsUrl','app/components');
    $provide.constant('stack',document.getElementById("stack"));
    $provide.constant('toolbar',document.getElementById("toolbar"));
    $provide.constant('mainview',document.getElementById("mainView"));

    $provide.value('flagtoolbar',true);
    
 

    $provide.service('viewManager',function(resolver,stack,toolbar,mainview,flagtoolbar){

         this.toPage = function(moduleName,animation,callback){ ons.ready(function(){
             if(!animation) animation = 'fade';
            _navigator.resetToPage(resolver.getViewPath(moduleName),{animation:animation,onTransitionEnd:callback});
   
         });};

         this.showToolbar = function(flag){ons.ready(function(){

             if(flag == flagtoolbar) return;
             if(flag)  {
                 mainview.insertBefore(toolbar,mainview.firstChild);
                 toolbar.className = 'navigation-bar navigation-bar--material';
             }
             else {
                 stack.appendChild(toolbar);
                 toolbar.className += ' hide';
                }
             flagtoolbar = flag;
         });};      
    });



    $provide.service('resolver',function(componentsUrl,providers){

            this.getViewPath = function(_moduleName){
                return componentsUrl+'/'+_moduleName+'/'+_moduleName+'View.html' 
            };

            this.getModuleName = function(path){
                
                return path.split('/')[2];
            };

            this.loadModule = function(path){
                var vm = this;
                var _module = this.getModuleName(path);
                require(['_'+_module],function(args){
                vm.runModule(args.view,args.controller,args.aliasCtrl,args.name);
                });
            };

            this.setupModule = function(modulename){
                var _module = angular.module(modulename);
                angular.forEach(_module._invokeQueue, function(invokeArgs) { 
                    
                        var provider = providers[invokeArgs[0]];
                        provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                        
                    });
                    angular.forEach(_module._configBlocks, function (fn) {
                        $injector.invoke(fn);
                    });
                    angular.forEach(_module._runBlocks, function (fn) {
                        $injector.invoke(fn);
                    });
                };
            
            this.runModule = function(_templateId,controller,aliasCtr,_moduleName){
                var elm = document.getElementById(_templateId);
                if(aliasCtr) aliasCtr="as "+aliasCtr; else aliasCtr="";
                elm.setAttribute("ng-controller",controller+" "+aliasCtr);   
                app.requires.push(_moduleName);
                this.setupModule(_moduleName);
                var angelm = angular.element(elm);
                angelm.injector().invoke(function($compile){
                    $compile(elm)(angelm.scope());
                    });
            };
        });
    
});

/******************************** run blocks  ************/

app.controller('appController',function($scope,resolver,appname,viewManager){
      
     
     ons.ready(function(){

           $scope.title = appname;
           document.addEventListener('init',function(event){
               if(event.srcElement.id === 'slidmenu.view') return;
               resolver.loadModule(event.target.name);
           });
           
        
          _navigator.pushPage(resolver.getViewPath('home'));

     });
});
/*
ons.ready(function(){

    

    document.addEventListener('init',function(event)
    {
       /* var $injector = angular.injector();
        $injector.get('resolver').loadModule(event.target.name);
    });


    if(true)
    {
        _navigator.pushPage('app/components/login/loginView.html');
    }

});

*/