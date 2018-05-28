var vm = new Vue({
    el: '#app',
    data: {
        title : '系统配置',
        type : u_type,
        navs : siderbar[ u_type == 2 ? 'teacher' : 'student'],
        inputtext : {},
        oldpw : '',
        newpw : ''
    },
    methods:{
        getUserInfo : function(){
            var me = this;
            var url = BASEPATH + "/getuserinfo";
            $.getJSON(url, {account:u_account},function(data) {
                me.inputtext =data
            });
        },
        save : function(event) {
            var me = this;
            var url = BASEPATH + "/edituser";
            if (this.inputtext.password != this.oldpw) {
                alert('旧密码输入错误！');
                return false;
            }
            this.inputtext.password = this.newpw;
            $.post(url, this.inputtext,function(data) {
                if (data.status) {
                    alert(data.msg);
                    location.reload();
                }
            });
        }
    },
    created : function(){
        this.getUserInfo();
    }
})
