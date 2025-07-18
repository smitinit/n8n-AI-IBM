import { getCurrentUserId } from "../lib/getCurrentUserId";
import ProductForm from "./ProductForm";

export default async function page() {
  const id = await getCurrentUserId();
  if (!id) return;
  return (
    <>
      <ProductForm userId={id} />
    </>
  );
}
