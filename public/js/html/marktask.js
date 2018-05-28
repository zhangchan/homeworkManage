var vm = new Vue({
    el: '#app',
    data: {
        title : '作业状态',
        type : u_type,
        navs : siderbar['student'],
        taskmsg : {},
        scinfo : {},
        taskurl : '',
        scfile : '上传作业文档'
    },
    methods:{
        getStudentTask : function() {
            var me = this;
            var url = BASEPATH + "/getSchedulesinfo";
            $.getJSON(url, urlMpa, function(data) {
                me.scinfo = data;
            });
        },
        getTaskinfo : function(){
            var me = this;
            var url = BASEPATH + "/gettaskinfo";
            $.getJSON(url, {id:urlMpa.uid}, function(data) {
                me.taskmsg = data;
            });
        },
        upload : function () {
            if (this.scinfo.xzstatus) {
                alert('老师已下载，上传失败');
                return false;
            }
            var me = this;
            var url = BASEPATH + '/upload';
            var formData = new FormData();
            var file = document.getElementById("user-pic");
            formData.append("word", file.files[0]); 
            if(this.type == 1){
                formData.append("name", this.scinfo.name);   
                formData.append("path", this.taskmsg.path);   
                formData.append("type", 1);   
            }
            $.ajax({
                url: url,
                type: "POST",
                data: formData,
                contentType: false,
                processData: false,
                success: function (data) {
                    if (!data.status) {
                        alert('上传失败');
                        return;
                    }
                    alert('上传成功！');
                    me.scfile = data.filename;
                    me.taskurl = data.url
                    file.value = '';

                },
                error: function () {
                    alert("上传失败！");
                }
            });
        },
        save : function(event) {
            if (this.scinfo.xzstatus) {
                alert('老师已下载，操作失败');
                return false;
            }
            var url = BASEPATH + "/updateschedule", me = this;
            $.post(url, {id:this.scinfo.id,taskurl:me.taskurl,tjstatus:1}, function(data) {
                if (data.status) {
                    location.href="list";
                }
            });
        }
    },
    created : function(){
        this.getTaskinfo();
        this.getStudentTask();
    }
})
