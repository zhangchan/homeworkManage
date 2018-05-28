var vm = new Vue({
        el: '#app',
        data: function() {
            return {
                title : '用户列表',
                navs : siderbar.sys,
                pageIndex:1,
                pageSize:10,
                tableConfig: {
                    multipleSort: false,
                    tableData: [],
                    columns: [
                        {title:'姓名'},
                        {title: '性别'},
                        {title: '职位'},
                        {title: '班级（学生）'},
                        {title: '学科（教师）'},
                        {title: '电话'},
                        {title: '邮箱'},
                        {title: '操作'}
                    ]
                }
            }
        },
        methods:{
            getTableData : function(){
                var me = this;
                var url = BASEPATH + "/admin/getuserlist";
                $.getJSON(url, function(data) {
                    me.tableConfig.tableData =data
                });
            },
            edit : function (event) {
                event.preventDefault();
                event.stopPropagation()
                var index = event.target.getAttribute('index');
                var cur = this.tableConfig.tableData[index];
                sessionStorage.setItem('account',cur.account)
                location.href="/admin/userinfo?action=edit";
            },
            adduser : function () {
                sessionStorage.removeItem("account");
                location.href="/admin/userinfo?action=add"
            },
            del : function(event) {
                event.preventDefault();
                event.stopPropagation();
                var me = this;
                var index = event.target.getAttribute('index');
                var cur = this.tableConfig.tableData[index];
                var url = BASEPATH + "/deluser";
                $.post(url, {account:cur.account}, function(data) {
                    var index = 0;
                    for (var i = 0; i < me.tableConfig.tableData.length; i++) {
                        if(me.tableConfig.tableData[i].account == cur.account){
                            break;
                        }
                        index++
                    }
                    me.tableConfig.tableData.splice(index, 1);
                });
            }
        },
        created : function(){
            this.getTableData();
        }
    })
