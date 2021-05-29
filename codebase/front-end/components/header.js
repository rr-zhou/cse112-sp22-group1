import * as localStorage from "../localStorage/userOperations.js";
import { navbar } from "../index.js";

export class PageHeader extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
	}

	connectedCallback() {
		this.innerHTML = `
			<style>
				page-header {
					display: block;
					margin-left: 80px;
					margin-right: 20px;
					border-bottom: solid 2px var(--border-color);
					text-align: left;
				}
			</style>
			`;

		this.shadowRoot.innerHTML = `
			<style>
				@font-face {
					font-family:"SF-Pro";
					src: url("./public/fonts/SF-Pro.ttf");
				}
		
				/* Top navigation */
				#container {
					display: flex;
					align-items: center;
				}

				.header {
					font-family: "SF-Pro";
					position: relative;
					flex: 2;	/* Use half of the space for the title */
				}
		
				button {
					user-select: none;
					vertical-align: middle;
					border: none;
					background-color: rgba(0,0,0,0);
					display: inline;
					margin-left: 5px;
				}

				.plus {
					display: inline-block;
					top: 20px;
					width: 23px;
					height: 23px;
					margin-right: 10px;
				}
				
				.imgbutton {
					height: 20px;
				}
		
				.imgbutton img {
					opacity: 20%;
					filter: var(--icon-filter);
					height: 20px;
				}
		
				.imgbutton:hover img {
					opacity: 100%;
					transition: opacity 150ms;
				}
		
				h1 {
					display: inline;
					font-size: 40px;
					font-weight: bold;
					letter-spacing: 1.7px;
					vertical-align: middle;
					z-index: 0;
					outline: none;
				}
		
				.search_bar {
					margin: 15px auto;
					padding: 0 5px;
					border-radius: 5px;
					border-color: var(--content-foreground-color); /*rgba(0, 0, 0, 0.1);*/
					border-width: 2px;
					border-style: solid;
					opacity: 60%;
				}
		
				.search_bar img {
					display: inline-block;
				
					opacity: 50%;
					height: 21px;
		
					vertical-align: middle;

					filter: var(--icon-filter);
				}
		
				.search_bar input{

					background-color: rgba(0, 0, 0, 0);
					color: var(--content-foreground-color);
					font-size: 14pt;
					opacity: 90%;
					height: 35px;
					text-align: left;
					width: 400px;
					border: solid;
					border-radius: 5px;
					border-color: rgba(0, 0, 0, 0);
					outline: none;
				}
		
				/* Fade in for search bar */
				.search_bar:hover img {
					opacity: 50%;
					transition: opacity 150ms;
				}
		
				.search_bar:hover {
					transition: 150ms;
					opacity: 90%;
					
				}
		
				.search_bar input:focus .search_bar{
					transition: 150ms;
					opacity: 90%;
				}
		
				#header_back{
					margin-left: 0;
					margin-right: 5px;
				}
		
				#header_forward{
					margin-right: 0;
					margin-left: 5px;
				}
		
				.hide{
					display: none;
					opacity: 0;
				}

				@media screen and (max-width: 1250px) {
					.search_bar input {
						width: 220px;
					}
				}

				@media screen and (max-width: 1080px) {
					.search_bar input {
						width: 170px;
					}
				}

				@media screen and (max-width: 1020px) {
					.search_bar {
						display: none;
					}
				}

				@media screen and (max-width: 900px) {
					.search_bar {
						display: none;
					}

					.header{
						margin-left: 35px;
						margin-right: 35px;
					}

					.plus{
						position: absolute;
						top: 42px;
						right: 20px;
					}

					#title_page{
						top: 5px;
						font-size: 35px;
						letter-spacing: 1.5px;
					}

					button.imgbutton img {
						height: 15px;
					}

					button.imgbutton {
						height: 15px;
						padding: 0;
					}
					#header_back{
						margin-left: 0;
						margin-right: 1px;
					}
			
					#header_forward{
						margin-right: 0;
						margin-left: 1px;
					}

				}

				@media screen and (max-width: 700px) {
					.plus{
						position: absolute;
					}

					#title_page{
						top: 5px;
						font-size: 22px;
						letter-spacing: 1px;
					}

					button.imgbutton img {
						height: 15px;
					}

					button.imgbutton {
						height: 15px;
						padding: 0;
					}
					#header_back{
						margin-left: 0;
						margin-right: 1px;
					}
			
					#header_forward{
						margin-right: 0;
						margin-left: 1px;
					}
				}
			</style>

			<div id="container">
				<span class="header">
					<button class="imgbutton" id="header_back"><img src="../public/resources/left-chevron.png"></button>
			
					<h1 id="title_page">Template Page Title</h1>
			
					<button class="imgbutton" id="header_forward"><img src="../public/resources/right-chevron.png"></button>
				</span>
			
				<button class="imgbutton plus"><img src="../public/resources/plusIcon.png"></button>
			
				<span class="search_bar">
					<input type="text" placeholder="Search">
					<img src="../public/resources/search_icon.png">
				</span>
			</div>
		`;

		this.h1 = this.shadowRoot.querySelector("h1");

		this.createFutureLog = this.createFutureLog.bind(this);
		this.futureLogButton = this.shadowRoot.querySelector(".plus");
		this.futureLogButton.addEventListener("click", () => {
			this.createFutureLog();
		});

		this.imgbuttons = this.shadowRoot.querySelectorAll(".imgbutton");
	}

	makeEditabe() {
		this.h1.contentEditable = true;
	}

	makeUneditable() {
		this.h1.contentEditable = false;
	}

	set title(title) {
		this.h1.innerText = title;
	}

	get title() {
		return this.h1.innerText;
	}

	createFutureLog() {
		localStorage.createFutureLog(new Date(2021, 5, 22), new Date(2021, 8, 23), [], [], [], (err, futureLog) => {
			console.log(futureLog);
			localStorage.readUser((err, res) => {
				if (err) {
					console.log(err);
				} else {
					console.log(res);
					// localStorage.createCollection("testing createCollection", "1", [], (err, collection) => {
					// 	console.log(collection);
					// 	localStorage.readUser((err, res) => {
					// 		if(err) {
					// 			console.log(err);
					// 		} else {
					// 			console.log(res);
					// 		}
					// 	});
					// });
				}
			})
		});

	}
}

customElements.define('page-header', PageHeader);
