"use strict";
// BANKIST APP

// Data
const account1 = {
  owner: "Mouiad Gyahd Ali",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, //
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

const displayMovement = function (movement, sort=false) {
  containerMovements.innerHTML = "";
  const movs = sort ? movement.slice().sort((a,b)=>a-b) : movement;
  movs.forEach(function (mov, i) {
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

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce(
    (acc, mov) => acc + mov,
    0
  );
  labelBalance.textContent =`${account.balance} € `
};


const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} €  `;
  const out =  account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)} € `;
  labelSumInterest.textContent = `${account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, int) => acc + int, 0)}  €  `;
};

const updateUI = function (acc){
  displayMovement(acc.movements);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
}
// Event handler
let currentAccount;
btnLogin.addEventListener('click',(event)=>{
  event.preventDefault();
 currentAccount=
    accounts.find(acc=>acc.username === inputLoginUsername.value)
if (currentAccount?.pin === Number(inputLoginPin.value))
{
  labelWelcome.textContent =
      `Welcome Back ${currentAccount.owner.split(' ') [0]}`
      containerApp.style.opacity = 1;

  inputLoginUsername.value =  inputLoginPin.value = '';
  inputLoginPin.blur();
  updateUI(currentAccount);
}});

btnTransfer.addEventListener('click', function (event){
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);

  const receiverAccount = accounts.find(acc=>acc.username ===inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';
  if( amount > 0 &&
      currentAccount.balance >= amount && receiverAccount &&
      receiverAccount?.username !== currentAccount.username ){
    // Transfer the Money
      currentAccount.movements.push(-amount);
      receiverAccount.movements.push(amount);
      // update Ui
      updateUI(currentAccount)

  }
});

// request loan
btnLoan.addEventListener('click', function (event){
  event.preventDefault();
  const amount = Number(inputLoanAmount.value);
  inputLoanAmount.value = '';
  if (amount > 0 && currentAccount.movements.some(mov=>mov >= amount * 0.1)) {
    // add movement
    // TODO : fix the loan logic , when you request n,
    //  and have it you can request more and more, fix that
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
});

// close account
btnClose.addEventListener('click', function (event){
  event.preventDefault();
  if (currentAccount.username === inputCloseUsername.value
      && currentAccount.pin ===Number(inputClosePin.value))
  {const index =  accounts.findIndex(acc => acc.username===currentAccount.username);
    // delete the account
    accounts.splice(index,1);}

  // Hide UI
  labelWelcome.textContent =
      `You are Logout from our bank, login again with other account`
  containerApp.style.opacity = 0;
  inputCloseUsername.value = inputClosePin.value = '';
})
let sorted = false;
btnSort.addEventListener('click', function (event){
  event.preventDefault();
  displayMovement(currentAccount.movements, !sorted)
  sorted = !sorted;
})
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
 const firstWithdrawal = movements.find(mov => mov<0);
 // console.log(firstWithdrawal);

 const account = accounts.find(acc=>acc.owner==="Mouiad Gyahd Ali")
// console.log(account)

// some condition
const anyDeposits = movements.some(mov=>mov>0)
// console.log(anyDeposits)
const nigDeposits = movements.includes(-1)

const allMovements = accounts.map(acc=>acc.movements).flat();
console.log(allMovements)