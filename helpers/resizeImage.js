const jimp = require('jimp');

/**
 *Изменяет размер исходного файла c сохранением пропорций методом "cover".
 *
 * @param {string} imagePath - путь к файлу с указанием имени и расширения файла.
 * @param {number} width - ширина
 * @param {number} height - высота
 */
const resizeImage = async (imagePath, width, height) => {
  const image = await jimp.read(imagePath);

  image
    .cover(width, height, function (err) {
      if (err) throw err;
    })
    .write(imagePath);
};

module.exports = resizeImage;
