package expo.modules.paxprinter

import android.util.Log
import expo.modules.kotlin.Promise
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import com.pax.neptunelite.api.NeptuneLiteUser
import com.pax.dal.*
import com.pax.dal.exceptions.*
import java.net.URL

class ExpoPaxPrinterModule : Module() {
  private var dal: IDAL? = null
  private var printer: IPrinter? = null
  private var cashDrawer: ICashDrawer? = null
  private var magReader: IMag? = null

  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    // Sets the name of the module that JavaScript code will use to refer to the module. Takes a string as an argument.
    // Can be inferred from module's class name, but it's recommended to set it explicitly for clarity.
    // The module will be accessible from `requireNativeModule('ExpoPaxPrinter')` in JavaScript.
    Name("ExpoPaxPrinter")

    OnCreate {
      Log.d("ExpoPaxPrinter", "✅ ExpoPaxPrinter module loaded")
      try {
        val context = appContext.reactContext ?: error("Context is null")
        dal = NeptuneLiteUser.getInstance().getDal(context)
        printer = dal?.printer
        cashDrawer = dal?.cashDrawer
        magReader = dal?.mag
        Log.d("ExpoPaxPrinter", "Initialized successfully")
      } catch (e: Exception) {
        Log.e("ExpoPaxPrinter", "Error initializing PAX SDK", e)
      }
    }

    AsyncFunction("getCutMode") { promise: Promise ->
      try {
        val cutMode = printer?.cutMode ?: throw Exception("Printer not available")
        promise.resolve(cutMode)
      } catch (e: PrinterDevException) {
        promise.reject("E_CUT_MODE_ERROR", e.message ?: "Unknown error", e)
      }
    }

    AsyncFunction("printStr") { text: String, promise: Promise ->
      try {
        printer?.apply {
          init()
          setGray(3)
          printStr(text, null)
          val result = start()
          if (result == 0) {
            promise.resolve(null)
          } else {
            promise.reject("E_PRINT_FAILED", "Print failed: $result", null)
          }
        } ?: throw Exception("Printer not initialized")
      } catch (e: Exception) {
        promise.reject("E_UNEXPECTED", e.message ?: "Unexpected error", e)
      }
    }

    AsyncFunction("openDrawer") { promise: Promise ->
      try {
        val result = cashDrawer?.open() ?: -1
        if (result == 0) {
          promise.resolve(result)
        } else {
          promise.reject("E_DRAWER_FAILED", "Drawer could not be opened", null)
        }
      } catch (e: Exception) {
        promise.reject("E_CASH_DRAWER_ERROR", e.message ?: "Unexpected error", e)
      }
    }

    AsyncFunction("readMagCard") { promise: Promise ->
      try {
        if (magReader == null) {
          promise.reject("MAG_READER_INIT_ERROR", "MagReader not available", null)
          return@AsyncFunction
        }

        magReader?.open()
        magReader?.reset()
        val startTime = System.currentTimeMillis()

        while (magReader?.isSwiped != true) {
          if (System.currentTimeMillis() - startTime > 20_000) {
            magReader?.close()
            promise.resolve(mapOf(
              "success" to false,
              "error" to "Card swipe timeout after 20 seconds"
            ))
            return@AsyncFunction
          }
          Thread.sleep(100)
        }

        val trackData = magReader?.read()
        if (trackData != null) {
          promise.resolve(mapOf(
            "success" to true,
            "track1" to trackData.track1,
            "track2" to trackData.track2,
            "track3" to trackData.track3
          ))
        } else {
          promise.resolve(mapOf(
            "success" to false,
            "error" to "No track data read"
          ))
        }
      } catch (e: Exception) {
        promise.resolve(mapOf(
          "success" to false,
          "error" to e.message
        ))
      } finally {
        try {
          magReader?.close()
        } catch (e: MagDevException) {
          Log.e("PaxPrinter", "Failed to close MagReader", e)
        }
      }
    }
  }
}
