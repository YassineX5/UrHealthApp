
requirejs.config({

    baseUrl:'app/components',
    urlArgs: "bust=" + (new Date()).getTime(),
    paths:
    {
       _login:'login/loginModule',
       _home:'home/homeModule'
    }
});


