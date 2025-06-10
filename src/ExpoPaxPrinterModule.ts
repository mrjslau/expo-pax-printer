import { NativeModule, requireNativeModule } from "expo";

type TrackData = {
	success: boolean;
	track1?: string;
	track2?: string;
	track3?: string;
	error?: string;
};

declare class ExpoPaxPrinterModule extends NativeModule {
	printStr(text: string): Promise<void>;
	getCutMode(): Promise<number>;
	openDrawer(): Promise<number>;
	readMagCard(): Promise<TrackData>;
}

// This call loads the native module object from the JSI.
export default requireNativeModule<ExpoPaxPrinterModule>("ExpoPaxPrinter");
