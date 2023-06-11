export const addToCart = async (userName, product) => {
  console.log(userName);
  const res = await fetch(`http://localhost:5000/api/cart/${userName}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      item: product
    })
  })
  return await res.json()
}