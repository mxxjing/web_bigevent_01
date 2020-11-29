// 每次调用$.get()、$.post()和$ajax()的时候 会先调用ajaxPrefilter这个函数
// 在这个函数中 我们可以拿到ajax提供的配置对象

// 用于开发环境的服务器地址
var baseURL = 'http://ajax.frontend.itheima.net'
// 用于测试环境的服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'
// 用于生产环境的服务器地址
// var baseURL = 'http://ajax.frontend.itheima.net'

$.ajaxPrefilter(function (option) {
    option.url = baseURL + option.url
    // console.log(option.url);

    // 对需要权限的接口配置头信息
    // 必须以my开头才行
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 登录拦截 全局统一挂载 complete回调函数
    option.complete = function (res) {
        // console.log('执行了complete回调函数');
        // console.log(res);
        // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
            // 强制清空token
            localStorage.removeItem('token')
            // 强制跳转到登录页面   
            location.href = '/login.html'
        }
    }
}) 