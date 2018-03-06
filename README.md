# In VP [![Build Status](https://travis-ci.org/hpohlmeyer/in-vp.svg?branch=master)](https://travis-ci.org/hpohlmeyer/in-vp)

> Check if elements are fully or partially visible in the viewport

## Installation

```
npm install in-vp
```

## Usage

```js
const inVp = require('in-vp');

const element = document.querySelector('.foo');
const { fully, partially, edges } = inVp(element);
```

## API

### `inVp(element, [treshold])`
#### Arguments
- `element` (HTMLElement)  
  The element, that will be tested.  
  ```js
  inVp(document.querySelector('.foo'));
  ```
- `treshold` (Object)  
  Shift the viewport boundaries to change the point where the element is considered in or out of the viewport. Positive values move the boundary
  inside the viewport, negative outside. This can come in handy if want to take fixed elements like a navigation into account.
  Currently only pixel values are supported.
  ```js
  const element = document.querySelector('.foo');
  inVp(element, { top: 100 });
  ```

#### Return value


`inVp()` returns an object, that uses the following signature:

- `fully` (boolean):  
True if the whole element is visible
- `partially` (boolean):  
True if only a part of the element is visible
- `edges` (object):  
Contains visibility information for all four edges of the element. Each edge can have three different states:
  - `fully` (string): The whole edge is visible
  - `partially` (string): Only a part of the edge is visible
  - `false` (boolean): The edge is completely invisible

```
{
  fully: boolean,
  partially: boolean,
  edges: {
    top:    'fully' |  'partially' | false,
    right:  'fully' |  'partially' | false,
    bottom: 'fully' |  'partially' | false,
    left:   'fully' |  'partially' | false
  }
}
```

## License
MIT © [Henning Pohlmeyer](https://henningpohlmeyer.com)
