class NoteForm extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.addValidation();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                .close-button {
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    background: none;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                }
                form {
                    position: relative;
                    display: flex;
                    flex-direction: column;
                }
                input, textarea, button {
                    margin-bottom: 15px;
                    padding: 12px;
                    border: 1px solid #dddddd;
                    border-radius: 8px;
                    font-size: 16px;
                    background-color: #f9f9f9;
                }
                input:invalid, textarea:invalid {
                    border-color: #ff4d4d;
                }
                input:valid, textarea:valid {
                    border-color: #28a745;
                }
                button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    cursor: pointer;
                    transition: background-color 0.3s ease, transform 0.3s ease;
                }
                button:hover {
                    background-color: #0056b3;
                    transform: scale(1.05);
                }
            </style>
            <button class="close-button" id="closePopupButton">&times;</button>
            <form id="noteForm">
                <input id="noteTitle" type="text" placeholder="Note title" required />
                <textarea id="noteBody" placeholder="Write your note here..." required></textarea>
                <button type="submit" id="addNoteButton">Add Note</button>
            </form>
        `;

        this.shadowRoot.getElementById('closePopupButton').addEventListener('click', () => {
            this.closest('#popupContainer').style.display = 'none';
        });
    }

    addValidation() {
        const noteTitle = this.shadowRoot.getElementById('noteTitle');
        const noteBody = this.shadowRoot.getElementById('noteBody');

        noteTitle.addEventListener('input', () => {
            noteTitle.style.borderColor = noteTitle.validity.valid ? '#28a745' : '#ff4d4d';
        });

        noteBody.addEventListener('input', () => {
            noteBody.style.borderColor = noteBody.validity.valid ? '#28a745' : '#ff4d4d';
        });
    }
}

customElements.define('note-form', NoteForm);