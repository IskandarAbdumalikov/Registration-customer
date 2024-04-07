let customer = JSON.parse(localStorage.getItem("users")) || [
  {
    fname: "Laylo",
    lname: "Aliyeva",
    age: 22,
    phones: "9993453434",
    region: "Toshkent",
    budget: 1500,
  },
  {
    fname: "Aziz",
    lname: "Aliyev",
    age: 15,
    phones: "9993453434",
    region: "Sirdaryo",
    budget: -1500,
  },
  {
    fname: "Maftuna",
    lname: "Raimqulova",
    age: 16,
    phones: "9993453434",
    region: "Jizzax",
    budget: 1500,
  },
  {
    fname: "Sevinch",
    lname: "Raimqulova",
    age: 19,
    phones: "9993453688",
    region: "Samarqand",
    budget: 2000,
  },
];

let createBtn = document.querySelector(".create__user__btn");
let tbody = document.querySelector(".tbody");

function createNewUser(information) {
  const fragment = document.createDocumentFragment();
  while (tbody.firstChild) {
    tbody.firstChild.remove();
  }
  information.forEach((data, index) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.fname}</td>
            <td>${data.lname}</td>
            <td>${data.age}</td>
            <td>${data.phones}</td>
            <td>${data.region}</td> 
            <td>${data.budget}</td>   
        `;
    fragment.appendChild(tr);
  });
  tbody.appendChild(fragment);
}
createNewUser(customer);

let form = document.querySelector(".form");
let firstName = document.querySelector("#first__name");
let lastName = document.querySelector("#last__name");
let inputAge = document.querySelector("#age");
let phoneNumber = document.querySelector("#phone");
let selectRegion = document.querySelector("#region");
let totalBudget = document.querySelector("#budget");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let newUser = {
    fname: firstName.value,
    lname: lastName.value,
    age: +inputAge.value,
    phones: phoneNumber.value,
    region: selectRegion.value,
    budget: totalBudget.value,
  };
  customer.push(newUser);
  createNewUser(customer);
  localStorage.setItem("users", JSON.stringify(customer));

  firstName.value = "";
  lastName.value = "";
  inputAge.value = "";
  phoneNumber.value = "";
  selectRegion.value = "";
  totalBudget.value = "";
});

//sorting

const sortFirstname = document.querySelector("#sorting__firstname");
const sortLastname = document.querySelector("#sorting__lastname");
const sortAge = document.querySelector("#sorting__age");
const sortBudget = document.querySelector("#sorting__budget");

function sortingNumber(value, type) {
  if (value === "descending") {
    customer.sort((a, b) => b[type] - a[type]);
  } else if (value === "ascending") {
    customer.sort((a, b) => a[type] - b[type]);
  }
  createNewUser(customer);
}

function sortingString(value, type) {
  customer.sort((a, b) => {
    let first = a[type].toLowerCase();
    let second = b[type].toLowerCase();
    if (second > first) return value === "descending" ? 1 : -1;
    if (second < first) return value === "descending" ? -1 : 1;
    return 0;
  });
  createNewUser(customer);
}

sortAge.addEventListener("change", (e) => {
  sortingNumber(e.target.value, "age");
});

sortBudget.addEventListener("change", (e) => {
  sortingNumber(e.target.value, "budget");
});

sortFirstname.addEventListener("change", (e) => {
  sortingString(e.target.value, "fname");
});
sortLastname.addEventListener("change", (e) => {
  sortingString(e.target.value, "lname");
});

//filtering

let filterRegion = document.querySelector("#filtering__region");

function filterString(value, type) {
  if (value === "all") {
    createNewUser(customer);
  } else {
    let filterCustomer = customer.filter((user) => user[type] === value);
    createNewUser(filterCustomer);
  }
}

filterRegion.addEventListener("change", (e) => {
  filterString(e.target.value, "region");
});

let removeButton = document.querySelector(".remove__btn");

removeButton.addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("users");
  while (tbody.firstChild) {
    tbody.firstChild.remove();
  }

  customer = JSON.parse(localStorage.getItem("users")) || [];
});
