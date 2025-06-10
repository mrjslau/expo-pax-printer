import { useEffect } from "react";
import { printStr } from "expo-pax-printer";

export default function App() {
	useEffect(() => {
		const testPrinter = async () => {
			try {
				await printStr("🖨️ Hello from PAX device!");
				console.log("✅ Print command sent!");
			} catch (e) {
				console.error("❌ Printer error:", e);
			}
		};

		testPrinter();
	}, []);

	return null;
}
