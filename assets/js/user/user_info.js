$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function (value) {
            if (value.length > 7) {
                return '昵称长度必须在 1 ~ 7 个字符之间！'
            }
        }
    })

    // 用户信息获取/赋值
    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                } else {
                    // 调用 form.val() 快速为表单赋值
                    form.val('formUserInfo', res.data)
                }
            }
        })
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })

    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status!==0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})