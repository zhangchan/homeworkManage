var vm = new Vue({
        el: '#app',
        data: {
            title: '作业提交与批改系统',
            inputtext : {}
        },
        methods:{
            login : function(){                
                if (!this.inputtext.name || !this.inputtext.password) {
                    alert('账号密码不能为空！');
                    return;
                }
                var url = BASEPATH + "/userlogin";
                var arg = {
                    account : this.inputtext.name,
                    password : this.inputtext.password
                }
                $.post(url, arg, function(data) {
                    if (!data.length) {
                        alert('账号密码错误！');
                        return;
                    }
                    sessionStorage.setItem('u_type',data[0].type);
                    sessionStorage.setItem('u_account',data[0].account);
                    sessionStorage.setItem('u_department',data[0].department);
                    sessionStorage.setItem('u_name',data[0].name);
                    sessionStorage.setItem('u_major',data[0].major);
                    if (data[0].type == 3) {
                        location.href="/admin/list";
                    }else{
                        location.href="/list";
                    }
                });
            }
        }
    })


