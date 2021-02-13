import { showNotification } from '@vaadin/flow-frontend/a-notification';
import '@vaadin/vaadin-button';
import '@vaadin/vaadin-text-field';
import { css, customElement, html, LitElement, internalProperty } from 'lit-element';
import { getSysInfo } from '../../generated/UtilityEndpoint';

@customElement('hello-world-view')
export class HelloWorldView extends LitElement {
  name: string = '';
  @internalProperty()
  sysInfo: string = '';

  async firstUpdated() {
    this.sysInfo = await getSysInfo();
  }

  static get styles() {
    return css`
      :host {
        display: block;
        padding: 1em;
      }
    `;
  }
  render() {
    return html`
      <vaadin-text-field label="Your name" @value-changed="${this.nameChanged}"></vaadin-text-field>
      <vaadin-button @click="${this.sayHello}">Say hello</vaadin-button>
      <div>${this.sysInfo}</div>
    `;
  }
  nameChanged(e: CustomEvent) {
    this.name = e.detail.value;
  }

  sayHello() {
    showNotification('Hello ' + this.name);
  }

}
