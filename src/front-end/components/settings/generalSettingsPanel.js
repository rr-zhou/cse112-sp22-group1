import * as localStorage from "../../localStorage/userOperations.js";
export class GeneralSettingsPanel extends HTMLElement {
    constructor () {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.innerHTML = `
        <style>
            :host {
                font-family: "SF-Pro";
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: flex-end;
            }

            #logout {
                margin-top: auto;
                border: none;
                background-color: #EF233C;
                color: #FFFFFF;
                font-size: 22px;
                height: 30px;
                padding: 10px;
                border-radius: 5px;
                box-sizing: content-box;
                cursor: pointer;
                transition: background-color 0.2s;

            }

            #logout:active {
                background-color: pink;
            }

            .profile {
                text-align: center;
            }
        </style>

        <div class="profile">Profile placeholder</div>
        <button id="logout"> Logout </button>
        `;

        let themeRadios = this.shadowRoot.querySelectorAll("input[type=radio]");
        for (let themeRadio of themeRadios) {
            themeRadio.addEventListener("change", () => this.updateTheme(themeRadio.id));
        }

		this.logoutButton = this.shadowRoot.getElementById("logout");

    }

	connectedCallback () {
		this.logoutButton.onclick = () => {
			if (navigator.onLine) {
				localStorage.deleteDB();
				window.location.href = "/login";
			} else if (confirm("You're logging out while offline, all your local changes will be deleted if you continue!")) {
				localStorage.deleteDB();
				window.location.href = "/login";
			}
		}
	}
}

customElements.define("general-settings-panel", GeneralSettingsPanel);
