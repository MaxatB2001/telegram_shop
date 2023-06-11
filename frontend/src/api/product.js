export const addReview = async (itemId, review) => {
  const res = await fetch(`http://localhost:5000/api/item/review/${itemId}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({review})
  })
  return await res.json()
}