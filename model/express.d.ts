declare global {
  namespace Express {
    interface Request {
      files?: fileUpload.FileArray | null | undefined;
    }
  }
}
