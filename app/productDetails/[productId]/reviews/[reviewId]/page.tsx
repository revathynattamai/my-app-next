export default function ReviewId({params}: {params: {
  productId: string,
  reviewId: string
}}) {
  return <div>Review for {params.reviewId} for product {params.productId}</div>
}