import { v4 as uuidv4 } from "https://jspm.dev/uuid";
import {
  clearBtn,
  container,
  displayAlert,
  form,
  grocery,
  list,
  submitBtn,
} from "./js/helpers.js";


let editElement;
let editFlag = false; 
let editID = ""; 



const deleteItem = (e) => {
 
  const element = e.currentTarget.closest(".grocery-item");
 
  list.removeChild(element);

  displayAlert("Başarıyla Kaldırıldı", "danger");
};

const editItem = (e) => {
  const element = e.currentTarget.closest(".grocery-item");
  
  editElement = e.target.parentElement.parentElement.previousElementSibling;

  grocery.value = editElement.innerHTML;

  editFlag = true;

  editID = element.dataset.id;
  submitBtn.textContent = "Düzenle";
};


const addItem = (e) => {
 
  e.preventDefault();
  
  const value = grocery.value;

  const id = uuidv4();

  
  if (value !== "" && !editFlag) {

    const element = document.createElement("article");

    let attr = document.createAttribute("data-id");
    attr.value = id;
   
    element.setAttributeNode(attr);
    
    element.classList.add("grocery-item");

    element.innerHTML = `
         <p class="title">${value}</p>
        <div class="btn-container">
            <button type="button" class="edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button type="button" class="delete-btn">
                <i class="fa-solid fa-trash"></i>
            </button>
        </div>
    `;


    list.appendChild(element);
    const deleteBtn = element.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", deleteItem);

    const editBtn = element.querySelector(".edit-btn");
    editBtn.addEventListener("click", editItem);

    container.classList.add("show-container");
    displayAlert("Başarıyla Eklenildi", "success");
    grocery.value = "";
  } else if (value !== "" && editFlag) {
    editElement.innerHTML = value;
    submitBtn.textContent = "Ekle";
    displayAlert("Değer Değiştirildi", "success");
    grocery.value = "";
  }
};

const clearItems = () => {
 
  const items = document.querySelectorAll(".grocery-item");
  if (items.length > 0) {
    items.forEach((item) => list.removeChild(item));
  }
  container.classList.remove("show-container");
};


form.addEventListener("submit", addItem);

clearBtn.addEventListener("click", clearItems);