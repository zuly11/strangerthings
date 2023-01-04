export const createPost = async ({
  token,
  title,
  description,
  price,
  willDeliver,
}) => {
  fetch("https://strangers-things.herokuapp.com/api/2209-FTB-ET-WEB-AM/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      post: {
        title: "Finger Hugs and Smothering Bear Hugs",
        description: "To whomever needs a hug",
        price: "priceless",
        willDeliver: true,
      },
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
    })
    .catch(console.error);
};
