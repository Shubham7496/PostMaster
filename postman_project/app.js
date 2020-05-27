// console.log("this is app.js");
var count = 2;

//utility function
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;

    return div.firstElementChild;
}



//hide the parameters box initially
let parameter_box = document.getElementById("parameter_box");
parameter_box.style.display = 'none';
document.getElementById('json_box').style.display = 'none';

//hide on basis of the user selection
let custom_params = document.getElementById('custom_params');
custom_params.addEventListener('click', () => {
    document.getElementById('json_box').style.display = 'none';
    document.getElementById('parameter_box').style.display = 'block';
})


//hide on basis of the user selection
let json = document.getElementById('json');
json.addEventListener('click', () => {
    document.getElementById('parameter_box').style.display = 'none';
    document.getElementById('json_box').style.display = 'block';
})

//adding and deleting the parameters


let addparams = document.getElementById('addparams');
addparams.addEventListener('click', () => {
    let area = document.getElementById('addparams_area');
    let html = "";

    html += `<div class="form-row my-2">
      <label for="url" class="col-sm-2 col-form-label">Parameter ${count}</label>
      <div class="col-md-4">
        <input type="text" class="form-control" id="parakey${count}" placeholder="Enter the parameter ${count} key ">
      </div>
      <div class="col-md-4">
        <input type="text" class="form-control" id="paravalue${count}" placeholder="Enter the parameter ${count} value">
      </div>
      <button  class="btn btn-primary delete_para"> - </button>
    </div>`;

    //convert the element string to the dom node
    let paraElement = getElementFromString(html);
    // console.log(paraElement);
    area.appendChild(paraElement);
    //handling the delete_para
    let delete_para = document.getElementsByClassName('delete_para');
    for (const item of delete_para) {
        item.addEventListener('click', (e) => {
            // console.log(paraElement);
            // console.log(e.target);
            e.target.parentElement.remove();
        })
    }
    count++;
})

//if submit is clicked
 
let submit = document.getElementById('submit_btn');
submit.addEventListener('click', () => {
    // wait meassage
    // document.getElementById('response_text').value = "Please wait while your response is being processing.... ";
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";
    let url = document.getElementById('url').value;
    let request_type = document.querySelector("input[name ='req_type']:checked").value;
    let content_type = document.querySelector("input[name='content_type']:checked").value;

    console.log("URL is : " + url);
    console.log("The Request is :" + request_type);
    console.log("The Content Type is : " + content_type);


    //if user has selected a custom parameter option

    let data = {}; 
    if (content_type == 'custom_params') {
        for (i = 0; i <= count; i++) {
            // console.log(count,i);
            
            if (document.getElementById(`parakey${i+1}`) != undefined) {
                let key = document.getElementById(`parakey${i+1 }`).value;
                let value = document.getElementById(`paravalue${i+1 }`).value;
                data[key] = value;
            }
            else{
                continue;
            }
        }
        data = JSON.stringify(data);
    }
    else{
        data = document.getElementById('json_text').value;
    }
    
    console.log(data);

    if(request_type == "GET"){
        fetch(url,{
            method : 'GET',
        }).then(response => response.text()).then((text)=>{
            // document.getElementById('response_text').value = text;
            document.getElementById('responsePrism').innerHTML= text;
            Prism.highlightAll();
        })
    }
    else{
        fetch(url,{
            method : 'POST',
            body : data,
            header : {
                "Content-type":"application/json;charset=UTF-8"
            }
        }).then(response => response.text()).then((text)=>{
            // document.getElementById('response_text').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();

        })
    }
})
