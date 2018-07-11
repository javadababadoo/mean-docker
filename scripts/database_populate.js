function createRandomDevices() {
  db = db.getSiblingDB("DeviceDB");

  for (i = 0; i < 100; i++) {
    var res = db.devices.insertOne({
      name: "Dispositivo " + i,
      type: "T",
      desc: "Dispositivo de prueba " + i
    });
  }

  console.log("Tarea terminada");
}
