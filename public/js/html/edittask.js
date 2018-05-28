var id = sessionStorage.getItem('id');
var vm = new Vue({
    el: '#app',
    data: {
        title : '系统配置',
        navs : siderbar[ u_type == 2 ? 'teacher' : 'student'],
        inputtext : {
            major : u_major,
            from : u_name
        },
        scfile :'上传习题',
        dpts : []
    },
    methods:{
        getTaskinfo : function(){
            var me = this;
            var url = BASEPATH + "/gettaskinfo";
            $.getJSON(url, {id:id}, function(data) {
                me.inputtext =data
            });
        },
        getDepartments : function() {
            var me = this;
            var url = BASEPATH + "/getdepartments";
            $.getJSON(url, function(data) {
                me.dpts =data
            });
        },
        upload : function () {
            var me = this;
            var url = BASEPATH + '/upload';
            var formData = new FormData();
            var file = document.getElementById("user-pic");
            formData.append("word", file.files[0]); 
            if(u_type == 2){
                formData.append("name", me.inputtext.title);
                formData.append("path", u_name);
                formData.append("type", 2);  
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
                    me.inputtext.exercises = data.url
                    file.value = '';

                },
                error: function () {
                    alert("上传失败！");
                }
            });
        },
        save : function(event) {
            var url = '/edittask'; 
            var date = new Date();
            this.inputtext.path = ''+date.getFullYear() +(date.getMonth()+1) + date.getDate() + Math.ceil(Math.random()*100);
            $.post(url, this.inputtext, function(data) {
                sessionStorage.removeItem('id',id);
                location.href="/list";
            });
        }
    },
    created : function(){
        this.getDepartments();
        if (id) {
            this.getTaskinfo(id);
        }
    }
})