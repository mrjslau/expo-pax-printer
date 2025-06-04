import { NativeModule, requireNativeModule } from 'expo';

import { ExpoPaxPrinterModuleEvents } from './ExpoPaxPrinter.types';

declare class ExpoPaxPrinterModule extends NativeModule<ExpoPaxPrinterModuleEvents> {
  PI: number;
  hello(): string;
  setValueAsync(value: string): Promise<void>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPaxPrinterModule>('ExpoPaxPrinter');
