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
  const maindropDown = document.querySelector(`.main-dropdown`);
  const editMenu = document.querySelector(`.edit-menu`);
  maindropDown.style.display = `block`;
  editMenu.style.display = `block`;
}

function CloseModel(e) {
  const maindropDown = document.querySelector(`.main-dropdown`);
  const editMenu = document.querySelector(`.edit-menu`);
  maindropDown.style.display = `none`;
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
async function DeleteItem(e, o,type) {
    Swal.fire({
        title: 'Are you sure?',
        text: "This action cannot be undone!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${location.origin}/admin/${type}/delete/${o}`, {
                    method: 'DELETE'
                });
                const resData = await response.json();
                if (response.ok && resData.status) {
                    Swal.fire(
                        'Deleted!',
                        'The Item has been deleted.',
                        'success'
                    );
                    e.parentElement.parentElement.parentElement.remove(); 
                } else {
                    Swal.fire(
                        'Error!',
                        resData.message || 'Failed to delete the client.',
                        'error'
                    );
                }
            } catch (err) {
                Swal.fire(
                    'Error!',
                    'An unexpected error occurred. Please try again.',
                    'error'
                );
            }
        }
    });
}
async function updateClientData(clientId, field, value,e) {
  try {
      const response = await fetch(`${location.origin}/admin/clients/update/${field}/${clientId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ [field]: value })
      });

      const resData = await response.json();
      if (response.ok && resData.status) {
          Swal.fire(
              'Updated!',
              'Client data has been updated successfully.',
              'success'
          );
      } else {
          Swal.fire(
              'Error!',
              resData.message || 'Failed to update client data.',
              'error'
          );
      }
      if(field=='status'){
        e.classList.add();
      }
  } catch (err) {
      Swal.fire(
          'Error!',
          'An unexpected error occurred. Please try again.',
          'error'
      );
  }
}
document.addEventListener("DOMContentLoaded", function () {
    let parentElement = document.querySelector('.info-content')
    parentElement.querySelectorAll("select").forEach(select => {
      select.addEventListener("change", function () {
          const clientId = this.closest(".accordion-content").querySelector(".ref span:last-child").textContent.trim();
          updateClientData(clientId, "status", this.value,this);
      });
  });

  document.querySelectorAll("input[type='date']").forEach(input => {
      input.addEventListener("change", function () {
          const clientId = this.closest(".accordion-content").querySelector(".ref span:last-child").textContent.trim();
          updateClientData(clientId, "date", this.value);
      });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var selectElements = document.querySelectorAll(".followstatus");

  function updateColor(event) {
      var selectElement = event.target || event;
      var selectedOption = selectElement.options[selectElement.selectedIndex];
      var selectedValue = selectedOption.value;
      selectElement.classList.remove("option-0", "option-1", "option-2", "option-3", "option-4");
      selectElement.classList.add("option-" + selectedValue);
  }

  selectElements.forEach(select => {
      select.addEventListener("change", updateColor);
      updateColor({ target: select }); 
  });
});
