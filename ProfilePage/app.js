document.addEventListener("DOMContentLoaded", function () {
    // Initial confidence points
    let confidencePoints = 500;
    const confidenceElement = document.querySelector(".confidence");

    // Store quests and their corresponding points
    const quests = [
        { name: "Time Management", points: 10 },
        { name: "Problem Solving", points: 50 },
        { name: "Updating Resume", points: 20 },
        { name: "Apply FidHacks", points: 100 }
    ];

    // Select quests container
    const questsContainer = document.querySelector(".box");

    // Populate quests dynamically
    questsContainer.innerHTML = ""; // Clear default HTML before adding dynamically

    quests.forEach((quest, index) => {
        const questItem = document.createElement("div");
        questItem.classList.add("quest-item");
        questItem.innerHTML = `
            <div class="box-container">
                <label>
                    <input type="checkbox" data-index="${index}">
                    ${quest.name}
                </label>
                <span style="color: #D23E74;">${quest.points}pts</span>
            </div>
        `;
        questsContainer.appendChild(questItem);
    });

    // Listen for checkbox clicks
    questsContainer.addEventListener("change", function (event) {
        const checkbox = event.target;
        if (checkbox.tagName === "INPUT" && checkbox.type === "checkbox") {
            const index = checkbox.dataset.index;
            if (checkbox.checked) {
                confidencePoints += quests[index].points; // Add points
                checkbox.parentElement.parentElement.remove(); // Remove checked quest
            }
            confidenceElement.textContent = `Confidence: ${confidencePoints}pts`; // Update display
        }
    });
});
