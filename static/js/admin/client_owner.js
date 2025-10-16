const getFun = new DataCall();
async function updataAdvancePay(data, e) {
  e.preventDefault();
  const target = data.dataset;
  const advanceData = new FormData(document.getElementById("advanced-form"));
  advanceData.append("ndeal_id", Number(target.dealid));
  advanceData.append("task", Number(target.taskid));
  await getFun.GET_POST(
    "admin/finance/update-advancepay",
    "PUT",
    advanceData,
    "form"
  );
  document.querySelector(`.main-dropdown`).style.display = `none`;
}

async function openDick(data) {
  document.getElementsByClassName("main")[0].classList.add("flow");
  const Menu = document.querySelector(data);
  const maindropDown = Menu.parentElement;
  maindropDown.style.display = `block`;
  Menu.style.display = `block`;
}

function CloseModel(e) {
  const maindropDown = document.querySelectorAll(`.main-dropdown`);
  const editMenu = document.querySelector(`.${e}`);
  maindropDown[0].style.display = `none`;
  maindropDown[1].style.display = `none`;
  editMenu.style.display = `none`;
}
function search() {
  var inpValue = document.getElementById("searchQuery").value.toLowerCase();
  var elmCtn = document.querySelectorAll(".accordion-content");
  elmCtn.forEach(function (e) {
    var contentText = e.textContent.toLowerCase();
    if (contentText.includes(inpValue)) {
      e.style.display = "block";
    } else {
      e.style.display = "none";
    }
  });
}
async function DeleteItem(e, o, type) {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${location.origin}/admin/${type}/delete/${o}`,
          {
            method: "DELETE",
          }
        );
        const resData = await response.json();
        if (response.ok && resData.status) {
          Swal.fire("Deleted!", "The Item has been deleted.", "success");
          e.parentElement.parentElement.parentElement.remove();
        } else {
          Swal.fire(
            "Error!",
            resData.message || "Failed to delete the client.",
            "error"
          );
        }
      } catch (err) {
        Swal.fire(
          "Error!",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    }
  });
}
async function updateClientData(id, type, field, value, e) {
  try {
    const response = await fetch(
      `${location.origin}/admin/${type}/update/${field}/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ [field]: value }),
      }
    );

    const resData = await response.json();
    if (response.ok && resData.status) {
      Swal.fire("Updated!", "Data has been updated successfully.", "success");
    } else {
      Swal.fire("Error!", resData.message || "Failed to update data.", "error");
    }
    if (field == "status") {
      e.classList.add();
    }
  } catch (err) {
    Swal.fire(
      "Error!",
      "An unexpected error occurred. Please try again.",
      "error"
    );
  }
}

async function openClientPaymentInfo(params) {
  let contentCtn = document.getElementsByClassName("data-aside-ctn")[0];
  contentCtn.classList.remove("hide");
  try {
    const response = await fetch(
      `${location.origin}/admin/client/payments/${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const resData = await response.json();
    contentCtn.querySelector(".data-aside").innerHTML=''
    if (resData.status) {
        resData.data.forEach((e)=>{
      contentCtn.querySelector(".data-aside").innerHTML += `
        <div class="card">
            <div class="row">
              <span class="label">ID:</span>
              <span class="value">${e.id}</span>
              <span class="label">Date:</span>
              <span class="value">${e.date}</span>
            </div>
            <div class="row">
              <span class="label">Amount:</span>
              <span class="value">${e.amount}/-</span>
              <span class="label">Method:</span>
              <span class="value">${e.mode}</span>
            </div>
                <div class="row">
              <span class="label">Received By:${e.recievedby}</span>
              </div>
            <div class="row">
              <span class="label">Remarks By:${e.remark}</span>
              <span class="value">
                <button onclick="delete_clientPayments(${e.id},this)">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="trash-alt" width="22px" class="icon">
                    <path fill="white"
                      d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
                  </svg>
                </button>
              </span>
            </div>
        </div>`;
         })
    } else {
      Swal.fire("Error!", resData.message || "Failed to update data.", "error");
    }
  } catch (err) {
    console.log(err);
    Swal.fire(
      "Error!",
      "An unexpected error occurred. Please try again.",
      "error"
    );
  }
}
function openClientPaymentInfoP_close() {
  let contentCtn = document.getElementsByClassName("data-aside-ctn")[0];
  contentCtn.classList.add("hide");
}

async function delete_clientPayments(e,params) {
  Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await fetch(
          `${location.origin}/admin/client/payments/${e}`,
          {
            method: "DELETE",
          }
        );
        const resData = await response.json();
        if (resData.status) {
          Swal.fire("Deleted!", "The client Payment has been deleted.", "success");
          params.parentElement.parentElement.parentElement.remove();
        } else {
          Swal.fire(
            "Error!",
            resData.message || "Failed to delete the client Payment",
            "error"
          );
        }
      } catch (err) {
        Swal.fire(
          "Error!",
          "An unexpected error occurred. Please try again.",
          "error"
        );
      }
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  let parentElement = document.querySelector(".info-content");
  parentElement.querySelectorAll("select").forEach((select) => {
    select.addEventListener("change", function () {
      const id = this.closest(".accordion-content")
        .querySelector(".ref span:last-child")
        .textContent.trim();
      let dataType = location.pathname.split("/")[2];
      updateClientData(id, dataType, "status", this.value, this);
    });
  });
  document.querySelectorAll("input[type='date']").forEach((input) => {
    input.addEventListener("change", function () {
      const id = this.closest(".accordion-content")
        .querySelector(".ref span:last-child")
        .textContent.trim();
      let dataType = location.pathname.split("/")[2];
      updateClientData(id, dataType, "date", this.value);
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var selectElements = document.querySelectorAll(".followstatus");
  function updateColor(event) {
    var selectElement = event.target || event;
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    var selectedValue = selectedOption.value;
    selectElement.classList.remove(
      "option-0",
      "option-1",
      "option-2",
      "option-3",
      "option-4"
    );
    selectElement.classList.add("option-" + selectedValue);
  }
  selectElements.forEach((select) => {
    select.addEventListener("change", updateColor);
    updateColor({ target: select });
  });
});
