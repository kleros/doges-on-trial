import React from 'react'
import { storiesOf } from '@storybook/react'

storiesOf('Typography', module)
  .add('headings', () => (
    <div>
      <h1>Heading 1</h1>
      <h2>Heading 2</h2>
      <h3>Heading 3</h3>
      <h4>Heading 4</h4>
    </div>
  ))
  .add('paragraphs', () => (
    <div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        sapien nunc, eleifend et sem nec, iaculis tincidunt felis.
      </p>
      <p>
        Duis sed eros ut lacus maximus sodales id ut nibh. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
        Phasellus accumsan convallis laoreet.
      </p>
      <p>
        Duis et mauris vestibulum, auctor lacus porttitor, pellentesque arcu.
        Sed scelerisque dolor in orci luctus semper. Mauris turpis magna, congue
        vitae sollicitudin vel, pretium nec arcu.
      </p>
    </div>
  ))
  .add('small', () => (
    <div>
      <small>SMALL</small>
    </div>
  ))
