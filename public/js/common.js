var u_account = sessionStorage.getItem('u_account');
var u_department = sessionStorage.getItem('u_department');
var u_name = sessionStorage.getItem('u_name');
var u_type = sessionStorage.getItem('u_type');
var u_major = sessionStorage.getItem('u_major');

var vh = new Vue({
    el: '#header',
    data: {
    	user : u_name,
    	type : u_type
    },
    methods:{

    },
    created : function(){
        
    }
})

