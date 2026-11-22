import UIKit
import WebKit
import CoreMotion

@main
class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        window = UIWindow(frame: UIScreen.main.bounds)
        window?.rootViewController = SkyViewController()
        window?.makeKeyAndVisible()
        return true
    }
}

class SkyViewController: UIViewController, WKNavigationDelegate {
    var webView: WKWebView!
    let motion = CMMotionManager()
    var lastSend: TimeInterval = 0
    var smAz = Double.nan
    var smAlt = Double.nan
    var lastAz = 9999.0
    var lastAlt = 9999.0
    let kSmooth = 0.12

    override func viewDidLoad() {
        super.viewDidLoad()
        webView = WKWebView(frame: view.bounds)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        view.addSubview(webView)
        if let url = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "www") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        if motion.isDeviceMotionAvailable {
            motion.deviceMotionUpdateInterval = 1.0 / 50.0
            motion.startDeviceMotionUpdates(using: .xMagneticNorthZVertical, to: .main) { [weak self] m, _ in
                if let s = self, let d = m { s.onMotion(d) }
            }
        }
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        webView.evaluateJavaScript("try{window.__astrolabNative='ios';window.__astrolabSensorStatus&&window.__astrolabSensorStatus('coremotion')}catch(e){}", completionHandler: nil)
    }

    func onMotion(_ d: CMDeviceMotion) {
        let r = d.attitude.rotationMatrix
        let vx = -r.m13, vy = -r.m23, vz = -r.m33
        let alt = asin(max(-1.0, min(1.0, vz))) * 180.0 / Double.pi
        var az = atan2(-vy, vx) * 180.0 / Double.pi
        az = (az.truncatingRemainder(dividingBy: 360.0) + 360.0).truncatingRemainder(dividingBy: 360.0)
        if smAz.isNaN {
            smAz = az; smAlt = alt
        } else {
            let dAz = (az - smAz + 540.0).truncatingRemainder(dividingBy: 360.0) - 180.0
            smAz = (smAz + kSmooth * dAz + 360.0).truncatingRemainder(dividingBy: 360.0)
            smAlt = smAlt + kSmooth * (alt - smAlt)
        }
        let now = Date().timeIntervalSince1970
        if now - lastSend < 0.04 { return }
        let dz = (smAz - lastAz + 540.0).truncatingRemainder(dividingBy: 360.0) - 180.0
        if abs(dz) < 0.05 && abs(smAlt - lastAlt) < 0.05 && now - lastSend < 0.5 { return }
        lastSend = now; lastAz = smAz; lastAlt = smAlt
        let alpha = (360.0 - smAz).truncatingRemainder(dividingBy: 360.0)
        let beta = smAlt + 90.0
        let js = "try{if(window.__astrolabOrient){window.__astrolabOrient(\(smAz),\(smAlt))}else{window.dispatchEvent(new DeviceOrientationEvent('deviceorientation',{alpha:\(alpha),beta:\(beta),gamma:0,absolute:true}))}}catch(err){var ev=document.createEvent('Event');ev.initEvent('deviceorientation',true,true);ev.alpha=\(alpha);ev.beta=\(beta);ev.gamma=0;ev.absolute=true;window.dispatchEvent(ev)}"
        webView.evaluateJavaScript(js, completionHandler: nil)
    }
}
