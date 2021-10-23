import GradientButton from './GradientButton';

export type GradientButtonVariant = 'experience' | 'creator' | 'error';

export type GradientButtonProps = {
    variant: GradientButtonVariant;
    link?: { href: string; as: string; }
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default GradientButton;
