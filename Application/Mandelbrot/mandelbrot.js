const MAX_ITERATIONS = 100;
const STOP_VALUE = 10;
const red_colors = [];
const green_colors = [];
const blue_colors = [];

const outer_color_min = document.getElementById("outer_color_min");
const outer_color_max = document.getElementById("outer_color_max");
const inner_color = document.getElementById("inner_color");

function setup() {
    const canvas = createCanvas(600, 600);
    canvas.parent('fractal');
    pixelDensity(1);
    noLoop();
}
  
function draw(){

    for(let i = 0; i < MAX_ITERATIONS; i++){
        red_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, red(color(outer_color_min.value)), red(color(outer_color_max.value)));
        green_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, green(color(outer_color_min.value)), green(color(outer_color_max.value)));
        blue_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, blue(color(outer_color_min.value)), blue(color(outer_color_max.value)));
    }

    loadPixels();

    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            let real = map(x, 0, width, -2, 2);
            let imagine = map(y, 0, height, -2, 2);

            let start_real = real;
            let start_imagine = imagine;

            let iterations = 0;
            while(iterations < MAX_ITERATIONS){
                let square_real = real * real - imagine * imagine;
                let square_imagine = 2 * real * imagine;

                real = square_real + start_real;
                imagine = square_imagine + start_imagine;

                if(square_real * square_real + square_imagine * square_imagine > STOP_VALUE){
                    break;
                }

                iterations++;
            }

            let current_pixel = (x + y * width) * 4;
            if(iterations == MAX_ITERATIONS){
                pixels[current_pixel + 0] = red(color(inner_color.value));
                pixels[current_pixel + 1] = green(color(inner_color.value));
                pixels[current_pixel + 2] = blue(color(inner_color.value));
                pixels[current_pixel + 3] = 255;
            }
            else{
                pixels[current_pixel + 0] = red_colors[iterations];
                pixels[current_pixel + 1] = green_colors[iterations];
                pixels[current_pixel + 2] = blue_colors[iterations];
                pixels[current_pixel + 3] = 255;
            }
        }
    }

    updatePixels();
}

outer_color_min.addEventListener("input", (event)=>{
    outer_color_min.value = event.target.value;
    redraw();
});

outer_color_max.addEventListener("input", (event)=>{
    outer_color_max.value = event.target.value;
    redraw();
});

inner_color.addEventListener("input", (event)=>{
    inner_color.value = event.target.value;
    redraw();
})