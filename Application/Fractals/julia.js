const MAX_ITERATIONS = 100;
const STOP_VALUE = 10;
const ZOOM_MIN = 0;
const ZOOM_MAX = 4.0;
const SENSATIVITY = 0.001;

const outer_red_colors = [];
const outer_green_colors = [];
const outer_blue_colors = [];

const inner_red_colors = [];
const inner_green_colors = [];
const inner_blue_colors = [];
let zoom = 3.0;
let currentX = 0;
let currentY = 0;

const outer_color_min = document.getElementById("outer_color_min");
const outer_color_max = document.getElementById("outer_color_max");
const inner_color_min = document.getElementById("inner_color_min");
const inner_color_max = document.getElementById("inner_color_max");
const c_number_real = document.getElementById("c_number_real");
const c_number_imaginary = document.getElementById("c_number_imaginary");
const scale_slider = document.getElementById("scale");

const save = document.getElementById("save");

function setup() {
    const canvas = createCanvas(500, 500);
    canvas.mouseWheel(zoom_canvas);
    //canvas.mouseOver(change_mouse_xy);
    save.addEventListener("click", (event) => {
        saveCanvas(canvas, 'my_canvas', 'png');
    });
    canvas.parent('fractal');
    pixelDensity(1);
}
function draw(){

    for(let i = 0; i < MAX_ITERATIONS; i++){
        outer_red_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, red(color(outer_color_min.value)), red(color(outer_color_max.value)));
        outer_green_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, green(color(outer_color_min.value)), green(color(outer_color_max.value)));
        outer_blue_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, blue(color(outer_color_min.value)), blue(color(outer_color_max.value)));

        inner_red_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, red(color(inner_color_min.value)), red(color(inner_color_max.value)));
        inner_green_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, green(color(inner_color_min.value)), green(color(inner_color_max.value)));
        inner_blue_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, blue(color(inner_color_min.value)), blue(color(inner_color_max.value)));

    }

    loadPixels();

    let current_x = map(mouseX, 0, width, -1, 1);
    let current_y = map(mouseY, 0, height, -1, 1);

    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            let real = map(x, 0, width, -zoom, zoom);
            let imagine = map(y, 0, height, -zoom, zoom);

            let iterations = 0;
            while(iterations < MAX_ITERATIONS){
                let square_real = real * real - imagine * imagine;
                let square_imagine = 2 * real * imagine;

                real = square_real + current_x;
                imagine = square_imagine + current_y;

                if(square_real * square_real + square_imagine * square_imagine > STOP_VALUE){
                    break;
                }

                iterations++;
            }

            let current_pixel = (x + y * width) * 4;
            if(iterations == MAX_ITERATIONS){
                pixels[current_pixel + 0] = inner_red_colors[iterations];
                pixels[current_pixel + 1] = inner_green_colors[iterations];
                pixels[current_pixel + 2] = inner_blue_colors[iterations];
            }
            else{
                pixels[current_pixel + 0] = outer_red_colors[iterations];
                pixels[current_pixel + 1] = outer_green_colors[iterations];
                pixels[current_pixel + 2] = outer_blue_colors[iterations];
                pixels[current_pixel + 3] = 255;
            }
        }
    }

    updatePixels();
}

inner_color_min.addEventListener("input", event => {
    inner_color_min.value = event.target.value;
});

inner_color_max.addEventListener("input", event => {
    inner_color_max.value = event.target.value;
});

outer_color_min.addEventListener("input", event => {
    outer_color_min.value = event.target.value;
});

outer_color_max.addEventListener("input", event => {
    outer_color_max.value = event.target.value;
});

c_number_real.addEventListener("change", event => {
    c.c_number_real.value = event.target.value;
    redraw();
});

c_number_imaginary.addEventListener("change", event => {
    c.c_number_imaginary.value = event.target.value;
    redraw();
});

scale_slider.addEventListener("change", (event) => {
    zoom = event.target.value;  
    redraw();
});

function zoom_canvas(event){
    zoom += event.deltaY * SENSATIVITY;
    zoom = constrain(zoom, ZOOM_MIN, ZOOM_MAX);
    redraw();
    return false;
}

/*function change_mouse_xy(event){
    currentX = map(mouseX, 0, windowWidth, 0, width);
    currentY = map(mouseY, 0, windowHeight, 0, height);
}*/