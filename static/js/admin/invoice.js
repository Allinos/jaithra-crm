// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  highlightDueDates();
  setupFormSubmit();
  setupEscapeKey();
});

// ✅ Highlight Due Dates + Notifications + Sound
function highlightDueDates() {
  const dueDateElements = document.querySelectorAll(
    ".emp_bhk span:nth-child(2)"
  );
  const today = new Date();
  const alertThresholdDays = 3;

  dueDateElements.forEach(function (span) {
    const text = span.textContent.trim();
    const dueDate = new Date(text);

    if (isNaN(dueDate)) return;

    const diff = dueDate.getTime() - today.getTime();
    const dayDiff = Math.ceil(diff / (1000 * 3600 * 24));

    if (dayDiff <= alertThresholdDays && dayDiff >= 0) {
      span.style.color = "red";
      span.style.fontWeight = "bold";

      // Notification
      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Payment Due Soon!", {
          body: `Due in ${dayDiff} day(s): ${text}`,
        });
      } else if (
        "Notification" in window &&
        Notification.permission !== "denied"
      ) {
        Notification.requestPermission().then(function (permission) {
          if (permission === "granted") {
            new Notification("Payment Due Soon!", {
              body: `Due in ${dayDiff} day(s): ${text}`,
            });
          }
        });
      }

      // Sound
      const audio = new Audio(
        "https://www.soundjay.com/buttons/sounds/beep-07.mp3"
      );
      audio.play();
    }
  });
}

// ✅ Open and Fill Edit Form
function EditPropertie(elem, id) {
  const container = elem.closest(".grid");

  const invoiceId = id;
  const invoiceNumber = container.querySelector(".invoice_number").children[1].textContent.trim();
  const invoiceDate = container.querySelector(".pro span:nth-child(2)").textContent.trim();
  const dueDate = container.querySelectorAll(".emp_bhk span:nth-child(2)")[0].textContent.trim();
  const amount = container.querySelectorAll(".emp_bhk span:nth-child(2)")[1].textContent.trim();
  const mode = container.querySelector(".emp_date span:nth-child(2)").textContent.trim();
  const adata = container.nextElementSibling;
  const salesIncharge = adata.querySelector(".contact_no")?.textContent.trim() || "";
  const salesReturn = adata.querySelector(".sales-return .amount")?.textContent.trim() || "";
  const category = adata.querySelector(".category .amount")?.textContent.trim() || "";

  document.getElementById("id").value = invoiceId;
  document.getElementById("invoice_id").value = invoiceNumber;
  document.getElementById("invoice_date").value = invoiceDate;
  document.getElementById("invoice_due_date").value = dueDate;
  document.getElementById("amount").value = amount;
  document.getElementById("mode").value = mode;
  document.getElementById("salesIncharge").value = salesIncharge;
  document.getElementById("salesReturn").value = salesReturn;
  document.getElementById("category").value = category;

  document.querySelector(".main-dropdown").style.display = "block";
  document.querySelector(".edit-menu").style.display = "block";
}

// ✅ Close Edit Form
function CloseForm() {
  document.querySelector(".main-dropdown").style.display = "none";
}

// ✅ Form Submission Handler
function setupFormSubmit() {
  const form = document.getElementById("updatesForm");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const json = Object.fromEntries(formData.entries());
    const id = json.id;

    fetch(location.origin + `/admin/invoice/update/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Invoice updated successfully!");
        CloseForm();
        location.reload();
      })
      .catch((err) => {
        console.error("Update error:", err);
        alert("Failed to update invoice.");
      });
  });
}

// ✅ Escape key closes form
function setupEscapeKey() {
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      CloseForm();
    }
  });
}

// ✅ Delete Payment
function DeleteProp(elem, id) {
  if (!confirm("Are you sure you want to delete this Invoice?")) return;
  fetch(location.origin + `/admin/invoice/delete/${id}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire({ title: 'Sucess', text: data.msg, icon: 'success', confirmButtonText: 'Done' });
      const row = elem.closest(".accordion-content");
      row.remove();
    })
    .catch((err) => {
      console.error("Delete failed", err);
      Swal.fire({ title: 'Error deleting payment.', text: err, icon: 'error', confirmButtonText: 'Done' });
    });
}

// ✅ Change Payment Status
function changeStatus(selectElem, id) {
  const newStatus = selectElem.value;

  fetch(location.origin + `/admin/invoice/update_status/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status: newStatus }),
  })
    .then((res) => res.json())
    .then((data) => {
      Swal.fire({ title: 'Sucess', text: data.msg, icon: 'success', confirmButtonText: 'Done' });
      selectElem.classList.add("updated");
    })
    .catch((err) => {
      console.error("Status update failed", err);
    });
}