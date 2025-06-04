import * as React from 'react';

import { ExpoPaxPrinterViewProps } from './ExpoPaxPrinter.types';

export default function ExpoPaxPrinterView(props: ExpoPaxPrinterViewProps) {
  return (
    <div>
      <iframe
        style={{ flex: 1 }}
        src={props.url}
        onLoad={() => props.onLoad({ nativeEvent: { url: props.url } })}
      />
    </div>
  );
}
