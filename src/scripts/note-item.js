class NoteItem extends HTMLElement {
  static get observedAttributes() {
    return ["title", "body", "archived", "id"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  render() {
    const isArchived = this.getAttribute("archived") === "true";
    this.shadowRoot.innerHTML = `
            <style>
                .note {
                    background-color: #ffffff;
                    padding: 50px;
                    margin-top: 10px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    font-size: 14px;
                    line-height: 1.6;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    position: relative;
                    transition: transform 0.3s ease;
                }
                .note:hover {
                    transform: scale(1.02);
                }
                .note-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 5px 10px;
                    cursor: pointer;
                }
                .delete-button {
                    position: absolute;
                    top: 10px;
                    right: 80px;
                    background-color: #dc3545;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 5px 10px;
                    cursor: pointer;
                }
            </style>
            <div class="note">
                <strong>${this.getAttribute(
                  "title"
                )}</strong>: ${this.getAttribute("body")}
                <button class="note-button "id="archiveButton">${
                  isArchived ? "Unarchive" : "Archive"
                }</button>
                <button class="delete-button" id="deleteButton">Delete</button>
            </div>
        `;

    const noteElement = this.shadowRoot.querySelector(".note");

    // Select buttons
    const archiveButton = this.shadowRoot.getElementById("archiveButton");
    const deleteButton = this.shadowRoot.getElementById("deleteButton");

    // Remove existing event listeners
    archiveButton.replaceWith(archiveButton.cloneNode(true));
    deleteButton.replaceWith(deleteButton.cloneNode(true));

    // Re-select buttons after cloning
    const newArchiveButton = this.shadowRoot.getElementById("archiveButton");
    const newDeleteButton = this.shadowRoot.getElementById("deleteButton");

    // Add event listeners
    newArchiveButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("archive-toggle", {
          detail: { id: this.getAttribute("id"), archived: isArchived },
          bubbles: true,
          composed: true,
        })
      );
    });

    newDeleteButton.addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("delete-note", {
          detail: { id: this.getAttribute("id") },
          bubbles: true,
          composed: true,
        })
      );
    });
  }
}

customElements.define("note-item", NoteItem);
