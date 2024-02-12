/**@type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.tsx"],
  theme: {
    colors: {
      'gunmetal': '#253238',
      'steel': '#455B66',
      'slate': '#617E8C',
      'silver': '#90A4AF',
      'platinum': '#B0BFC6',
      'light': '#D0D9DE',
    },
    fontFamily: {
      'sans': ['Mulish'],
      'serif': ['Poltawski Nowy']
    },
    maxWidth: {
      'custom0': '90px',
      'custom1': '213px',
      'custom2': '720px',
      'custom3': '1508px'
    },
    maxHeight: {
      'height0': '140px',
    },
    minHeight: {
      'height0': '120px',
    }
  }
}