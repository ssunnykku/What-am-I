const data = [
  {
    id: 58,
    label: 'Chesapeake_Bay_retriever',
    score: 0.2698589563369751,
  },
  { id: 104, label: 'Newfoundland', score: 0.18638157844543457 },
  { id: 19, label: 'Irish_wolfhound', score: 0.170347198843956 },
];

const map = data.map((a, i) => {
  a.rank = i;
  console.log(a);
});

// const obj = {
//   name: 'hanjung',
//   male: true,
//   age: 31,
// };

// function stringify(obj) {
//   return (
//     '[' +
//     '{"id":"' +
//     `${obj.id}` +
//     '","label":' +
//     `${obj.label}` +
//     ',"score":' +
//     `${obj.score}` +
//     '}' +
//     ']'
//   );
// }

// // function stringify(obj) {
// //   return (
// //     '{"name":"' + obj.name + '","male":' + obj.male + ',"age":' + obj.age + '}'
// //   );
// // }
// console.log(stringify(data));
