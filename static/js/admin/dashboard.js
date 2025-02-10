const feature = new DataCall();
// EMPLOYEE ACCORDION
document.querySelectorAll(`.assign-to`).forEach((item, index) => {
  let header = item.querySelector(".eaccordion");
  header.addEventListener("click", async () => {
    const renderId = item.querySelector("#emp-in-np");
    renderId.innerHTML = "";
    if (item.classList.contains("open") != true) {
      if (item.dataset.taskid) {
        const empNp = await feature.GET_POST(
          `apiv1/employee/${item.dataset.ndealid}/${item.dataset.taskid}`,
          "GET"
        );
        empNp.forEach((item) => {
          const html = `<li class="add-empl"><span>${item.name}</span> <span class="icon" data-ndealid=${item.ndeal_id} data-catid=${item.category_id} data-emid=${item.em_id} onclick="removeEmpNp(this, 'normal')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus-circle" class="svg"><path fill="##000000" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></path></svg></span></li>`;
          renderId.innerHTML += html;
        });
      } else {
        const empMp = await feature.GET_POST(
          `apiv1/get-misc-emp/${item.dataset.ndealid}/${item.dataset.staskid}`,
          "GET"
        );
        empMp.forEach((item) => {
          const html = `<li class="add-empl"><span>${item.name}</span> <span class="icon" data-ndealid=${item.mdeal_id} data-catid=${item.mstask_id} data-emid=${item.em_id} onclick="removeEmpNp(this)"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="minus-circle" class="svg"><path fill="##000000" d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8,8,0,0,1,12,20Zm4-9H8a1,1,0,0,0,0,2h8a1,1,0,0,0,0-2Z"></path></svg></span></li>`;
          renderId.innerHTML += html;
        });
      }
    }

    item.classList.toggle("open");
    let description = item.querySelector(".emp-acc-data");
    let arr = item.querySelector(`.right-arr`);
    if (item.classList.contains("open")) {
      // description.style.height = `${description.scrollHeight}px`;
      description.classList.add(`open`);
      arr.classList.add(`open`);
    } else {
      // description.style.height = "0px";
      description.classList.remove(`open`);
      arr.classList.remove(`open`);
    }
  });
});

function closeSubBox() {
  const mainDrop = document.querySelector(".main-dropdown");
  mainDrop.classList.remove("active");
}
function search() {
  var inpValue = document.getElementById("searchQuery").value.toLowerCase();
  var gridContainer = document.querySelector(".main-card");
  if (gridContainer) {
    var cards = gridContainer.querySelectorAll(".cards_item");
    cards.forEach(function (card) {
      var contentText = card.textContent.toLowerCase();
      if (contentText.includes(inpValue)) {
        card.style.display = "block"; 
      } else {
        card.style.display = "none"; 
      }
    });
  } else {
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
}


async function DeleteProp(e, o) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then(async (pers) => {
    if (pers.isConfirmed) {
      await ReqHandler.GET(location.origin + "/admin/prop/delete/" + o).then(
        (res) => {
          if (res.status) {
            e.parentElement.parentElement.parentElement.remove();
          }
        }
      );
    }
  });
}

function EditPropertie(e, o) {
  document.getElementsByClassName("main")[0].classList.add("flow");
  const maindropDown = document.querySelector(`.main-dropdown`);
  const editMenu = document.querySelector(`.edit-menu`);
  maindropDown.style.display = `block`;
  editMenu.style.display = `block`;
  let main = e.parentElement.parentElement.parentElement;
  const refId = main.querySelector("#refid").dataset.id;
  const flatName = main.querySelector(".cli").textContent.trim();
  const location = main.querySelectorAll(".pro span")[1].textContent.trim();
  const bhk = main.querySelectorAll(".emp_bhk span")[1].textContent.trim();
  const floor = main
    .querySelectorAll(".emp_date span")[1]
    .textContent.trim()
    .replace("Floor-", "")
    .trim();
  const mapLink = main.querySelector(".contact_no a")?.href || "";
  const ownerName = main.querySelector(".g-mail").textContent.trim();
  const ownerNumber = main
    .querySelector(".agreement .amount")
    .textContent.trim();
  const category = main.querySelector(".category .amount").textContent.trim();

  console.log(
    flatName,
    location,
    category,
    floor,
    mapLink,
    ownerName,
    ownerNumber,
    bhk
  );

  editMenu.querySelector("#id").value = refId;
  editMenu.querySelector("#ename").value = flatName;
  editMenu.querySelector("#location").value = location;
  editMenu.querySelector("#bhk").value = bhk;
  editMenu.querySelector("#floor").value = floor;
  editMenu.querySelector("#mapLink").value = mapLink;
  editMenu.querySelector("#ownerName").value = ownerName;
  editMenu.querySelector("#ownerNumber").value = ownerNumber;
  editMenu.querySelector("#category").value = category;
}
function updateProperty(event) {
  event.preventDefault();
  let id = document.getElementById("id").value;
  const propertyData = {
    id: id,
    name: document.getElementById("ename").value,
    location: document.getElementById("location").value,
    bhk: document.getElementById("bhk").value,
    floor: document.getElementById("floor").value,
    map_link: document.getElementById("mapLink").value,
    owner_name: document.getElementById("ownerName").value,
    owner_number: document.getElementById("ownerNumber").value,
    category: document.getElementById("category").value,
  };

  fetch(`/admin/prop/update/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(propertyData),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.status ===true) {
        Swal.fire({
          title: "Success!",
          text: "Property updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          title: "Error!",
          text: "Failed to update property. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating the property.",
        icon: "error",
        confirmButtonText: "OK",
      });
    });
}
const form = document.querySelector("#updatesForm");
form.addEventListener("submit", updateProperty);
function CloseForm() {
  document.getElementsByClassName("main")[0].classList.remove("flow");
  const maindropDown = document.querySelector(`.main-dropdown`);
  const editMenu = document.querySelector(`.edit-menu`);
  maindropDown.style.display = `none`;
  editMenu.style.display = `none`;
}
function ViewChanger(e) {
  location.href=location.href+"&viewMode="+e;
}

