const body = document.querySelector("body");

let calc;
let modal;
let cancel;

const createCalc = () => {
  calc = document.createElement("div");
  calc.classList.add("calc");
};

const createModal = (question) => {
  modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
<p>${question}</p>
`;
  cancel = document.createElement("button");
  cancel.innerText = "Ok";
  cancel.classList.add("btn", "btn-primary");
  modal.append(cancel);
};

export function openModal(question) {
  createCalc();
  createModal(question);

  calc.append(modal);
  body.append(calc);
  return new Promise((resolve, reject) => {
    cancel.addEventListener("click", () => {
      resolve(true);
      calc.remove();
    });
  });
}
