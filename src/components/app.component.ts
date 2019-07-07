import { css, customElement, html, LitElement, property, unsafeCSS, query, queryAll } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';

const componentCSS = require('./app.component.scss');

@customElement('marius-top-navbar')
class AppComponent extends LitElement {

  static styles = css`${unsafeCSS(componentCSS)}`;

  @property()
  title = 'Example button';

  @property()
  selectedItem = 'Components';

  @property()
  open = false;

  @property()
  isScrolling!: boolean;

  @property()
  scrolledTop: boolean = true;

  @property()
  navItems = ['About', 'Documentation', 'Components', 'Get started', 'Home'];

  firstUpdated() {
    document.addEventListener('scroll', () => {
      this.isScrolling = true;
      this.open = false;
      document.documentElement.scrollTop === 0 ? this.scrolledTop = true : this.scrolledTop = false;
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
    });

    // Closes corner navbar when clicking outside of navbar
    document.addEventListener('click', (e: Event) => {
      const clickoutside = !e.composedPath().includes(this);
      clickoutside ? this.open = false : '';
    });
  }

  emit(selectedItem: string) {
    this.dispatchEvent(
      new CustomEvent('clicked', {
        detail: selectedItem,
        bubbles: true
      })
    );
  }

  render() {
    return html`
    <div id="topBar" class="${this.scrolledTop ? 'show' : 'hide hideBar'}">

    </div>
        <div class="icon ${this.open ? 'open' : ''} ${this.scrolledTop || this.isScrolling ? 'hide' : 'show'}"
        @click=${()=> this.open ? this.open
          = false : this.open = true}>
          <span class="cls"></span>
          <span>
            <ul class="sub-menu">
              <ul class='circle-container'>
                <!-- Items are visible in opposite order  -->
                <li></li>
                ${this.navItems.map(item => html` <li>
                  <div class=${this.selectedItem===item ? 'active' : '' } @click=${()=> this.selectedItem = item}><a>${item}</a></div>
                </li>`)}
              </ul>
            </ul>
          </span>
          <span class="cls"></span>
        </div>
`;
  }

}
