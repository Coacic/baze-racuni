document.querySelector(".submit").addEventListener("click", (e) => {
  e.preventDefault();
  console.log("Click event");
  let data = formData();
  if (data == false) {
    while (document.getElementById("response").firstChild)
      document.getElementById("response").removeChild();
    let p = document.createElement("h4");
    let t = document.createTextNode("Please insert a valid date!");
    p.appendChild(t);
    document.getElementById("response").appendChild(p);
    return;
  }
  fetch("http://localhost:3000/index.html", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then((response) => {
    console.log(response);
  });
});

function formData() {
  var eps1 = document.getElementById("eps1").value;
  var eps2 = document.getElementById("eps2").value;
  var eps3 = document.getElementById("eps3").value;
  var vvik = document.getElementById("vvik").value;
  var mts = document.getElementById("mts").value;
  var h = document.getElementById("h").value;
  var date = document.getElementById("date").value;

  if (!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(date)) return false;

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
