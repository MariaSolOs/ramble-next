module.exports = {
    presets: ['next/babel'], 
    plugins: [
        [
            '@emotion', {
                importMap: {
                    '@mui/system': {
                        styled: {
                            canonicalImport: ['@emotion/styled', 'default'],
                            styledBaseImport: ['@mui/system', 'styled']
                        }
                    },
                    '@mui/material/styles': {
                        styled: {
                            canonicalImport: ['@emotion/styled', 'default'],
                            styledBaseImport: ['@mui/material/styles', 'styled']
                        }
                    }
                }
            }
        ]
    ],
    overrides: [
        {
            include: ['./node_modules'],
            plugins: [
                [
                    'babel-plugin-transform-import-ignore', {
                        patterns: ['.css']
                    }
                ]
            ]
        }
    ]
}