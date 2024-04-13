// JavaScript for collapsible functionality
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}

// Fetch JSON data
fetch('data.json')
    .then(response => response.json())
    .then(data => {
        const servicesContainer = document.getElementById('services-container');
        data.services.forEach(service => {
            const serviceElement = document.createElement('div');
            serviceElement.innerHTML = `
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <p>Price: ${service.price}</p>
            `;
            servicesContainer.appendChild(serviceElement);
        });
    })
    .catch(error => console.error('Error fetching JSON data:', error));

// Fetch XML data
var xhr = new XMLHttpRequest();
xhr.open('GET', 'data.xml', true);
xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
            var xmlData = xhr.responseXML;
            const servicesContainer = document.getElementById('services-container');
            const services = xmlData.getElementsByTagName('service');
            for (let i = 0; i < services.length; i++) {
                const service = services[i];
                const name = service.getElementsByTagName('name')[0].textContent;
                const description = service.getElementsByTagName('description')[0].textContent;
                const price = service.getElementsByTagName('price')[0].textContent;
                const serviceElement = document.createElement('div');
                serviceElement.innerHTML = `
                    <h3>${name}</h3>
                    <p>${description}</p>
                    <p>Price: ${price}</p>
                `;
                servicesContainer.appendChild(serviceElement);
            }
        } else {
            console.error('Error fetching XML data:', xhr.statusText);
        }
    }
};
xhr.send();
