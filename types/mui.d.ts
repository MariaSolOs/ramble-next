import mui from '@mui/material/styles';

declare module '@mui/material/styles' {
    // Add custom font properties
    interface TypographyVariants {
        questrial: React.CSSProperties;
        futura: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        questrial?: React.CSSProperties;
        futura?: React.CSSProperties;
    }    
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        questrial: true;
        futura: true;
    }
}