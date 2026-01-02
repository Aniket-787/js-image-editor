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
      console.log(filterE1);
      
      filterContainer.appendChild(filterE1)
})
