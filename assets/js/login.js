// 入口函数
$(function () {
    // 点击去注册账号 隐藏登录区域 显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击去登录 隐藏注册区域 显示登录区域
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 自定义校验规则
    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],
        // 检验两次密码是否一致的规则
        repwd: function (value) {
            // 通过形参value拿到的是确认密码框中的内容
            // 还需要拿到密码框中的内容
            // 然后进行一次等于的判断
            // 如果判断失败,则return一个提示消息即可

            // 属性选择器 [name=password]
            var pwd = $('.reg-box input[name=password]').val()
            if (pwd !== value) {
                return '两次密码输入不一致'
            }
        }
    })

    // 监听注册表单的提交事件
    $('#form-reg').on('submit', function (e) {
        // 阻止表单提交的默认行为
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success: function (res) {
                // 判断返回状态
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 })
                }
                // 提交成功后处理代码
                layer.msg('注册成功，请登录！', { icon: 6 })
                $('#link_login').click()
                $('#form-reg')[0].reset()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form-login').submit(function (e) {
        // 阻止表单的默认提交
        e.preventDefault()
        // 发送ajax请求
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                // 判断信息状态
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                localStorage.setItem('token', res.token)
                location.href = '/index.html'
            }
        })
    })
})