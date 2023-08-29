const partyList = document.getElementById("party-list");
const partyForm = document.getElementById("party-form");

function addPartyToList(party) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
        <strong>${party.name}</strong><br>
        Date: ${party.date}<br>
        Time: ${party.time}<br>
        Location: ${party.location}<br>
        Description: ${party.description}
    `;
    partyList.appendChild(listItem);
}

fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events")
    .then(response => response.json())
    .then(data => {
        data.forEach(addPartyToList);
    })
    .catch(error => console.error("Error fetching parties:", error));

partyForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    const newParty = { name, date, time, location, description };

    fetch("https://fsa-crud-2aa9294fe819.herokuapp.com/api/2307-ftb-et-web-ft/events", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newParty)
    })
    .then(response => response.json())
    .then(data => {
        addPartyToList(data);
        partyForm.reset();
    })
    .catch(error => console.error("Error adding party:", error));
});
