const BASE_URL = "https://notes-api.dicoding.dev/v2";

export async function getNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes`);
    if (!response.ok) {
      console.error("Failed to fetch notes. Status:", response.status);
      throw new Error("Failed to fetch notes.");
    }

    const data = await response.json();
    if (data.status !== "success" || !Array.isArray(data.data)) {
      console.error("Invalid data format received:", data);
      return []; // Return an empty array as a fallback
    }

    return data.data; // Extract and return the notes array
  } catch (error) {
    console.error("Error in getNotes:", error.message);
    return []; // Return an empty array as a fallback
  }
}

export async function addNote({ title, body }) {
  const response = await fetch(`${BASE_URL}/notes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body }),
  });
  const result = await response.json();
  if (!response.ok) {
    alert("Failed to add note. Please check your connection and try again.");
    throw new Error(result.message);
  }
  return result.data; // Return the entire data object
}

export async function deleteNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!response.ok) {
    alert("Failed to delete note. Please check your connection and try again.");
    throw new Error(result.message);
  }
  return result.message;
}

export async function archiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  const result = await response.json();
  if (!response.ok) {
    alert(
      "Failed to archive note. Please check your connection and try again."
    );
    throw new Error(result.message);
  }
  return result.message;
}

export async function unarchiveNote(id) {
  const response = await fetch(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  const result = await response.json();
  if (!response.ok) {
    alert(
      "Failed to unarchive note. Please check your connection and try again."
    );
    throw new Error(result.message);
  }
  return result.message;
}

export async function getArchivedNotes() {
  try {
    const response = await fetch(`${BASE_URL}/notes/archived`);
    if (!response.ok) {
      console.error("Failed to fetch archived notes. Status:", response.status);
      throw new Error("Failed to fetch archived notes.");
    }

    const data = await response.json();
    if (data.status !== "success" || !Array.isArray(data.data)) {
      console.error("Invalid data format received for archived notes:", data);
      return []; // Return an empty array as a fallback
    }

    return data.data; // Extract and return the archived notes array
  } catch (error) {
    console.error("Error in getArchivedNotes:", error.message);
    return []; // Return an empty array as a fallback
  }
}
