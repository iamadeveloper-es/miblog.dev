import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat'

export const dateDDMMYYYY = (date: string) => {
  dayjs.extend(advancedFormat)
  return dayjs(date, 'DD-MM-YYYY').format('D MMM YYYY')
}

export const getFullHeight = (el: Element) => {
  const rect = el.getBoundingClientRect()
  const styles = window.getComputedStyle(el)
  const margin =
    parseFloat(styles.marginTop) + parseFloat(styles.marginBottom)
  return rect.height + margin
}
