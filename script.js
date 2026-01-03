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
    saturate:{
        value:100,
        min:0,
        max:200,
        unit:"%"
    },
    "hue-Rotate":{
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
    grayscale:{
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

    input.classList.add('rangeInput')

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

    input.addEventListener('input',(e)=>{
             
             let name = e.target.name;
             let value = e.target.value;
             let unit = e.target.unit
             applyFilter(name,value,unit)
    })
   
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
let resetbtn = document.querySelector('#reset-btn')
let image = null;
let file = null;
let activeFilter = {}
let rangeInput = document.querySelector('.rangeInput')
let downloadbtn = document.querySelector('#download-btn')
let presetContainer = document.querySelector('.preset')
const presets = {
  normal: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  vintage: {
    brightness: 110,
    contrast: 90,
    saturate: 80,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 40,
    opacity: 100,
    invert: 0
  },

  blackWhite: {
    brightness: 105,
    contrast: 120,
    saturate: 0,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 100,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  warm: {
    brightness: 110,
    contrast: 105,
    saturate: 130,
    "hue-rotate": 10,
    blur: 0,
    grayscale: 0,
    sepia: 20,
    opacity: 100,
    invert: 0
  },

  cool: {
    brightness: 100,
    contrast: 110,
    saturate: 120,
    "hue-rotate": -10,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  dramatic: {
    brightness: 95,
    contrast: 140,
    saturate: 120,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 0
  },

  faded: {
    brightness: 115,
    contrast: 85,
    saturate: 70,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 10,
    opacity: 100,
    invert: 0
  },

  inverted: {
    brightness: 100,
    contrast: 100,
    saturate: 100,
    "hue-rotate": 0,
    blur: 0,
    grayscale: 0,
    sepia: 0,
    opacity: 100,
    invert: 100
  }
};


inputImg.addEventListener('change',(e)=>{
    file = e.target.files[0]
    let img = new Image();
    img.src = URL.createObjectURL(file)
    placeholder.style.display = "none"
    img.onload=()=>{
        image = img
        canvas.height = img.height;
        canvas.width = img.width;
        canvactx.drawImage(img,0,0)
    }
})



function applyFilter(name,value,unit){
    if(!image) return
    
    activeFilter[name] = `${value}${unit}`;

    let filterString = Object.entries(activeFilter).map(([key,val])=>`${key}(${val})`).join(' ')

    canvactx.clearRect(0,0,canvas.width,canvas.height)

    canvactx.filter = filterString

    canvactx.drawImage(image,0,0)
    
}

//reset button logic
resetbtn.addEventListener('click',()=>{
     activeFilter = {};

    document.querySelectorAll('.filter input').forEach(input => {
        let name = input.name;

        input.value = filters[name].value; 
    });

    canvactx.filter = 'none';
    canvactx.clearRect(0, 0, canvas.width, canvas.height);
    canvactx.drawImage(image, 0, 0);
 })

//download btn logic
 downloadbtn.addEventListener('click',()=>{
    let Link = document.createElement('a')
    Link.download = "edited-image-by-wagh.png"
    Link.href = canvas.toDataURL()
    Link.click()

 })


Object.keys(presets).forEach(preset=>{
   let button = document.createElement('button')
   button.classList.add('preset-btn')
   button.id = preset

   button.innerText = preset
   presetContainer.appendChild(button)   
})

let presetbtn = document.querySelectorAll('.preset-btn')



function applyPreset(presetName) {
  if (!presets[presetName] || !image) return;

  activeFilter = {};

  document.querySelectorAll('.filter input').forEach(input => {
    let name = input.name;
    let value = presets[presetName][name];

    if (value !== undefined) {
      input.value = value;
      applyFilter(name, value, filters[name].unit);
    }
  });
}


let normal = document.querySelector('.normal')

presetbtn.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        console.log( e.target.id);       
    let presetName = e.target.id 
    applyPreset(presetName)
})  
})