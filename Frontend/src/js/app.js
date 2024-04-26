async function get_products() {
    console.log("getting rev")
    fetch('http://127.0.0.1:8000/api/items/', {headers: {'Accept': 'application/json',}})
    .then(function (response) {
            return response.json();})
    .then(function (all_tc) {
            let out = ``;
            for (let single_tc of all_tc) {
                out +=
                    `
                <li>
                    <div class="items">
                        <div class="item-name">Product Name: ${single_tc.product_name}</div>
                        <div class="item-id">${single_tc.product_id}</div>
                        <div class="item-cost">Cost: ${single_tc.product_price}</div>
                        <div class="item-desc">Description: ${single_tc.description}</div>
                        <div class="item-del"><button onclick="delete_products(${single_tc.product_id})">Delete Product </Button></div>
                        
                    </div>
                </li>   
                `;
            }
            console.log(out);
            document.getElementById("product_list").innerHTML = out;
                })
}

async function get_products_billing() {
    console.log("getting rev")
    fetch('http://127.0.0.1:8000/api/items/', {headers: {'Accept': 'application/json',}})
    .then(function (response) {
            return response.json();})
    .then(function (all_tc) {
            let out = ``;
            for (let single_tc of all_tc) {
                out +=
                    `
                <li>
                    <div class="items">
                        <div class="item-name">Product Name: ${single_tc.product_name}</div>
                        <div class="item-id">${single_tc.product_id}</div>
                        <div class="item-cost">Cost: ${single_tc.product_price}</div>
                        <div class="item-desc">Description: ${single_tc.description}</div>
                        <div class="item-selected"><input  class="item-selected-box" type="checkbox" id="${single_tc.product_id}" ><div>
                        <div class="item-del"><button onclick="add_to_cart(${single_tc.product_id},${single_tc.product_price})">Add To Cart </Button></div>
                        
                    </div>
                </li>   
                `;
            }
            console.log(out);
            document.getElementById("product_list").innerHTML = out;
                })
}

function add_products(){

    let product_name = document.getElementById("product_name").value;
    let product_cost = document.getElementById("product_cost").value;
    let product_desc = document.getElementById("product_desc").value;

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:8000/api/items/",
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ 
            "product_name":product_name,
            "product_price":product_cost,
            "description":product_desc,
        })
    }

    $.ajax(settings).done(function (response) {
        get_products()
        console.log(response);
    })



    // console.log(phone_num)

}

function delete_products(id){

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:8000/api/items/",
        "method": "DELETE",
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ 
            "product_id":id,
       
        })
    }
    

    $.ajax(settings).done(function (response) {
        get_products()
        console.log(response);
    })
}

let selected_items = [];

let total_cost = 0;


function add_to_cart(id,cost){
    let total_cost_ele = document.getElementById("total-cost");
    let id_of_box = document.getElementById(id);


    if (id_of_box.checked == false){
        id_of_box.checked = true;
        total_cost += cost;
    }
    else{
        id_of_box.checked = false;
        total_cost -= cost;
    }

    

    
    total_cost_ele.innerHTML = total_cost;
    
}



function redirectToAnotherPage() {
    // Redirect to another page
    window.location.href = "http://127.0.0.1:5500/Frontend/products.html";
  }