import fs from "fs";

export const limpiarEstatutos = async (req, res, next) => {
  const filePaths = fs.readdirSync("./uploads/estatutos");
  filePaths.forEach((file) => {
    const filePath = `./uploads/estatutos/${file}`;
    fs.unlinkSync(filePath);
  });

  next();
};
