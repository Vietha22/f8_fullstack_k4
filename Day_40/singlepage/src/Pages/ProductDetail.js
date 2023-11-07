export const ProductDetail = ({ params }) => {
  // const { id } = params;

  console.log(params);

  return `
        <h1>Chi tiết sản phẩm: </h1>
        <button onclick="navigate('/san-pham')">Back</button>
    `;
};
