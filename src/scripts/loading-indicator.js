class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <style>
                .loading {
                    display: none;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    font-size: 18px;
                    color: #007bff;
                    background-color: rgba(255, 255, 255, 0.8);
                    padding: 10px 20px;
                    border-radius: 8px;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
                    z-index: 2000; /* Increased z-index to ensure visibility */
                }
                .loading.active {
                    display: block;
                }
            </style>
            <div class="loading" id="loadingIndicator">Loading...</div>
        `;
  }

  show() {
    this.shadowRoot.getElementById("loadingIndicator").classList.add("active");
  }

  hide() {
    this.shadowRoot
      .getElementById("loadingIndicator")
      .classList.remove("active");
  }
}

customElements.define("loading-indicator", LoadingIndicator);
