const API_URL = 'https://koders-list-api.vercel.app';

export function getKoders () {
    return fetch(`${API_URL}/koders`) //Fetch es la función que ayuda a hacer llamadas o peteciones a un servidor
    .then(response => response.json())
    .then(data => data.koders);
};

export function createKoder (koder) {
    return fetch(`${API_URL}/koders`, { //Cuando ocupamos fetch, este recibe dos parametros, la URL a donde se hace la petición y el otro parametro es un objeto de configuración
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            firstName: koder.firstName,
            lastName: koder.lastName,
            email: koder.email
        })
    });
}

export function deleteKoder (koderId) {
    return fetch(`${API_URL}/koders/${koderId}/delete`, {
        method: 'POST',
    })
}