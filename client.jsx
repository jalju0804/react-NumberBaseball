import React from 'react';
import ReactDom from 'react-dom';

import BBgame from './BBgame';

ReactDom.render(<BBgame />, document.querySelector('#root'));
//ReactDom.createRoot(document.querySelector('#root')).render(<BBgame/>);