var mymap = L.map('map').setView([-23.555797392918087, -46.73375273135423], 13); 
// Inicializa o mapa com um ponto inicial

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(mymap);

var markers = [];
//Array para armazenar os marcadores no mapa

function acharChoquePlaca() { 
//Reconhece um elemento no HTML para realizar a consulta de choque por placa do vagão
    var user = {
        placa: document.getElementById('placa').value,
    }
    fetch('http://localhost:9696/choqueVagao', {
    //Realiza a consulta de choque por placa do vagão
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove os marcadores existentes no mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
        <strong>Data e Hora:</strong> ${formattedDateTime}<br>
        <strong>Latitude:</strong> ${item.Latitude}<br>
        <strong>Longitude:</strong> ${item.Longitude}<br>
        <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
        <strong>Placa:</strong> ${item.placa}<br>
        <strong>Trecho:</strong> ${item.Trecho}<br>
        <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
        <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
        <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
        <strong>Viagem:</strong> ${item.viagem}<br>
        <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
        <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
    `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoVagao', {
    //Realiza a consulta de pico por placa do vagão
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function engateE() {
//Função para buscar choques do engate E
    var user = {
        tipo_engate: 'E',
    }
    fetch('http://localhost:9696/choqueEngate', {
    //Realiza a consulta de choque por tipo de engate
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove os marcadores existentes do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay;
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
        <strong>Data e Hora:</strong> ${formattedDateTime}<br>
        <strong>Latitude:</strong> ${item.Latitude}<br>
        <strong>Longitude:</strong> ${item.Longitude}<br>
        <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
        <strong>Placa:</strong> ${item.placa}<br>
        <strong>Trecho:</strong> ${item.Trecho}<br>
        <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
        <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
        <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
        <strong>Viagem:</strong> ${item.viagem}<br>
        <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
        <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
    `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoEngate', {
    //Realiza a consulta de pico por tipo de engate
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);   
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function engateF() {
//Função para buscar choques do engate F
    var user = {
        tipo_engate: 'F',
    }
    fetch('http://localhost:9696/choqueEngate', {
    //Realiza a consulta de choques por tipo de engate
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove os marcadores existentes do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoEngate', {
    //Realiza a consulta de picos por tipo de engate
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function v1() {
//Função para buscar choques da viagem 1
    let user = {
        viagem: 1
    }
    fetch('http://localhost:9696/choqueViagem', {
    //Realiza a consulta de choques por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove os marcadores existentes do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
    //Realiza a consulta de picos por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function v2() {
//Função para buscar choques da viagem 2
    let user = {
        viagem: 2
    }
    fetch('http://localhost:9696/choqueViagem', {
    //Realiza a consulta de choques por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove todos os marcadores do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
    //Realiza a consulta de picos por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function v3() {
//Função para buscar choques da viagem 3
    let user = {
        viagem: 3
    }
    fetch('http://localhost:9696/choqueViagem', {
    //Realiza a consulta de choques por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove todos os marcadores do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
    //Realiza a consulta de picos por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function v4() {
//Função para buscar choques da viagem 4
    let user = {
        viagem: 4
    }
    fetch('http://localhost:9696/choqueViagem', {
    //Realiza a consulta de choques por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove todos os marcadores do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
    //Realiza a consulta de picos por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}

function v5() {
//Função para buscar choques da viagem 5
    let user = {
        viagem: 5
    }
    fetch('http://localhost:9696/choqueViagem', {
    //Realiza a consulta de choques por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            markers.forEach(marker => mymap.removeLayer(marker));
            markers = [];
            //Remove todos os marcadores do mapa

            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>Força Máxima:</strong> ${item['Fmaxima-tf']} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
    fetch('http://localhost:9696/picoViagem', {
    //Realiza a consulta de picos por viagem
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            data.rows.forEach(item => {
            //Converte o valor da data e hora
                var excelTimeValue = parseFloat(item.datahora.replace(',', '.'));
                var millisecondsPerDay = 24 * 60 * 60 * 1000; 
                //Número de milissegundos em um dia
                var baseDate = new Date('1900-01-01');
                var milliseconds = (excelTimeValue - 1) * millisecondsPerDay; 
                //Subtrai 1 para ajustar a data base do Excel
                var dateValue = new Date(baseDate.getTime() + milliseconds);
                var formattedDateTime = dateValue.toLocaleString('en-US', {
                    dateStyle: 'short',
                    timeStyle: 'short'
                });
                const latitude = parseFloat(item.Latitude.replace(',', '.'));
                const longitude = parseFloat(item.Longitude.replace(',', '.'));
                const popupContent = `
            <strong>Data e Hora:</strong> ${formattedDateTime}<br>
            <strong>Latitude:</strong> ${item.Latitude}<br>
            <strong>Longitude:</strong> ${item.Longitude}<br>
            <strong>Velocidade:</strong> ${item.Velocidade} km/h<br>
            <strong>Placa:</strong> ${item.placa}<br>
            <strong>Trecho:</strong> ${item.Trecho}<br>
            <strong>deltaT:</strong> ${item.deltaT} tf<br>
            <strong>ACT:</strong> ${item['ACT-mm']} mms<br>
            <strong>PEG:</strong> ${item['PEG-PSI']} PSIs<br>
            <strong>Viagem:</strong> ${item.viagem}<br>
            <strong>Tipo de Engate:</strong> ${item.tipo_engate}<br>
            <strong>Tipo de Choque:</strong> ${item.tipo_choque}<br>
        `;
                const marker = L.marker([latitude, longitude])
                    .addTo(mymap);
                marker.bindPopup(popupContent);
                marker.on('click', () => marker.openPopup());
                markers.push(marker);
                //Cria marcadores no mapa com base nos dados retornados e os adiciona à lista de marcadores
            });
        })
        .catch(err => console.log(err));
}