import "../styles/styles.css";
import { getNotes, addNote, archiveNote, unarchiveNote, deleteNote, getArchivedNotes } from "./api.js";
import "./note-item.js"; 
import "./note-form.js"; 
import "./app-bar.js";
import "./loading-indicator.js"; 

document.addEventListener("DOMContentLoaded", async function () {
  const notesContainer = document.getElementById("notesContainer");
  const noteFormElement = document.querySelector("note-form");
  const noteForm = noteFormElement.shadowRoot.getElementById("noteForm");
  const noteTitle = noteFormElement.shadowRoot.getElementById("noteTitle");
  const noteBody = noteFormElement.shadowRoot.getElementById("noteBody");
  const loadingIndicator = document.querySelector("loading-indicator");
  const openPopupButton = document.getElementById("openPopupButton");
  const popupContainer = document.getElementById("popupContainer");
  const archivePopupContainer = document.getElementById(
    "archivePopupContainer"
  );
  const archivedNotesContainer = document.getElementById(
    "archivedNotesContainer"
  );
  const openArchiveButton = document.getElementById("openArchiveButton");
  const closeArchivePopup = document.getElementById("closeArchivePopup");

  function showLoading() {
    loadingIndicator.show();
  }

  function hideLoading() {
    loadingIndicator.hide();
  }

  async function loadNotes() {
    showLoading();
    try {
      console.log("Fetching notes from API...");
      const notes = await getNotes(); // Fetch notes from API
      console.log("Raw response from getNotes:", notes); // Log raw response

      if (!notes || !Array.isArray(notes)) {
        console.error("Invalid response type or format:", notes); // Log the response
        throw new Error("Invalid response format: Expected an array.");
      }

      console.log("Notes fetched:", notes); // Log parsed notes
      notesContainer.innerHTML = "";

      if (notes.length > 0) {
        notes.forEach((note) => {
          if (!note.archived) {
            const noteElement = document.createElement("note-item");
            noteElement.setAttribute("id", note.id);
            noteElement.setAttribute("title", note.title);
            noteElement.setAttribute("body", note.body);
            noteElement.setAttribute("archived", note.archived);
            notesContainer.appendChild(noteElement);
          }
        });
      } else {
        notesContainer.innerHTML = "<p>No notes available.</p>";
      }
    } catch (error) {
      console.error("Failed to load notes:", error.message); // Log error
      alert(
        "Failed to load notes. Please check your connection and try again."
      );
      notesContainer.innerHTML =
        "<p>Failed to load notes. Please try again later.</p>";
    } finally {
      hideLoading();
    }
  }

  async function loadArchivedNotes() {
    showLoading();
    try {
      console.log("Fetching archived notes from API..."); // Tambahkan log
      const notes = await getArchivedNotes();// Fetch notes from API
      console.log("Archived notes fetched:", notes); // Log hasil data

      const archivedNotes = notes.filter((note) => note.archived);
      archivedNotesContainer.innerHTML = "";

      if (archivedNotes && archivedNotes.length > 0) {
        archivedNotes.forEach((note) => {
          const noteElement = document.createElement("note-item");
          noteElement.setAttribute("id", note.id);
          noteElement.setAttribute("title", note.title);
          noteElement.setAttribute("body", note.body);
          noteElement.setAttribute("archived", note.archived);
          archivedNotesContainer.appendChild(noteElement);
        });
      } else {
        archivedNotesContainer.innerHTML =
          "<p>No archived notes available.</p>";
      }
    } catch (error) {
      console.error("Failed to load archived notes:", error.message); // Log error
      alert(
        "Failed to load archived notes. Please check your connection and try again."
      );
      archivedNotesContainer.innerHTML =
        "<p>Failed to load archived notes. Please try again later.</p>";
    } finally {
      hideLoading();
    }
  }

  noteForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    if (noteTitle.value.trim() !== "" && noteBody.value.trim() !== "") {
      showLoading();
      try {
        const newNote = await addNote({
          title: noteTitle.value,
          body: noteBody.value,
        });

        if (newNote) {
          // Append the new note directly to the DOM
          const noteElement = document.createElement("note-item");
          noteElement.setAttribute("id", newNote.id);
          noteElement.setAttribute("title", newNote.title);
          noteElement.setAttribute("body", newNote.body);
          noteElement.setAttribute("archived", newNote.archived);
          notesContainer.appendChild(noteElement);

          noteTitle.value = "";
          noteBody.value = "";

          // Close the note form
          popupContainer.style.display = "none";
        } else {
          console.error("Failed to add note: Invalid response format.");
        }
      } catch (error) {
        console.error("Failed to add note:", error.message);
        alert(
          "Failed to add note. Please check your connection and try again."
        );
      } finally {
        hideLoading();
      }
    }
  });

  notesContainer.addEventListener("archive-toggle", async (event) => {
    const { id, archived } = event.detail;
    showLoading();
    try {
      if (archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }

      // Refresh both active and archived notes lists
      await loadNotes();
      await loadArchivedNotes();
    } catch (error) {
      console.error("Failed to toggle archive:", error.message);
      alert(
        "Failed to toggle archive status. Please check your connection and try again."
      );
    } finally {
      hideLoading();
    }
  });

  notesContainer.addEventListener("delete-note", async (event) => {
    const { id } = event.detail;
    showLoading();
    try {
      await deleteNote(id); // Delete note using API
      await loadNotes(); // Refresh notes list
    } catch (error) {
      console.error("Failed to delete note:", error.message);
      alert(
        "Failed to delete note. Please check your connection and try again."
      );
    } finally {
      hideLoading();
    }
  });

  notesContainer.addEventListener("click", async (event) => {
    const noteItem = event.target.closest("note-item");
  });

  openPopupButton.addEventListener("click", () => {
    popupContainer.style.display = "flex";
  });

  openArchiveButton.addEventListener("click", async () => {
    archivePopupContainer.style.display = "flex";
    await loadArchivedNotes();
  });

  closeArchivePopup.addEventListener("click", () => {
    archivePopupContainer.style.display = "none";
  });

  archivedNotesContainer.addEventListener("archive-toggle", async (event) => {
    const { id, archived } = event.detail;
    showLoading();
    try {
      if (archived) {
        await unarchiveNote(id);
      } else {
        await archiveNote(id);
      }

      await loadArchivedNotes(); // Refresh archived notes list
      await loadNotes(); // Refresh notes list
    } catch (error) {
      console.error("Failed to toggle archive:", error.message);
      alert(
        "Failed to toggle archive status. Please check your connection and try again."
      );
    } finally {
      hideLoading();
    }
  });

  archivedNotesContainer.addEventListener("delete-note", async (event) => {
    const { id } = event.detail;
    showLoading();
    try {
      await deleteNote(id); // Delete note using API
      await loadArchivedNotes(); // Refresh archived notes list
    } catch (error) {
      console.error("Failed to delete note:", error.message);
      alert(
        "Failed to delete note. Please check your connection and try again."
      );
    } finally {
      hideLoading();
    }
  });

  await loadNotes();
});
