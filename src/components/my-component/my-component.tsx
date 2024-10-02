import { Element, Component, Prop, h, Host } from '@stencil/core';
import { format } from '../../utils/utils';

@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true,
})
export class MyComponent {
  @Element() el: HTMLElement;
  /**
   * The first name
   */
  @Prop() first: string;

  /**
   * The middle name
   */
  @Prop({ mutable: true }) middle: string;

  /**
   * The last name
   */
  @Prop() last: string;

  public updateField(field = ''): void {
    const val: HTMLInputElement = this.el.shadowRoot.getElementById(field) as HTMLInputElement;
    if (val === null) {
      console.log('Element with does not exist: ', field);
      return;
    }
    console.log('updating ', field, ' with ', val.value);
    if (field === 'fi') {
      this.first = val.value;
    } else if (field === 'mi') {
      this.middle = val.value;
    } else if (field === 'la') {
      this.last = val.value;
    } else {
      console.log('Bad field ',  field);
    }
  }

  private getText(): string {
    return format(this.first, this.middle, this.last);
  }

  render() {
    return (
      <Host>
        <div>
          Hello, World! I'm {this.getText()}
        </div>
        <div>
          <input id="fi" name="fi" type="text" />
          <button onClick={ () => {this.updateField('fi')} }>
            update Prop() value first
          </button><br />
          <input id="mi" name="mi" type="text" />
          <button onClick={ () => {this.updateField('mi')} }>
            update mutable Prop value middle
          </button><br />
          <input id="la" name="la" type="text" />
          <button onClick={ () => {this.last = 'something else' } }>
            update Prop() last to something else
          </button>
        </div>
      </Host>
    );
  }
}
