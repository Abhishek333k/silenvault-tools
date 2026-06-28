// assets/js/directory.js

const silenVaultTools = [
    // --- ADMINISTRATIVE OPERATIONS (business) ---
    {
        category: "business", id: "invoice_generator",
        title: "Invoice Generator", desc: "Generate, edit, and print professional PDF invoices instantly.",
        link: "tools/invoice_generator", tag: "Finance",
        iconColors: "bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />`
    },
    /*
    {
        category: "business", id: "label_maker",
        title: "Retail Label & Barcode Maker", desc: "Generate printable physical product stickers. Supports Code128 barcodes, QR codes, and native CSS grid printing.",
        link: "tools/label_maker",  tag: "Utility",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />`
    },
    */
    {
        category: "business", id: "budget_planner",
        title: "Budget Planner", desc: "Securely track project costs with auto-save and category breakdowns.",
        link: "tools/budget_planner", tag: "Finance",
        iconColors: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />`
    },
    {
        category: "business", id: "loan_calculator",
        title: "Loan Calculator", desc: "Calculate EMI for Home & Car loans with amortization charts.",
        link: "tools/loan_calculator", tag: "Finance",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    },
    {
        category: "business", id: "salary_tax_calculator",
        title: "Salary Calculator", desc: "Calculate take-home pay and compare Old vs New tax regimes securely.",
        link: "tools/salary_tax_calculator", tag: "Finance",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />`
    },
    {
        category: "business", id: "gst_calculator",
        title: "GST Calculator", desc: "Instant tax breakdown for 50+ countries. RCM supported.",
        link: "tools/gst_calculator", tag: "Finance",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    },
    {
        category: "business", id: "qr_generator",
        title: "QR Code Studio", desc: "Design SVG & PNG QR Codes for Wi-Fi, vCards, and Crypto. Inject custom logos for free.",
        link: "tools/qr_generator", tag: "Utility",
        iconColors: "bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />`
    },

    // --- DEVELOPER UTILITIES (dev) ---
    
    {
        category: "dev", id: "academic_vault",
        title: "Academic Vault", 
        desc: "Laboratory index & smart viewer. Read code, PDFs, and media directly from academic repositories without local software.",
        link: "tools/academic_vault", 
        tag: "Education",
        iconColors: "bg-amber-500/10 text-amber-400 border border-amber-500/20 group-hover:bg-amber-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477-4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />`
    },
    {
        category: "dev",
        title: "Secure P2P Share",
        desc: "Establish a direct, end-to-end encrypted WebRTC data channel between two browsers. Send massive files and messages with zero server interception.",
        iconColors: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        link: "tools/p2p_share",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />`,
        tag: "NEW"
    },
    {
        category: "dev", id: "elevation_calculator",
        title: "Elevation & Distance Calculator", 
        desc: "Calculate true 3D slant distance, height differences, and incline angles between map coordinates using terrain data.",
        link: "tools/topo_node.html", 
        tag: "Engineering",
        iconColors: "bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:bg-teal-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />`
    },
    {
        category: "dev", id: "ide",
        title: "HTML/JS Sandbox", desc: "Professional sandboxed HTML/CSS/JS editor with real-time compilation.",
        link: "tools/web_ide", tag: "Code",
        iconColors: "bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />`
    },
    {
        category: "dev", id: "markdown_converter",
        title: "Markdown Editor", desc: "Real-time Markdown to HTML compiler with syntax highlighting.",
        link: "tools/markdown_converter", tag: "Code",
        iconColors: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />`
    },
    {
        category: "dev", id: "jwt_architect",
        title: "JWT Decoder", desc: "Local-first JWT debugger. Encode, decode, and sign JSON Web Tokens.",
        link: "tools/jwt_architect", tag: "Security",
        iconColors: "bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:bg-rose-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />`
    },
    {
        category: "dev", id: "base64_converter",
        title: "Base64 Converter", desc: "Convert images to Data URI strings and back for development.",
        link: "tools/base64_converter", tag: "Code",
        iconColors: "bg-violet-500/10 text-violet-400 border border-violet-500/20 group-hover:bg-violet-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />`
    },
    {
        category: "dev", id: "json_tool",
        title: "JSON Formatter", desc: "Clean, format, and validate JSON data locally.",
        link: "tools/json_tool", tag: "Data",
        iconColors: "bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />`
    },
    {
        category: "dev", id: "unit_converter",
        title: "Unit Converter", desc: "Length, Weight, and Digital Unit translation.",
        link: "tools/unit_converter", tag: "Math",
        iconColors: "bg-orange-500/10 text-orange-400 border border-orange-500/20 group-hover:bg-orange-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />`
    },
    {
        category: "dev", id: "hash_generator",
        title: "Cryptographic Hash Generator", desc: "Calculate SHA-256, SHA-512, and file checksums locally with zero server uploads.",
        link: "tools/hash_generator", tag: "Security",
        iconColors: "bg-slate-500/10 text-slate-400 border border-slate-500/20 group-hover:bg-slate-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />`
    },

    // --- HARDWARE DIAGNOSTICS (hardware) ---
    {
        category: "hardware", id: "keyboard_tester",
        title: "Keyboard & Mouse Tester", desc: "Test hardware keys, analyze ghosting, and extract raw JS event codes.",
        link: "tools/keyboard_tester", tag: "Hardware",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20h9M3 14h1m4 0h1m4 0h1m4 0h1m-15-4h1m4 0h1m4 0h1m4 0h1M5 6h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2z" />`
    },
    {
        category: "hardware", id: "pixel_tester",
        title: "Dead Pixel Tester", desc: "Identify dead, stuck, or lit pixels on your monitor or smartphone display.",
        link: "tools/pixel_tester", tag: "Display",
        iconColors: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 group-hover:bg-cyan-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />`
    },
    {
        category: "hardware", id: "mic_tester",
        title: "Audio Diagnostics", desc: "Test your microphone, record local playback, and verify stereo speakers.",
        link: "tools/mic_tester", tag: "Audio",
        iconColors: "bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />`
    },
    {
        category: "hardware", id: "touch_tester",
        title: "Touch Screen Tester", desc: "Map screen dead zones and verify multi-touch tracking limits.",
        link: "tools/touch_tester", tag: "Mobile",
        iconColors: "bg-pink-500/10 text-pink-400 border border-pink-500/20 group-hover:bg-pink-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />`
    },
    {
        category: "hardware", id: "pitch_detector",
        title: "Frequency Generator", desc: "Professional digital strobe tuner with DSP noise filtering and presets.",
        link: "tools/tone_generator", tag: "Audio",
        iconColors: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />`
    },
    {
        category: "hardware", id: "cam_tester",
        title: "Camera Diagnostics", desc: "Studio viewfinder to analyze cam resolution, framerate, and lens clarity.",
        link: "tools/webcam_tester", tag: "Video",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />`
    },
    {
        category: "hardware", id: "sensor_tester",
        title: "Device Sensor Hub", desc: "Test gyroscope and accelerometer. Features digital bubble level and 3D compass.",
        link: "tools/sensor_tester", tag: "Mobile",
        iconColors: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z" />`
    },
    {
        category: "hardware", id: "controller_tester",
        title: "Gamepad Diagnostics", desc: "Detect analog stick drift, verify trigger pressure, and test button mapping.",
        link: "tools/controller_tester", tag: "Hardware",
        iconColors: "bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 00-1-1H4a1 1 0 01-1-1V4a1 1 0 011-1h3a1 1 0 001-1v-1z" />`
    },
    {
        category: "hardware", id: "vibration_tester",
        title: "Vibration Tester", desc: "Test smartphone haptic motors with custom pulse patterns and SOS sequences.",
        link: "tools/vibration_tester", tag: "Mobile",
        iconColors: "bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:bg-purple-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />`
    },
    

    // --- MEDIA OPERATIONS (creator) ---
    {
        category: "creator", id: "yt_thumbnail",
        title: "YouTube Thumbnails", desc: "Extract 4K/HD thumbnails from any video instantly.",
        link: "tools/yt_thumbnail", tag: "Media",
        iconColors: "bg-red-500/10 text-red-400 border border-red-500/20 group-hover:bg-red-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>`
    },
    {
        category: "creator", id: "speech_engine",
        title: "Speech & Text Engine", 
        desc: "Local browser-based speech synthesis and dictation with zero cloud dependencies.",
        link: "tools/speech_engine", tag: "Audio",
        iconColors: "bg-teal-500/10 text-teal-400 border border-teal-500/20 group-hover:bg-teal-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />`
    },
    {
        category: "creator", id: "image_converter",
        title: "Image Converter", desc: "Convert between P, AVIF, PNG, and JPG locally and instantly.",
        link: "tools/image_converter", tag: "Media",
        iconColors: "bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />`
    },
    {
        category: "creator", id: "exif_remover",
        title: "EXIF Metadata Remover", desc: "Scan & remove GPS location and other metadata from your photos.",
        link: "tools/exif_remover", tag: "Security",
        iconColors: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`
    },
    {
        category: "creator", id: "image_compressor",
        title: "Smart Compressor", desc: "Reduce file size by up to 80% without losing quality.",
        link: "tools/image_compressor", tag: "Media",
        iconColors: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:bg-indigo-400 group-hover:text-[#020617] group-hover:border-transparent transition-all",
        iconPath: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />`
    }
];
