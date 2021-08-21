import type { CompletableSlide } from 'models/application';

import Setting from './Setting';

export interface SettingProps extends CompletableSlide {
    isOnlineExperience?: boolean;
    onSelectType: (isOnline: boolean) => void;
}

export default Setting;