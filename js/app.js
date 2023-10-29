import usedCars from "./usedCars.js";

document.addEventListener("DOMContentLoaded", function () {
  // Get references to the elements
  const usedCarsContainer = document.getElementById("cargrid");
  const minYearInput = document.getElementById("minYear");
  const maxYearInput = document.getElementById("maxYear");
  const carMakeInput = document.getElementById("carMake");
  const maxMileageInput = document.getElementById("maxMileage");
  const applyFiltersBtn = document.getElementById("applyFiltersBtn");
  const carColorInput = document.getElementById("carColor");

  applyFiltersBtn.addEventListener("click", function () {
    // Has fallbacks for empty inputs
    const minYear = parseInt(minYearInput.value) || 0;
    const maxYear = parseInt(maxYearInput.value) || Infinity;
    const selectedMake = carMakeInput.value || "Any";
    const maxMileage = parseInt(maxMileageInput.value) || Infinity;
    const selectedColor = carColorInput.value || "Any";

    // Clear the existings car list
    while (usedCarsContainer.firstChild) {
      usedCarsContainer.removeChild(usedCarsContainer.firstChild);
    }
    // Flag to indicate if any cars were found
    let foundCars = false;
    // Loop through the cars and create components
    usedCars.forEach((car) => {
      if (
        car.mileage <= maxMileage &&
        car.year >= minYear &&
        car.year <= maxYear &&
        (selectedMake === "Any" || car.make === selectedMake) &&
        (selectedColor === "Any" || car.color === selectedColor)
      ) {
        const carComponent = createCarComponent(car);
        usedCarsContainer.appendChild(carComponent);
        //set flag to true if any cars are found
        foundCars = true;
      }
    });
    // If no cars match the filters, display a message
    if (!foundCars) {
      const noResultsMessage = document.createElement("div");
      noResultsMessage.className = "no-results-message";
      noResultsMessage.textContent = "No cars match the selected filters.";
      usedCarsContainer.appendChild(noResultsMessage);
    }
  });
  // Function to create a car component
  function createCarComponent(car) {
    const card = document.createElement("div");
    card.className = "carcard";
    card.innerHTML = `
        <img src="${car.image}" alt="${car.make} ${car.model} Image">
        <hr>
        <h2>${car.make} ${car.model}</h2>
        <p>Price: $${car.price.toLocaleString()}</p>
        <p>Year: ${car.year}</p>
        <p>Color: ${car.color}</p>
        <p>Mileage: ${car.mileage.toLocaleString()}</p>
        <p>Gas Mileage: ${car.gasMileage}</p>
    `;
    return card;
  }
  // Function to render all cars
  function renderAllCars() {
    usedCars.forEach((car) => {
      const carComponent = createCarComponent(car);
      usedCarsContainer.appendChild(carComponent);
    });
  }

  // Call the function to render all cars initially
  renderAllCars();
});
