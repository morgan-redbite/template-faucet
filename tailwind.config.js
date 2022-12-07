/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/components/common/*.{js,jsx,ts,tsx}",
    "./src/pages/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
        borderRadius: {
            DEFAULT: '8px',
            md: '12px',
        },
        boxShadow: {
            xs: '0px 1px 2px rgba(16, 24, 40, 0.05)',
            sm: '0px 1px 3px rgba(16, 24, 40, 0.1), 0px 1px 2px rgba(16, 24, 40, 0.06)',
            xl: '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)',
        },
        minWidth: {
            'screen-md': '50vw',
            'screen-sm': '40vw',
        },
        height: {
            "4.5": "22px",
            "std": "44px"
        },
        backgroundColor: {
            success: '#ECFDF3',
            error: '#FEF3F2',
            "error-2": '#D92D20',
            neutral: '#F2F4F7',
            primary: '#43D9BB',
            disabled: '#EAECF0',
        },
        borderColor: {
            std: '#D0D5DD',
        },
        width: {
            std: '79px'
        },
        colors: {
            required: '#D60606',
            neutral: {
                100: '#F9FAFB',
            },
            gray: {
                25: '#FCFCFD',
                50: '#F9FAFB',
                100: '#F2F4F7',
                200: '#EAECF0',
                300: '#D0D5DD',
                400: '#98A2B3',
                500: '#667085',
                600: '#475467',
                700: '#344054',
                800: '#1D2939',
                900: '#101828',
            },
            error: {
                25: '#FFFBFA',
                50: '#FEF3F2',
                100: '#FEE4E2',
                200: '#FECDCA',
                300: '#FDA29B',
                400: '#F97066',
                500: '#F04438',
                600: '#D92D20',
                700: '#B42318',
                800: '#912018',
                900: '#7A271A',
            },
            warning: {
                25: '#FFFCF5',
                50: '#FFFAEB',
                100: '#FEF0C7',
                200: '#FEDF89',
                300: '#FEC84B',
                400: '#FDB022',
                500: '#F79009',
                600: '#DC6803',
                700: '#B54708',
                800: '#93370D',
                900: '#7A2E0E',
            },
            success: {
                25: '#F6FEF9',
                50: '#ECFDF3',
                100: '#D1FADF',
                200: '#A6F4C5',
                300: '#6CE9A6',
                400: '#32D583',
                500: '#12B76A',
                600: '#039855',
                700: '#027A48',
                800: '#05603A',
                900: '#054F31',
            },
            primary: {
                DEFAULT: '#43D9BB',
            },
        },
        fontSize: {
            xs: ['0.75rem', '1.125rem'],
            sm: ['0.875rem', '1.25rem'],
            base: ['1rem', '1.5rem'],
            lg: ['1.125rem', '1.75rem'],
            xl: ['1.25rem', '1.875rem'],
            '2xl': ['1.5rem', '2rem'], // 'display-xs' in Thor's design system
            '3xl': ['1.875rem', '2.375rem'],
            '4xl': ['2.25rem', '2.75rem'],
            '5xl': ['3rem', '3.75rem'],
            '6xl': ['3.75rem', '4.5rem'],
            '7xl': ['4.5rem', '5.625rem'],
        },
    }
  },
  plugins: [],
}
