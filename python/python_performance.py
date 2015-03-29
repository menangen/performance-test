#! python
# -*- coding: utf-8 -*-
import time
import random

MATRIX = (250, 100)
DEBUG = False


class Pixel():
    def __init__(self):
        self.x = 0
        self.y = 0

    def __repr__(self):
        return "<Pixel.x=%s, Pixel.y=%s>" % (self.x, self.y)

    def __str__(self):
        return "Pixel(x=%s, y=%s)" % (self.x, self.y)


def get_around_pixels(main_pixel_on_map, offset, settings=MATRIX):
    """Returned List: [pixel, pixel...]"""
    result_pixels_list = list()

    area_width = settings[0]
    area_height = settings[1]

    w_square = (offset * 2) + 1
    s_pixels = w_square ** 2

    center_pixel_number = (s_pixels - 1) / 2

    for pixel_id_in_square in xrange(s_pixels):

        x = (pixel_id_in_square % w_square) - (offset - main_pixel_on_map.x)
        y = (pixel_id_in_square // w_square) - (offset - main_pixel_on_map.y)

        if DEBUG:
            print "x = %d" % x
            print "y = %d" % y

        # Pixel in area?
        if (area_width > x > -1) and (area_height > y > -1):
            if pixel_id_in_square != center_pixel_number:
                if DEBUG:
                    print "Add square id: %d" % pixel_id_in_square
                result_pixels_list.append([x, y])

    if DEBUG:
        print "w_square: [%d], s_pixels: [%d], center_pixel_number: [%d]" % (w_square, s_pixels, center_pixel_number)
    return result_pixels_list


def run():
    step = 4
    width = MATRIX[0]
    height = MATRIX[0]
    noise_list = [[random.randint(0, 9) for pixel in xrange(width)] for row in xrange(height)]

    pixel_instance = Pixel()
    caves_set = set()
    caves_centers_set = set()

    y = 0
    for y_array_in_altitude in noise_list:
        x = 0

        for x_pixel in y_array_in_altitude:

            # Rock pixel selected
            if x_pixel in [3, 4]:

                pixel_instance.x = x
                pixel_instance.y = y

                pixels_near_center = get_around_pixels(pixel_instance, step)

                block_count = 0
                for one_pixel in pixels_near_center:
                    x_pixel_inside_square = one_pixel[0]
                    y_pixel_inside_square = one_pixel[1]

                    value_in_altitude_list = noise_list[y_pixel_inside_square][x_pixel_inside_square]
                    # Not in dirt place pickaxe
                    if value_in_altitude_list not in [2, 3]:
                        block_count += 1

                if block_count == 0:
                    for one_pixel in pixels_near_center:
                        x_pixel_inside_square = one_pixel[0]
                        y_pixel_inside_square = one_pixel[1]

                        caves_set.add((x_pixel_inside_square, y_pixel_inside_square))
                        caves_centers_set.add((x, y))

            x += 1
        y += 1

if __name__ == '__main__':
    start_time = time.time()
    run()
    print "Python code completed in %f sec" % (time.time() - start_time)