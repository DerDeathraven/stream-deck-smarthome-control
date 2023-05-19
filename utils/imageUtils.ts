import * as Jimp from "jimp";
import { resolve } from "path";

export async function readPrefabImage(imageName: string) {
  const imagePath = resolve(process.cwd(), "assets", "prefabs", imageName);
  const image = await Jimp.read(imagePath);

  return image.scaleToFit(72, 72).background(0xff0000).bitmap.data;
}
