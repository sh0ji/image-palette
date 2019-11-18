import { urlWithParams } from "./util";

const GoogleBooks = "https://www.googleapis.com/books/v1/volumes";

export const NortonCurrent = urlWithParams(GoogleBooks, {
  q: [
    "inpublisher:Norton",
    "inpublisher:Company",
    new Date().getFullYear()
  ].join("+")
}).href;

export const getNortonCover = async (num = 1) => {
  const { items } = await fetch(
    urlWithParams(NortonCurrent, {
      fields: "items(volumeInfo/imageLinks/thumbnail)",
      maxResults: 1,
      startIndex: num
    })
  ).then(r => r.json());
  return items ? items[0].volumeInfo.imageLinks.thumbnail : null;
};

export const nortonCount = async () => {
  const url = urlWithParams(NortonCurrent, {
    fields: "totalItems"
  });
  const { totalItems } = await fetch(url).then(r => r.json());
  return totalItems;
};

export const randomNorton = async () => {
  let cover;
  while (!cover) {
    cover = await getNortonCover(
      Math.floor(Math.random() * Math.floor(await nortonCount()))
    );
  }
  return cover;
};
