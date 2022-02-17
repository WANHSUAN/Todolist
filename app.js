Vue.createApp({
    data() {
        return {
            newTodo: '',
            todoList: [],
            cacheTitle: '',
            cacheId: '',
            visibility: 'all'
        }
    },
    computed: {
        filterTodos() {
            switch(this.visibility) {
                case 'active':
                    return this.todoList.filter((item) => !item.completed);
                case 'completed':
                    return this.todoList.filter((item) => item.completed);                
                default:
                    return this.todoList;
            }
        }
    },
    methods: {
        // 新增事項
        addTodo() {
            const newTodo = this.newTodo && this.newTodo.trim();
            if(!newTodo) {
                return;
            }
            this.todoList.push({
                id: Date.now(),
                title: this.newTodo,
                completed: false
            });
            this.newTodo = '';
        },
        // 刪除事項
        removeTodo(id) {
            const index = this.todoList.findIndex((item) => item.id === id);
            this.todoList.splice(index, 1);
        },
        // 修改事項
        editTodo(id, title) {
            this.cacheTitle = title;
            this.cacheId = id;
        },
        // 完成修改事項
        doneEdit(item) {
            if(!this.cacheTitle) {
                return;
            }
            const index = this.todoList.findIndex((item) => item.id === this.cacheId);
            this.todoList[index].title = this.cacheTitle;

            this.cacheTitle = '';
            this.cacheId = '';
        },
        // 取消修改事項
        cancelEdit() {
            this.cacheTitle = '';
            this.cacheId = '';
        },
        // 刪除全部事項
        removeAllTodo() {
            if(window.confirm('確定要刪除全部 Todo?')) {
                this.todoList = [];
            }
        }
    },
}).mount('#app');
