import "@polymer/iron-icon/iron-icon.js";
import "@vaadin/vaadin-grid/all-imports.js";
import "@vaadin/vaadin-icons/vaadin-icons.js";
import "@vaadin/vaadin-combo-box/vaadin-combo-box.js";
import "@vaadin/vaadin-lumo-styles/all-imports.js";
import "@vaadin/vaadin-ordered-layout/vaadin-horizontal-layout.js";
import "@vaadin/vaadin-ordered-layout/vaadin-vertical-layout.js";
import "@vaadin/vaadin-grid";
import "@vaadin/vaadin-grid/vaadin-grid-column";
import "@vaadin/vaadin-item/vaadin-item.js";
import "@vaadin/vaadin-select";
import "@vaadin/vaadin-list-box";
import "@vaadin/vaadin-item";
import {
  css,
  customElement,
  html,
  LitElement,
  internalProperty,
} from "lit-element";
import { render } from "lit-html";
import { guard } from 'lit-html/directives/guard';
import Item from "../../generated/com/github/carljmosca/pojo/Item";
import Group from "../../generated/com/github/carljmosca/pojo/Group";
import { findAll as findAllItems } from "../../generated/ItemEndpoint";
import { findAll as findAllGroups } from "../../generated/GroupEndpoint";
import { GridColumnElement } from "@vaadin/vaadin-grid/vaadin-grid-column";
import { GridItemModel } from "@vaadin/vaadin-grid";
import { ComboBoxElement } from "@vaadin/vaadin-combo-box/vaadin-combo-box.js";
import { SelectElement } from "@vaadin/vaadin-select/vaadin-select.js";
@customElement("card-list-view")
export class CardListView extends LitElement {
  @internalProperty()
  private filteredItems: Item[] = [];
  private items: Item[] = [];

  @internalProperty()
  private groups: Group[] = [];

  constructor() {
    super();
  }

  async connectedCallback() {
    super.connectedCallback();
    this.items = this.filteredItems = await findAllItems("", 100);
    this.groups = await findAllGroups("", 100);
    console.log(this.groups);
  }

  render() {
    return html`
      <vaadin-horizontal-layout>
        <vaadin-combo-box
          id="selectedGroup"
          .items=${this.groups}
          @change=${this.selectGroup}
          style="width: 100%;"
        >
        </vaadin-combo-box>
      </vaadin-horizontal-layout>
      <vaadin-horizontal-layout>
      <vaadin-select
        value="recent"
        style="width: 100%;"
        @change=${this.selectGroup2}
        .renderer=${guard([], () => (root: HTMLElement) =>
        render(html`
          <vaadin-list-box>
          ${this.groups.map(item => html`
          <vaadin-item value=${item.value}>${item.label}</vaadin-item>
          `)}
          </vaadin-list-box>
          `,root))}
        >  
        </vaadin-select>
      </vaadin-horizontal-layout>
      <vaadin-grid
        id="grid"
        theme="no-border no-row-borders"
        .items="${this.filteredItems}"
      >
        <vaadin-grid-column .renderer=${this.columnRenderer}>
        </vaadin-grid-column>
      </vaadin-grid>
    `;
  }

  selectGroup(e: { target: ComboBoxElement }) {
    this.filteredItems = this.items.filter((i) => i.group === e.target.value);
  }

  selectGroup2(e: { target: SelectElement }) {
    this.filteredItems = this.items.filter((i) => i.group === e.target.value);
  }

  columnRenderer(
    root: HTMLElement,
    _: GridColumnElement,
    model: GridItemModel
  ) {
    const item = model.item as Item;
    render(
      html`
        <vaadin-horizontal-layout theme="spacing-s" class="card">
          <img src=${item.img} />
          <vaadin-vertical-layout>
            <vaadin-horizontal-layout theme="spacing-s" class="header">
              <span class="name">Group: ${item.group}</span>
              <span class="name">${item.name}</span>
              <span class="date">${item.date}</span>
            </vaadin-horizontal-layout>
            <span class="post">${item.post}</span>
            <vaadin-horizontal-layout theme="spacing-s" class="actions">
              <iron-icon icon="vaadin:heart"></iron-icon>
              <span class="likes">${item.likes}</span>
              <iron-icon icon="vaadin:comment"></iron-icon>
              <span class="comments">${item.comments}</span>
              <iron-icon icon="vaadin:connect"></iron-icon>
              <span class="shares">${item.shares}</span>
            </vaadin-horizontal-layout>
          </vaadin-vertical-layout>
        </vaadin-horizontal-layout>
      `,
      root
    );
  }

  static get styles() {
    return [
      css`
        :host {
          display: block;
          height: 100%;
        }

        vaadin-grid {
          height: 100%;
          line-height: var(--lumo-line-height-m);
        }

        vaadin-grid,
        vaadin-grid-cell-content {
          background-color: var(--lumo-contrast-10pct);
        }

        .card {
          background-color: var(--lumo-base-color);
          border-radius: var(--lumo-border-radius);
          box-shadow: var(--lumo-box-shadow-xs);
          padding: calc(var(--lumo-space-s) * 1.5) var(--lumo-space-m);
        }

        img {
          border-radius: 50%;
          flex-shrink: 0;
          height: var(--lumo-size-m);
          width: var(--lumo-size-m);
        }

        .header {
          align-items: baseline;
        }

        .name {
          font-size: var(--lumo-font-size-s);
          font-weight: bold;
        }

        .date {
          color: var(--lumo-tertiary-text-color);
          font-size: var(--lumo-font-size-xs);
        }

        .post {
          color: var(--lumo-secondary-text-color);
          font-size: var(--lumo-font-size-s);
          margin-bottom: var(--lumo-space-s);
          white-space: normal;
        }

        .actions {
          align-items: center;
        }

        iron-icon {
          color: var(--lumo-tertiary-text-color);
          height: calc(var(--lumo-icon-size-s) * 0.8);
          width: calc(var(--lumo-icon-size-s) * 0.8);
        }

        .likes,
        .comments,
        .shares {
          color: var(--lumo-tertiary-text-color);
          font-size: var(--lumo-font-size-xs);
          margin-right: var(--lumo-space-l);
        }
      `,
    ];
  }
}
