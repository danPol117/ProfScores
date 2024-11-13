// document.addEventListener("mouseover", async (event) => {
//   const target = event.target;

//   if (
//     target.tagName === "TD" &&
//     target.parentElement.classList.contains("success") &&
//     Array.from(target.parentElement.children).indexOf(target) === 8
//   ) {
//     const instructorName = target.innerText.trim();

//     if (document.querySelector(".rmp-popup")) return;

//     const stats = await fetchRMPStats(instructorName);
//     if (!stats) return;

//     const popup = document.createElement("div");
//     popup.className = "rmp-popup";
//     popup.innerHTML = `
//       <h3>${instructorName}</h3>
//       <p>Rating: ${stats.rating} / 5.0</p>
//       <p>Reviews: ${stats.numRatings}</p>
//       <button id="view-reviews">View Reviews</button>
//       <button id="close-popup">Close</button>
//     `;
//     document.body.appendChild(popup);

//     popup.style.position = "absolute";
//     popup.style.top = `${event.clientY + 10}px`;
//     popup.style.left = `${event.clientX + 10}px`;

//     document.getElementById("view-reviews").addEventListener("click", () => {
//       window.open(stats.reviewsLink, "_blank");
//     });

//     document.getElementById("close-popup").addEventListener("click", () => {
//       popup.remove();
//     });

//     target.addEventListener("mouseout", () => {
//       popup.remove();
//     });
//   }
// });

// async function fetchRMPStats(name) {
//   try {
//     console.log(name)
//     // const response = await fetch(`https://api.example.com/rmp?name=${encodeURIComponent(name)}`);
//     // return await response.json();
//   } catch (error) {
//     console.error("Failed to fetch RMP stats:", error);
//     return null;
//   }
// }

let hoverTimeout;
document.body.addEventListener("mouseover", (event) => {
  // Check if the target is a <td> element
  const target = event.target;
  if (
    target.tagName === "TD" &&
    target.parentElement.classList.contains("success") &&
    Array.from(target.parentElement.children).indexOf(target) === 8
  ) {
    clearTimeout(hoverTimeout);

    hoverTimeout = setTimeout(() => {
      // Check if this is the 9th <td> in its row
      const cell = event.target;
      const row = cell.parentNode;
      const cells = Array.from(row.children);

      if (cells.indexOf(cell) === 8) {
        // 9th column (0-indexed)
        const teacherName = cell.textContent.trim();

        // Call your fetch function here
        fetchTeacherName(teacherName);
      }
    }, 1000); // Hover for 1 second
  }
});

document.body.addEventListener("mouseout", (event) => {
  // Clear the timeout when the mouse leaves the element
  clearTimeout(hoverTimeout);
});

function fetchTeacherName(teacherName) {
  // Replace with your actual fetch logic
  console.log("Fetching teacher name:", teacherName);
}
