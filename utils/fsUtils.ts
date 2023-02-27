import { readdirSync } from "fs";
import { resolve } from "path";

const PICTURE_REGEX = /[^\\s]+(.*?)\\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/;

export function readPictureFolder(): string[] {
  const folderPath = resolve(process.cwd(), "assets/uploads");
  const folder = readdirSync(folderPath).filter((file) =>
    file.match(PICTURE_REGEX)
  );
  return folder;
}

export function readPrefabFolder(): string[] {
  const folderPath = resolve(process.cwd(), "assets/prefabs");
  const folder = readdirSync(folderPath).filter((file) =>
    file.match(PICTURE_REGEX)
  );
  return folder;
}

export function saveImageFromBlob(blob: Blob) {}
