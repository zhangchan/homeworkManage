var vm = new Vue({
    el: '#app',
    data: {
        title : '系统配置',
        type : u_type,
        navs : siderbar[ u_type == 2 ? 'teacher' : 'student'],
        inputtext : {}
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
