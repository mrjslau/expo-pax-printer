import PaxPrinterModule from "./ExpoPaxPrinterModule";

export async function printStr(text: string): Promise<void> {
	return PaxPrinterModule.printStr(text);
}

export async function getCutMode(): Promise<number> {
	return PaxPrinterModule.getCutMode();
}

export async function openDrawer(): Promise<number> {
	return PaxPrinterModule.openDrawer();
}

export async function readMagCard(): Promise<{
	success: boolean;
	track1?: string;
	track2?: string;
	track3?: string;
	error?: string;
}> {
	return PaxPrinterModule.readMagCard();
}
