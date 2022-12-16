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
});
// console.log(data);

const map2 = data.map((a) => {
  console.log(a.id);
  console.log(a.label);
  console.log(a.score);
  console.log(a.rank);
});
// for (const predict of data) {
// }
// console.log(data[0].id);
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
