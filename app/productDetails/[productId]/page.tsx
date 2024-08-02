import { notFound } from "next/navigation"
export default function ProductDetails({ params }: { params: { productId: string } }) {
  if(parseInt(params.productId) < 0) { notFound()}
  return <div>Dyanmic route for product details {params.productId}</div>
}