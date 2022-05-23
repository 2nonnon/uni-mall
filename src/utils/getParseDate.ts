const addZero = (num: number) => {
  if (num < 0 || num >= 10) return `${num}`
  else return `0${num}`
}
export const getParseDate = (date?: number) => {
  const today = date ? new Date(date) : new Date()
  const newDate = `${today.getFullYear()}-${addZero(today.getMonth() + 1)}-${addZero(today.getDate())} ${addZero(today.getHours())}:${addZero(today.getMinutes())}:${addZero(today.getSeconds())}`
  return newDate
}
