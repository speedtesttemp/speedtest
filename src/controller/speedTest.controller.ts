import responseModel from "../model/response.model";
import speedTestService from "../service/speedTest.service";

class SpeedTest {
  public async getSpeedTest(req: any, res: any): Promise<void> {
    const response: responseModel = {
      message: "SpeedTest",
      stauts: 200,
    };
    const clientIp = req.clientIp;
    const results = await speedTestService.getSpeedTest(clientIp);

    if (results.error || results == undefined) {
      response.stauts = 500;
      response.message = "Error";
      response.data = results.message;
    }
    response.data = results.data;
    res.status(response.stauts).json(response);
  }

  async getMyIPs(req: any, res: any): Promise<void> {
    const response: responseModel = {
      message: "My IPs",
      stauts: 200,
    };
    const clientIp = req.clientIp;
    const results = await speedTestService.getMyIPs(clientIp);
    if (results.error || results == undefined) {
      response.stauts = 500;
      response.message = "Error";
      response.data = results.message;
    }
    response.data = results.data;
    res.status(response.stauts).json(response);
  }

  async getAll(req: any, res: any): Promise<void> {
    const response: responseModel = {
      message: "All",
      stauts: 200,
    };
    const results = await speedTestService.getAll();
    if (results.error || results == undefined) {
      response.stauts = 500;
      response.message = "Error";
      response.data = results.message;
    }
    response.data = results.data;
    res.status(response.stauts).json(response);
  }
}

export default new SpeedTest();
