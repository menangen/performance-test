/**
 * Created by menangen on 28.03.15.
 */
MATRIX = [250, 100];
DEBUG = false;

Pixel = function() {
    this.x = 0;
    this.y = 0;
};


function get_around_pixels(main_pixel_on_map, offset, settings) {
    //Returned List: [pixel, pixel...]
    settings = settings || MATRIX;
    var result_pixels_list = [];

    var area_width = settings[0];
    var area_height = settings[1];

    var w_square = (offset * 2) + 1;
    var s_pixels = w_square * w_square;

    var center_pixel_number = (s_pixels - 1) / 2;

    for (var pixel_id_in_square = 0; pixel_id_in_square < s_pixels; pixel_id_in_square++) {

        var x = (pixel_id_in_square % w_square) - (offset - main_pixel_on_map.x);
        var y = (pixel_id_in_square / w_square >> 0) - (offset - main_pixel_on_map.y);

        if (DEBUG) {
            console.log("x = " + x);
            console.log("y = " + y);
        }

        // Pixel in area?
        if ( (area_width > x) && (x > -1) && (area_height > y) && (y > -1) ) {
            if (pixel_id_in_square != center_pixel_number) {
                if (DEBUG) {
                    console.log("Add square id: " + pixel_id_in_square);
                }
            result_pixels_list.push([x, y]);
            }
        }
    }

    if (DEBUG) {
        console.log("w_square: [" + w_square + "], s_pixels: ["+ s_pixels +"], center_pixel_number: ["+center_pixel_number+"]")}

    return result_pixels_list
}

function run() {
    var step = 4;
    var width = MATRIX[0];
    var height = MATRIX[0];
    var noise_list = [];

    for (var row = 0; row < height; row++) {

        var pixels_array = [];

        for (var pixel_x = 0; pixel_x < width; pixel_x++) {
            pixels_array[pixel_x] = Math.floor(Math.random() * 10);
        }

        noise_list.push(pixels_array);

    }

    var pixel_instance = new Pixel();

    var caves_set = new Set();
    var caves_centers_set = new Set();

    for (var y = 0; y < noise_list.length; y++) {
        var y_array_in_altitude = noise_list[y];

        for (var x = 0; x < y_array_in_altitude.length; x++) {
            var x_pixel = y_array_in_altitude[x];

            if ((x_pixel == 3) || (x_pixel == 4)) {
                pixel_instance.x = x;
                pixel_instance.y = y;

                var pixels_near_center = get_around_pixels(pixel_instance, step);

                var block_count = 0;

                for (var pixel_id = 0; pixel_id < pixels_near_center.length; pixel_id++) {
                    var one_pixel = pixels_near_center[pixel_id];

                    var x_pixel_inside_square = one_pixel[0];
                    var y_pixel_inside_square = one_pixel[1];

                    var value_in_altitude_list = noise_list[y_pixel_inside_square][x_pixel_inside_square];
                    // Not in dirt place pickaxe
                    if ((value_in_altitude_list != 2) && (value_in_altitude_list != 3)){
                        block_count++;
                    }


                }

                if (!block_count) {
                    for (var pixel_id = 0; pixel_id < pixels_near_center.length; pixel_id++) {
                        var one_pixel = pixels_near_center[pixel_id];

                        x_pixel_inside_square = one_pixel[0];
                        y_pixel_inside_square = one_pixel[1];

                        caves_set.add([x_pixel_inside_square, y_pixel_inside_square]);
                        caves_centers_set.add([x, y]);
                    }

                }
            }
        }

    }


}


var end, start;
start = new Date();
    run();
end = new Date();

console.log('V8 javascript completed in ' + (end.getTime() - start.getTime()) / 1000 + ' sec');