export default function intInputHandler(value, setValue) {
  const filteredInput = value.replace(/[^0-9]/g, "")
  setValue(filteredInput)
}
