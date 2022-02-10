document.querySelector(".submit").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Click event");
  let data = formData();
  if (data == false) {
    while (document.querySelector(".response").firstChild != undefined || null)
      document.querySelector(".responseText").remove();
    let p = document.createElement("h2");
    let t = document.createTextNode("Please insert a valid date!");
    p.classList.add("responseText");
    p.appendChild(t);
    document.querySelector(".response").appendChild(p);
    console.log("Done");
    return;
  }
  fetch("http://localhost:3000/index.html", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
    addResponse();
  });
});

function formData() {
  let eps1 = document.getElementById("eps1").value;
  let eps2 = document.getElementById("eps2").value;
  let eps3 = document.getElementById("eps3").value;
  let vvik = document.getElementById("vvik").value;
  let mts = document.getElementById("mts").value;
  let h = document.getElementById("h").value;
  let date = document.getElementById("date").value;

  if (!/^((0[1-9])|(1[0-2]))\/(\d{4})$/.test(date)) return false;

  let node = {
    eps1: eps1,
    eps2: eps2,
    eps3: eps3,
    vvik: vvik,
    mts: mts,
    h: h,
    date: date,
  };
  return node;
}

function addResponse() {
  const newDiv = document.querySelector(".response");
  while (newDiv.firstChild) {
    newDiv.removeChild(newDiv.lastChild);
  }

  const newDatumElem = document.createElement("h2");

  const newContent = document.createTextNode("Racun je dodat u bazu!");

  newDatumElem.appendChild(newContent);
  newDatumElem.classList.add("responseText");

  newDiv.appendChild(newDatumElem);
}
