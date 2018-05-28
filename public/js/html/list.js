var vm = new Vue({
    el: '#app',
    data: {
        title : '系统配置',
        type: u_type,
        navs : siderbar[ u_type == 2 ? 'teacher' : 'student'],
        columns : [
            {title:"作业题目"},
            {title:"专业"},
            {title:"学科"},
            {title:"发布人"},
            {title:"开始日期"},
            {title:"截止日期"},
            {title:"操作"}
        ],
        tableData : []
    },
    methods:{
        getTableData : function(){
            var me = this;
            var url = BASEPATH + "/tasklist";
            var arg = {}
            if (u_type == 2) {
                //老师 通过老师名查
                arg.from = u_name;
            }else{
                //学生 通过专业查
                arg.department = u_department;
            }
            $.getJSON(url, arg, function(data) {
                me.tableData = data;
            });
        },
        add : function(event) {
            sessionStorage.removeItem('id');
            location.href="/taskinfo"
        },
        edit : function(event) {
            event.preventDefault();
            event.stopPropagation();
            var id = event.target.getAttribute('uid');
            sessionStorage.setItem('id',id);
            location.href="/taskinfo";
        },
        del : function(event) {
            event.preventDefault();
            event.stopPropagation();
            var me = this;
            var id = event.target.getAttribute('uid');
            var url = BASEPATH + "/deltask";
            $.post(url, {id:id}, function(data) {
                var index = 0;
                for (var i = 0; i < me.tableData.length; i++) {
                    if(me.tableData[i].id == id){
                        break;
                    }
                    index++
                }
                me.tableData.splice(index, 1);
            });
        },
        view : function(event) {
            event.preventDefault();
            event.stopPropagation();
            var id = event.target.getAttribute('uid');
            if (u_type ==2) {
                location.href="/process?id="+id;
            }else{
                location.href="/marktask?uid="+id+"&account=" + u_account;
            }
        }
    },
    created : function(){
        this.getTableData();
    }
})
