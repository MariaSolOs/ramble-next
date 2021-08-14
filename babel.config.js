module.exports = {
    presets: ['next/babel'], 
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