import { css, customElement, html, LitElement, property, unsafeCSS, query } from 'lit-element';
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
  navItems = ['Home', 'Components', 'Documentation', 'Get started', 'Account'];


  firstUpdated() {
    document.addEventListener('scroll', () => {
      this.isScrolling = true;
      this.open = false;
      setTimeout(() => {
        this.isScrolling = false;
      }, 500);
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
        <div class="icon ${this.open ? 'open' : ''} ${this.isScrolling ? 'hide' : 'show'}" @click=${() => this.open ? this.open
        = false : this.open = true}>
          <span class="cls"></span>
          <span>
            <ul class="sub-menu">
              <ul class='circle-container'>
                <!-- Items are visible in opposite order  -->
                <li></li>
                <li>
                  <div><a>About</a></div>
                </li>
                <li>
                  <div><a>Documentation</a></div>
                </li>
                <li>
                  <div class="active"><a>Components</a></div>
                </li>
                <li>
                  <div><a>Get started</a></div>
                </li>
                <li>
                  <div><a>Home</a></div>
                </li>
              </ul>
            </ul>
          </span>
          <span class="cls"></span>
        </div>
`;
  }

}
