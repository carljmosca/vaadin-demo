import { css, customElement, html, LitElement, internalProperty } from 'lit-element';
import { getSysInfo } from "../../generated/UtilityEndpoint";
@customElement('about-view')
export class AboutView extends LitElement {

  @internalProperty()
  sysinfo: String = "";

  async firstUpdated() {
    this.sysinfo = await getSysInfo();
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
    `;
  }

  render() {
    return html`<div>System: ${this.sysinfo}</div>`;
  }
}
