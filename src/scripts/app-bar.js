class AppBar extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
    }

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
        this.shadowRoot.innerHTML = `
            <style>
                .app-bar {
                    background-color: #007bff;
                    margin-bottom: 20px;
                    color: white;
                    padding: 15px;
                    text-align: center;
                    font-size: 24px;
                    border-radius: 12px 12px 0 0;
                }
            </style>
            <div class="app-bar">
                ${this.getAttribute('title')}
            </div>
        `;
    }
}

customElements.define('app-bar', AppBar);
