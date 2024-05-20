const SpeedTest = require("fast-speedtest-api");
import conectionSchema from "../model/conection.schema";

class SpeedTestService {
  private options: any;
  constructor() {
    this.options = {
      maxTime: 5000, // Tiempo máximo para realizar el test (en milisegundos)
      token: process.env.SPEED_TEST_TOKEN || "",
      urlCount: 5, // default: 5
      bufferSize: 8, // default: 8
      unit: SpeedTest.UNITS.Mbps, // default: Bps
    };
  }

  public async getSpeedTest(ip: string): Promise<any> {
    try {
      const results = [];
      const speedTest = new SpeedTest(this.options);
      for (let i = 0; i < 5; i++) {
        const speed = await speedTest.getSpeed();
        results.push(`${speed} Mbps`);
      }
      const data = {
        ip: ip,
        data: {
          //remove a key results and use only a value
          mbs: results,
        },
      };
      await conectionSchema.create(data);
      return {
        error: false,
        message: "SpeedTest",
        data: data,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getMyIPs(ip: string): Promise<any> {
    try {
      const data = await conectionSchema.find({ ip: ip });
      const resuls = data.map((item: any) => ({
        ip: item.ip,
        data: item.data,
      }));
      return {
        error: false,
        message: "My IPs",
        data: resuls,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }

  async getAll(): Promise<any> {
    try {
      const data = await conectionSchema.find();
      return {
        error: false,
        message: "All",
        data: data,
      };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

export default new SpeedTestService();
