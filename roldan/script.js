// Cambiar tema oscuro/claro 
const toggleBtn = document.getElementById("toggle-theme"); 
toggleBtn.addEventListener("click", () => { 
document.body.classList.toggle("dark-mode"); 
}); 
// Personalizar color principal 
const colorPicker = document.getElementById("color-picker"); 
colorPicker.addEventListener("input", (e) => { 
document.documentElement.style.setProperty("--main-color", e.target.value); 
}); 
// Guardar notas en localStorage 
const notas = document.getElementById("notas"); 
const guardarNotas = document.getElementById("guardar-notas"); 
guardarNotas.addEventListener("click", () => { 
localStorage.setItem("misNotas", notas.value); 
alert("Notas guardadas!"); 
}); 
// Cargar notas al inicio 
window.onload = () => { 
if(localStorage.getItem("misNotas")) { 
notas.value = localStorage.getItem("misNotas"); 
} 
}; 
// Registrar hábitos y calcular puntaje 
const form = document.getElementById("habitos-form"); 
const puntaje = document.getElementById("puntaje"); 
form.addEventListener("submit", (e) => { 
e.preventDefault(); 
const horas = parseInt(document.getElementById("horas-estudio").value) || 0; 
const agua = parseInt(document.getElementById("vasos-agua").value) || 0; 
const sueno = parseInt(document.getElementById("horas-sueno").value) || 0; 
const ejercicio = parseInt(document.getElementById("minutos-ejercicio").value) || 0; 
let score = horas * 10 + agua * 5 + sueno * 8 + ejercicio * 2; 
puntaje.textContent = `Tu puntaje de bienestar es: ${score}`; 
}); 
// Gráfica con Chart.js 
const ctx = document.getElementById("grafica").getContext("2d"); 
const grafica = new Chart(ctx, { 
type: "bar", 
data: { 
labels: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"], 
datasets: [{ 
label: "Horas de estudio", 
data: [2, 3, 4, 2, 5], 
backgroundColor: "var(--main-color)" 
}] 
} 
});