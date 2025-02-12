let ReqURI = {
  addUser: BASE_URL + `/add`,
  updUser: BASE_URL + `/update/`,
  updUserPwd: BASE_URL + `/update/pwd/`,
  delUser: BASE_URL + `/delete/`,
};
function Disable_BtnHandler(e, ep) {
  if (ep) {
    let elmCtn = document.querySelector(e);
    let inputs = elmCtn.getElementsByTagName("input");
    for (const e of inputs) {
      e.removeAttribute("disabled");
    }
    elmCtn.getElementsByTagName("Button")[0].classList.remove("hide");
  } else {
    let elmCtn = document.querySelector(e);
    let inputs = elmCtn.getElementsByTagName("input");
    for (const e of inputs) {
      e.setAttribute("disabled", "");
    }
    elmCtn.getElementsByTagName("Button")[0].classList.add("hide");
  }
}
function setUserToModel(e) {
  // if (document.documentElement.clientWidth < 480) {
  //     document.getElementsByClassName('main')[0].classList.add('glow');
  // } else { document.getElementsByClassName('main')[0].classList.add('flow'); }
  let usrCtn = e.parentElement;
  let uProfileMdl = document.querySelector(".user-profile-settings")
    .children[2];
  uProfileMdl.dataset.id = usrCtn.dataset.id;
  uProfileMdl.querySelector("#name").value =
    usrCtn.getElementsByClassName("username")[0].innerText;
  uProfileMdl.querySelector("#designation").value =
    usrCtn.getElementsByClassName("userdesignation")[1].innerText;
  uProfileMdl.querySelector("#cnumber").value =
    usrCtn.getElementsByClassName("uphone")[0].innerText;
  uProfileMdl.querySelector("#email").value =
    usrCtn.getElementsByClassName("uemail")[0].innerText;
  uProfileMdl.querySelector(".pro-logout-status").innerText =
    usrCtn.getElementsByClassName("data-log")[0].innerText;
  uProfileMdl.querySelector(".pro-login-status").innerText =
    usrCtn.getElementsByClassName("data-log")[1].innerText;
  uProfileMdl.querySelector(".ustatus").innerText =
    usrCtn.getElementsByClassName("ustatus")[0].innerText;
  // GetUserDetailsReq(usrCtn.dataset.id)
}
function setUserToMdl_pwd(e, elm) {
  if (document.documentElement.clientWidth < 480) {
    document.getElementsByClassName("main")[0].classList.add("glow");
  } else {
    document.getElementsByClassName("main")[0].classList.add("flow");
  }
  document.querySelector(`${e}`).classList.remove(`hide`);
  Cls_UserCtn(".uprofile-settings");
  let ParentElm = document.querySelector(".uprofile-settings");
  let pwdCtn = document.querySelector(".password-settings");
  pwdCtn.children[0].children[0].innerText =
    ParentElm.querySelector("#name").value;
  pwdCtn.children[0].dataset.id =
    ParentElm.querySelector(".flex-box").dataset.id;
}
function Opn_UserCtn(e, elm) {
  // if (document.documentElement.clientWidth < 480) {
  //     document.getElementsByClassName('main')[0].classList.add('glow');
  // } else { document.getElementsByClassName('main')[0].classList.add('flow'); }
  document.querySelector(`${e}`).classList.remove(`hide`);
  e == ".uprofile-settings" ? setUserToModel(elm) : null;
}
function Cls_UserCtn(e) {
  if (document.documentElement.clientWidth < 480) {
    document.getElementsByClassName("main")[0].classList.remove("glow");
  } else {
    document.getElementsByClassName("main")[0].classList.remove("flow");
  }
  document.querySelector(`${e}`).classList.add(`hide`);
  e == ".uprofile-settings" ? Disable_BtnHandler(".profile-grid", false) : null;
}
function AlertNotifier(status, msg, icon) {
  Swal.fire({
    title: status ? "Sucess" : "Error",
    text: msg,
    icon: icon,
    confirmButtonText: "Done",
  });
}

function addUser() {
  let user = document.getElementsByClassName("userform")[0];
  let dataObj = {
    Name: user.querySelector("#name").value,
    jobRole: user.querySelector("#designation").value,
    Number: user.querySelector("#cnumber").value,
    Email: user.querySelector("#email").value,
    Password: user.querySelector("#password").value,
  };
  ReqHandler.POST(ReqURI.addUser, dataObj)
    .then((res) => {
      console.log(res);
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        Cls_UserCtn(".uprofile-settings");
        Disable_BtnHandler(".profile-grid", false);
        Cls_UserCtn(".usform");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-UserAdd):", err);
    });
}
function updUser() {
  let user = document.getElementsByClassName("profile-grid")[0];
  let u_id = user.parentElement.parentElement.dataset.id;
  let dataObj = {
    name: user.querySelector("#name").value,
    job_role: user.querySelector("#designation").value,
    number: user.querySelector("#cnumber").value,
    email: user.querySelector("#email").value,
  };
  ReqHandler.PUT(ReqURI.updUser + u_id, dataObj)
    .then((res) => {
      console.log(res);
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        setTimeout(() => {
          location.reload();
        }, 2000);
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-UserUpdate):", err);
    });
}
function updUserPwd() {
  let user = document.querySelector(".password-settings");
  let u_id = user.children[0].dataset.id;
  let dataObj = {
    Password: user.querySelector("#password2").value,
  };
  ReqHandler.PUT(ReqURI.updUserPwd + u_id, dataObj)
    .then((res) => {
      if (res.status == true) {
        AlertNotifier(res.status, res.msg, "success");
        Cls_UserCtn(".password-settings");
      } else {
        AlertNotifier(res.status, res.msg, "error");
      }
    })
    .catch((err) => {
      console.log("Error(fn-UserUpdate):", err);
    });
}
function DeleteUser(e) {
  let userId =
    e.parentElement.parentElement.parentElement.parentElement.dataset.id;
  if (!userId) {
    console.error("Error: User ID is missing!");
    AlertNotifier(false, "User ID is required!", "error");
    return;
  }
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
      ReqHandler.DEL(ReqURI.delUser + userId)
        .then((res) => {
          if (res.status === true) {
            AlertNotifier(true, res.msg, "success");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            AlertNotifier(false, res.msg, "error");
          }
        })
        .catch((err) => {
          console.error("Error(fn-UserDelete):", err);
          AlertNotifier(false, "Failed to delete user!", "error");
        });
    } else {
    }
  });
}

// function GetUserDetailsReq(e) {
//     let AttenCtn = document.querySelector('.attendance-column');
//     let WrokStatusCtn = document.querySelectorAll('.profile-main');
//     let year = (new Date).getFullYear()
//     let month = (new Date).getUTCMonth()
//     const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     ReqHandler.GET(ReqURI.getUserAtten + e)
//         .then((res) => {
//             if (res.status == true) {
//                 document.querySelector('#month').innerHTML = `${res.data[0].totalAtten} in Day ${monthNames[month]}`
//             }
//         }).catch(err => {
//             console.log('Error(fn-getAtten):', err);
//         })
//     ReqHandler.GET(ReqURI.getUserAttenyMth + e)
//         .then((res) => {
//             if (res.status == true) {
//                 AttenCtn.innerHTML = '';
//                 for (let i = 0; i < res.data.length; i++) {
//                     AttenCtn.innerHTML += ` <p class="attendance-name"><span>${res.data[i].date} ${monthNames[month]} ${year}</span><span class="green">${res.data[i][monthNames[month]]}</span> </p>`
//                 }
//             }
//         }).catch(err => {
//             console.log('Error(fn-GetAttenByM):', err);
//         })
//     ReqHandler.GET(ReqURI.getWorkInfo + e)
//         .then((res) => {
//             if (res.status) {
//                 WrokStatusCtn[0].querySelector('.primary').innerText = res.data[1].length
//                 WrokStatusCtn[0].querySelector('.blue').innerText = res.data[0][0].total_cats
//                 WrokStatusCtn[0].querySelector('.red').innerText = res.data[0][0].total_cats - res.data[0][0].num_cats_completed
//                 WrokStatusCtn[1].querySelector('.primary').innerText = res.data[3].length
//                 WrokStatusCtn[1].querySelector('.blue').innerText = res.data[2][0].total_mtask
//                 WrokStatusCtn[1].querySelector('.red').innerText = res.data[2][0].total_mtask - res.data[2][0].num_task_completed
//             }
//         }).catch(err => {
//             console.log('Error(fn-getAtten):', err);
//         })
// }
function search() {
  var inpValue = document.getElementById("searchQuery").value.toLowerCase();
  var elmCtn = document.querySelectorAll(".user-list");
  elmCtn.forEach(function (e) {
    var contentText = e.textContent.toLowerCase();
    if (contentText.includes(inpValue)) {
      e.style.display = "grid";
    } else {
      e.style.display = "none";
    }
  });
}
