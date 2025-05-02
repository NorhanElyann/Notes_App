function showForm() {
    document.getElementById("formPopup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}

function hideForm() {
    document.getElementById("formPopup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}

// ------------------------------------------------------------------------

function addNote() {
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();

    if (title === "" || description === "") {
        alert("Please fill in both Title and Description.");
        return;
    }

    const now = new Date();
    const formattedDate = now.toLocaleString(); // 22/4/2025

    const note = {
        title: title,
        description: description,
        date: formattedDate,
        important: false
    };

    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    displayNotes(); // Re-render the notes

    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    hideForm();
}

function deleteNote(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes.splice(index, 1); 
    localStorage.setItem("notes", JSON.stringify(notes)); 
    displayNotes(); 
}

function toggleImportant(index) {
    let notes = JSON.parse(localStorage.getItem("notes")) || [];
    notes[index].important = !notes[index].important;
    localStorage.setItem("notes", JSON.stringify(notes));
    displayNotes();
}



function displayNotes(showImportantOnly = false) {
    const notesContainer = document.getElementById("notesContainer");
    let notes = JSON.parse(localStorage.getItem("notes")) || [];

    notesContainer.innerHTML = "";

    notes.forEach((note, index) => {
        if (showImportantOnly && !note.important) return;

        const noteElement = document.createElement("div");
        noteElement.className = "note";
        noteElement.innerHTML = `
            <h4>${note.title}</h4>
            <p>${note.description}</p>
            <small>${note.date}</small>
            <div class="note-actions">
                <button class="deleteBtn" onclick="deleteNote(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
                <button class="starBtn" onclick="toggleImportant(${index})">
                    <i class="fa${note.important ? 's' : 'r'} fa-star"></i>
                </button>
    </div>
`;

        notesContainer.appendChild(noteElement);
    });
}


window.onload = displayNotes;

