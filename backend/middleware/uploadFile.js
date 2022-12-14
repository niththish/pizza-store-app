const multer = require("multer");

//multer storage configuration
const multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `public/images/${req.body.type}`);
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    const baseName = file.originalname.split(".")[0];
    const fileName = `${baseName}-${new Date().getTime()}.${ext}`;
    cb(null, fileName);
  },
});

//multer file filter to allow only image files
const multerFileFilter = (req, file, cb) => {
  const mimeType = file.mimetype.split("/")[1];
  const { type, price, name } = req.body;

  if ((!type || !price || !name) && req.method != "PATCH") {
    return cb("all fields are required", false);
  }

  if (req.method === "PATCH" && !type) {
    return cb("pizza type is required", false);
  }

  if (mimeType !== "jpeg" && mimeType !== "jpg" && mimeType !== "webp") {
    return cb("file format not accepted", false);
  }

  return cb(null, true);
};

const upload = multer({
  storage: multerDiskStorage,
  fileFilter: multerFileFilter,
  limits: { files: 1 },
});

//file upload middleware
const uploadFile = async (req, res, next) => {
  upload.single("pizza_img")(req, res, function (err) {
    if (err) return next(err);
    else next();
  });
};

module.exports = uploadFile;
