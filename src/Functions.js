export function decodeHTML(html) {
	var txt = document.createElement('textarea');
	txt.innerHTML = html;
	return txt.value;
}

export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}