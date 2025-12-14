let menus = document.querySelector("nav");
let menuBtn = document.querySelector(".menu-btn");
let closeBtn = document.querySelector(".close-btn");

menuBtn.addEventListener("click",function(){
    menus.classList.add("active");
})

closeBtn.addEventListener("click",function(){
    menus.classList.remove("active");
})

//------------Swiper JS Code
 var swiper = new Swiper(".mySwiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },

    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        768: {
            slidesPerView: 2,
        },
        968: {
            slidesPerView: 3,
        },
    }
});

//Dynamic Images

const SectionCenter = document.querySelector(".menu_items_container");
const filterBtns = document.querySelectorAll(".btn-cat");

filterBtns.forEach(function(btn){
    btn.addEventListener("click",function(e){
        const Category = e.currentTarget.dataset.id;
        const menuCategory = menu.filter(function(menuItem){
            if(menuItem.Category == Category){
                return menuItem;
            }
        });
        if(Category=="all"){
            displayMenusItem(menu);
        }
        else{
            displayMenusItem(menuCategory);
        }
    }) 
});

const menu =[
    {
        id: 1,
        title: "Chicken Tandoori",
        Category: "Appetizers",
        price: 200,
        img: "images/tandoori.jpg"
    },
    {
        id: 2,
        title: "Chicken Manchow Soup",
        Category: "Appetizers",
        price: 250,
        img: "images/manchow.jpg"
    },
    {
        id: 3,
        title: "Chilly Paneer",
        Category: "Appetizers",
        price: 220,
        img: "images/panneer.jpg"
    },
    {
        id: 4,
        title: "Paneer Butter Masala",
        Category: "Main Course",
        price: 230,
        img: "images/butter.jpg"
    },
    {
        id: 5,
        title: "Veg Kadai",
        Category: "Main Course",
        price: 230,
        img: "images/kadai.jpg"
    },
    {
        id: 6,
        title: "Cashew Tomato",
        Category: "Main Course",
        price: 230,
        img: "images/kaju.jpg"
    },
    {
        id: 7,
        title: "Vanilla",
        Category: "Desserts",
        price: 140,
        img: "images/vanilla.jpg"
    },
    {
        id: 8,
        title: "Black Current",
        Category: "Desserts",
        price: 180,
        img: "images/current.jpg"
    },
    {
        id: 9,
        title: "Butter Scotch",
        Category: "Desserts",
        price: 160,
        img: "images/scotch.jpg"
    },
]

window.addEventListener("DOMContentLoaded",function(){
    displayMenusItem(menu);
});

function displayMenusItem(menuItem){
    let displayMenusItem = menuItem.map(function(item){
        return `<div class="img_cards">
        <img src=${item.img} alt="" width="360px" height="360px">
        <p class="price">Only on ₹${item.price}</p>
        <p>${item.title}</p>
        </div>`;
    })
    displayMenusItem = displayMenusItem.join("");
    SectionCenter.innerHTML = displayMenusItem;
}

//static counter
const countersEl = document.querySelectorAll(".num");
countersEl.forEach((countersEl)=>{
    countersEl.innerText = "0";
    incrementCounter();
    function incrementCounter(){
        let currentNum = +countersEl.innerText;
        const dataCeil = countersEl.getAttribute("data-ceil");
        const increment = dataCeil/15;
        currentNum = Math.ceil(currentNum+increment);
        if(currentNum<dataCeil){
            countersEl.innerText = currentNum;
            setTimeout(incrementCounter,70);
        }
        else{
            countersEl.innerText = dataCeil;
        }
    }
});

const nav = document.querySelector("header");
window.addEventListener("scroll",function(){
    if(this.document.documentElement.scrollTop>20){
        nav.classList.add("sticky");
    }
    else{
        nav.classList.remove("sticky");
    }
});

const Parallax = document.querySelector("#showcase");
window.addEventListener("scroll",function(){
    let offset = window.pageYOffset;
    Parallax.style.backgroundPositionY = offset*0.7+"px";
});


const reservationForm = document.querySelector('#reservation_tbl form');
const bookNowBtn = document.querySelector('#reservation_tbl form button');

bookNowBtn.addEventListener('click', async function(e) {
    e.preventDefault(); 

    const name = document.querySelector('input[placeholder="Name"]').value.trim();
    const contact = document.querySelector('input[placeholder="Contact"]').value.trim();
    const email = document.querySelector('input[placeholder="Email"]').value.trim();
    const persons = document.querySelector('input[placeholder="Number of Persons"]').value.trim();
    const date = document.querySelector('input[type="date"]').value.trim();
    const time = document.querySelector('input[placeholder="Your Time"]').value.trim();
    const message = document.querySelector('textarea').value.trim();

    // Validation stays same (using your existing regex)
    const nameRegex = /^[a-zA-Z\s]+$/;
    const contactRegex = /^\d{10}$/; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(name)) return alert("Please enter a valid name.");
    if (!contactRegex.test(contact)) return alert("Enter 10-digit mobile number.");
    if (!emailRegex.test(email)) return alert("Enter valid email.");
    if (persons === "" || parseInt(persons) <= 0) return alert("Enter number of persons.");
    if (date === "") return alert("Select a booking date.");
    if (time === "") return alert("Enter a time.");

    // send to backend
    try {
        const res = await fetch("https://restaurant-hx2m.onrender.com/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name, contact, email, persons, date, time, message
        })
    });


        const data = await res.json();
        if (data.success) {
            alert("Booking successful! Confirmation email sent.");
            reservationForm.reset();
        } else {
            alert("Booking failed. Try again.");
        }
    } catch (err) {
        console.error(err);
        alert("Server error. Try again later.");
    }
});
