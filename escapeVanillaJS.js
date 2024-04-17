document.addEventListener("DOMContentLoaded", () => {
/*
The code below consist of an event listener that is triggered by a click on an HTML element with the ID "solveRoom1". 
Upon this event, the code initiates a fetch request to retrieve data from a file named "books.json".
Once the JSON data is obtained, it is parsed and processed to find the most recent book using a function called findMostRecentBook(books).
Subsequently, the code attempts to update the content of an HTML element with the ID "room1Result" to display the title of the most recent book
*/

document.getElementById("solveRoom1").addEventListener("click", () => {
    fetch("books.json")
      .then((response) => response.json())
      .thn((books) => {
        const mostRecentBook = findMostRecentBook(books);
        
        document.getElementById("room1Result").textContent =
          `The key to the next room is: ${mostRecentBook.title}`;
      });
  });

 /*
The code is using an event listener to trigger an action when the element with the id "solveRoom2" is clicked. Upon clicking,
it finds the common concepts between JavaScript and React and displays them as a message in the element with the id "room2Result"
*/
document.getElementById("solveRoom2").addEventListener("click", () => {
    const jsConcepts = new Set(["closure", "scope", "hoisting", "async"]);

    const reactConcepts = new Set(["components", "jsx", "hooks", "async"]);

    const commonConcepts = findIntersection(jsConcepts, reactConcepts);
    document.getElementById("room2Result").textContent =
      `The code to unlock the door is: ${Array.from(commonConcepts).join(", ")}`;
  });

/*
The code below is using an event listener to trigger an asynchronous operation when the element with the id "solveRoom3" is clicked. 
The use of async and await keywords allows for the handling of asynchronous operations in a more synchronous manner,
making the code easier to read and understand. The fetch API is used to retrieve data from a JSON file, and the await keyword is used 
to wait for the response before processing the JSON data. The try...catch block effectively handles any errors that may occur during the 
asynchronous operations, ensuring that the code doesn't break in case of failure 
*/
// Asynchronous function
document.getElementById("solveRoom3").addEventListener("click", async () => {
    try {
      const response = await fetch("directions.json");
      const directions = await response.json();
      const message = await navigateLabyrinth(directions);
      document.getElementById("room3Result").innerHTML = message;
    } catch (error) {
      // Handling any potential errors
      console.error(error);
    }
  });
});
/*
The code below uses the function that takes an array of books as input and returns the most recently published book from the array. 
It uses the reduce method to iterate through the array and compare the publication dates of the books to find the most recent one. 
*/
function findMostRecentBook(books) {
  return books.reduce((mostRecent, book) =>
    new Date(book.published) > new Date(mostRecent.published)
      ? book
      : mostRecent
  );
}

/*
 The code below takes two sets, setA and setB, and returns a new Set containing the intersection of the two input sets. 
 It uses the filter method to iterate through setA, checking if each element is present in setB using the has method. 
 */
function findIntersection(setA, setB) {
  const intersection = new Set([...setA].filter((elem) => setB.has(elem)));
  return intersection;
}

/*
The code below uses an async function, navigateLabyrinth, to iterates through a set of directions, pausing for 1 second between each step.
It logs the current navigating direction and` finally returns a congratulatory message 
*/
async function navigateLabyrinth(directions) {
  for (let direction of directions) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(`Navigating: ${direction.step}`);
  }
  return "Congratulations! You've mastered the essentials of Vanilla JavaScript. Welcome to the world of React, where you'll build powerful and dynamic web applications. Let's dive in!";
}
