// form 
const method = new DataCall();
function toggleForm(formId, target) {
  document.querySelector('#p-name').innerHTML = target.id;
  const forms = document.querySelectorAll('.formContainer > div');
  forms.forEach(form => {
    if (form.id === formId) {
      form.classList.remove('hide');
    } else {
      form.classList.add('hide');
    }
  });
}

function getMiscTask(params) {
  console.log("Here is your tasks...")
}
function checkDeadline_Valid(e){
  let dateStr = e.value;
    const pattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!pattern.test(dateStr)) {
        e.parentElement.children[0].innerText='Enter Date correctly';
        e.parentElement.children[0].style.color='red';}
    const parts = dateStr.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const date = new Date(year, month, day);
 if (date.getFullYear() === year && date.getMonth() === month && date.getDate() === day) {
        e.parentElement.children[0].innerText='Project deadline';
        e.parentElement.children[0].style.color='black';
    } else {
        e.parentElement.children[0].innerText='Enter Date correctly';
        e.parentElement.children[0].style.color='red';
    }

}
// function checkFormValid(id) {
//   const dataTobeInsert = new FormData(document.getElementById(id))
//   let arrR = []
//   for (const i of dataTobeInsert) {
//     if (i[1]) { arrR.push(true) }else { arrR.push(false) }
//   }
//   return arrR;
// }

// async function SubmitNormalFormData(e) {
//   e.preventDefault();
//   const actionCreator = checkFormValid('np-form-data')
//   if (actionCreator.includes(false)) {
//     alert('please fillup all the input')
//   }else {
//     await method.addNewItemToNp(undefined, e, 'np-form-data', null, 'admin/projects-create')
//   }
// }

// async function SubmitMiscFormData(e) {
//   e.preventDefault();
//   const actionCreator = checkFormValid('mp-form-data')
//   if (actionCreator.includes(false)) {
//     alert('please fillup all the input')
//   }else {
//     await method.addNewItemToNp(undefined, e, 'mp-form-data', null, 'admin/misc-project-create')
//   }
// }






document.addEventListener('DOMContentLoaded', function () {
  ImgUpload();
});

function ImgUpload() {
  var imgArray = [];

  var inputFiles = document.querySelectorAll('.upload__inputfile');
  inputFiles.forEach(function (inputFile) {
      inputFile.addEventListener('change', function (e) {
          var imgWrap = this.closest('.upload__box').querySelector('.upload__img-wrap');
          var maxLength = parseInt(this.dataset.maxLength, 10);

          var files = e.target.files;
          var filesArr = Array.from(files);

          filesArr.forEach(function (f) {
              if (!f.type.match('image.*')) return;

              if (imgArray.length >= maxLength) return;

              imgArray.push(f);

              var reader = new FileReader();
              reader.onload = function (e) {
                  var html = `
                      <div class='upload__img-box'>
                          <div style='background-image: url(${e.target.result})' 
                               data-number='${document.querySelectorAll('.upload__img-close').length}' 
                               data-file='${f.name}' 
                               class='img-bg'>
                              <div class='upload__img-close'></div>
                          </div>
                      </div>`;
                  imgWrap.insertAdjacentHTML('beforeend', html);
              };
              reader.readAsDataURL(f);
          });
      });
  });

  document.body.addEventListener('click', function (e) {
      if (e.target && e.target.classList.contains('upload__img-close')) {
          var file = e.target.closest('.upload__img-box').querySelector('.img-bg').dataset.file;

          imgArray = imgArray.filter(function (img) {
              return img.name !== file;
          });

          e.target.closest('.upload__img-box').remove();
      }
  });
}
