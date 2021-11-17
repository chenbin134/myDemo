var animation = bodymovin.loadAnimation({
  container: document.getElementById('bm'),
  renderer: 'svg',
  loop: true,
  autoplay: false,
  path: 'data.json'
})

document.querySelector('button').onclick = () => {
  animation.play();
}