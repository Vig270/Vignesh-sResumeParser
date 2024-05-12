// Function to create skill input fields
function createSkillInputs(numSkills) {
    const skillsContainer = document.getElementById("skillsContainer");
    skillsContainer.innerHTML = "";
    for (let i = 1; i <= numSkills; i++) {
        const skillInput = document.createElement("input");
        skillInput.type = "text";
        skillInput.placeholder = "Enter skill " + i;
        skillInput.className = "skillInput";
        skillsContainer.appendChild(skillInput);
    }
}

// Function to search for skills
async function searchSkills() {
    const fileInput = document.getElementById("resume");
    const numSkillsInput = document.getElementById("numSkills");
    const skillsContainer = document.getElementById("skillsContainer");
    const resultsDiv = document.getElementById("results");

    const file = fileInput.files[0];
    const numSkills = parseInt(numSkillsInput.value);

    if (!file) {
        resultsDiv.textContent = "Please select a file.";
        return;
    }

    if (isNaN(numSkills) || numSkills < 1) {
        resultsDiv.textContent = "Please enter a valid number of skills.";
        return;
    }

    const skills = Array.from(skillsContainer.querySelectorAll("input.skillInput"))
        .map(input => input.value.trim())
        .filter(value => value !== "");

    if (skills.length === 0) {
        resultsDiv.textContent = "Please enter at least one skill.";
        return;
    }

    const text = await extractTextFromPdf(file);
    const extractedSkills = text.toLowerCase().match(/\b\w+\b/g); // Extract words from resume
    const foundSkills = [];

    skills.forEach(skill => {
        if (extractedSkills.includes(skill.toLowerCase())) {
            foundSkills.push(skill);
        }
    });

    localStorage.setItem("foundSkills", JSON.stringify(foundSkills));
}

// Function to display results
function showResults() {
    const foundSkills = JSON.parse(localStorage.getItem("foundSkills"));
    const resultsDiv = document.getElementById("results");

    if (!foundSkills || foundSkills.length === 0) {
        resultsDiv.textContent = "No matching skills found.";
    } else {
        resultsDiv.textContent = "Found skills: " + foundSkills.join(", ");
    }
}

// Function to handle file upload
document.getElementById("resume").addEventListener("change", function() {
    const numSkillsInput = document.getElementById("numSkills");
    const numSkills = parseInt(numSkillsInput.value);
    createSkillInputs(numSkills);
});
