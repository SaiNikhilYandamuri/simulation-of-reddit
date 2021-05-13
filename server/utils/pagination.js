// const users=
// [
//     {
//         id:1,
//         name:"Danesh"
//     },
//     {
//         id:2,
//         name:"Ali"
//     },
//     {
//         id:3,
//         name:"Nikhil"
//     },
//     {
//         id:4,
//         name:"Yusuf"
//     },
//     {
//         id:5,
//         name:"Karan"
//     },
//     {
//         id:6,
//         name:"Sohan"
//     },
//     {
//         id:7,
//         name:"Dhruvin"
//     },
//     {
//         id:8,
//         name:"Kushal"
//     },
//     {
//         id:9,
//         name:"Zeel"
//     },
//     {
//         id:10,
//         name:"Geetika"
//     },
// ]

const paginate = (users, page, limit) => {
  // const page=parseInt(req.query.page)
  // const limit = parseInt(req.query.limit)
  // page=1
  // limit=5
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  console.log(users.slice(startIndex, endIndex));

  // const results={}

  // results.previous = {
  //     page:page-1,
  //     limit:limit
  // }
  // results.next = {
  //     page:page+1,
  //     limit:limit
  // }
  // results.result=users.slice(startIndex,endIndex)
  return users.slice(startIndex, endIndex);
};

const users = [
  {
    id: 1,
    name: "Danesh",
  },
  {
    id: 2,
    name: "Ali",
  },
  {
    id: 3,
    name: "Nikhil",
  },
  {
    id: 4,
    name: "Yusuf",
  },
  {
    id: 5,
    name: "Karan",
  },
  {
    id: 6,
    name: "Sohan",
  },
  {
    id: 7,
    name: "Dhruvin",
  },
  {
    id: 8,
    name: "Kushal",
  },
  {
    id: 9,
    name: "Zeel",
  },
  {
    id: 10,
    name: "Geetika",
  },
];

// console.log(paginate(users,1,5))

module.exports = paginate;
