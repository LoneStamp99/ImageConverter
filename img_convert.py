import os
import cv2
import numpy as np
import argparse

def convert_image(filename, conversion, dimensions):
    # Load original image
    image = cv2.imread(filename)

    # Convert image based on selected conversion
    if conversion == 'JPG':
        converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, image)
    elif conversion == 'PNG':
        converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.imencode('.png', image)[1])
    elif conversion == 'ICO':
        converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.cvtColor(image, cv2.COLOR_BGR2ICO))
    elif conversion == 'TIFF':
        converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.imencode('.tiff', image)[1]))
    elif conversion == 'SVG':
        # TODO: Implement SVG conversion
        pass
    elif conversion == 'PDF':
        # TODO: Implement PDF conversion
        pass
    elif conversion == 'PSD':
        # TODO: Implement PSD conversion
        pass
    elif conversion == 'AI':
        # TODO: Implement AI conversion
        pass
    elif conversion == 'BMP':
        converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.cvtColor(image, cv2.COLOR_BGR2BGR))
    elif conversion == 'BMP ICO':
        converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.cvtColor(image, cv2.COLOR_BGR2ICO))
    elif conversion == 'INDD':
        # TODO: Implement INDD conversion
        pass
    elif conversion == 'EPS':
        # TODO: Implement EPS conversion
        pass
    elif conversion == 'RAW':
        # TODO: Implement RAW conversion
        pass
    elif conversion == 'APNG':
        # TODO: Implement APNG conversion
        pass

    # Resize image based on selected dimensions
    if dimensions:
        for dimension in dimensions:
            if dimension == '600x600':
                converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.resize(image, (600, 600)))
            elif dimension == '500x500':
                converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.resize(image, (500, 500)))
            elif dimension == '400x400':
                converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.resize(image, (400, 400)))
            elif dimension == '300x300':
                converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.resize(image, (300, 300)))
            elif dimension == '200x200':
                converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.resize(image, (200, 200)))
            elif dimension == '100x100':
                converted_image = cv2.imwrite(filename.split('.')[0] + '_' + conversion + '.' + conversion, cv2.resize(image, (100, 100)))

    # Return converted image path
    return converted_image

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description='Convert image to selected format and dimensions.')
    parser.add_argument('filename', type=str, help='Original image filename.')
    parser.add_argument('conversion', type=str, help='Selected image format.')
    parser.add_argument('dimensions', type=str, nargs='+', help='Selected image dimensions.')
    args = parser.parse_args()
    converted_image = convert_image(args.filename, args.conversion, args.dimensions)
    print(converted_image)
