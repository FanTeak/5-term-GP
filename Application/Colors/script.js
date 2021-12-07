let original_canvas = document.getElementById("original_canvas");
let modified_canvas = document.getElementById("modified_canvas");
let saturation_range = document.getElementById("saturation");
let value_range = document.getElementById("value");
let value = value_range.value;
let saturation = saturation_range.value;

let previous_pixels = [];
let start_coordinates = null;
let end_coordinates = null;

let is_cmyk = document.getElementById("is_cmyk");
let is_hsv = document.getElementById("is_hsv");

let file_input = document.getElementById("file_input");
let file_reader = new FileReader();
let image = new Image();

file_input.addEventListener("change", (event) => {
    let image_file = file_input.files[0];

    if(image_file){
        file_reader.readAsDataURL(image_file);
    }
    else{
        image.src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9CjdBC7RbYlfHccj0OjqE4gIb9ySyFS7FjA&usqp=CAU";
    }
});

file_reader.addEventListener("load", event => {
    image.src = event.srcElement.result;
}, false);

image.addEventListener("load", event => {
    let original_context = original_canvas.getContext('2d');
    let modified_context = modified_canvas.getContext('2d');

    original_canvas.height = original_canvas.clientHeight;
    original_canvas.width = original_canvas.clientWidth;

    modified_canvas.height = modified_canvas.clientHeight;
    modified_canvas.width = modified_canvas.clientWidth;

    original_context.clearRect(0, 0, original_canvas.width, original_canvas.height);
    modified_context.clearRect(0, 0, modified_canvas.width, modified_canvas.height);

    if(image.width > image.height){
        original_context.drawImage(image, 0, 0, image.width, image.height, 0, 0, original_canvas.width, original_canvas.height / (image.width / image.height));
        modified_context.drawImage(image, 0, 0, image.width, image.height, 0, 0, modified_canvas.width, modified_canvas.height / (image.width / image.height));

    }
    else{
        original_context.drawImage(image, 0, 0, image.width, image.height, 0, 0, original_canvas.width / (image.height / image.width), original_canvas.height);
        modified_context.drawImage(image, 0, 0, image.width, image.height, 0, 0, modified_canvas.width / (image.height / image.width), modified_canvas.height);
    }
});

original_canvas.addEventListener("mousemove", event => {
    let current_position = get_canvas_position(original_canvas, event);
    let current_rgb = get_rgb_from_pixel(original_canvas, current_position.x, current_position.y);

    document.getElementById("Pos-x").innerHTML = current_position.x;
    document.getElementById("Pos-y").innerHTML = current_position.y;

    document.getElementById("RGB-r").innerHTML = current_rgb.r;
    document.getElementById("RGB-g").innerHTML = current_rgb.g;
    document.getElementById("RGB-b").innerHTML = current_rgb.b;

    document.getElementById("HSV-h").innerHTML = rgb_to_hsv(current_rgb.r, current_rgb.g, current_rgb.b).h;
    document.getElementById("HSV-s").innerHTML = rgb_to_hsv(current_rgb.r, current_rgb.g, current_rgb.b).s;
    document.getElementById("HSV-v").innerHTML = rgb_to_hsv(current_rgb.r, current_rgb.g, current_rgb.b).v;

    document.getElementById("CMYK-c").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).c;
    document.getElementById("CMYK-m").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).m;
    document.getElementById("CMYK-y").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).y;
    document.getElementById("CMYK-k").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).k;
});

original_canvas.addEventListener("mouseout", event => {
    document.getElementById("Pos-x").innerHTML = "";
    document.getElementById("Pos-y").innerHTML = "";

    document.getElementById("RGB-r").innerHTML = "";
    document.getElementById("RGB-g").innerHTML = "";
    document.getElementById("RGB-b").innerHTML = "";

    document.getElementById("HSV-h").innerHTML = "";
    document.getElementById("HSV-s").innerHTML = "";
    document.getElementById("HSV-v").innerHTML = "";
    document.getElementById("CMYK-c").innerHTML = "";
    document.getElementById("CMYK-m").innerHTML = "";
    document.getElementById("CMYK-y").innerHTML = "";
    document.getElementById("CMYK-k").innerHTML = "";
});

modified_canvas.addEventListener("mousemove", event => {
    let current_position = get_canvas_position(modified_canvas, event);
    let current_rgb = get_rgb_from_pixel(modified_canvas, current_position.x, current_position.y);

    document.getElementById("Pos-x").innerHTML = current_position.x;
    document.getElementById("Pos-y").innerHTML = current_position.y;

    document.getElementById("RGB-r").innerHTML = current_rgb.r;
    document.getElementById("RGB-g").innerHTML = current_rgb.g;
    document.getElementById("RGB-b").innerHTML = current_rgb.b;

    document.getElementById("HSV-h").innerHTML = rgb_to_hsv(current_rgb.r, current_rgb.g, current_rgb.b).h;
    document.getElementById("HSV-s").innerHTML = rgb_to_hsv(current_rgb.r, current_rgb.g, current_rgb.b).s;
    document.getElementById("HSV-v").innerHTML = rgb_to_hsv(current_rgb.r, current_rgb.g, current_rgb.b).v;

    document.getElementById("CMYK-c").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).c;
    document.getElementById("CMYK-m").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).m;
    document.getElementById("CMYK-y").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).y;
    document.getElementById("CMYK-k").innerHTML = rgb_to_cmyk(current_rgb.r, current_rgb.g, current_rgb.b).k;
});

modified_canvas.addEventListener("mouseout", event => {
    document.getElementById("Pos-x").innerHTML = "";
    document.getElementById("Pos-y").innerHTML = "";

    document.getElementById("RGB-r").innerHTML = "";
    document.getElementById("RGB-g").innerHTML = "";
    document.getElementById("RGB-b").innerHTML = "";

    document.getElementById("HSV-h").innerHTML = "";
    document.getElementById("HSV-s").innerHTML = "";
    document.getElementById("HSV-v").innerHTML = "";
    document.getElementById("CMYK-c").innerHTML = "";
    document.getElementById("CMYK-m").innerHTML = "";
    document.getElementById("CMYK-y").innerHTML = "";
    document.getElementById("CMYK-k").innerHTML = "";
});

saturation_range.addEventListener("change", event => {
    saturation = document.getElementById("saturation").value;

    change_image();
});

value_range.addEventListener("change", event => {
    value = document.getElementById("value").value;

    change_image();
});

is_cmyk.addEventListener("change", event => {
    if(event.target.checked){
        change_cmyk();
    }
});

is_hsv.addEventListener("change", event => {
    if(event.target.checked){
        change_hsv();
    }
});

function change_cmyk(){
    let pixels = original_canvas.getContext('2d').getImageData(0, 0, original_canvas.width, original_canvas.height).data;
    let pixels_cmyk = [];

    for(let i=0; i<original_canvas.height; i++){
        for(let j = 0; j<original_canvas.width; j++){
            let current_position = i * original_canvas.width + j;
            current_position *= 4;

            let current_pixel  = {
                r: pixels[current_position],
                g: pixels[current_position + 1],
                b: pixels[current_position + 2],
                a: pixels[current_position + 3]
            };

            let current_pixel_cmyk = rgb_to_cmyk(current_pixel.r, current_pixel.g, current_pixel.b);

            pixels_cmyk.push(+current_pixel_cmyk.c);
            pixels_cmyk.push(+current_pixel_cmyk.m);
            pixels_cmyk.push(+current_pixel_cmyk.y);
            pixels_cmyk.push(+current_pixel_cmyk.k);

            let current_pixel_rgb = cmyk_to_rgb(current_pixel_cmyk.c, current_pixel_cmyk.m, current_pixel_cmyk.y, current_pixel_cmyk.k);

            pixels[current_position] = current_pixel_rgb.r;
            pixels[current_position + 1] = current_pixel_rgb.g;
            pixels[current_position + 2] = current_pixel_rgb.b;
        }
    }

    original_canvas.getContext('2d').putImageData(new ImageData(pixels, original_canvas.width), 0, 0);
}

function change_hsv(){
    let pixels = original_canvas.getContext('2d').getImageData(0, 0, original_canvas.width, original_canvas.height).data;
    let pixels_hsv = [];

    for(let i=0; i<original_canvas.height; i++){
        for(let j = 0; j<original_canvas.width; j++){
            let current_position = i * original_canvas.width + j;
            current_position *= 4;

            let current_pixel  = {
                r: pixels[current_position],
                g: pixels[current_position + 1],
                b: pixels[current_position + 2],
                a: pixels[current_position + 3]
            };

            let current_pixel_hsv = rgb_to_hsv(current_pixel.r, current_pixel.g, current_pixel.b);

            pixels_hsv.push(+current_pixel_hsv.h);
            pixels_hsv.push(+current_pixel_hsv.s);
            pixels_hsv.push(+current_pixel_hsv.v);

            let current_pixel_rgb = hsv_to_rgb(current_pixel_hsv.h, current_pixel_hsv.s, current_pixel_hsv.v);

            pixels[current_position] = current_pixel_rgb.r;
            pixels[current_position + 1] = current_pixel_rgb.g;
            pixels[current_position + 2] = current_pixel_rgb.b;
        }
    }

    original_canvas.getContext('2d').putImageData(new ImageData(pixels, original_canvas.width), 0, 0);
}

function change_image(){
    let pixels = original_canvas.getContext('2d').getImageData(0, 0, original_canvas.width, original_canvas.height).data;

    for(let i=0; i < original_canvas.height; i++){
        for(let j=0; j < original_canvas.width; j++){
            let current_position = i * original_canvas.width + j;
            current_position*=4;

            let current_pixel  = {
                r: pixels[current_position],
                g: pixels[current_position + 1],
                b: pixels[current_position + 2]
            };

            let current_pixel_hsv = rgb_to_hsv(current_pixel.r, current_pixel.g, current_pixel.b);

            if(current_pixel_hsv.h >= 210 && current_pixel_hsv.h <= 270){
    
                current_pixel_hsv.s = saturation;
                current_pixel_hsv.v = value;

                let current_pixel_rgb = hsv_to_rgb(current_pixel_hsv.h, current_pixel_hsv.s, current_pixel_hsv.v);
                pixels[current_position] = current_pixel_rgb.r;
                pixels[current_position + 1] = current_pixel_rgb.g;
                pixels[current_position + 2] = current_pixel_rgb.b;
            }
        }
    }

    modified_canvas.getContext('2d').putImageData(new ImageData(pixels, modified_canvas.width), 0, 0);
}

function get_rgb_from_pixel(canvas, mouse_x, mouse_y){
    let pixels = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height).data;
    let current_position = mouse_y * canvas.width + mouse_x;
    current_position*=4;

    return {
        r: pixels[current_position],
        g: pixels[current_position + 1],
        b: pixels[current_position + 2]
    };
}

function get_canvas_position(canvas, event) {
    let context = canvas.getBoundingClientRect();
    return {
        x: Math.round(event.clientX - context.left),
        y: Math.round(event.clientY - context.top)
    };
}

original_canvas.addEventListener("mousedown", event => {
    start_coordinates = get_canvas_position(original_canvas, event);
})

original_canvas.addEventListener("mouseup", event => {
    if(start_coordinates == null){
        return;
    }

    previous_pixels = original_canvas.getContext('2d').getImageData(0, 0, original_canvas.width, original_canvas.height).data.slice();

    end_coordinates = get_canvas_position(original_canvas, event);
    let ctx = original_canvas.getContext('2d');
    ctx.beginPath();
    ctx.lineWidth = "1px";
    ctx.strokeStyle = "black";
    ctx.rect(start_coordinates.x, start_coordinates.y, end_coordinates.x - start_coordinates.x, end_coordinates.y - start_coordinates.y);
    ctx.stroke();
})

document.getElementById("remove_fragment").addEventListener("click", event => {
    let previous_canvas = original_canvas.getContext('2d').getImageData(0, 0, original_canvas.width, original_canvas.height);
    let position;

    for (let i = 0; i < original_canvas.height; ++i) {
        for (let j = 0; j < original_canvas.width; ++j) {
            position = i * original_canvas.width + j;
            position *= 4;
            for (let k = 0; k < 4; ++k) {
                previous_canvas.data[position + k] = previous_pixels[position + k];
            }
        }
    }

    original_canvas.getContext('2d').putImageData(previous_canvas, 0, 0);

})

function rgb_to_hsv(r, g, b){
    r /= 255;
    g /= 255;
    b /= 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);
    let h, s, v = max;

    let max_min_subtract = max - min;

    //S identifying
    if(max === 0){
        s = max;
    }
    else{
        s = 1 - min/max;
    }

    //H identifying
    if (max === min) {
        h = 0;
    } 
    else{
        switch (max) {
            case r:
                h = 60 * (g - b) / max_min_subtract + (g < b ? 360 : 0);
                break;

            case g:     
                h = 60 * (b - r) / max_min_subtract + 120;
                break;

            case b:     
                h = 60 * (r - g) / max_min_subtract + 240;
                break;

            default:
                break;
        }
    }

    return {
        h: +Math.round(h),
        s: +s.toFixed(1),
        v: +v.toFixed(1)
    };
}

function hsv_to_rgb(h, s, v){
    let c = s * v;
    let x = c * (1 - Math.abs((h/60 % 2) - 1));
    let m = v - c;
    let r, g, b;

    if(h < 0) h = 0;
    if(h > 360) h = 360;

    if(h >= 0 && h < 60){
        r = c;
        g = x;
        b = 0;
    }
    if(h >= 60 && h < 120){
        r = x;
        g = c;
        b = 0;
    }
    if(h >= 120 && h < 180){
        r = 0;
        g = c;
        b = x;
    }
    if(h >= 180 && h < 240){
        r = 0;
        g = x;
        b = c;
    }
    if(h >= 240 && h < 300){
        r = x;
        g = 0;
        b = c;
    }
    if(h >= 300 && h < 360){
        r = c;
        g = 0;
        b = x;
    }

    return {
        r: (r + m) * 255,
        g: (g + m) * 255,
        b: (b + m) * 255
    };
}

function rgb_to_cmyk(r, g, b){
    let normal_r = r / 255;
    let normal_g = g / 255;
    let normal_b = b / 255;

    let k = 1 - Math.max(normal_r, normal_g, normal_b);

    return {
        c: +((1 - normal_r - k) / (1 - k)).toFixed(1),
        m: +((1 - normal_g - k) / (1 - k)).toFixed(1),
        y: +((1 - normal_b - k) / (1 - k)).toFixed(1),
        k: +k.toFixed(1)
    };
}

function cmyk_to_rgb(c, m, y, k){
    return {
        r: 255 * (1 - c) * (1 - k),
        g: 255 * (1 - m) * (1 - k),
        b: 255 * (1 - y) * (1 - k)
    };
}
