export function convertTime(secs) {
  const d = new Date(secs * 1000);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const year = d.getFullYear();
  const month = months[d.getMonth()];
  const date = d.getDate();
  const hour = d.getHours();
  const min = d.getMinutes();
  const sec = d.getSeconds();
  return (secs !== undefined) ? `${month}/${date}/${year} ${normalizeTime(hour)}:${normalizeTime(min)}:${normalizeTime(sec)}` : 'Apr/7/1993 13:10:44';
}

export function normalizeTime(time) {
  if (String(time).length < 2) {
    return `0${time}`;
  } else return time;
}

export function validateEmail(email) {
  const required = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return required.test(email);
}
