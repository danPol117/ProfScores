document.addEventListener("mouseover", async (event) => {
  const target = event.target;
  
  if (
    target.tagName === "TD" &&
    target.parentElement.classList.contains("success") &&
    Array.from(target.parentElement.children).indexOf(target) === 8
  ) {


    const instructorName = target.innerText.trim();

    if (document.querySelector(".rmp-popup")) return;

    const stats = await fetchRMPStats(instructorName);
    if (!stats) return;

    const popup = document.createElement("div");
    popup.className = "rmp-popup";
    popup.innerHTML = `
      <h3>${instructorName}</h3>
      <p>Rating: ${stats.rating} / 5.0</p>
      <p>Reviews: ${stats.numRatings}</p>
      <button id="view-reviews">View Reviews</button>
      <button id="close-popup">Close</button>
    `;
    document.body.appendChild(popup);

    popup.style.position = "absolute";
    popup.style.top = `${event.clientY + 10}px`;
    popup.style.left = `${event.clientX + 10}px`;

    document.getElementById("view-reviews").addEventListener("click", () => {
      window.open(stats.reviewsLink, "_blank");
    });

    document.getElementById("close-popup").addEventListener("click", () => {
      popup.remove();
    });

    target.addEventListener("mouseout", () => {
      popup.remove();
    });
  }
});

async function fetchRMPStats(name) {
  try {
    console.log(name)
   
    

  } catch (error) {
    console.error("Failed to fetch RMP stats:", error);
    return null;
  }
}
