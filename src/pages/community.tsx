import { b64Image, b64Image2 } from "~/data/b64";

export default function Community() {
  const imagesArr = new Array(20).fill(b64Image).map((_, idx) => {
    if (idx % 2 === 0 || idx % 3 === 0) return b64Image;
    else return b64Image2;
  });
  return (
    <div className="grid grid-cols-5 gap-1 p-1">
      {imagesArr.map((image) => (
        <img src={`data:image/png;base64, ${image}`} className="rounded" />
      ))}
    </div>
  );
}
