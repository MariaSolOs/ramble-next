import Setting from './Setting';
import type { CompletableSlide } from 'models/application';

export interface SettingProps extends CompletableSlide {
    isOnlineExperience?: boolean;
    onSelectType: (isOnline: boolean) => void;
}

export default Setting;