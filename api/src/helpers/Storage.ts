import multer from 'multer'
import path from 'path'

export const partyTimeStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join('public/img'));
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});
