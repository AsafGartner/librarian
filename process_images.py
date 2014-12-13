from os import listdir
from os.path import isfile, join, basename, splitext
from wand.image import Image
import string

raw_path = "./raw"
unsorted_path = "./unsorted"

def convert_to_pdf(files, rotations, target_file):
  target_file = splitext(target_file)[0] + ".pdf"
  print("Preparing to create", target_file)
  # We have to specify width/height to create an empty image,
  # but we're going to delete the first page anyway, so the values don't matter
  with Image(width=1, height=1) as pdf_image:
    pdf_image.format = "pdf"
    pdf_image.sequence.pop() # get rid of the first 1x1 image

    for idx, file in enumerate(files):
      with Image(filename=file) as img:
        if rotations[idx]:
          img.rotate(rotations[idx])
        pdf_image.sequence.append(img)

    pdf_image.save(filename=target_file)
