export default function dateToString(date) {
  let day = date.getDate()
  let month = date.getMonth() + 1
  const year = date.getFullYear()
  if (month < 10) {
    month = "0" + month
  }
  if (day < 10) {
    day = "0" + day
  }
  return `${day}/${month}/${year}`
}
