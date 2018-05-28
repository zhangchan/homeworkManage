var vm = new Vue({
    el: '#app',
    data: {
        title : '系统配置',
        navs : siderbar[ u_type == 2 ? 'teacher' : 'student'],
        columns : [
            {title:"学生姓名"},
            {title:"作业题目"},
            {title:"提交状态"},
            {title:"下载状态"},
            {title:"截止日期"},
            {title:"操作"}
        ],
        tableData : [],
        taskmsg : {}
    },
    computed : {
        tjnums : function () {
            return this.tableData.filter(ele=>ele.tjstatus).length;
        },
        wtjnums : function () {
            return this.tableData.filter(ele=>ele.tjstatus == false).length;
        },
        xznums : function () {
            return this.tableData.filter(ele=>ele.xzstatus).length;
        },
        wxznums : function () {
            return this.tableData.filter(ele=>ele.xzstatus == false).length;
        }
    },
    methods:{
        getTaskinfo : function(){
            var me = this;
            var url = BASEPATH + "/gettaskinfo";
            $.getJSON(url, {id:urlMpa.id}, function(data) {
                me.taskmsg = data;
            });
        },
        getTableData : function(){
            var me = this;
            var url = BASEPATH + "/getscheduleslist";
            $.getJSON(url, {uid:urlMpa.id},function(data) {
                me.tableData = data
            });
        },
        download : function() {
            var me = this;
            var index = event.target.getAttribute('index');
            var cur = me.tableData[index]
            if (!cur.tjstatus) {
                alert(cur.name  + '同学还未提交作业')
                return;
            }
            var url = BASEPATH + "/updateschedule";
            var arg = {
                xzstatus : true,
                id : cur.id
            }
            $.post(url, arg, function(data) {
                window.open(BASEPATH + cur.taskurl);
                me.tableData[index].xzstatus = true;
            });
        }
    },
    created : function(){
        this.getTaskinfo();
        this.getTableData();
    }
})
