"use strict";
// BANKIST APP

// Data
const account1 = {
  owner: "Mouiad Gyahd Ali",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: "AL-hasan Lukman Saleh",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account3 = {
  owner: "Zeniab Tamem Jomah",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const account4 = {
  owner: "Ahmad Atef Salman",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
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
const btnCloseModel = document.querySelector(".close-modal");
const btnTransferCloseModel = document.querySelector(".transfer-close-modal");
const btnTransferWrongCloseModel = document.querySelector(
  ".transfer-wrong-close-modal"
);
const btnTransferNotExitCloseModel = document.querySelector(
  ".transfer-modal-not-exit"
);
const overlay = document.querySelector(".overlay");
const welcomeModal = document.querySelector(".welcome-modal");
const transferModal = document.querySelector(".transfer-modal");
const transferWrongModal = document.querySelector(".transfer-modal-wrong");
const transferNotExitModal = document.querySelector(".transfer-modal-not-exit");
const btnCloseRequestModal = document.querySelector(
  ".request-loan-close-modal"
);
const requestModal = document.querySelector(".request-loan-modal");
const btnCloseRequestNegModal = document.querySelector(
  ".request-loan-negative-close-modal"
);
const requestNegModal = document.querySelector(".request-loan-negative-modal");

const btnCloseAccountModal = document.querySelector(
  ".close-account-close-modal"
);
const accountCloseModal = document.querySelector(".close-account-modal");
const btnCloseNotExitAccountModal = document.querySelector(
  ".close-account-not-exit-close-modal"
);
const accountCloseNotExitModal = document.querySelector(
  ".close-account-not-exit-modal"
);
const btnCloseWrongPinAccountModal = document.querySelector(
  ".close-account-wrong-pin-close-modal"
);
const accountCloseWrongPinModal = document.querySelector(
  ".close-account-wrong-pin-modal"
);

const out = function (modal) {
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
    }
  });
};
const openModelWithOutOverlay = function (modal) {
  modal.classList.remove("hidden"); // equal to modal.style.display = 'block' only work for one attr
  out(modal);
};

const openModel = function (modal) {
  modal.classList.remove("hidden"); // equal to modal.style.display = 'block' only work for one attr
  overlay.classList.remove("hidden");
};
const closeModal = function (modal) {
  modal.classList.add("hidden");
};
const now = new Date();
labelDate.textContent = `${now.getDate()}`.padStart(2,0) +`/` + `${now.getMonth()+1}`.padStart(2,0)+`/
 ${now.getFullYear()}, ${now.getHours()} :`+`${now.getMinutes()}`.padStart(2,0);
// overlay.addEventListener("click", closeModal);
btnCloseModel.addEventListener("click", closeModal.bind(null, welcomeModal));
btnTransferCloseModel.addEventListener(
  "click",
  closeModal.bind(null, transferModal)
);
btnTransferWrongCloseModel.addEventListener(
  "click",
  closeModal.bind(null, transferWrongModal)
);
btnTransferNotExitCloseModel.addEventListener(
  "click",
  closeModal.bind(null, transferNotExitModal)
);
btnCloseRequestModal.addEventListener(
  "click",
  closeModal.bind(null, requestModal)
);
btnCloseRequestNegModal.addEventListener(
  "click",
  closeModal.bind(null, requestNegModal)
);
btnCloseAccountModal.addEventListener(
  "click",
  closeModal.bind(null, accountCloseModal)
);
btnCloseNotExitAccountModal.addEventListener(
  "click",
  closeModal.bind(null, accountCloseNotExitModal)
);
btnCloseWrongPinAccountModal.addEventListener(
  "click",
  closeModal.bind(null, accountCloseWrongPinModal)
);

const displayMovement = function (acc, sort = false) {
  containerMovements.innerHTML = "";
  const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const date = new Date(acc.movementsDates[i])
    const displayDate = `${date.getDate()}`.padStart(2,0) +`/` + `${date.getMonth()+1}`.padStart(2,0)+`/
 ${date.getFullYear()}, ${date.getHours()}:`+`${date.getMinutes()}`.padStart(2,0);
    const html = `
            <div class="movements__row">
            <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
            <div class="movements__date">${displayDate}</div>
            <div class="movements__value">${mov.toFixed(2)} €</div>
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
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)} € `;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)} €  `;
  const out = account.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)} € `;
  const interest = account.movements
      .filter((mov) => mov > 0)
      .map((deposit) => (deposit * account.interestRate) / 100)
      .filter((int) => int >= 1)
      .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}  €  `;
};

const updateUI = function (acc) {
  displayMovement(acc);
  calcDisplayBalance(acc);
  calcDisplaySummary(acc);
};
// Event handler
let currentAccount;

btnLogin.addEventListener("click", (event) => {
  event.preventDefault();
  openModelWithOutOverlay(welcomeModal);

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;

    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();
    updateUI(currentAccount);
  }
});
// Transfer Money
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  if (inputTransferAmount.value === "" || inputTransferTo.value === "") {
    openModelWithOutOverlay(transferModal);
    inputTransferAmount.value = inputTransferTo.value = "";
    return;
  }
  if (inputTransferTo.value === currentAccount.username) {
    openModelWithOutOverlay(transferWrongModal);
    inputTransferAmount.value = inputTransferTo.value = "";
    return;
  }
  const amount = Number(inputTransferAmount.value);
  if (!accounts.some((acc) => acc.username === inputTransferTo.value)) {
    openModelWithOutOverlay(transferNotExitModal);
    inputTransferAmount.value = inputTransferTo.value = "";
    return;
  }
  const receiverAccount = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAccount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    // Transfer the Money
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAccount.movementsDates.push(new Date().toISOString());
    // update Ui
    updateUI(currentAccount);
  }
});

// request loan
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  if (inputLoanAmount.value === "") {
    openModelWithOutOverlay(requestModal);
    return;
  }
  if (inputLoanAmount.value < 0) {
    inputLoanAmount.value = "";
    openModelWithOutOverlay(requestNegModal);
    return;
  }
  const amount = Math.floor(Number(inputLoanAmount.value));
  inputLoanAmount.value = "";
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // add movement
    // TODO : fix the loan logic , when you request n,
    //  and have it you can request more and more, fix that
    currentAccount.movements.push(amount);
    currentAccount.movementsDates.push(new Date().toISOString());
    updateUI(currentAccount);
  }
});

// close account
btnClose.addEventListener("click", function (event) {
  event.preventDefault();
  if (inputCloseUsername.value === "" || inputClosePin.value === "") {
    inputCloseUsername.value = "";
    inputClosePin.value = "";
    openModelWithOutOverlay(accountCloseModal);
    return;
  }
  if (!accounts.some((acc) => acc.username === inputCloseUsername.value)) {
    inputCloseUsername.value = "";
    inputClosePin.value = "";
    openModelWithOutOverlay(accountCloseNotExitModal);
    return;
  }
  if (currentAccount.pin !== Number(inputClosePin.value)) {
    inputCloseUsername.value = "";
    inputClosePin.value = "";
    openModelWithOutOverlay(accountCloseWrongPinModal);
    return;
  }
  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    console.log("momo");
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    // delete the account
    accounts.splice(index, 1);

    // Hide UI
    labelWelcome.textContent = `You are Logout from our bank, login again with other account`;
    containerApp.style.opacity = 0;
    inputCloseUsername.value = inputClosePin.value = "";
  }
});
let sorted = false;
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  displayMovement(currentAccount, !sorted);
  sorted = !sorted;
});
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
const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(firstWithdrawal);

const account = accounts.find((acc) => acc.owner === "Mouiad Gyahd Ali");
// console.log(account)

// some condition
const anyDeposits = movements.some((mov) => mov > 0);
// console.log(anyDeposits)
const nigDeposits = movements.includes(-1);

const allMovements = accounts.map((acc) => acc.movements).flat();
// console.log(allMovements)
