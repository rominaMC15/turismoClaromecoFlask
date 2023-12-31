if (document.getElementById("app")) {
    const app = new Vue({
        el: "#app",
        data: {
            productos: [],
            errored: false,
            loading: true
        },
        created() {
            //var url = 'http://localhost:5000/mensajes'
            var url = "https://turismoclaromeco.onrender.com/mensajes"
            this.fetchData(url)
        },
        methods: {
            fetchData(url) {
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        this.productos = data;
                        this.loading = false;
                    })
                    .catch(err => {
                        this.errored = true
                    })
            },
            eliminar(producto) {
                //const url = 'http://localhost:5000/mensajes/' + producto;
                const url = 'https://turismoclaromeco.onrender.com/mensajes/' + producto;
                var options = {
                    method: 'DELETE',
                }
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        location.reload();
                    })
            }
        }
    })
}
