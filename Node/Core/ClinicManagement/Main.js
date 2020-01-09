const Hospital = require("./Hospital")

let x = new Hospital(process.argv[2] || "KIMS", process.argv[3] || "CARDIO")

x.start()
