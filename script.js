"use strict";
// BANKIST APP

// Data
const account1 = {
  owner: "Mouiad Gyahd Ali",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "AL-hasan Lukman Saleh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Zeniab Tamem Jomah",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Ahmad Atef Salman",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovement = function (movement) {
  containerMovements.innerHTML = "";
  movement.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__date">Null</div>
            <div class="movements__value">${mov} €</div>
        </div>`;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};
displayMovement(account1.movements);

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const calcDisplayBalance = function (movements) {
  labelBalance.textContent = `${movements.reduce(
    (acc, mov) => acc + mov,
    0
  )} € `;
};
calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (movements) {
  const incomes = movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €  `;
  const out = movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} € `;
  labelSumInterest.textContent = `${movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0)}  €  `;
};
calcDisplaySummary(account1.movements);

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const eurToUsd = 1.1;

const movementsUsd = movements.map((mov) => mov * eurToUsd);
// console.log([...movementsUsd])

const movementDescriptions = movements.map(
  (mov, index) =>
    `Movement ${index + 1}: You  ${
      mov > 0 ? "deposited" : "withdrew"
    } ${Math.abs(mov)}`
);
// console.log(movementDescriptions)

const deposits = movements.filter(function (mov) {
  return mov > 0;
});
// console.log(deposits);
const withdraw = movements.filter((mov) => mov < 0);
// console.log(withdraw);

const balance = movements.reduce(function (acc, cur, index, arr) {
  return acc + cur;
}, 0);
// console.log(balance);

const totalDepositsUsd = movements
  .filter((mov) => mov > 0)
  .map((mov) => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);

// console.log(totalDepositsUsd);
