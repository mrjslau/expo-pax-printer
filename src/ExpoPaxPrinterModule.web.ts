import { registerWebModule, NativeModule } from 'expo';

import { ExpoPaxPrinterModuleEvents } from './ExpoPaxPrinter.types';

class ExpoPaxPrinterModule extends NativeModule<ExpoPaxPrinterModuleEvents> {
  PI = Math.PI;
  async setValueAsync(value: string): Promise<void> {
    this.emit('onChange', { value });
  }
  hello() {
    return 'Hello world! 👋';
  }
}

export default registerWebModule(ExpoPaxPrinterModule, 'ExpoPaxPrinterModule');
