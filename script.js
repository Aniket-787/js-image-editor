let filter = document.querySelector('.filter')
let filterContainer = document.querySelector('.filters')
let filters = {
    brightness:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    contrast:{
         value:100,
        min:0,
        max:200,
        unit:"%"
    },
    exposure:{
         value:100,
        min:0,
        max:200,
        unit:"%"
    },
    saturation:{
         value:100,
        min:0,
        max:200,
        unit:"%"
    },
    hueRotation:{
         value:0,
        min:0,
        max:200,
        unit:"deg"
    },
    blur:{
         value:0,
        min:0,
        max:200,
        unit:"px"
    },
    greyScale:{
         value:0,
        min:0,
        max:200,
        unit:"%"
    },
    sepia:{
         value:0,
        min:0,
        max:200,
        unit:"%"
    },
    opacity:{
         value:100,
        min:0,
        max:200,
        unit:"%"
    },
    invert:{
         value:0,
        min:0,
        max:200,
        unit:"%"
    }
}

function createFilterElement(name,unit="%",value,min,max){
    let div = document.createElement('div')
    div.classList.add('filter')

    let input = document.createElement('input');

    input.type = "range"
    input.min = min;
    input.max = max;
    input.name = name;
    input.value = value;
    input.unit = unit

    let p = document.createElement('p')
    p.innerText = name; 

    div.appendChild(p)
    div.appendChild(input)
   
    return div
}

Object.keys(filters).forEach(filter=>{
      let filterE1 = createFilterElement(filter,filters[filter].unit,filters[filter].value,filters[filter].min,filters[filter].max)  
        
      filterContainer.appendChild(filterE1)
})

let canvas = document.querySelector('#canvas')
let inputImg = document.querySelector('#input-image')
let canvactx = canvas.getContext("2d")
let placeholder = document.querySelector('.placeholder')
inputImg.addEventListener('change',(e)=>{
    let file = e.target.files[0]
    let img = new Image();
    img.src = URL.createObjectURL(file)
    placeholder.style.display = "none"
    img.onload=()=>{
        canvas.height = img.height;
        canvas.width = img.width;
        canvactx.drawImage(img,0,0)
    }
})

