var nameInput = document.querySelector("#siteName");
var urlInput = document.querySelector("#siteUrl");
var submitBtn = document.querySelector(".submit");
var bookMarks = document.querySelector("#bookMarks");
var bookMarksArray = [];

// validation functions
function nameVlaidation() {
  if (nameInput.value.trim() == "") {
    document.querySelector(".name-error").classList.remove("d-none");
    return false;
  } else {
    document.querySelector(".name-error").classList.add("d-none");
    return true;
  }
}

function urlVlaidation() {
  if (urlInput.value.trim() == "") {
    document.querySelector(".url-error").classList.remove("d-none");
    return false;
  } else {
    document.querySelector(".url-error").classList.add("d-none");
    return true;
  }
}

if (localStorage.getItem("bookMarks") != null) {
  bookMarksArray = JSON.parse(localStorage.getItem("bookMarks"));
  displayData();
}
function displayData() {
  bookMarks.innerHTML = "";
  for (let i = 0; i < bookMarksArray.length; i++) {
    bookMarks.innerHTML += `
            <div class="table-bg py-4 rounded d-flex align-items-center px-5">
              <h5 class="fs-2 fw-bold">${bookMarksArray[i].name}</h5>
              <div class="buttons">
              <a href="${
                bookMarksArray[i].url.includes("https://") ? "" : "https://"
              }${
      bookMarksArray[i].url
    }" target="_blank" class="shadow-hover fs-5 btn btn-primary py-2 px-4">Visit</a>
                  <button class="shadow-hover fs-5 ms-3 btn btn-danger py-2 px-4" onClick="remove(${i})">Remove</button>
                  </div>
                  </div>
                  `;
  }
}

nameInput.addEventListener("blur", nameVlaidation);

urlInput.addEventListener("blur", urlVlaidation);

submitBtn.addEventListener("click", addData);

// Add Function
function addData() {
  var urlValue = urlInput.value;
  var nameValue = nameInput.value;
  if (nameVlaidation() && urlVlaidation()) {
    var bookMark = {
      name: nameValue,
      url: urlValue,
    };
    bookMarksArray.push(bookMark);
    localStorage.setItem("bookMarks", JSON.stringify(bookMarksArray));
    displayData();
    reset();
  }
}

// Reset Function
function reset() {
  nameInput.value = "";
  urlInput.value = "";
}

// Remove Function
function remove(i) {
  bookMarksArray.splice(i, 1);
  localStorage.setItem("bookMarks", JSON.stringify(bookMarksArray));
  displayData();
}
