//Оголошення констант
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

//Основний вхід у програму
function setup() {
    const canvas = createCanvas(500, 500);
    //Івент на рух колесиком мишки, при ньому викликається функція зуму канви
    canvas.mouseWheel(zoom_canvas);
    //При наводці мишки на канву перемальовувати її 
    canvas.mouseMoved(redraw);
    //Івент на кнопку "Зберегти", при нажатті зберігається фрактал у форматі png
    save.addEventListener("click", (event) => {
        saveCanvas(canvas, 'my_canvas', 'png');
    });
    //Вказуємо батьківський тег для канви
    canvas.parent('fractal');
    //Вказуємо густоту пікселів, у даному випадку один піксель канви є просто одним пікселем екрану
    pixelDensity(1);
    //Вказує, що запустити метод draw() тільки один раз
    noLoop();
}

//Цей метод малює канву
function draw(){

    //Створює градієнт кольорів відносно кожної ітерації
    for(let i = 0; i < MAX_ITERATIONS; i++){
        outer_red_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, red(color(outer_color_min.value)), red(color(outer_color_max.value)));
        outer_green_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, green(color(outer_color_min.value)), green(color(outer_color_max.value)));
        outer_blue_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, blue(color(outer_color_min.value)), blue(color(outer_color_max.value)));

        inner_red_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, red(color(inner_color_min.value)), red(color(inner_color_max.value)));
        inner_green_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, green(color(inner_color_min.value)), green(color(inner_color_max.value)));
        inner_blue_colors[i] = map(sqrt(i / MAX_ITERATIONS), 0, 1, blue(color(inner_color_min.value)), blue(color(inner_color_max.value)));
    }

    //Загружає масив пікселей канви
    loadPixels();

    //Визначає доданок С до Z*Z, він у нас залежить від положення мишки на канві
    let current_x = map(mouseX, 0, width, -1, 1);
    let current_y = map(mouseY, 0, height, -1, 1);

    //Проходить по кожному пікселі
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){
            //Визначає початкові реальні та уявні числа, якщо не вказані значення вручну, використовує значення пікселів
            let real, imagine;
            if(c_number_real.value=="" || c_number_imaginary.value==""){
                real = map(x, 0, width, -zoom, zoom);
                imagine = map(y, 0, height, -zoom, zoom);
            }
            else{
                real = +c_number_real.value;
                imagine = +c_number_imaginary.value;
            }

            let iterations = 0;
            //Для кожної ітерації визначає рекурсивно кожну наступну реальну та уявну частини за формулою
            while(iterations < MAX_ITERATIONS){
                let square_real = real * real - imagine * imagine;
                let square_imagine = 2 * real * imagine;

                //Відмінність від Мандельброта у тому, що тут використовуються різні значення відносно положення мишки
                real = square_real + current_x;
                imagine = square_imagine + current_y;

                //Одна із умов закінчення рекурсії - коли реальні та уявні числа доходять до певної межі
                if(square_real * square_real + square_imagine * square_imagine > STOP_VALUE){
                    break;
                }

                iterations++;
            }

            //Визначається індекс кожного пікселя - за допомогою формули знаходження індекса у двовимірному масиві,
            //І множиться на 4, тому що кожен піксель складається з 4 значень - r, g, b, a
            let current_pixel = (x + y * width) * 4;
            if(iterations == MAX_ITERATIONS){
                //Якщо цей піксель є всередині фракталу - визначаємо йому внутрішній колір
                pixels[current_pixel + 0] = inner_red_colors[iterations];
                pixels[current_pixel + 1] = inner_green_colors[iterations];
                pixels[current_pixel + 2] = inner_blue_colors[iterations];
            }
            else{
                //Якщо поза межами - зовнішній
                pixels[current_pixel + 0] = outer_red_colors[iterations];
                pixels[current_pixel + 1] = outer_green_colors[iterations];
                pixels[current_pixel + 2] = outer_blue_colors[iterations];
                pixels[current_pixel + 3] = 255;
            }
        }
    }

    //Записуємо нові значення пікселів у канву
    updatePixels();
}

//Коли вводимо колір, зберегти його у елементі і перемалювати канву
inner_color_min.addEventListener("input", event => {
    inner_color_min.value = event.target.value;
    redraw();
});

inner_color_max.addEventListener("input", event => {
    inner_color_max.value = event.target.value;
    redraw();
});

outer_color_min.addEventListener("input", event => {
    outer_color_min.value = event.target.value;
    redraw();
});

outer_color_max.addEventListener("input", event => {
    outer_color_max.value = event.target.value;
    redraw();
});

//При вводі значень реальної і уявної частини записати результат і перемалювати
c_number_real.addEventListener("input", event => {
    c_number_real.value = event.target.value;
});

c_number_imaginary.addEventListener("input", event => {
    c_number_imaginary.value = event.target.value;
    redraw();
});

//При тяганні повзунка масштабування змінюємо значення зуму і перемальовуємо канву
scale_slider.addEventListener("change", (event) => {
    zoom = event.target.value;  
    redraw();
});

//Додає до зуму значення прокрутки колеса мишки, яка множиться на чутливість масштабування
function zoom_canvas(event){
    zoom += event.deltaY * SENSATIVITY;
    zoom = constrain(zoom, ZOOM_MIN, ZOOM_MAX);
    redraw();
    return false;
}
