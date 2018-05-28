
var vm = new Vue({
    el: '#app',
    data: {
        title : urlMpa.action == 'add' ? '新增用户' : '修改用户信息',
        type : '',
        navs : siderbar.sys,
        inputtext: {},
        dpts : []
    },
    methods:{
        getDepartments : function() {
            var me = this;
            var url = BASEPATH + "/getdepartments";
            $.getJSON(url, function(data) {
                me.dpts =data
            });
        },
        getUserinfo : function(msg) {
            var me = this;
            var url = BASEPATH + '/getuserinfo'
            $.getJSON(url, {account:msg},function(data) {
                me.inputtext = data;
            });
        },
        submitMsg : function(){
            var url = '';
            if (sessionStorage.getItem('account')) {
                url = BASEPATH + "/edituser";
            }else{
                url = BASEPATH + "/adduser";
            }
            $.post(url, this.inputtext,function(data) {
                if (!data.status) {
                    alert(data.msg);
                    return false;
                }
                sessionStorage.removeItem("account");
                location.href="/admin/list";
            });
        }
    },
    created : function(){
        this.getDepartments();
        if (sessionStorage.getItem('account')) {
            this.getUserinfo(sessionStorage.getItem('account'))
        }
    }
})
