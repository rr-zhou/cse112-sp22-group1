export class PageHeader extends HTMLElement {
    constructor() {
        super();
		let template = document.createElement("template");
		template.innerHTML = `
			<style>
				@font-face {
					font-family:"SF-Pro";
					src: url("./public/fonts/SF-Pro.ttf");
				}
				@media screen and (max-width: 900px) {
					.search_bar {
						display: none;
					}
				
				}
				
				@media screen and (min-width: 600px) {
					.search_bar {
						float: right;
					}
				}
		
				/* Top navigation */
				.future_log{
					font-family: "SF-Pro";
				}
		
				button {
					vertical-align: bottom;
					border: none;
					background-color: rgba(0,0,0,0);
				}
		
				button.imgbutton{
					height: 20px;
				}
		
				button.imgbutton img {
					filter: opacity(50%);
					height: 20px;
				}
		
				button.imgbutton:hover img {
					filter: opacity(100%);
					transition: 150ms;
				}
		
				.future_log {
					position: relative;
					top: 1em;
					margin-top: 100px;
					margin-left: 0;
				}
		
				button {
					display: inline;
					margin-top: 0;
					margin-bottom: 0;
				}
		
				h1 {
					display: inline;
					font-size: 48px;
					vertical-align: middle;
				}
		
				.search_bar {
					margin-top: 15px;
					margin-right: 0;
					height: 30px;
					border-radius: 5px;
					border-color: rgba(0, 0, 0, 0.1);
					border-width: 2px;
					border-style: solid;
					opacity: 60%;
				}
		
				.search_bar img {
					display: inline-block;
				
					opacity: 50%;
		
					height: 21px;
					line-height: 36px;
					vertical-align: text-bottom;
		
					/* TODO: unjank */
					position: relative;
					top: 0;
					right: 15px;
					margin-left: 10px;
				}
		
				.search_bar input{
					/* TODO: hard coded */
					margin-top: -6px;
					background-color: rgba(0, 0, 0, 0);
					font-size: 14pt;
					opacity: 90%;
					height: 35px;
					text-align: left;
					width: 400px;
					border: solid;
					border-radius: 5px;
					margin-left: 10px;
					border-color: rgba(0, 0, 0, 0);
					outline: none;
				}
		
				/* Fade in for search bar */
				.search_bar:hover img {
					opacity: 50%;
					transition: 150ms;
				}
		
				.search_bar:hover {
					transition: 150ms;
					opacity: 90%;
				}
		
				.search_bar input:focus .search_bar{
					transition: 150ms;
					opacity: 90%;
				}
		
				#future_log_back{
					margin-left: 0;
					margin-right: 10px;
				}
		
				#future_log_forward{
					margin-right: 0;
					margin-left: 10px;
				}
		
				.hide{
					display: none;
					opacity: 0;
				}
			</style>
			<span class="future_log">
				<button class="imgbutton" id="future_log_back"><img src="../public/resources/left-chevron.png"></button>
		
				<h1 id="title_page">Template Page Title</h1>
		
				<button class="imgbutton" id="future_log_forward"><img src="../public/resources/right-chevron.png"></button>
			</span>
		
			<span class="search_bar">
				<input type="text" placeholder="Search">
				<img src="../public/resources/search_icon.png">
			</span>
		`;
		
		this.attachShadow({ mode: 'open' });
		this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('page-header', PageHeader);