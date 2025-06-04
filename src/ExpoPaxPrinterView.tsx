import { requireNativeView } from 'expo';
import * as React from 'react';

import { ExpoPaxPrinterViewProps } from './ExpoPaxPrinter.types';

const NativeView: React.ComponentType<ExpoPaxPrinterViewProps> =
  requireNativeView('ExpoPaxPrinter');

export default function ExpoPaxPrinterView(props: ExpoPaxPrinterViewProps) {
  return <NativeView {...props} />;
}
