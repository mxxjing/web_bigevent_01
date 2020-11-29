$(function () {
    // 获取用户信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮 实现退出功能
    $('#logout').on('click', function () {

        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            // 清除本地存储token
            localStorage.removeItem('token')
            // 跳转页面
            location.href = '/login.html'
            // 关闭询问框
            layer.close(index);
        });

    })
})

// 封装获取用户信息的函数（封装到入口函数的外面 因为后面其他的页面要调用）
function getUserInfo() {
    // 发送ajax请求
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        // 需重新登录 因为token过期时间为12小时
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // 请求成功 渲染用户头像
            renderavatar(res.data)
        },
        // 无论成功或者失败 最终都会调用complete回调函数
        // complete: function (res) {
        //     console.log('执行了complete回调函数');
        //     console.log(res);
        //     // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status !== 0 && res.responseJSON.message === '身份认证失败！') {
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }

    })
}

// 封装渲染用户头像函数
function renderavatar(user) {
    // 获取用户名（有昵称用昵称 没有昵称用username
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户头像
    if (user.user_pic !== null) {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show().siblings('.text-avatar').hide()
    } else {
        // 渲染文字头像
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).siblings('.layui-nav-img').hide()
    }


}