const line = document.querySelector(".line");
const direction = document.querySelector(".direction");
const departure = document.querySelector(".departure");
const time = document.getElementById("time");
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
    line.innerHTML = ""; // Clear previous content
    direction.innerHTML = ""; // Clear previous content
    departure.innerHTML = ""; // Clear previous content

    data.departures.forEach((element) => {
      const lineElement = document.createElement("li");
      const directionElement = document.createElement("li");
      const departureElement = document.createElement("li");
      console.log(element);
      lineElement.innerText = element.line_number;
      line.appendChild(lineElement);
      directionElement.innerText = element.direction;
      direction.appendChild(directionElement);
      departureElement.innerText = element.time_scheduled;
      departure.appendChild(departureElement);
    });
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
function updateTime() {
  const today = new Date();
  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  time.innerText = `${hours}:${minutes}`;
}
updateTime();
setInterval(updateTime, 1000);
