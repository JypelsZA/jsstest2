function open_new_window(location) {
  window.location.href = location;
}
const sendMeme = async (url, id) => {
  $("#" + id).addClass("viewed");
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({id:id}),
  });
  const resData = "Meme details loaded...";
  open_new_window('/meme-details');
  return resData;
};