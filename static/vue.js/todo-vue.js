Vue.component('ToDos',{

    template: '<div> <slot> </slot> </div>'
});

Vue.component('header-todos',{
    template: '<div> ToDo-List </div>'
});



Vue.component('general-task', {
    template: '<div> <slot></slot>  </div>'
});


Vue.component('all-Todos',{
    template: '<div> <slot> </slot> </div>'
});


var app = new Vue ({

	el: '#Grow_playground',
	data: {
/*	    showAllTodos:false,
	    showMenu:false,
	    top:'0px',
	    left:'0px',

		newtask: '',
		editedTodo: null,
	    visibility: 'all',
		tasks: []
		},

	methods: {
		addTask() {
			var value = this.newtask;

			if(!value) { return }

			this.tasks.push({
				title:value,
				completed:false
			});
			this.newtask='';		
		},

		deleteTodo(task){
			this.tasks.splice(this.tasks.indexOf(task),1)
		},

		editTodo(task){
		      this.beforeEditCache = task.title,
		      this.editedTodo = task
		}

		

		/*
        closeMenu() {
            this.showMenu = false;
        },

        setMenu(event){
            this.showMenu=true;
            this.top=event.clientY -330 +'px';
            this.left=event.clientX  -145 +'px';
            console.log(this.top,this.left);
        }
        */


	}
});

