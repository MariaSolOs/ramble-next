import mui from '@mui/material/styles';

// Add custom font properties
declare module '@mui/material/styles' {
    interface TypographyVariants {
        questrial: React.CSSProperties;
    }

    interface TypographyVariantsOptions {
        questrial?: React.CSSProperties;
    }    
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        questrial: true;
    }
}