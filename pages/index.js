import Featured from "@/components/common/Featured";
import NewProducts from "@/components/common/products/NewProducts";
import Navbar from "@/components/layouts/navbar/Navbar";
import { Product } from "@/models/Products";
import { mongooseConnect } from "@/utils/libs/mongoose";

export default function Home({ featuredProduct, newProducts }) {
  // console.log(featuredProduct);
  // console.log(newProducts);

  return (
    <>
      <Navbar />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} />
    </>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "64ab05130affbd63b126deec";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10,
  });

  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
    },
  };
}
