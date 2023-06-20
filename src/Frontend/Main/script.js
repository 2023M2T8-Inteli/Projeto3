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
        var resultElement = document.getElementById('result');
        resultElement.textContent = JSON.stringify(data); // Atualiza o conteúdo do elemento com a resposta recebida
    })
    .catch(err => console.log(err));
} 
 /* function engateE(){ //Aqui reconheço um elemento no HTML para realizar a consulta de choque por tipo de engate
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
    // Itera sobre os dados retornados
    map = document.getElementById('map').
    data.rows.forEach(item => {
      const latitude = parseFloat(item.Latitude.replace(',', '.'));
      const longitude = parseFloat(item.Longitude.replace(',', '.'));
      L.marker([latitude, longitude]).addTo(map);

      // Cria um marcador no mapa
      const marker = L.marker([latitude, longitude]).addTo(map);

      // Personalize o marcador, se necessário
      // marker.setIcon(...);
      // marker.bindPopup(...);
    });
  })
  .catch(err => console.log(err));
} */
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
            let counter = 0;
            counter += 1;
            if (counter == 100){
                
            }
            const latitude = parseFloat(item.Latitude.replace(',', '.'));
            const longitude = parseFloat(item.Longitude.replace(',', '.'));
            const popupContent = 'cock balls'
            L.marker([latitude, longitude], { popup: popupContent })
            .on('click', () => marker.openPopup())
            .addTo(mymap);
          });
        })
        .catch(err => console.log(err));
      }
