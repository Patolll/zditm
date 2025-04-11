const line = document.querySelector(".line");
const direction = document.querySelector(".direction");
const departure = document.querySelector(".departure");
const time = document.getElementById("time");
function fetchDepartures() {
  fetch("https://www.zditm.szczecin.pl/api/v1/displays/97311")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      if (!data.departures) {
        console.error("No departures found in the response data.");
        return;
      }
      line.innerHTML = "";
      direction.innerHTML = "";
      departure.innerHTML = "";

      data.departures.slice(0, 5).forEach((element) => {
        const lineElement = document.createElement("li");
        const directionElement = document.createElement("li");
        const departureElement = document.createElement("li");

        lineElement.innerText = element.line_number;
        departureElement.innerText = element.time_scheduled;
        directionElement.innerText = element.direction;
        calculateTime(element.time_scheduled, departureElement);
        line.appendChild(lineElement);
        direction.appendChild(directionElement);
        departure.appendChild(departureElement);
      });
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}

function updateTime() {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  time.innerText = `${hours}:${minutes}`;
}

setInterval(updateTime, 1000);
updateTime();

setInterval(fetchDepartures, 10000);
fetchDepartures();
function getMinutesFromMidnight(time) {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
}
function calculateTime(apiTime, departureElement) {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const nowTime = `${hours}:${minutes}`;
  const nowTimeParts = getMinutesFromMidnight(nowTime);
  const apiTimeParts = getMinutesFromMidnight(apiTime);
  const diff = apiTimeParts - nowTimeParts;

  if ((diff < 30) & (diff > 0)) {
    departureElement.innerText = `${diff} min`;
  }
}
