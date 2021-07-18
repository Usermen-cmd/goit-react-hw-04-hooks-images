// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from 'App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root'),
// );

const tree = {
  value: null,
  children: [
    {
      value: 2,
      children: [{ value: 4 }, { value: 5 }],
    },
    {
      value: 0,
      children: [{ value: 6 }, { value: 7 }],
    },
  ],
};

const foo = p => {
  const a = Object.values(p);
  const b = a.flatMap(el => {
    if (!el ?? true) {
      console.log(el);
      return el;
    }
    const isPeak = typeof el !== 'array' && typeof el !== 'object';
    return isPeak ? el : foo(el);
  });
  return b;
};
console.log(foo(tree));

// const getTreeValues = tree => {
//   const { value, children = [] } = tree;
//   const result = [value];
//   children.forEach(node => result.push(...getTreeValues(node)));
//   return result;
// };

// console.log(getTreeValues(tree));
