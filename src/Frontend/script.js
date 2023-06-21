var mymap = L.map('map').setView([-23.555797392918087, -46.73375273135423], 13); // Inicializa o mapa com um ponto inicial

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mymap);
function acharChoquePlaca(){ //Aqui reconheço um elemento no HTML para realizar a consulta de choque por placa do vagão
    console.log('Acharchoque1')
    var user = {
        placa: document.getElementById('placa').value,
    }
    fetch('http://localhost:9696/choqueVagao', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        data.rows.forEach(item => {
            
            const latitude = parseFloat(item.Latitude.replace(',', '.'));
            const longitude = parseFloat(item.Longitude.replace(',', '.'));
            const popupContent = 'tuctac Ahah'
            L.marker([latitude, longitude], { popup: popupContent })
            .on('click', () => marker.openPopup())
            .addTo(mymap);
        });
        })
        .catch(err => console.log(err));
} 
function clearmap(){ //Função para limpar o mapa

}
function engateE(){ 
    console.log('botao funcionando')
    var user = {
        tipo_engate: 'E',
    }
    fetch('http://localhost:9696/choqueEngate', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {"Content-type": "application/json"}
    })
    .then(response => response.json())
    .then(data => {
        data.rows.forEach(item => {
            
            const latitude = parseFloat(item.Latitude.replace(',', '.'));
            const longitude = parseFloat(item.Longitude.replace(',', '.'));
            const popupContent = 'tuctac Ahah'
            L.marker([latitude, longitude], { popup: popupContent })
            .on('click', () => marker.openPopup())
            .addTo(mymap);
        });
        })
        .catch(err => console.log(err));
    }
    function engateF(){ 
        console.log('botao funcionando')
        var user = {
            tipo_engate: 'F',
        }
        fetch('http://localhost:9696/choqueEngate', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = 'teste'
                L.marker([latitude, longitude], { popup: popupContent })
                .on('click', () => marker.openPopup())
                .addTo(mymap);
            });
            })
            .catch(err => console.log(err));
        }
function v1(){
    console.log('tekke in die fresse')
    let user = {
        viagem: 1
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = 'ayaya'
                L.marker([latitude, longitude], { popup: popupContent })
                .on('click', () => marker.openPopup())
                .addTo(mymap);
            });
            })
            .catch(err => console.log(err));
        }
function v2(){
    console.log('tekke in die fresse')
    let user = {
        viagem: 2
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user), 
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = 'ayaya'
                L.marker([latitude, longitude], { popup: popupContent })
                .on('click', () => marker.openPopup())
                .addTo(mymap);
            });
            })
            .catch(err => console.log(err));
        }
function v3(){
    console.log('tekke in die fresse')
    let user = {
        viagem: 3
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = 'ayaya'
                L.marker([latitude, longitude], { popup: popupContent })
                .on('click', () => marker.openPopup())
                .addTo(mymap);
            });
            })
            .catch(err => console.log(err));
        }
function v4(){
    console.log('tekke in die fresse')
    let user = {
        viagem: 4
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = 'ayaya'
                L.marker([latitude, longitude], { popup: popupContent })
                .on('click', () => marker.openPopup())
                .addTo(mymap);
            });
            })
            .catch(err => console.log(err));
        }
function v5(){
    console.log('tekke in die fresse')
    let user = {
        viagem: 5
    }
    fetch('http://localhost:9696/choqueViagem', {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {"Content-type": "application/json"}
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = 'ayaya'
                L.marker([latitude, longitude], { popup: popupContent })
                .on('click', () => marker.openPopup())
                .addTo(mymap);
            });
            })
            .catch(err => console.log(err));
        }




