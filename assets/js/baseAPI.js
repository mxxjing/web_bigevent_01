// 每次调用$.get()、$.post()和$ajax()的时候 会先调用ajaxPrefilter这个函数
// 在这个函数中 我们可以拿到ajax提供的配置对象

// 用于开发环境的服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 用于测试环境的服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 用于生产环境的服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function(option){
    option.url = baseURL + option.url
    console.log(option.url);
}) 