// Reexport the native module. On web, it will be resolved to ExpoPaxPrinterModule.web.ts
// and on native platforms to ExpoPaxPrinterModule.ts
export { default } from './ExpoPaxPrinterModule';
export { default as ExpoPaxPrinterView } from './ExpoPaxPrinterView';
export * from  './ExpoPaxPrinter.types';
