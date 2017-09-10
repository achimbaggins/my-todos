new Vue({
  el: '#app',
  data: {
    todos: [],
    login: {
      username: '',
      password: ''
    },
    register: {
      username: '',
      password: ''
    },
    newTodo: {
      tugas: '',
      desc: '',
      tags: '',
      authorid: localStorage.getItem('id')
    },
    editTodo: '',
    dataEditTodo: {
      tugas: '',
      desc: '',
      tags: ''
    },
    userid: localStorage.getItem('id'),
    username: localStorage.getItem('username')
  },
  methods: {
    doLogin(){
      var self = this
      axios.post('http://localhost:3000/signin', self.login)
      .then(get => {
        console.log('======', get.data);
        if(get.data !== 'username tidak ditemukan' && get.data !== 'password salah'){
          localStorage.clear()
          console.log('======', get.data.username);
          localStorage.setItem('token', get.data.token)
          localStorage.setItem('id', get.data.id)
          localStorage.setItem('username', get.data.username)
          window.location.href="home.html"
        } else {
          window.location.href="index.html"
        }
      })
    },
    doLogout() {
      localStorage.clear()
      window.location.href="index.html"
    },
    doRegister() {
      var self = this
      axios.post('http://localhost:3000/signup', self.register)
      .then(get=> window.location.href="index.html" )
    },
    getTodo(){
      var self = this
      axios.get('http://localhost:3000/todos', {
        headers:{
          id: self.userid
        }
      })
      .then(result => {
        this.todos = result.data
      })
    },
    addTodo(){
      var self = this
      axios.post('http://localhost:3000/todos', this.newTodo)
      .then(result => {
        this.todos.unshift(result.data)
        var defaultData = {
          tugas: '',
          desc: '',
          tags: '',
          authorid: localStorage.getItem('id')
        }
        this.newTodo = defaultData
      })
    },
    rmTodo(todo, index, id){
      if(window.confirm("Yakin mau hapus catatan tugas ini?")){
        this.todos.splice(index,1)
        axios.delete(`http://localhost:3000/todos/${id}`)
      }
    },
    forUpdate(index, id){
      var self = this
      this.todos.splice(index,1)
      axios.get(`http://localhost:3000/todos/${id}`)
      .then(result => {
        self.editTodo = result.data[0]
        // console.log('data update', self.editTodo);
      })
    },
    updateTodo(id){
      var data =
      axios.put(`http://localhost:3000/todos/${id}`, this.editTodo)
      .then(result => {
        // self.editTodo = result.data[0]
        this.todos.unshift(result.data)
        console.log('data update', result.data);

      })
    },
    updateStatus(data){
      var statusBaru = !data.status
      data.status = statusBaru
      axios.put(`http://localhost:3000/todos/${data._id}/status`, {status: statusBaru})
      .then(result => {
      })
    }
  },
  created: function () {
    this.getTodo()
  }
})
