fetch("https://www.zditm.szczecin.pl/api/v1/displays/97311")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    console.log(data.departures);
  })
  .catch((error) => {
    console.error("There was a problem with the fetch operation:", error);
  });
// fetch(" https://www.zditm.szczecin.pl/api/v1/stops")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok " + response.statusText);
//     }
//     return response.json();
//   })
//   .then((data) => {
//     data.data.forEach((element) => {
//       console.log(element);
//     });
//   })
//   .catch((error) => {
//     console.error("There was a problem with the fetch operation:", error);
//   });
