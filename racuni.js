document.querySelector(".getSql").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Radi me dobro");
  const Datum = getData();
  if (!Datum) {
    document.getElementById("getSqlParent");
  }
  console.log(Datum);
  fetch("http://localhost:3000/racuni.html", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Datum),
  }).then((response) => {
    response.json().then((data) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].Datum == Datum.date) {
          console.log(i);
          document.querySelector(".tableForm").classList.remove("d-none");
          addElement(data[i]);
          return;
        }
      }
      removeChildren("#getSqlParent");
      document.querySelector(".tableForm").classList.add("d-none");
      console.log(document.querySelector(".p-added"));
      if (document.querySelector(".p-added") != null) {
        document.querySelector(".p-added").remove();
      }
      let p = document.createElement("h4");
      p.classList.add("p-added");

      p.textContent = "Please insert a valid/existing date!";
      document.querySelector(".overlay").append(p);
    });
  });
});

function removeChildren(x) {
  let parent = document.querySelector(`${x}`);
  if (parent != null) {
    while (parent.firstChild) {
      parent.firstChild.remove();
    }
  }
}

function getData() {
  return (node = {
    date: document.getElementById("datum").value,
  });
}

function addElement(data) {
  const newDiv = document.getElementById("getSqlParent");
  while (newDiv.firstChild) {
    newDiv.removeChild(newDiv.lastChild);
  }

  const newDatumElem = document.createElement("td");
  const newContentElem = document.createElement("td");

  const newDatum = document.createTextNode(data.Datum);
  const newContent = document.createTextNode(data.Rashod);

  newDatumElem.className = "dynamicTd";
  newContentElem.className = "dynamicTd";

  newDatumElem.appendChild(newDatum);
  newContentElem.appendChild(newContent);

  document.getElementById("getSqlParent").appendChild(newDatumElem);
  document.getElementById("getSqlParent").appendChild(newContentElem);
}
