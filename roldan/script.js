// ===============================
// HISTORIAL SEMANAL
// ===============================
const form = document.getElementById("habitos-form");
const puntaje = document.getElementById("puntaje");
const listaHistorial = document.getElementById("historial-lista");

// Obtener historial guardado o crear arreglo vacío
let historial = JSON.parse(localStorage.getItem("historialSemanal")) || [];

// Función para guardar historial
function guardarHistorial() {
    localStorage.setItem("historialSemanal", JSON.stringify(historial));
}

// Función para actualizar lista en pantalla
function actualizarLista() {
    listaHistorial.innerHTML = "";

    historial.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.fecha} - Puntaje: ${item.score}`;
        listaHistorial.appendChild(li);
    });
}

// ===============================
// GRÁFICA
// ===============================
const ctx = document.getElementById("grafica").getContext("2d");

const grafica = new Chart(ctx, {
    type: "bar",
    data: {
        labels: historial.map(item => item.fecha),
        datasets: [{
            label: "Horas de estudio",
            data: historial.map(item => item.horas),
            backgroundColor: getComputedStyle(document.documentElement)
                .getPropertyValue("--main-color")
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: true }
        }
    }
});

// ===============================
// REGISTRAR HÁBITOS
// ===============================
form.addEventListener("submit", (e) => {
    e.preventDefault();

    const horas = parseInt(document.getElementById("horas-estudio").value) || 0;
    const agua = parseInt(document.getElementById("vasos-agua").value) || 0;
    const sueno = parseInt(document.getElementById("horas-sueno").value) || 0;
    const ejercicio = parseInt(document.getElementById("minutos-ejercicio").value) || 0;

    let score = horas * 10 + agua * 5 + sueno * 8 + ejercicio * 2;

    puntaje.textContent = `Tu puntaje de bienestar es: ${score}`;

    // Fecha actual
    const hoy = new Date().toLocaleDateString();

    // Agregar al historial
    historial.push({ fecha: hoy, score: score, horas: horas });

    // Mantener solo últimos 7 días
    if (historial.length > 7) {
        historial.shift();
    }

    guardarHistorial();

    // Actualizar gráfica
    grafica.data.labels = historial.map(item => item.fecha);
    grafica.data.datasets[0].data = historial.map(item => item.horas);
    grafica.update();

    actualizarLista();
});

// Cargar lista al iniciar
actualizarLista();
