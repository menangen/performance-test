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


pixel = new Pixel();
pixel.x = 0;
pixel.y = 0;

console.log(get_around_pixels(pixel, 1));