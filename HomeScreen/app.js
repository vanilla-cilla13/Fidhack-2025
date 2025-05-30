document.addEventListener("DOMContentLoaded", function () {
    // Example: Update confidence points
    let confidenceElement = document.querySelector(".confidence");
    let points = 500; // Starting points

    document.querySelectorAll(".box ul li").forEach(item => {
        item.addEventListener("click", function () {
            points += 10; // Add points when a skill or quest is clicked
            confidenceElement.textContent = `Confidence: ${points}pts`;
        });
    });

    // Example: Click avatar for animation
    document.querySelector(".avatar").addEventListener("click", function () {
        this.style.transform = "scale(1.1)";
        setTimeout(() => this.style.transform = "scale(1)", 200);
    });
});
