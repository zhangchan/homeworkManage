var vm = new Vue({
    el: '#app',
    data: {
        title : '系统配置',
        navs : siderbar.sys
    },
    methods:{
        getTableData : function(){
            var me = this;
            var url = BASEPATH + "/admin/getuserlist";
            $.getJSON(url, function(data) {
                me.tableConfig.tableData =data
            });
        },
        del : function(event) {
            event.preventDefault();
            event.stopPropagation()
            var id = event.target.getAttribute('uid');
        }
    },
    created : function(){
        // this.getTableData();
    }
})
